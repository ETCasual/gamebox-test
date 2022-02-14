import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Rewards from "Components/UserProfile/Rewards/Rewards.component";

import loadClaimedPrizes from "redux/thunks/ClaimedPrizes.thunk";
import loadUnClaimedPrizes from "redux/thunks/UnClaimedPrizes.thunk";

const RewardsPage = () => {
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [isRewardsShown, setIsRewardsShown] = useState(true);

    useEffect(() => {
        if (user.id > 0) {
            setIsRewardsShown(true);
            dispatch(loadClaimedPrizes());
            dispatch(loadUnClaimedPrizes());
        }
    }, [user.id, dispatch]);

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    // useEffect(() => {
    //     const overlay = document.querySelector(".blur-overlay");
    //     overlay?.setAttribute("style", `min-height: 145px`);
    //     return () => {
    //         overlay?.removeAttribute("style");
    //     };
    // }, []);

    return isRewardsShown && <Rewards />;
};

export default RewardsPage;
