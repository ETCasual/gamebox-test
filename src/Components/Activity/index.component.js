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
import { useTranslation } from "react-i18next";

const Index = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const { activity } = useSelector((state) => state.activity);

    let timeOutRef = useRef(null);

    const [activityData, setActivityData] = useState([]);
    const [noDataLoaded, setNoDataLoaded] = useState(false);

    const { t } = useTranslation();

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (activityData.length <= 0) setNoDataLoaded(true);
            else setNoDataLoaded(false);
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
                <div className="col-12 col-md-10 col-lg-8 mx-auto content-min-height">
                    <h1 className="main-title mb-4">{t("activity.header")}</h1>

                    {noDataLoaded && (
                        <div className="no-result">
                            <p className="title mb-2">
                                {t("activity.no_data.title")}
                            </p>
                            <p className="subtitle mt-1 mb-0">
                                {t("activity.no_data.desc")}
                            </p>
                            <p className="subtitle">
                                <Link to="/">{t("activity.no_data.btn")}</Link>
                                {t("activity.no_data.btn_cont")}
                            </p>
                        </div>
                    )}
                    {!noDataLoaded && (
                        <div className="row">
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
