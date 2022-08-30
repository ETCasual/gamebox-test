import {
    loadConnectUserWallet,
    loadConnectWalletAutoError,
} from "redux/thunks/Login.thunk";
import Web3 from "web3";
import tokenABI from "./TokenABI";
import nft721ABI from "./NFT721ABI";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SHOW_TOAST } from "redux/types";
import _ from "lodash";
// Check if any wallet is connected then connect
export async function handleConnectWallet(dispatch, bindWalletAddress) {
    const { web3, provider } = await getWeb3();
    if (!web3) return;

    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const isIncluded = networks.findIndex(
        (n) => n.chainId === parseInt(chainId)
    );
    try {
        // IF WALLET ADDRESS IS AVAILABLE AND SAME AS BIND WALLET ADDRESS
        if (
            accounts.length > 0 &&
            accounts[0].toLowerCase() === bindWalletAddress.toLowerCase()
        ) {
            if (isIncluded === -1) {
                dispatch(
                    loadConnectUserWallet(
                        "wrong_network",
                        accounts[0],
                        null,
                        "Wrong Network!"
                    )
                );
                const error = {
                    code: 4903,
                    message: "Connected network not supported",
                };
                throw error;
            } else {
                // GET TOKEN BALANCE
                const { tokenBalance, symbol } = await getTokenBalance(
                    accounts[0]
                );
                // UDPATE TO STORE
                if (accounts[0])
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
        } else {
            dispatch(
                loadConnectUserWallet(
                    "wrong_wallet",
                    accounts[0],
                    null,
                    "Wrong Wallet!"
                )
            );

            // Self defined error code
            const error = {
                code: 1001,
                message: "Wrong wallet connected",
                walletAddress: accounts[0],
            };
            throw error;
        }
    } catch (error) {
        if (error.code === -32002 || error.code === 4001)
            dispatch(loadConnectWalletAutoError(error));
        if (error.code === 1001) throw error;
        if (error.code === 4903) {
            const networks =
                JSON.parse(sessionStorage.getItem("networks")) || [];

            try {
                // check if the chain to connect to is installed
                await web3.currentProvider.request({
                    method: "wallet_switchEthereumChain",
                    params: [
                        { chainId: web3.utils.toHex(networks[0].chainId) },
                    ], // chainId must be in hexadecimal numbers
                });
            } catch (error) {
                // Already trigger, check metamask
                if (error.code === -32002) {
                    // UPDATE STORE
                    dispatch(
                        loadConnectUserWallet(
                            "check_metamask",
                            accounts[0],
                            null,
                            "Wrong Network!"
                        )
                    );

                    // This error code indicates that the chain has not been added to MetaMask
                    // if it is not, then install it into the user MetaMask
                } else if (error.code === 4902) {
                    try {
                        await web3.currentProvider.request({
                            method: "wallet_addEthereumChain",
                            params: [
                                {
                                    chainId: web3.utils.toHex(
                                        networks[0].chainId
                                    ),
                                    chainName: networks[0].networkName,
                                    nativeCurrency: {
                                        symbol: networks[0].currencySymbol,
                                        decimals: 18,
                                    },
                                    rpcUrls: [networks[0].rpcUrl],
                                    blockExplorerUrls: [
                                        networks[0].blockExplorerUrl,
                                    ],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.log(addError);
                    }
                } else {
                    console.error(error);
                }
            }
        }
    }

    const wallet = localStorage.getItem("wallet");
    if (wallet === "Metamask") {
        window.ethereum.on("accountsChanged", handleAccountChanged);
        window.ethereum.on("chainChanged", (chainId) => {
            if (chainId) window.location.reload();
        });
        window.ethereum.on("disconnect", (err) => {
            // localStorage.removeItem('wallet');
            dispatch(
                loadConnectUserWallet("wallet_disconnected", null, null, null)
            );
        });
    } else if (wallet === "WalletConnect") {
        provider.on("accountsChanged", handleAccountChanged);
        provider.on("chainChanged", (chainId) => {
            if (chainId) window.location.reload();
        });
        provider.on("disconnect", (code, reason) => {
            // localStorage.removeItem('wallet');
            dispatch(
                loadConnectUserWallet("wallet_disconnected", null, null, null)
            );
        });
    }

    // EVENT LISTNER ON ACCOUNT CHANGED
    async function handleAccountChanged(accounts) {
        if (accounts.length <= 0)
            dispatch(
                loadConnectUserWallet("wallet_disconnected", null, null, null)
            );
        else if (
            accounts[0].toLowerCase() !== bindWalletAddress.toLowerCase()
        ) {
            dispatch(loadConnectUserWallet("wrong_wallet", null, null, null));
        } else {
            const { tokenBalance, symbol } = await getTokenBalance(accounts[0]);
            const chainId = await web3.eth.getChainId();

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
}

export async function getWeb3() {
    const wallet = localStorage.getItem("wallet");

    let web3;
    let provider;
    if (wallet === "Metamask") {
        web3 = new Web3(window.ethereum);
    } else if (wallet === "WalletConnect") {
        const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
        const defChainId = networks[0]?.chainId;
        const rpcUrls = {};
        _.forEach(networks, (net) => {
            _.set(rpcUrls, net.chainId, net.rpcUrl);
        });

        provider = new WalletConnectProvider({
            rpc: rpcUrls,
            chainId: defChainId,
        });

        try {
            await provider.enable();
            web3 = new Web3(provider);
        } catch (err) {
            localStorage.removeItem("wallet");
            throw err;
        }
    }
    return { web3, provider };
}

// GET TOKEN BALANCE FROM CONTRACT ADDRESS
export async function getTokenBalance(address) {
    const { web3 } = await getWeb3();

    const chainId = await web3.eth.getChainId();

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const idx = networks.findIndex((n) => n.chainId === parseInt(chainId));

    if (networks[idx]?.systemTokenAddress) {
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
    return {};
}

export async function getNFTBalance(address) {
    const { web3 } = await getWeb3();

    const chainId = await web3.eth.getChainId();

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const idx = networks.findIndex((n) => n.chainId === parseInt(chainId));

    if (networks[idx]?.systemTokenAddress) {
        // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
        const tokenContract = new web3.eth.Contract(
            nft721ABI,
            process.env.REACT_APP_GAMEBOX_VIP_NFT_CONTRACT_ADDRESS
        );
        // GET NFT BALANCE
        const nftBalance = await tokenContract.methods
            .balanceOf(address)
            .call();
        const symbol = await tokenContract.methods.symbol().call();
        return { nftBalance, symbol };
    }
    return {};
}

export async function getNFTTokenIdList(address) {
    const { web3 } = await getWeb3();

    const chainId = await web3.eth.getChainId();

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const idx = networks.findIndex((n) => n.chainId === parseInt(chainId));

    let list = [];
    if (networks[idx]?.systemTokenAddress) {
        // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
        const tokenContract = new web3.eth.Contract(
            nft721ABI,
            process.env.REACT_APP_GAMEBOX_VIP_NFT_CONTRACT_ADDRESS
        );
        // GET NFT BALANCE
        const nftBalance = await tokenContract.methods
            .balanceOf(address)
            .call();

        if (nftBalance > 0) {
            for (let i = 1; i <= nftBalance; i++) {
                const nftTokenId = await tokenContract.methods
                    .tokenOfOwnerByIndex(address, i)
                    .call();

                if (nftTokenId) {
                    list.push(nftTokenId);
                }
            }
        }
    }
    return list;
}

export async function getVIPPassNFTMetadata(tokenId) {
    const { web3 } = await getWeb3();

    const chainId = await web3.eth.getChainId();

    const networks = JSON.parse(sessionStorage.getItem("networks")) || [];
    const idx = networks.findIndex((n) => n.chainId === parseInt(chainId));

    if (networks[idx]?.systemTokenAddress) {
        // IF CORRECT NETWORK ID THEN CONNECT TO CONTRACT
        const tokenContract = new web3.eth.Contract(
            nft721ABI,
            process.env.REACT_APP_GAMEBOX_VIP_NFT_CONTRACT_ADDRESS
        );
        // GET NFT METADATA
        const nftMetadata = await tokenContract.methods
            .tokenURI(tokenId)
            .call();
        return nftMetadata;
    }
    return {};
}

export async function handleMetamask(dispatch) {
    if (!window.web3) {
        dispatch({
            type: SHOW_TOAST,
            payload: {
                message: "Please install Metamask extension !",
            },
        });
        const error = {
            code: "Metamask extension not installed",
            message: "Metamask extension not installed",
        };
        throw error;
    } else {
        localStorage.setItem("wallet", "Metamask");
        await window.ethereum.enable();
    }
}

export async function handleWalletConnect() {
    localStorage.setItem("wallet", "WalletConnect");

    //  Create WalletConnect Provider
    await getWeb3();
}

export async function disconnectWallet() {
    const { web3 } = await getWeb3();

    if (typeof web3.currentProvider.disconnect === "function") {
        await web3.currentProvider.disconnect();
        localStorage.removeItem("walletconnect");
    }

    localStorage.removeItem("wallet");
}
