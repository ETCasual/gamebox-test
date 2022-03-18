import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import IAPItems from "Components/IAP/IAPItems/IAPItems.component";
import PurchaseWrapper from "Components/IAP/IAPPurchasingStatus/PurchaseWrapper.component";
import PurchaseContent from "Components/IAP/IAPPurchasingStatus/PurchaseContent.component";

import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";

import tokenABI from "Utils/TokenABI";
import { loadLoginUserWallet } from "redux/thunks/Login.thunk";

const Index = () => {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [productInfo, setProductInfo] = useState(null);

    const [modalStatus, setModalStatus] = useState(false);

    const [purchasingStatus, setPurchasingStatus] = useState({
        noWallet: user.walletAddress ? false : true,
        beforePurchaseConfirmation: false,
        insufficentToken: false,
        processing: false,
        isSuccess: false,
        isFail: false,
    });

    // PAYMENT
    const handleGemsPaymentPanel = (id, price, quantity) => {
        // OPEN MODAL
        setModalStatus(true);

        // SETTING PRODUCT STATE
        setProductInfo({
            id,
            price,
            quantity,
        });

        if (!user.walletAddress) {
            setPurchasingStatus((prev) => ({ ...prev, noWallet: true }));
            return;
        } else if (user.walletAddress && user.tokenBalance < price) {
            setPurchasingStatus((prev) => ({
                ...prev,
                insufficentToken: true,
            }));
        } else if (user.walletAddress && user.tokenBalance >= price) {
            setPurchasingStatus((prev) => ({
                ...prev,
                beforePurchaseConfirmation: true,
            }));
        }
    };
    const handleModalCloseButton = () => {
        setModalStatus(false);
        setPurchasingStatus({
            noWallet: false,
            beforePurchaseConfirmation: false,
            insufficentToken: false,
            processing: false,
            isSuccess: false,
            isFail: false,
        });
    };

    // OPEN METAMASK
    const openMetaMaskForPurchase = () => {
        const web3 = new Web3(window.ethereum);

        // Smart contract address for USDT in BSC testnet
        const tokenContract = new web3.eth.Contract(
            tokenABI,
            process.env.REACT_APP_FROYO_CONTRACT_ADDRESS
        );

        // Send tranfer function to receiver address
        tokenContract.methods
            .transfer(
                process.env.REACT_APP_PRIZE_DISTRIBUTOR_ADDRESS,
                web3.utils.toBN(
                    web3.utils.toWei(productInfo?.price?.toString())
                )
            )
            .send({ from: user.walletAddress })
            .on("sending", function (payload) {
                console.log("sending", payload);
                setModalStatus(true);
                setPurchasingStatus((prev) => ({ ...prev, processing: true }));
            })
            .on("sent", function (payload) {
                console.log("payload", payload);
            })
            .on("transactionHash", function (hash) {
                console.log("hash", hash);
                setModalStatus(true);
                setPurchasingStatus((prev) => ({
                    ...prev,
                    processing: false,
                    isSuccess: true,
                }));
                dispatch(
                    loadIAPurchaseRequest(
                        hash,
                        201,
                        productInfo?.id,
                        productInfo?.details?.price
                    )
                );
                setTimeout(async () => {
                    dispatch(loadUserDetails());
                    const tokenBalance = web3.utils.fromWei(
                        await tokenContract.methods
                            .balanceOf(user.walletAddress)
                            .call()
                    );
                    if (tokenBalance !== null)
                        dispatch(
                            loadLoginUserWallet(
                                user.walletAddress,
                                parseFloat(tokenBalance)
                            )
                        );
                }, 1000);
            })
            .on("receipt", function (receipt) {
                console.log("receipt", receipt);
            })
            .on("error", function (error) {
                console.log("error", error);
                setModalStatus(true);
                setPurchasingStatus((prev) => ({
                    ...prev,
                    processing: false,
                    isFail: true,
                }));
            });

        // setTimeout(function () {
        //     if (tokenPaymentProcess.haveGems) {
        //         handleModalCloseButton();
        //         setTokenPaymentProcess((prev) => ({
        //             ...prev,
        //             isSuccess: false,
        //             // isSuccess: false,
        //             panel2: true,
        //         }));
        //     } else if (tokenPaymentProcess.insufficent) {
        //         handleModalCloseButton();
        //     }
        // }, 5000);
    };

    // PROCESS CONFIRM ACTION
    const handleConfirmAction = () => {
        handleModalCloseButton();

        if (purchasingStatus.noWallet) {
            setPurchasingStatus((prev) => ({ ...prev, noWallet: false }));
        } else if (purchasingStatus.beforePurchaseConfirmation) {
            setPurchasingStatus((prev) => ({
                ...prev,
                beforePurchaseConfirmation: false,
            }));
            openMetaMaskForPurchase();
        } else if (purchasingStatus.insufficentToken) {
            setPurchasingStatus((prev) => ({
                ...prev,
                insufficentToken: false,
            }));
        } else if (purchasingStatus.isFail) {
            setPurchasingStatus((prev) => ({
                ...prev,
                isFail: false,
            }));
        } else if (purchasingStatus.isSuccess) {
            user.gems += productInfo?.quantity;
        }
    };

    return (
        <>
            {/* SUBSCRIPTION & GEMS */}
            <IAPItems handleGemsPaymentPanel={handleGemsPaymentPanel} />

            {/* PURCHASING STATUS MODAL */}
            {modalStatus && (
                <PurchaseWrapper>
                    <PurchaseContent
                        productInfo={productInfo}
                        purchasingStatus={purchasingStatus}
                        handleModalCloseButton={handleModalCloseButton}
                        handleConfirmAction={handleConfirmAction}
                    />
                </PurchaseWrapper>
            )}
        </>
    );
};

export default Index;
