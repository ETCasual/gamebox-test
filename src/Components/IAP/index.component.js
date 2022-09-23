import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";

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
import { getTokenBalance, getWeb3 } from "Utils/ConnectWallet";

import ConnectWallet from "Components/Global/ConnectWallet.component";
import { useTranslation } from "react-i18next";

const Index = () => {
    const [stripePromise] = useState(
        loadStripe(process.env.REACT_APP_STRIPE_KEY)
    );
    const fundAddress = process.env.REACT_APP_FUND_WALLET_ADDRESS;
    const history = useHistory();

    const { user } = useSelector((state) => state.userData);
    const { blockchainNetworks } = useSelector(
        (state) => state.blockchainNetworks
    );
    const [selectWalletModalShown, setSelectWalletModalShown] = useState(false);
    const [invalidWalletModalShown, setInvalidWalletModalShown] =
        useState(false);
    const dispatch = useDispatch();

    const [productInfo, setProductInfo] = useState({
        id: null,
        price: null,
        quantity: null,
        tab: "froyo",
    });
    // const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);
    const [cardPaymentModal, setCardPaymentModal] = useState(false);
    const [purchasingStatusModal, setPurchasingStatusModal] = useState(false);
    const [purchasingStatus, setPurchasingStatus] = useState({
        noWallet: user.walletAddress ? false : true,
        before_purchase_confirmation: false,
        insufficent_token: false,
        processing: false,
        is_success: false,
        is_fail: false,
        process_fail: false,
    });
    const [purchaseInfo, setPurchaseInfo] = useState({});
    const purchaseStatusRef = useRef({
        sendFail: false,
        receiptReceive: false,
    });

    const handleWallet = async () => {
        setSelectWalletModalShown(true);
        // await handleConnectWallet(dispatch, blockchainNetworks);
    };

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
                setPurchasingStatus((prev) => ({
                    ...prev,
                    before_purchase_confirmation: false,
                    insufficent_token: false,
                    processing: false,
                    is_success: false,
                    is_fail: false,
                    noWallet: true,
                }));
            } else if (user.walletAddress && user.tokenBalance < price) {
                setPurchasingStatus((prev) => ({
                    ...prev,
                    noWallet: false,
                    before_purchase_confirmation: false,
                    processing: false,
                    is_success: false,
                    is_fail: false,
                    insufficent_token: true,
                }));
            } else if (user.walletAddress && user.tokenBalance >= price) {
                setPurchasingStatus((prev) => ({
                    ...prev,
                    noWallet: false,
                    insufficent_token: false,
                    processing: false,
                    is_success: false,
                    is_fail: false,
                    before_purchase_confirmation: true,
                }));
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
        setPurchasingStatus((prev) => ({
            ...prev,
            noWallet: false,
            before_purchase_confirmation: false,
            insufficent_token: false,
            processing: false,
            is_success: false,
            is_fail: false,
        }));
    };

    // OPEN METAMASK
    const openMetaMaskForPurchase = async () => {
        const { web3 } = await getWeb3();

        const chainId = await web3.eth.getChainId();
        if (chainId) {
            const selectedNetwork = blockchainNetworks.filter(
                (n) => n.chainId === parseInt(chainId)
            );
            if (
                selectedNetwork.length > 0 &&
                selectedNetwork[0]?.systemTokenAddress
            ) {
                // Smart contract address for USDT in BSC testnet
                const tokenContract = new web3.eth.Contract(
                    tokenABI,
                    selectedNetwork[0]?.systemTokenAddress
                );

                // Send tranfer function to receiver address
                tokenContract.methods
                    .transfer(
                        fundAddress,
                        web3.utils.toBN(
                            web3.utils.toWei(productInfo?.price?.toString())
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
                        purchaseStatusRef.current = {
                            ...purchaseStatusRef.current,
                            sendFail: false,
                            receiptReceive: false,
                        };
                    })
                    .on("sent", function (payload) {
                        console.log("payload", payload);
                    })
                    .on("transactionHash", function (hash) {
                        console.log("hash", hash);

                        setPurchaseInfo({
                            trxHash: hash,
                            itemTypeId: 201,
                            itemId: productInfo?.id,
                            itemPrice: productInfo?.price,
                            blockchainNetwork: selectedNetwork[0]?.id,
                        });

                        dispatch(
                            loadIAPurchaseRequest(
                                hash,
                                201,
                                productInfo?.id,
                                productInfo?.price,
                                selectedNetwork[0]?.id
                            )
                        ).catch((e) => {
                            setPurchasingStatus((prev) => ({
                                ...prev,
                                processing: false,
                                process_fail: true,
                            }));

                            purchaseStatusRef.current = {
                                ...purchaseStatusRef.current,
                                sendFail: true,
                            };
                        });
                    })
                    .on("receipt", function (receipt) {
                        console.log("receipt", receipt);
                        purchaseStatusRef.current = {
                            ...purchaseStatusRef.current,
                            receiptReceive: true,
                        };

                        // If still processing or fail to send to server
                        if (!purchaseStatusRef.current.sendFail) {
                            setPurchasingStatus((prev) => ({
                                ...prev,
                                processing: false,
                                is_success: true,
                            }));

                            dispatch(loadGemsList());

                            let timeOutRef = null;
                            clearTimeout(timeOutRef);
                            timeOutRef = setTimeout(async () => {
                                dispatch(loadUserDetails());

                                const { tokenBalance, symbol } =
                                    await getTokenBalance(user.walletAddress);
                                const chainId = await web3.eth.getChainId();
                                if (tokenBalance && chainId)
                                    dispatch(
                                        loadConnectUserWallet(
                                            "purchase_gems",
                                            user.walletAddress,
                                            parseFloat(tokenBalance),
                                            chainId,
                                            symbol
                                        )
                                    );
                            }, 1000);
                        }
                    })
                    .on("error", function (error) {
                        console.log("error", error);
                        setPurchasingStatusModal(true);
                        setPurchasingStatus((prev) => ({
                            ...prev,
                            processing: false,
                            is_fail: true,
                        }));
                    });
            }
        }
    };

    // PROCESS CONFIRM ACTION
    const handleConfirmAction = async () => {
        handleModalCloseButton();

        if (purchasingStatus.noWallet) {
            setPurchasingStatus((prev) => ({ ...prev, noWallet: false }));
            await handleWallet();
        } else if (purchasingStatus.before_purchase_confirmation) {
            setPurchasingStatus((prev) => ({
                ...prev,
                before_purchase_confirmation: false,
            }));
            await openMetaMaskForPurchase();
        } else if (purchasingStatus.insufficent_token) {
            setPurchasingStatus((prev) => ({
                ...prev,
                insufficent_token: false,
            }));
        } else if (purchasingStatus.is_fail) {
            setPurchasingStatus((prev) => ({
                ...prev,
                is_fail: false,
            }));
        } else if (purchasingStatus.is_success) {
            // Do Nothing
        } else if (purchasingStatus.process_fail) {
            sendPurchaseInfo();
        }
    };

    const sendPurchaseInfo = () => {
        setPurchasingStatusModal(true);
        setPurchasingStatus((prev) => ({
            ...prev,
            processing: true,
        }));

        dispatch(
            loadIAPurchaseRequest(
                purchaseInfo?.trxHash,
                purchaseInfo?.itemTypeId,
                purchaseInfo?.itemId,
                purchaseInfo?.itemPrice,
                purchaseInfo?.blockchainNetwork
            )
        )
            .then((res) => {
                setPurchasingStatus((prev) => ({
                    ...prev,
                    process_fail: false,
                }));
                purchaseStatusRef.current = {
                    ...purchaseStatusRef.current,
                    sendFail: false,
                };

                if (purchaseStatusRef.current.receiptReceive) {
                    setPurchasingStatus((prev) => ({
                        ...prev,
                        processing: false,
                        is_success: true,
                    }));

                    dispatch(loadGemsList());

                    let timeOutRef = null;
                    clearTimeout(timeOutRef);
                    timeOutRef = setTimeout(async () => {
                        const { web3 } = await getWeb3();

                        dispatch(loadUserDetails());

                        const { tokenBalance, symbol } = await getTokenBalance(
                            user.walletAddress
                        );
                        const chainId = await web3.eth.getChainId();
                        if (tokenBalance && chainId)
                            dispatch(
                                loadConnectUserWallet(
                                    "purchase_gems",
                                    user.walletAddress,
                                    parseFloat(tokenBalance),
                                    chainId,
                                    symbol
                                )
                            );
                    }, 1000);
                }
            })
            .catch((e) => {
                setPurchasingStatus((prev) => ({
                    ...prev,
                    process_fail: true,
                    processing: false,
                }));

                purchaseStatusRef.current = {
                    ...purchaseStatusRef.current,
                    sendFail: true,
                };
            });
    };

    const { t } = useTranslation();

    return (
        <>
            <section id="iap-items">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-9">
                            {/* BACK BUTTON */}
                            {(history.location?.state?.prevPath.includes(
                                "premium".toLowerCase()
                            ) ||
                                history.location?.state?.prevPath.includes(
                                    "featured".toLowerCase()
                                )) && (
                                <div className="d-flex align-items-center back-button mb-3 mb-md-4 px-3">
                                    <div
                                        className="d-flex align-items-center"
                                        onClick={history.goBack}
                                    >
                                        <img
                                            src={`${window.cdn}buttons/button_back.png`}
                                            alt="back-btn"
                                        />
                                        <span className="ml-2">
                                            {t("btn.back")}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <p className="title mb-4 d-flex align-items-center">
                                <span className="w-100">
                                    {t("iap.purchase.title")}
                                </span>
                            </p>
                            {/* BUY FROYO */}
                            <div className="right-items w-100 d-flex align-items-center justify-content-end float-lg-right">
                                <ul className="list-unstyled mb-0 d-flex align-items-center providers">
                                    <li className="text-white-50 pl-2">
                                        {t("iap.purchase.cta")}
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.btse.com/en/otc"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button>
                                                <img
                                                    src={`${window.cdn}external_provider/btse-icon.svg`}
                                                    alt="btse"
                                                    title="BTSE"
                                                ></img>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.bkex.com/trade/FROYO_USDT"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button>
                                                <img
                                                    src={`${window.cdn}external_provider/bkex-icon.svg`}
                                                    alt="bkex"
                                                    title="BKEX"
                                                ></img>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://pancakeswap.finance/swap?inputCurrency=bnb&outputCurrency=0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button>
                                                <img
                                                    src={`${window.cdn}external_provider/pancake-icon.svg`}
                                                    alt="pancake"
                                                    title="PancakeSwap"
                                                ></img>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://apeswap.finance/swap?inputCurrency=bnb&outputCurrency=0xe369fec23380f9F14ffD07a1DC4b7c1a9fdD81c9"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button>
                                                <img
                                                    src={`${window.cdn}external_provider/apeswap-icon.svg`}
                                                    alt="ape"
                                                    title="ApeSwap"
                                                ></img>
                                            </button>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0xcf0BCf85082e3CFE591bd2451Bc4B46faa34c7De"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button>
                                                <img
                                                    src={`${window.cdn}external_provider/sushi-icon.svg`}
                                                    alt="sushi"
                                                    title="Sushi"
                                                ></img>
                                            </button>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* TABS */}
                            <>
                                <ul className="list-unstyled mb-0 d-flex align-items-center justify-content-start tabs">
                                    <li
                                        className={`${
                                            productInfo.tab === "froyo"
                                                ? "active"
                                                : ""
                                        } p-3 froyo`}
                                        onClick={() =>
                                            handleSelectedTab("froyo")
                                        }
                                    >
                                        {t("iap.purchase.pay_with_token")}
                                    </li>
                                    <li
                                        className={`${
                                            productInfo.tab === "card"
                                                ? "active"
                                                : ""
                                        } p-3 credit`}
                                        onClick={() =>
                                            handleSelectedTab("card")
                                        }
                                    >
                                        {t("iap.purchase.pay_with_card")}
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
                            </>

                            {/* {hideGemsOnMobile && (
                                <div className="mobile-note-gems d-flex flex-column align-items-center justify-content-center text-center">
                                    <p className="mb-2 note-title">
                                        Purchases are not available for mobile
                                        browsers currently.
                                    </p>
                                    <p className="note-subtitle">
                                        Connect your wallet through your computer
                                        browser to purchase.
                                    </p>
                                </div>
                            )} */}
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
            <ConnectWallet
                selectWalletModalShown={selectWalletModalShown}
                setSelectWalletModalShown={setSelectWalletModalShown}
                invalidWalletModalShown={invalidWalletModalShown}
                setInvalidWalletModalShown={setInvalidWalletModalShown}
            />
        </>
    );
};

export default Index;
