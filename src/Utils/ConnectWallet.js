import {
    loadConnectUserWallet,
    loadConnectWalletAutoError,
} from "redux/thunks/Login.thunk";
import { mainNetwork, testNetwork } from "Utils/Networks";
import Web3 from "web3";
import tokenABI from "./TokenABI";

export async function handleConnectWallet(dispatch) {
    if (!window.ethereum) {
        alert("Install Metamask!");
        return;
    }

    try {
        // REQUEST TO METAMASK TO CONNECT WALLET
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });
        if (
            (process.env.REACT_APP_NODE_ENV === "development" &&
                parseInt(chainId) !== testNetwork.networkId) ||
            (process.env.REACT_APP_NODE_ENV === "production" &&
                parseInt(chainId) !== mainNetwork.networkId)
        ) {
            // UPDATE STORE
            dispatch(loadConnectUserWallet(null, null, "Wrong Network!"));
            const error = { code: 4902, message: "Wrong Network" };
            throw error;
        } else {
            // IF WALLET ADDRESS IS AVAILABLE
            if (accounts.length > 0) {
                // GET TOKEN BALANCE
                const tokenBalance = await getTokenBalance(accounts[0]);
                // UDPATE TO STORE
                if (tokenBalance)
                    dispatch(
                        loadConnectUserWallet(
                            accounts[0],
                            parseFloat(tokenBalance),
                            parseInt(chainId)
                        )
                    );
            }
        }
    } catch (error) {
        console.log(error);
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadConnectWalletAutoError(error));
        if (error.code === 4902) {
            const eth = { ...window.ethereum };
            const web3 = new Web3(eth);
            // SWITCH NETWORK REQUEST
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: web3.utils.toHex(testNetwork.chainId),
                    },
                ],
            });
        }
    }

    // EVENT LISTNER ON ACCOUNT CHANGED
    window.ethereum.on("accountsChanged", handleAccountChanged);
    async function handleAccountChanged(accounts) {
        console.log(accounts.length);
        if (accounts.length <= 0)
            dispatch(loadConnectUserWallet(null, null, null));
        else {
            const tokenBalance = await getTokenBalance(accounts[0]);
            const chainId = await window.ethereum.request({
                method: "eth_chainId",
            });
            // CONNECT USER WALLET
            if (tokenBalance && chainId)
                dispatch(
                    loadConnectUserWallet(
                        accounts[0],
                        parseFloat(tokenBalance),
                        chainId
                    )
                );
        }
    }

    window.ethereum.on("chainChanged", (chainId) => {
        if (chainId) window.location.reload();
    });
}

// GET TOKEN BALANCE FROM CONTRACT ADDRESS
async function getTokenBalance(address) {
    const eth = { ...window.ethereum };
    const web3 = new Web3(eth);

    // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
    const tokenContract = new web3.eth.Contract(
        tokenABI,
        process.env.REACT_APP_FROYO_CONTRACT_ADDRESS
    );
    // GET TOKEN BALANCE
    const tokenBalance = web3.utils.fromWei(
        await tokenContract.methods.balanceOf(address).call()
    );
    return tokenBalance;
}
