import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import convertSecondsToHours from "Utlis/TimeConversion";

const WeeklyRewards = ({ weeklyRewardsData, usertickets }) => {
    const [timer, setTimer] = useState(0);

    let watcherRef = useRef(null);

    useEffect(() => {
        const timestamp = weeklyRewardsData[0]?.ScheduledOn;
        clearInterval(watcherRef);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(timestamp);
            setTimer(finalTimeRef);

            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        }

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [weeklyRewardsData]);

    return (
        <div className="col-12 col-lg-6 pr-lg-2" id="weekly">
            <div className="row">
                {weeklyRewardsData.map((card, index) => (
                    <div key={`weeklyReward-${index}`} className="col-12">
                        <Link to="#">
                            <div
                                className="card-wrapper"
                                // style={{
                                //     backgroundImage: `url(${card.backgroundImage})`,
                                // }}
                                style={{
                                    // Old reference from DigitalOcean times
                                    backgroundImage: `url(.${window.cdn}images/home/amazon.png)`,
                                }}
                            >
                                <div className="overlay"></div>
                                <div className="content">
                                    <div className="col-12 top-content">
                                        <div className="badges mb-1">
                                            Weekly
                                        </div>
                                        <div className="card-title">
                                            {card.title}
                                        </div>
                                    </div>
                                    <div className="col-12 bottom-content px-2">
                                        <div className="bottom-wrapper d-flex align-items-center justify-content-between">
                                            <div className="tickets-grid">
                                                <div className="tickets">
                                                    <p>Your tickets</p>
                                                    <p>{usertickets}</p>
                                                </div>
                                                <div className="tickets-pool">
                                                    <p>Draw starts in</p>
                                                    <p>{timer}</p>
                                                </div>
                                            </div>
                                            <div className="game-icon">
                                                <img
                                                    className="img-fluid"
                                                    // src={card.gameIcon}
                                                    src="https://pht.qoo-static.com/LrAIAr-NNVE_apizH1fGYG381JtEXBrK9A80Yh-OGpj3H1jYUJ0cfrhGlTYnTbJfhbE=w512"
                                                    alt="game-icon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyRewards;
