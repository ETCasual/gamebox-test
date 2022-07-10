// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// REDUX
import ActivityLoader from "Components/Loader/Activity.loader";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import loadActivity from "redux/thunks/Activity.thunk";

// COMPONENTS
import ActivityCard from "Components/Activity/ActivityCard/ActivityCard.component";

const Index = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const { activity } = useSelector((state) => state.activity);

    let timeOutRef = useRef(null);

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
            user.id &&
            (prizes.featuredData.length > 0 ||
                prizes.premiumData.length > 0 ||
                prizes.automatedEntryData.length > 0)
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

    return (
        <section id="activity">
            <div className="container-fluid px-0">
                <div className="col-12 col-md-10 col-lg-9 mx-auto">
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
                        <div className="content-min-height row">
                            {activityData.length <= 0 && <ActivityLoader />}
                            {activityData.map((card, index) => (
                                <ActivityCard
                                    key={index}
                                    card={card}
                                ></ActivityCard>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Index;
