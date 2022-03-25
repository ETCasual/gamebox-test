import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";

import IAPItems from "Components/IAP/IAPItems/IAPItems.component";
import PurchaseWrapper from "Components/IAP/IAPPurchasingStatus/PurchaseWrapper.component";
import PurchaseContent from "Components/IAP/IAPPurchasingStatus/PurchaseContent.component";
// import IAPPaymentTypeModal from "Components/IAP/IAPPaymentTypeModal/IAPPaymentTypeModal.component";
// import CardPayment from "Components/IAP/CardMethod/CardPayment.component";

import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { loadConnectUserWallet } from "redux/thunks/Login.thunk";

import tokenABI from "Utils/TokenABI";

const Index = () => {
    // const [stripePromise] = useState(
    //     loadStripe(process.env.REACT_APP_STRIPE_KEY)
    // );

    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [productInfo, setProductInfo] = useState({
        id: null,
        price: null,
        quantity: null,
    });

    // const [paymentTypeModal, setPaymentTypeModal] = useState(false);
    // const [cardPaymentModal, setCardPaymentModal] = useState(false);
    const [purchasingStatusModal, setPurchasingStatusModal] = useState(false);
    const [purchasingStatus, setPurchasingStatus] = useState({
        noWallet: user.walletAddress ? false : true,
        beforePurchaseConfirmation: false,
        insufficentToken: false,
        processing: false,
        isSuccess: false,
        isFail: false,
    });

    const handleFroyoPurchasingStatus = () => {
        // setPaymentTypeModal(false);
        setPurchasingStatusModal(true);
        console.log(user.walletAddress)
        if (user.walletAddress.length <= 0) {
            setPurchasingStatus((prev) => ({ ...prev, noWallet: true }));
            return;
        } else if (
            user.walletAddress &&
            user.tokenBalance < productInfo.price
        ) {
            setPurchasingStatus((prev) => ({
                ...prev,
                insufficentToken: true,
            }));
        } else if (
            user.walletAddress &&
            user.tokenBalance >= productInfo.price
        ) {
            setPurchasingStatus((prev) => ({
                ...prev,
                beforePurchaseConfirmation: true,
            }));
        }
    };

    // const handleCardPaymentModal = () => {
    //     setPaymentTypeModal(false);
    //     setCardPaymentModal(true);
    // };

    // OPEN PAYMENT TYPE MODA AND SET SELECTED PRODUCT INFO INTO STATE
    const handleSelectedGemPackPayment = (id, price, quantity) => {
        // setPaymentTypeModal(true);
        setProductInfo({
            id,
            price,
            quantity,
        });
        handleFroyoPurchasingStatus();
    };

    const handleModalCloseButton = () => {
        setPurchasingStatusModal(false);
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
        const eth = { ...window.ethereum };
        const web3 = new Web3(eth);

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
                setPurchasingStatusModal(true);
                setPurchasingStatus((prev) => ({ ...prev, processing: true }));
            })
            .on("sent", function (payload) {
                console.log("payload", payload);
            })
            .on("transactionHash", function (hash) {
                console.log("hash", hash);
                setPurchasingStatusModal(true);
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
                    const chainId = await window.ethereum.request({
                        method: "eth_chainId",
                    });
                    if (tokenBalance && chainId)
                        dispatch(
                            loadConnectUserWallet(
                                user.walletAddress,
                                parseFloat(tokenBalance),
                                chainId
                            )
                        );
                }, 1000);
            })
            .on("receipt", function (receipt) {
                console.log("receipt", receipt);
            })
            .on("error", function (error) {
                console.log("error", error);
                setPurchasingStatusModal(true);
                setPurchasingStatus((prev) => ({
                    ...prev,
                    processing: false,
                    isFail: true,
                }));
            });
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
            <IAPItems
                handleSelectedGemPackPayment={handleSelectedGemPackPayment}
            />

            {/* PAYMENT METHOD SELECTION MODAL */}
            {/* {paymentTypeModal && (
                <IAPPaymentTypeModal
                    handleFroyoPurchasingStatus={handleFroyoPurchasingStatus}
                    handleCardPaymentModal={handleCardPaymentModal}
                />
            )} */}

            {/* {cardPaymentModal && (
                <Elements stripe={stripePromise}>
                    <CardPayment
                        productInfo={productInfo}
                        // handleBackButton={handlePaymentBackButton}
                    />
                </Elements>
            )} */}

            {/* PURCHASING STATUS MODAL */}
            {purchasingStatusModal && (
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
