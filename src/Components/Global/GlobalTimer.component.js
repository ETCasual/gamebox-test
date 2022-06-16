import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import loadPrizes from "redux/thunks/Prizes.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTicketsWithOvertime } from "redux/thunks/PrizePoolTickets.thunk";
import {
    loadNotifications,
    loadWinnerAnnouncementNotifications,
} from "redux/thunks/Notifcations.thunk";
import loadNotificationNumber from "redux/thunks/NotifcationNumber.thunk";
import { removeEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";
import convertSecondsToHours from "Utils/TimeConversion";

const GlobalTimer = ({ data }) => {
    const { user } = useSelector((state) => state.userData);
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );
    const dispatch = useDispatch();

    const { config } = useSelector((state) => state.config);

    let watcherRef = useRef(null);
    let timeOutRef = useRef(null);
    let timeOutRef2 = useRef(null);
    let userRef = useRef(user);

    useEffect(() => {
        // SETTING COUNT DOWN TIMER
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp * 1000,
                config.offsetTimestamp ? config.offsetTimestamp : 0
            );
            // TOURNAMENT ENDING
            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        function countDownTimerEnded() {
            // CLEARING COUNT DOWN TIMER INTERVAL
            clearInterval(watcherRef.current);
            watcherRef.current = null;

            // REMOVING ADDITIONAL TICKETS STATUS FOR CURRENT TOURNAMENT
            dispatch(removeEarnAdditionalBenefitStatus(data?.prizeId));

            // CALLING API'S (TICKETS< NOTIFICATION & USER INFO)
            clearTimeout(timeOutRef.current);
            timeOutRef.current = setTimeout(() => {
                // PLAYER TICKETS
                dispatch(loadPlayerTickets(parseInt(data?.prizeId), true));
                // PRIZE TOTAL TICKETS WITH OVERTIME CHECKER
                dispatch(
                    loadPrizePoolTicketsWithOvertime(
                        parseInt(data?.prizeId),
                        true,
                        data?.ticketsRequired
                    )
                );

                if (userRef.current.isNotifyAllowed) {
                    // NOTIFICATION NUMBER
                    dispatch(loadNotificationNumber());
                    // NOTIFICATION
                    dispatch(loadNotifications());
                    dispatch(loadWinnerAnnouncementNotifications());
                }

                // USER DETAILS
                dispatch(loadUserDetails());

                clearTimeout(timeOutRef.current);
                timeOutRef.current = null;
            }, 4000);

            // CALLING PRIZE API

            // ? Not sure why we need to check again if now time is bigger than prize game endTimeStamp 
            // ? since this function is already called when timer show "Ended"
            // const nowTimeStamp = () => Date.now() + (config?.offsetTimestamp || 0);
            // const nowDate = new Date(nowTimeStamp());

            // if (nowDate.getTime() / 1000 > data?.gameInfo[0]?.endTimeStamp) {
                clearTimeout(timeOutRef2.current);
                timeOutRef2.current = setTimeout(() => {
                    dispatch(loadPrizes());

                    clearTimeout(timeOutRef2.current);
                    timeOutRef2.current = null;
                }, 3000);
            // }
        }
    }, [
        dispatch,
        data?.prizeId,
        data?.ticketsRequired,
        data?.gameInfo,
        earnAdditionalBenefitStatus,
        config,
    ]);

    return null;
};

export default GlobalTimer;
