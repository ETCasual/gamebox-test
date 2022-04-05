import {
    loadConnectUserWallet,
    loadConnectWalletAutoError,
} from "redux/thunks/Login.thunk";
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
                parseInt(chainId) !== 97) ||
            (process.env.REACT_APP_NODE_ENV === "production" &&
                parseInt(chainId) !== 56)
        ) {
            // UPDATE STORE
            dispatch(
                loadConnectUserWallet(
                    "wrong_network",
                    null,
                    null,
                    "Wrong Network!"
                )
            );
            const error = { code: 4902, message: "Wrong Network" };
            throw error;
        } else {
            // IF WALLET ADDRESS IS AVAILABLE
            if (accounts.length > 0) {
                // GET TOKEN BALANCE
                const { tokenBalance, symbol } = await getTokenBalance(
                    accounts[0]
                );
                // UDPATE TO STORE
                if (tokenBalance)
                    dispatch(
                        loadConnectUserWallet(
                            "wallet_connected",
                            accounts[0],
                            parseFloat(tokenBalance),
                            parseInt(chainId),
                            symbol
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

            const chainId = await window.ethereum.request({
                method: "eth_chainId",
            });

            if (
                (process.env.REACT_APP_NODE_ENV === "development" &&
                    parseInt(chainId) !== 97) ||
                (process.env.REACT_APP_NODE_ENV === "production" &&
                    parseInt(chainId) !== 56)
            ) {
                const networks =
                    JSON.parse(sessionStorage.getItem("networks")) || [];
                const idx = networks.findIndex((n) =>
                    process.env.REACT_APP_NODE_ENV === "development"
                        ? n.chainId === 97
                        : n.chainId === 56
                );
                if (idx > -1) {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: web3.utils.toHex(
                                    networks[idx].chainId
                                ),
                                chainName: networks[idx].networkName,
                                rpcUrls: [networks[idx].rpcUrl],
                                blockExplorerUrls: [
                                    networks[idx].blockExplorerUrl,
                                ],
                            },
                        ],
                    });
                }
            }
        }
    }

    // EVENT LISTNER ON ACCOUNT CHANGED
    window.ethereum.on("accountsChanged", handleAccountChanged);
    async function handleAccountChanged(accounts) {
        if (accounts.length <= 0)
            dispatch(
                loadConnectUserWallet("wallet_disconnected", null, null, null)
            );
        else {
            const { tokenBalance, symbol } = await getTokenBalance(accounts[0]);
            const chainId = await window.ethereum.request({
                method: "eth_chainId",
            });
            // CONNECT USER WALLET
            if (tokenBalance && chainId)
                dispatch(
                    loadConnectUserWallet(
                        "wallet_connected",
                        accounts[0],
                        parseFloat(tokenBalance),
                        parseInt(chainId),
                        symbol
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

    const chainId = await window.ethereum.request({
        method: "eth_chainId",
    });

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const idx = networks.findIndex((n) => n.chainId === parseInt(chainId));

    // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
    const tokenContract = new web3.eth.Contract(
        tokenABI,
        networks[idx]?.systemTokenAddress
    );
    // GET TOKEN BALANCE
    const tokenBalance = web3.utils.fromWei(
        await tokenContract.methods.balanceOf(address).call()
    );
    const symbol = await tokenContract.methods.symbol().call();
    return { tokenBalance, symbol };
}
