import Web3 from "web3";
import { GET_UNCLAIMED_PRIZES_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import {
    getNFTClaim,
    getUnclaimedPrizesList,
} from "redux/services/index.service";
import loadClaimPrize from "redux/thunks/ClaimPrize.thunk";
import prizeDistTokenABI from "Utils/PrizeDistributorABI";

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

export function loadNFTClaim(winnerId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getNFTClaim(winnerId, user.id, user.walletAddress)
            .then(({ nftAddress, tokenId, nonce, signature }) => {
                const eth = { ...window.ethereum };
                const web3 = new Web3(eth);

                // Smart contract address for USDT in BSC testnet
                const tokenContract = new web3.eth.Contract(
                    prizeDistTokenABI,
                    process.env.REACT_APP_PRIZE_DISTRIBUTOR_ADDRESS
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
    };
}
