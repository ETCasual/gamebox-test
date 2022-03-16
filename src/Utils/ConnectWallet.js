import { loadLoginUserWallet, loadWalletError } from "redux/thunks/Login.thunk";
import { mainNetwork, testNetwork } from "Utils/Networks";
import Web3 from "web3";

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
        const weiAmount = await web3.eth.getBalance(accounts[0]);
        const etherAmount = web3.utils.fromWei(weiAmount);

        if (etherAmount !== null)
            dispatch(loadLoginUserWallet(accounts[0], etherAmount));
    } catch (error) {
        console.log(error);
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadWalletError(error));
    }

    window.ethereum.on("accountsChanged", handleAccountChanged);
    async function handleAccountChanged(accounts) {
        // ON DISCONNECT
        if (accounts.length <= 0) {
            dispatch(loadLoginUserWallet(null));
        } else {
            // ON SWITCH ACCOUNT
            const weiAmount = await web3.eth.getBalance(accounts[0]);
            const etherAmount = web3.utils.fromWei(weiAmount);
            if (etherAmount !== null)
                dispatch(loadLoginUserWallet(accounts[0], etherAmount));
        }
    }
}
