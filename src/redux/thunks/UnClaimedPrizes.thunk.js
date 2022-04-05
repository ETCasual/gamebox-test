import Web3 from "web3";
import prizeDistTokenABI from "Utils/PrizeDistributorABI";

import { GET_UNCLAIMED_PRIZES_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import loadClaimPrize from "redux/thunks/ClaimPrize.thunk";
import loadClaimedPrizes from "redux/thunks/ClaimedPrizes.thunk";
import {
    getNFTClaim,
    getUnclaimedPrizesList,
} from "redux/services/index.service";

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

export function loadNFTClaim(winnerId, prizeBlockchainNetwork) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { blockchainNetworks } = getState()?.blockchainNetworks;

        const eth = { ...window.ethereum };
        const web3 = new Web3(eth);

        // GET CURRENT NETWORK CHAIN ID
        const chainId = await window.ethereum.request({
            method: "eth_chainId",
        });

        // FIND THE PRIZE NETWORK INFO FROM LIST OF NETWORKS
        const selectedNetwork = blockchainNetworks.filter(
            (n) => n.id === prizeBlockchainNetwork
        );
        // IF USER IS ON WRONG NETWORK
        if (
            selectedNetwork.length > 0 &&
            parseInt(chainId) !== selectedNetwork[0].chainId
        ) {
            window.ethereum.on("chainChanged", (chainId) => {
                if (chainId) window.location.reload();
            });

            // ADD NETWORK REQUEST
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: web3.utils.toHex(selectedNetwork[0].chainId),
                        blockExplorerUrls: [
                            selectedNetwork[0].blockExplorerUrl,
                        ],
                        chainName: selectedNetwork[0].networkName,
                        rpcUrls: [selectedNetwork[0].rpcUrl],
                    },
                ],
            });
        } else {
            return getNFTClaim(winnerId, user.id, user.walletAddress)
                .then(async ({ nftAddress, tokenId, nonce, signature }) => {
                    // Smart contract address for USDT in BSC testnet
                    const tokenContract = new web3.eth.Contract(
                        prizeDistTokenABI,
                        selectedNetwork[0]?.prizeDistributorAddress
                    );

                    // Send tranfer function to receiver address
                    tokenContract.methods
                        .claimNFT(nftAddress, tokenId, nonce, signature)
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
