// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// COMPONENTS
import CancelSubModal from "Components/Modals/CancelSub.modal";
import SubscriptionButtonLoader from "Components/Loader/SubscriptionButton.loader";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadGemsList from "redux/thunks/GemsList.thunk";
import {
    loadSubscriptionList,
    loadReActivateSubscription,
} from "redux/thunks/Subscription.thunk";

// HELPER FUNCTIONS
import { subTypeDict } from "Utils/Enums";
import {
    findActiveSubscription,
    reActivateSubscription,
} from "Utils/SubscriptionHandlers";

const IAP = ({ handleGemsPaymentPanel, handleSubscriptionPaymentPanel }) => {
    const { user } = useSelector((state) => state.userData);
    const { gemsList } = useSelector((state) => state.gemsList);
    const { subscription } = useSelector((state) => state.subscription);
    const { ipInfo, exchangeRate } = useSelector((state) => state.exchangeRate);
    const dispatch = useDispatch();

    const [gemList, setGemList] = useState([]);
    const [subscriptionListData, setSubscriptionListData] = useState([]);

    const [isCheckingSub, setIsCheckingSub] = useState(true);
    const [isSubActive, setIsSubActive] = useState(false);
    const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);

    // ON RELOAD
    useEffect(() => {
        if (
            performance.getEntriesByType("navigation")[0] &&
            performance.getEntriesByType("navigation")[0].type === "reload"
        ) {
            if (user.id > 0) {
                dispatch(loadGemsList());
                dispatch(loadSubscriptionList());
            }
        }
    }, [dispatch, user.id]);

    // GEMS
    useEffect(() => {
        setGemList(_.orderBy(gemsList, ["id"], ["asc"]));
    }, [gemsList]);

    // SUBSCRIPTION
    useEffect(() => {
        setSubscriptionListData(subscription);
    }, [subscription]);

    // ACTIVE SUBSCRIPTION
    useEffect(() => {
        setIsCheckingSub(true);
        if (user?.subId?.length > 0) handleFindActiveSubscription();
        else {
            setIsCheckingSub(false);
            setIsSubActive(false);
            setCancelAtPeriodEnd(false);
        }

        async function handleFindActiveSubscription() {
            const activeSub = await findActiveSubscription(user?.subId);
            if (activeSub) {
                setIsCheckingSub(false);
                setIsSubActive(activeSub?.status === "active" ? true : false);
                setCancelAtPeriodEnd(activeSub?.cancel_at_period_end);
            }
        }
    }, [user.subId]);

    const handleSubscriptionCancellation = () => {
        setCancelModal(true);
    };

    const handleSubscriptionActivation = async () => {
        setIsCheckingSub(true);
        const reActivateData = await reActivateSubscription(user?.subId);
        if (reActivateData) {
            setIsCheckingSub(false);
            setIsSubActive(true);
            setCancelAtPeriodEnd(false);
            await loadReActivateSubscription(user, dispatch);
        }
    };

    const checkIfSubscriptionIsActive = () => {
        if (
            (!isSubActive && !cancelAtPeriodEnd) ||
            (!isSubActive && cancelAtPeriodEnd)
        )
            return true;
        return false;
    };

    const loadSubscriptionButtonStatus = (sub) => {
        // SUBSCRIBE BUTTON
        if (isCheckingSub)
            return (
                <SubscriptionButtonLoader
                    height="80"
                    cx1="45%"
                    cx2="50%"
                    cx3="55%"
                    cy="60"
                />
            );
        else {
            if (checkIfSubscriptionIsActive()) {
                return (
                    <button
                        className="btn-subscribe"
                        onClick={() =>
                            handleSubscriptionPaymentPanel(
                                sub.id,
                                {
                                    planInterval: subTypeDict[sub.typeId],
                                    planIntervalCount: sub.quantity,
                                    productType: "service",
                                    price: sub.price,
                                    productName: sub.title,
                                },
                                "subscription"
                            )
                        }
                    >
                        Subscribe
                    </button>
                );
            }
            //  CANCEL BUTTON
            else if (isSubActive && !cancelAtPeriodEnd) {
                return (
                    <button
                        className="btn-danger"
                        onClick={handleSubscriptionCancellation}
                    >
                        Cancel Subscription
                    </button>
                );
            }
            // RE-ACTIVATE BUTTON
            else if (isSubActive && cancelAtPeriodEnd) {
                return (
                    <button
                        className="btn-subscribe"
                        onClick={handleSubscriptionActivation}
                    >
                        Re-Activate Subscription
                    </button>
                );
            }
        }
    };

    return (
        <>
            <section id="subscription-panel">
                <div className="container-fluid">
                    {/* SUB & GEMS */}
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                            {/* MONTHLY SUBSCRIPTION 
                            <div className="subscription-wrapper d-md-flex flex-md-row">
                                <div className="col-12 col-md-6 col-lg-6 col-xl-5 px-0">
                                    <h1 className="subs-title">
                                        Enjoy Monthly Subscription Privilege
                                    </h1>
                                    <p className="subtitle mb-3 mb-md-5">
                                        Increase your tickets earnings when you
                                        subscribe and stay ahead of others.
                                    </p>
                                    <p className="terms-apply d-none d-md-block">
                                        Terms of use apply
                                    </p>
                                </div>

                                {subscriptionListData.map((sub, i) => (
                                    <div
                                        key={`subscription-${i}`}
                                        className={`col-12 col-md-6 col-lg-6 col-xl-5 ml-xl-auto monthly-sub d-flex flex-column justify-content-between ${
                                            i > 0 ? "mt-4" : ""
                                        }`}
                                    >
                                        <div className="monthly-sub-inner text-center">
                                            <p className="monthly-title text-center mb-3 mb-md-1">
                                                {sub.title}
                                            </p>
                                            <h1
                                                className="price"
                                                data-title={`SGD ${sub?.price?.toFixed(
                                                    2
                                                )}`}
                                            >
                                                SGD {sub?.price?.toFixed(2)}
                                            </h1>
                                            {ipInfo?.currency && (
                                                <p className="sub-estimated">
                                                    Estimated price{" "}
                                                    <span>
                                                        {`${
                                                            ipInfo?.currency ===
                                                            "MYR"
                                                                ? "RM"
                                                                : ipInfo?.currency
                                                        }${(
                                                            exchangeRate?.rates[
                                                                ipInfo?.currency
                                                            ] * sub.price
                                                        ).toFixed(2)}`}
                                                    </span>
                                                </p>
                                            )}
                                            <p className="sub-detail mt-4 mt-md-1 mb-2">
                                                Get{" "}
                                                <span>
                                                    {sub.dailyMultiplier * 100}%
                                                </span>{" "}
                                                more tickets!
                                            </p>
                                        </div>

                                        {/* LOAD SUBSCRIPTION RESPECTIVE BUTTON 
                                        <p className="sub-info mb-0 text-center">
                                            Automatically renews every month.
                                            Cancel anytime.
                                        </p>
                                        {loadSubscriptionButtonStatus(sub)}
                                    </div>
                                ))}
                                <p className="terms-apply d-block d-md-none mt-4">
                                    Terms of use apply
                                </p>
                            </div> */}

                            {/* GEMS */}
                            <div className="gems-wrapper mt-5">
                                <p className="title mb-4 ml-2 d-flex align-items-end">
                                    Purchase Gems{" "}
                                    {/* <img
                                        className="ml-2"
                                        src={`${window.cdn}gems/gems.png`}
                                        alt="gems"
                                    /> */}
                                </p>
                                {/* <p className="subtitle mb-4">
                                    Purchase gems here.
                                </p> */}
                                <div className="col-12">
                                    <div className="row">
                                        {gemList.map((gem, i) => (
                                            <div
                                                key={`gems-${i}`}
                                                className={`col-6 col-md-4 col-lg-4 col-xl-3 px-1 px-md-2 px-lg-2 mb-4`}
                                                onClick={() =>
                                                    handleGemsPaymentPanel(
                                                        gem.id,
                                                        gem.price,
                                                        "gems",
                                                        gem.quantity,
                                                    )
                                                }
                                            >
                                                <div className="gem-inner">
                                                    <div className="gem-pack p-2">
                                                        <p className="mb-1">
                                                            {gem.title}
                                                            <div className="gem-type p-2">
                                                        <p className="mb-1">
                                                            {gem.quantity?.toLocaleString()}{" "}
                                                            GEMS
                                                        </p>
                                                        <img
                                                            width="200"
                                                            className="img-fluid"
                                                            src={gem.ImageUrl}
                                                            alt={gem.title}
                                                        />
                                                        
                                                    </div>
                                                    
                                                        </p>
                                                    </div>
                                                    <div className="mb-0 price d-flex flex-column">
                                                        {`${gem?.price?.toFixed(
                                                            0
                                                        )} Froyo Tokens`}
                                                        {/* {ipInfo?.currency && (
                                                            <div className="w-100 d-flex d-md-block d-xl-flex align-items-center justify-content-center">
                                                                <p className="mb-0 estimated-text mr-md-1">
                                                                    Estimated
                                                                    Price
                                                                </p>
                                                                <p className="mb-0 estimated-value">
                                                                    {`${
                                                                        ipInfo?.currency ===
                                                                        "MYR"
                                                                            ? "RM"
                                                                            : ipInfo?.currency
                                                                    }${(
                                                                        exchangeRate
                                                                            ?.rates[
                                                                            ipInfo
                                                                                ?.currency
                                                                        ] *
                                                                        gem?.price
                                                                    ).toFixed(
                                                                        2
                                                                    )}`}
                                                                </p>
                                                            </div>
                                                        )} */}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {cancelModal && <CancelSubModal setCancelModal={setCancelModal} />}
        </>
    );
};

export default IAP;
