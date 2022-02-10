import "./styles.module.scss";

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import ActivityLoader from "Components/Loader/Activity.loader";

import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPrizePoolTickets from "redux/thunks/PrizePoolTickets.thunk";
import loadActivity from "redux/thunks/Activity.thunk";

import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import { scrollToTop } from "Utils/ScrollToTop";

const Index = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const { activity } = useSelector((state) => state.activity);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );

    let timeOutRef = useRef(null);
    const history = useHistory();

    const [activityData, setActivityData] = useState([]);
    const [noDataLoaded, setNoDataLoaded] = useState(false);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (activityData.length <= 0) setNoDataLoaded(true);
        }, 7000);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [activityData]);

    // GET ACTIVITIES DATA
    useEffect(() => {
        if (
            (user.id > 0 &&
                prizes.featuredData.length > 0 &&
                prizes.premiumData.length > 0) ||
            prizes.automatedEntryData.length > 0
        )
            dispatch(loadActivity());
    }, [
        dispatch,
        user.id,
        prizes.featuredData,
        prizes.premiumData,
        prizes.automatedEntryData,
    ]);

    // SETTING ACTIVITY STATE & LOADING TICKETS
    useEffect(() => {
        setActivityData(activity);
        activity.forEach((e) => {
            dispatch(loadPlayerTickets(e.prizeId, true));
            dispatch(loadPrizePoolTickets(e.prizeId, true, e.ticketsRequired));
        });
    }, [activity, dispatch]);

    const getPrizeType = (type) => {
        return type === 1 ? "Featured" : type === 2 ? "Premium" : "Daily";
    };

    return (
        <section id="activity">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto description mb-2 mb-md-4">
                        <h1 className="mb-2">Your Activity</h1>
                        <p>Continue playing and get more tickets</p>
                    </div>
                </div>
                <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto px-1 px-md-2">
                    {noDataLoaded && (
                        <div className="no-result">
                            <p className="title mb-2">No activities yet!</p>
                            <p className="subtitle mt-1 mb-0">
                                Looks like you've not played for any prizes yet.{" "}
                            </p>
                            <p className="subtitle">
                                <Link to="/">Click here</Link> to look for one
                                you like.
                            </p>
                        </div>
                    )}
                    {!noDataLoaded && (
                        <div className="row">
                            {activityData.length <= 0 && <ActivityLoader />}
                            {activityData.map((card, index) => (
                                <div
                                    key={`activityCards-${index}`}
                                    className="col-12 col-md-6 col-lg-6 col-xl-6 mb-4 mb-md-3 px-md-2"
                                >
                                    {/* CARD WRAPPER */}
                                    <Link
                                        onClick={scrollToTop}
                                        to={{
                                            pathname: `/prize/${getPrizeType(
                                                card?.prizeType
                                            )?.toLowerCase()}/${card?.prizeId}`,
                                            state: {
                                                prevPath:
                                                    history.location.pathname,
                                            },
                                        }}
                                    >
                                        <div
                                            className="card-wrapper"
                                            style={{
                                                backgroundImage: `url("${card?.prizeImage}")`,
                                            }}
                                        >
                                            <div className="overlay"></div>
                                            <div className="col-12 py-3">
                                                <div className="badges mb-1">
                                                    {card?.prizeContent ||
                                                        getPrizeType(
                                                            card?.prizeType
                                                        )}
                                                </div>
                                            </div>
                                            <div className="prize-info pl-3 mb-3">
                                                <div className="prize-title">
                                                    {card?.prizeTitle}
                                                </div>
                                                <div className="prize-subtitle">
                                                    {card?.prizeSubtitle}
                                                </div>
                                            </div>
                                        </div>
                                        {/* INFO */}
                                        <div className="ticket-info p-2 d-flex align-items-center justify-content-between">
                                            <div className="px-2 py-2 ticket-wrapper w-100">
                                                <div className="your-tickets d-flex flex-md-column align-items-center align-items-md-start justify-content-between justify-content-md-start">
                                                    <p className="mb-0 label">
                                                        Your tickets
                                                    </p>
                                                    <p className="mb-0 tickets">
                                                        {`\u00A0${
                                                            getPoolTickets(
                                                                poolTickets,
                                                                card?.prizeId
                                                            )?.toLocaleString() ||
                                                            0
                                                        }`}
                                                    </p>
                                                </div>
                                                <div className="pool-tickets mt-3 d-flex flex-md-column align-items-center align-items-md-start justify-content-between justify-content-md-start">
                                                    <p className="mb-0 label">
                                                        Draw starts in
                                                    </p>
                                                    <div className="d-flex align-items-center px-0">
                                                        <p className="mb-0 tickets">
                                                            {`\u00A0${
                                                                getPrizeTicketCollected(
                                                                    prizeTicketCollection,
                                                                    card?.prizeId
                                                                )?.toLocaleString() ||
                                                                0
                                                            }`}
                                                        </p>
                                                        <p className="required-tickets mb-0 mt-1">
                                                            {`\u00A0/ ${card?.ticketsRequired?.toLocaleString()}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Index;
