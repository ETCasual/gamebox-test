import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import loadPrizes from "redux/thunks/Prizes.thunk";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTicketsWithOvertime } from "redux/thunks/PrizePoolTickets.thunk";
import { loadNotifications } from "redux/thunks/Notifcations.thunk";
import loadNotificationNumber from "redux/thunks/NotifcationNumber.thunk";
import { removeEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";
// import loadRemovePrize from "redux/thunks/RemovePrize.thunk";
import convertSecondsToHours from "Utils/TimeConversion";

const GlobalTimer = ({ data }) => {
    const { user } = useSelector((state) => state.userData);
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );
    // const { overTimePrizes } = useSelector((state) => state.overTime);

    const dispatch = useDispatch();

    let watcherRef = useRef(null);
    let timeOutRef = useRef(null);
    let timeOutRef2 = useRef(null);
    let userRef = useRef(user);

    // const history = useHistory();

    useEffect(() => {
        // SETTING COUNT DOWN TIMER
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp
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
                    dispatch(loadNotifications(1));
                }

                // USER DETAILS
                dispatch(loadUserDetails());

                clearTimeout(timeOutRef.current);
                timeOutRef.current = null;
            }, 4000);

            // CALLING PRIZE API
            if (Date.now() > data?.gameInfo[0]?.endTimeStamp) {
                clearTimeout(timeOutRef2.current);
                timeOutRef2.current = setTimeout(() => {
                    dispatch(loadPrizes());

                    clearTimeout(timeOutRef2.current);
                    timeOutRef2.current = null;
                }, 6000);
            }
        }
    }, [
        dispatch,
        data?.prizeId,
        data?.ticketsRequired,
        data?.gameInfo,
        earnAdditionalBenefitStatus,
    ]);

    // useEffect(() => {
    //     let idx = overTimePrizes.findIndex(
    //         (ot) => ot.prizeId === data?.prizeId
    //     );

    //     if (idx > -1 && overTimePrizes[idx]?.status === 1) {
    //         console.log("ENDING");

    //         // UPDATING LOCAL FINISHED PRIZE LIST
    //         let finishedPrizeList =
    //             JSON.parse(localStorage.getItem("finishedPrizeList")) || [];

    //         let finishedIdx = finishedPrizeList.findIndex(
    //             (id) => id === data?.prizeId
    //         );
    //         if (finishedIdx === -1) {
    //             finishedPrizeList.push({
    //                 prizeId: data?.prizeId,
    //                 timeStamp: Date.now(),
    //             });
    //             localStorage.setItem(
    //                 "finishedPrizeList",
    //                 JSON.stringify(finishedPrizeList)
    //             );
    //         }

    //         // REMOVE PRIZE FROM API
    //         // dispatch(loadRemovePrize(data?.prizeId, data?.type_id));

    //         // UPDATING LOCAL PRIZE LIST THAT CURRENT PRIZE IS COMPLETED
    //         const _localPrizes =
    //             JSON.parse(localStorage.getItem("prizeDetailList")) || [];
    //         let idx = _localPrizes.findIndex(
    //             (e) => e.prizeId === data?.prizeId
    //         );
    //         _localPrizes[idx].completed = true;
    //         localStorage.setItem(
    //             "prizeDetailList",
    //             JSON.stringify(_localPrizes)
    //         );

    //         // CALLING PRIZE API
    //         dispatch(loadPrizes());

    //         // PUSH TO HOME PAGE
    //         history.push("/");
    //     }
    // }, [overTimePrizes, dispatch, data?.type_id, data?.prizeId, history]);

    return null;
};

export default GlobalTimer;
