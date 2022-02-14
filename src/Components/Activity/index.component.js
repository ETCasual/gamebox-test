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
                <div className="col-12 col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <h1 className="title mb-4">Your Activities</h1>

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
                                    <Link className="d-flex"
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
                                        {/* IMAGE */}
                                        <div
                                            className="card-wrapper col"
                                            style={{
                                                backgroundImage: `url("${card?.prizeImage}")`,
                                            }}
                                        />
                                        {/* INFO */}
                                        <div className="ticket-info p-0 align-items-center justify-content-between col">
                                            <div className="prize-info p-3">
                                                <div className="prize-title">
                                                    {card?.prizeTitle}
                                                </div>
                                                <div className="prize-subtitle mt-2">
                                                    {card?.prizeSubtitle}
                                                </div>
                                            </div>

                                            <div className="ticket-wrapper w-100">
                                                <div className="your-tickets p-3">
                                                    <p className="label my-2">
                                                        Your tickets
                                                    </p>
                                                    <p className="tickets mb-0 ">
                                                        {`${
                                                            getPoolTickets(
                                                                poolTickets,
                                                                card?.prizeId
                                                            )?.toLocaleString() ||
                                                            0
                                                        }`}
                                                    </p>
                                                </div>

                                                <div className="pool-tickets px-2 py-3 d-flex flex-md-column align-items-center">
                                                    <div className="d-flex align-items-center px-0">
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
