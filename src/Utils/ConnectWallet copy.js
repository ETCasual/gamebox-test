import {
    loadConnectUserWallet,
    loadConnectWalletAutoError,
} from "redux/thunks/Login.thunk";
import { UPDATE_USER_WALLET } from "redux/types";
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
        // REQUEST TO METAMASK TO CONNECT WALLET
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        // GET NETWROK ID
        const networkId = await web3.eth.net.getId();

        // IF NETWORK ID DO NOT MATCH PROMPT USER "WRONG NETWORK"
        if (
            (process.env.REACT_APP_NODE_ENV === "development" &&
                networkId !== testNetwork.networkId) ||
            (process.env.REACT_APP_NODE_ENV === "production" &&
                networkId !== mainNetwork.networkId)
        ) {
            // UPDATE STORE
            dispatch({
                type: UPDATE_USER_WALLET,
                payload: {
                    walletAddress: null,
                    walletAmount: null,
                    networkId: "Wrong Network!",
                },
            });
            // SHOW TOAST FOR WRONG NETWORK & STOP EXECUTION
            dispatch({
                type: "SHOW_TOAST",
                payload: {
                    message: "Wrong Network!",
                },
            });
            const error = { code: 4902, message: "Wrong Network" };
            throw error;
        }
        // IF WALLET ADDRESS IS AVAILABLE
        if (accounts.length > 0) {
            // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
            const tokenContract = new web3.eth.Contract(
                tokenABI,
                process.env.REACT_APP_FROYO_CONTRACT_ADDRESS
            );
            // GET TOKEN BALANCE
            const tokenBalance = web3.utils.fromWei(
                await tokenContract.methods.balanceOf(accounts[0]).call()
            );
            // CONNECT USER WALLET
            if (tokenBalance !== null)
                dispatch(
                    loadConnectUserWallet(
                        accounts[0],
                        parseFloat(tokenBalance),
                        networkId
                    )
                );
        }
    } catch (error) {
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadConnectWalletAutoError(error));
        else if (error.code === 4902) {
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
        console.log('object');
        // ON WALLET DISCONNECT
        if (accounts.length <= 0)
            dispatch(loadConnectUserWallet(null, null, null));

        // ON SWITCH ACCOUNT
        else {
            // GET NETWROK ID
            const networkId = await web3.eth.net.getId();

            // IF NETWORK ID DO NOT MATCH PROMPT USER "WRONG NETWORK"
            if (
                (process.env.REACT_APP_NODE_ENV === "development" &&
                    networkId !== testNetwork.networkId) ||
                (process.env.REACT_APP_NODE_ENV === "production" &&
                    networkId !== mainNetwork.networkId)
            ) {
                // UPDATE STORE
                dispatch({
                    type: UPDATE_USER_WALLET,
                    payload: {
                        walletAddress: null,
                        walletAmount: null,
                        networkId: "Wrong Network!",
                    },
                });
                // SHOW TOAST FOR WRONG NETWORK & STOP EXECUTION
                dispatch({
                    type: "SHOW_TOAST",
                    payload: {
                        message: "Wrong Network!",
                    },
                });
                return;
            }

            // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
            const tokenContract = new web3.eth.Contract(
                tokenABI,
                process.env.REACT_APP_FROYO_CONTRACT_ADDRESS
            );
            // GET TOKEN BALANCE
            const tokenBalance = web3.utils.fromWei(
                await tokenContract.methods.balanceOf(accounts[0]).call()
            );
            // CONNECT USER WALLET
            if (tokenBalance !== null)
                dispatch(
                    loadConnectUserWallet(
                        accounts[0],
                        parseFloat(tokenBalance),
                        networkId
                    )
                );
        }
    }

    // EVENT LISTNER ON WALLET DISCOUNTED
    window.ethereum.on("disconnect", handleAccountDisconnect);
    async function handleAccountDisconnect(accounts) {
        if (accounts.length <= 0)
            dispatch(loadConnectUserWallet(null, null, null));
    }
}
