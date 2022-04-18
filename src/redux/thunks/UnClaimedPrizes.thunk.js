import Web3 from "web3";
import prizeDistTokenABI from "Utils/PrizeDistributorABI";

import { GET_UNCLAIMED_PRIZES_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import loadClaimPrize from "redux/thunks/ClaimPrize.thunk";
import loadClaimedPrizes from "redux/thunks/ClaimedPrizes.thunk";
import {
    getNFTClaim,
    getUnclaimedPrizesList,
} from "redux/services/index.service";
import { getWeb3 } from "Utils/ConnectWallet";

export function loadUnClaimedPrizes() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getUnclaimedPrizesList(user)
            .then((data) => {
                dispatch({
                    type: GET_UNCLAIMED_PRIZES_LIST,
                    payload: data,
                });
            })
            .catch((error) => {
                if (error.code === 7) {
                    console.log(error.message);
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("UNCLAIMED PRIZES THUNK: No Result found!");
                else console.log(error);
            });
    };
}

export function loadNFTClaim(winnerId, prizeBlockchainNetwork, setLoader) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { blockchainNetworks } = getState()?.blockchainNetworks;

        const {web3} = await getWeb3();
        const chainId = await web3.eth.getChainId();

        // FIND THE PRIZE NETWORK INFO FROM LIST OF NETWORKS
        const selectedNetwork = blockchainNetworks.filter(
            (n) => n.id === prizeBlockchainNetwork
        );
        // IF USER IS ON WRONG NETWORK
        if (
            selectedNetwork.length > 0 &&
            parseInt(chainId) !== selectedNetwork[0].chainId
        ) {

            // CHANGE NETWORK TO PRIZE NETWORK
            try {
                // check if the chain to connect to is installed
                await web3.currentProvider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex(
                        selectedNetwork[0].chainId
                    ) }], // chainId must be in hexadecimal numbers
                });

            } catch (error) {

                if (error.code === 4902) {
                    try {
                        await web3.currentProvider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: web3.utils.toHex(
                                        selectedNetwork[0].chainId
                                    ),
                                    blockExplorerUrls: [
                                        selectedNetwork[0].blockExplorerUrl,
                                    ],
                                    chainName: selectedNetwork[0].networkName,        
                                    rpcUrl: [selectedNetwork[0].rpcUrl],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                } else {
                    console.error(error);
                }
            }
        } else {
            return getNFTClaim(winnerId, user.id, user.walletAddress)
                .then(async ({ address, tokenId, nonce, signature }) => {
                    // Smart contract address for USDT in BSC testnet
                    const tokenContract = new web3.eth.Contract(
                        prizeDistTokenABI,
                        selectedNetwork[0]?.prizeDistributorAddress
                    );

                    // Send tranfer function to receiver address
                    tokenContract.methods
                        .claimNFT(address, tokenId, nonce, signature)
                        .send({ from: user.walletAddress })
                        .on("sending", function (payload) {
                            console.log("sending", payload);
                        })
                        .on("sent", function (payload) {
                            console.log("payload", payload);
                        })
                        .on("transactionHash", function (hash) {
                            console.log("hash", hash);
                            dispatch(loadClaimPrize(winnerId, user.id, hash));
                        })
                        .on("receipt", function (receipt) {
                            console.log("receipt", receipt);
                            // FOR BACKEND TO CHECK IF THE BLOCK CHAIN TRANSCATION IS SUCCESSFUL
                            dispatch(loadClaimedPrizes());
                            dispatch(loadUnClaimedPrizes());
                        })
                        .on("error", function (error) {
                            console.log("error", error);
                            setLoader({ id: null, status: false });
                        });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                        dispatch({ type: LOG_OUT });
                        dispatch({
                            type: SHOW_TOAST,
                            payload: {
                                message: "Session Expired! Please login again.",
                            },
                        });
                    } else if (error.code === 13)
                        console.log("NFT CLAIM INFO THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}

export function loadTokenClaim(winnerId, prizeBlockchainNetwork, setLoader) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { blockchainNetworks } = getState()?.blockchainNetworks;

        const {web3} = await getWeb3();
        const chainId = await web3.eth.getChainId();

        // FIND THE PRIZE NETWORK INFO FROM LIST OF NETWORKS
        const selectedNetwork = blockchainNetworks.filter(
            (n) => n.id === prizeBlockchainNetwork
        );
        // IF USER IS ON WRONG NETWORK
        if (
            selectedNetwork.length > 0 &&
            parseInt(chainId) !== selectedNetwork[0].chainId
        ) {

            // CHANGE NETWORK TO PRIZE NETWORK
            try {
                // check if the chain to connect to is installed
                await web3.currentProvider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex(
                        selectedNetwork[0].chainId
                    ) }], // chainId must be in hexadecimal numbers
                });

            } catch (error) {

                if (error.code === 4902) {
                    try {
                        await web3.currentProvider.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: web3.utils.toHex(
                                        selectedNetwork[0].chainId
                                    ),
                                    blockExplorerUrls: [
                                        selectedNetwork[0].blockExplorerUrl,
                                    ],
                                    chainName: selectedNetwork[0].networkName,        
                                    rpcUrl: [selectedNetwork[0].rpcUrl],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(addError);
                    }
                } else {
                    console.error(error);
                }
            }
        } else {
            return getNFTClaim(winnerId, user.id, user.walletAddress)
                .then(async ({ address, tokenId, nonce, signature }) => {
                    // Smart contract address for USDT in BSC testnet
                    const tokenContract = new web3.eth.Contract(
                        prizeDistTokenABI,
                        selectedNetwork[0]?.prizeDistributorAddress
                    );

                    // Send tranfer function to receiver address
                    tokenContract.methods
                        .claimToken(address, tokenId, nonce, signature)
                        .send({ from: user.walletAddress })
                        .on("sending", function (payload) {
                            console.log("sending", payload);
                        })
                        .on("sent", function (payload) {
                            console.log("payload", payload);
                        })
                        .on("transactionHash", function (hash) {
                            console.log("hash", hash);
                            dispatch(loadClaimPrize(winnerId, user.id, hash));
                        })
                        .on("receipt", function (receipt) {
                            console.log("receipt", receipt);
                            setLoader({ id: null, status: false });
                            // FOR BACKEND TO CHECK IF THE BLOCK CHAIN TRANSCATION IS SUCCESSFUL
                            dispatch(loadClaimedPrizes());
                            dispatch(loadUnClaimedPrizes());
                        })
                        .on("error", function (error) {
                            console.log("error", error);
                            setLoader({ id: null, status: false });
                        });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                        dispatch({ type: LOG_OUT });
                        dispatch({
                            type: SHOW_TOAST,
                            payload: {
                                message: "Session Expired! Please login again.",
                            },
                        });
                    } else if (error.code === 13)
                        console.log("TOKEN CLAIM INFO THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
