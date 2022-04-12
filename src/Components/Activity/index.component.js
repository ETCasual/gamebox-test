import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import ActivityLoader from "Components/Loader/Activity.loader";

import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import {loadPrizePoolTickets} from "redux/thunks/PrizePoolTickets.thunk";
import loadActivity from "redux/thunks/Activity.thunk";

import getPoolTickets from "Utils/PoolTickets";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";

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
        }, 3000);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [activityData]);

    // GET ACTIVITIES DATA
    useEffect(() => {
        if (
            (user.id  &&
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
            <div className="container-fluid px-0">
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <h1 className="main-title mb-4">Your Activities</h1>

                    {noDataLoaded && (
                        <div className="no-result">
                            <p className="title mb-2">No activity found yet!</p>
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
                                    className="col-12 col-xl-6 mb-3 px-3 px-md-2"
                                >
                                    {/* CARD WRAPPER */}
                                    <Link
                                        className="d-flex"
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
                                        {/* IMAGE */}
                                        <div
                                            className="card-wrapper col-5 col-md-4 col-lg-3 col-xl-5"
                                            style={{
                                                backgroundImage: `url("${card?.prizeImage}")`,
                                            }}
                                        />
                                        {/* INFO */}
                                        <div className="ticket-info px-0 pt-3 d-flex flex-column align-items-center justify-content-between col-7 col-md-8 col-lg-9 col-xl-7">
                                            {/* PRIZE INFO */}
                                            <div className="prize-info w-100">
                                                <div className="prize-title px-3">
                                                    {card?.prizeTitle}
                                                </div>
                                                <div className="prize-subtitle mt-1 px-3">
                                                    {card?.prizeSubtitle}
                                                </div>
                                            </div>
                                            <div className="ticket-wrapper w-100">
                                                {/* YOUR TICKETS */}
                                                <div className="your-tickets px-3 mb-2 d-flex flex-md-column align-items-center align-items-md-start justify-content-between justify-content-md-start">
                                                    <p className="label mb-0 mb-md-1">
                                                        Your tickets
                                                    </p>
                                                    <p className="tickets mb-0">
                                                        {`${
                                                            getPoolTickets(
                                                                poolTickets,
                                                                card?.prizeId
                                                            )?.toLocaleString() ||
                                                            0
                                                        }`}
                                                    </p>
                                                </div>
                                                {/* POOL TICKETS */}
                                                <div className="pool-tickets px-2 py-3 d-flex align-items-center justify-content-center">
                                                    <p className="mb-0 required-tickets">
                                                        {`\u00A0${(
                                                            card?.ticketsRequired -
                                                                getPrizeTicketCollected(
                                                                    prizeTicketCollection,
                                                                    card?.prizeId
                                                                ) || 0
                                                        ).toLocaleString()}`}{" "}
                                                        tickets remaining
                                                    </p>
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
