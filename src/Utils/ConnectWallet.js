import { loadLoginUserWallet, loadWalletError } from "redux/thunks/Login.thunk";
import { mainNetwork, testNetwork } from "Utils/Networks";
import Web3 from "web3";
import tokenABI from "./TokenABI";

export async function handleConnectWallet(dispatch) {
    if (!window.ethereum) {
        alert("Install Metamask!");
        return;
    }

    const web3 = new Web3(window.ethereum);

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            params:
                process.env.REACT_APP_NODE_ENV === "development"
                    ? [
                          {
                              ...testNetwork,
                          },
                      ]
                    : [
                          {
                              ...mainNetwork,
                          },
                      ],
        });
        if (accounts.length > 0) {
            const tokenContract = new web3.eth.Contract(
                tokenABI,
                process.env.REACT_APP_CONTRACT_ADDRESS
            );
            const tokenBalance = web3.utils.fromWei(
                await tokenContract.methods.balanceOf(accounts[0]).call()
            );

            if (tokenBalance !== null)
                dispatch(loadLoginUserWallet(accounts[0], tokenBalance));
        }
    } catch (error) {
        console.log(error);
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadWalletError(error));
    }

    window.ethereum.on("accountsChanged", handleAccountChanged);
    async function handleAccountChanged(accounts) {
        // ON DISCONNECT
        if (accounts.length <= 0) dispatch(loadLoginUserWallet(null));
        else {
            // ON SWITCH ACCOUNT
            const tokenContract = new web3.eth.Contract(
                tokenABI,
                process.env.REACT_APP_CONTRACT_ADDRESS
            );
            const tokenBalance = web3.utils.fromWei(
                await tokenContract.methods.balanceOf(accounts[0]).call()
            );
            if (tokenBalance !== null)
                dispatch(loadLoginUserWallet(accounts[0], tokenBalance));
        }
    }

    window.ethereum.on("disconnect", handleAccountDisconnect);
    async function handleAccountDisconnect(accounts) {
        if (accounts.length <= 0) dispatch(loadLoginUserWallet(null));
    }
}
