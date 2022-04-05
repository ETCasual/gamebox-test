import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import IAPFroyoGemPacks from "Components/IAP/IAPItems/IAPFroyoGemPacks.component";
import IAPCardGemPacks from "Components/IAP/IAPItems/IAPCardGemPacks.component";
import PurchaseWrapper from "Components/IAP/IAPPurchasingStatus/PurchaseWrapper.component";
import PurchaseContent from "Components/IAP/IAPPurchasingStatus/PurchaseContent.component";
import CardPayment from "Components/IAP/CardMethod/CardPayment.component";

import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { loadConnectUserWallet } from "redux/thunks/Login.thunk";
import loadGemsList from "redux/thunks/GemsList.thunk";

import tokenABI from "Utils/TokenABI";

const Index = () => {
    const [stripePromise] = useState(
        loadStripe(process.env.REACT_APP_STRIPE_KEY)
    );

    const { user } = useSelector((state) => state.userData);
    const { blockchainNetworks } = useSelector(
        (state) => state.blockchainNetworks
    );
    const dispatch = useDispatch();

    const [productInfo, setProductInfo] = useState({
        id: null,
        price: null,
        quantity: null,
        tab: "froyo",
    });
    const [cardPaymentModal, setCardPaymentModal] = useState(false);
    const [purchasingStatusModal, setPurchasingStatusModal] = useState(false);
    const [purchasingStatus, setPurchasingStatus] = useState({
        noWallet: user.walletAddress ? false : true,
        beforePurchaseConfirmation: false,
        insufficentToken: false,
        processing: false,
        isSuccess: false,
        isFail: false,
    });

    // SET SELECTED TAB
    const handleSelectedTab = (tab) => {
        setProductInfo((prev) => ({ ...prev, tab }));
    };

    // SET SELECTED PRODUCT INFO &
    const handleSelectedGemPackPayment = (id, price, quantity) => {
        setProductInfo((prev) => ({ ...prev, id, price, quantity }));

        if (productInfo.tab === "froyo") {
            if (
                user?.walletAddress === null ||
                user?.walletAddress?.length <= 0
            ) {
                setPurchasingStatus({
                    beforePurchaseConfirmation: false,
                    insufficentToken: false,
                    processing: false,
                    isSuccess: false,
                    isFail: false,
                    noWallet: true,
                });
            } else if (user.walletAddress && user.tokenBalance < price) {
                setPurchasingStatus({
                    noWallet: false,
                    beforePurchaseConfirmation: false,
                    processing: false,
                    isSuccess: false,
                    isFail: false,
                    insufficentToken: true,
                });
            } else if (user.walletAddress && user.tokenBalance >= price) {
                setPurchasingStatus({
                    noWallet: false,
                    insufficentToken: false,
                    processing: false,
                    isSuccess: false,
                    isFail: false,
                    beforePurchaseConfirmation: true,
                });
            }
            setPurchasingStatusModal(true);
        } else if (productInfo.tab === "card") {
            setCardPaymentModal(true);
        }
    };

    const handleCardPaymentBackButton = () => {
        setCardPaymentModal(false);
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

        window.ethereum
            .request({
                method: "eth_chainId",
            })
            .then((chainId) => {
                if (parseInt(chainId)) {
                    const selectedNetwork = blockchainNetworks.filter(
                        (n) => n.chainId === parseInt(chainId)
                    );
                    if (selectedNetwork.length > 0) {
                        // Smart contract address for USDT in BSC testnet
                        const tokenContract = new web3.eth.Contract(
                            tokenABI,
                            selectedNetwork[0]?.systemTokenAddress
                        );

                        // Send tranfer function to receiver address
                        tokenContract.methods
                            .transfer(
                                selectedNetwork[0]?.prizeDistributorAddress,
                                web3.utils.toBN(
                                    web3.utils.toWei(
                                        productInfo?.price?.toString()
                                    )
                                )
                            )
                            .send({ from: user.walletAddress })
                            .on("sending", function (payload) {
                                console.log("sending", payload);
                                setPurchasingStatusModal(true);
                                setPurchasingStatus((prev) => ({
                                    ...prev,
                                    processing: true,
                                }));
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
                                        productInfo?.details?.price,
                                        selectedNetwork[0]?.id
                                    )
                                );
                            })
                            .on("receipt", function (receipt) {
                                console.log("receipt", receipt);
                                dispatch(loadGemsList());

                                let timeOutRef = null;
                                clearTimeout(timeOutRef);
                                timeOutRef = setTimeout(async () => {
                                    dispatch(loadUserDetails());

                                    const tokenBalance = web3.utils.fromWei(
                                        await tokenContract.methods
                                            .balanceOf(user.walletAddress)
                                            .call()
                                    );
                                    const chainId =
                                        await window.ethereum.request({
                                            method: "eth_chainId",
                                        });
                                    if (tokenBalance && chainId)
                                        dispatch(
                                            loadConnectUserWallet(
                                                "purchase_gems",
                                                user.walletAddress,
                                                parseFloat(tokenBalance),
                                                chainId
                                            )
                                        );
                                }, 1000);
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
                    }
                }
            })
            .catch((error) => console.log(error));
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
            <section id="iap-items">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                            <p className="title mb-4 ml-2 d-flex align-items-end">
                                Purchase Gems
                            </p>
                            {/* TABS */}
                            <ul className="list-unstyled mb-0 d-flex align-items-center justify-content-start tabs">
                                <li
                                    className={`${
                                        productInfo.tab === "froyo"
                                            ? "active"
                                            : ""
                                    } p-3 froyo`}
                                    onClick={() => handleSelectedTab("froyo")}
                                >
                                    Pay using Froyo Tokens
                                </li>
                                <li
                                    className={`${
                                        productInfo.tab === "card"
                                            ? "active"
                                            : ""
                                    } p-3 credit`}
                                    onClick={() => handleSelectedTab("card")}
                                >
                                    Pay using Credit Card
                                </li>
                            </ul>
                            <div className="gems-wrapper px-3 pt-3">
                                {/* FROYO TOKEN PAYMENT GEMS */}
                                {productInfo.tab === "froyo" && (
                                    <IAPFroyoGemPacks
                                        handleSelectedGemPackPayment={
                                            handleSelectedGemPackPayment
                                        }
                                    />
                                )}
                                {/* CREDIT/DEBIT CARD PAYMENT GEMS */}
                                {productInfo.tab === "card" && (
                                    <IAPCardGemPacks
                                        handleSelectedGemPackPayment={
                                            handleSelectedGemPackPayment
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {cardPaymentModal && (
                <Elements stripe={stripePromise}>
                    <CardPayment
                        productInfo={productInfo}
                        handleBackButton={handleCardPaymentBackButton}
                    />
                </Elements>
            )}

            {/* PURCHASING STATUS MODAL */}
            {purchasingStatusModal && (
                <PurchaseWrapper>
                    <PurchaseContent
                        type="froyo"
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
