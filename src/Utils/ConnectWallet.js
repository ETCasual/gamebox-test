import { loadLoginUserWallet, loadWalletError } from "redux/thunks/Login.thunk";
import networks from "Utils/Networks";

export async function handleConnectWallet(dispatch) {
    if (!window.ethereum) {
        alert("Install Metamask!");
        return;
    }
    window.ethereum.on("accountsChanged", handleAccountChanged);
    function handleAccountChanged(accounts) {
        dispatch(loadLoginUserWallet(accounts[0]));
    }

    window.ethereum.on("disconnect", handleWalletDisconnected);
    function handleWalletDisconnected() {
        dispatch(loadLoginUserWallet(null));
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [
                {
                    ...networks["bsc"],
                },
            ],
        });
        dispatch(loadLoginUserWallet(accounts[0]));
    } catch (error) {
        console.log(error);
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadWalletError(error));
    }
}
