// REACT
import React from "react";

// HELPER FUNCTIONS
import {
    getCurrentLevelNo,
    getLevelProgress,
    getCurrentLevelExp,
    getCurrentMultiplier,
} from "Utils/CurrentLevel";

const PlayerLevel = ({ user, ranks, handleBackButton }) => {
    return (
        <section id="player-level">
            <div className="container level-modal">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-5 col-xl-6">
                        <div className="row">
                            <div className="col-12 level-wrapper">
                                {/* INNER SCROLLING WRAPPER */}
                                <div className="scrolling-wrapper-y flex-column flex-nowrap">
                                    {/* CURRENT LEVEL & MULTIPLIER */}
                                    <div className="col-12 mt-3 p-1 p-md-3">
                                        <div className="current-level-wrapper d-flex flex-column justify-content-center align-items-center">
                                            <div className="level-indicator-wrapper d-flex flex-column justify-content-center align-items-center">
                                                <span>Level</span>
                                                <p className="mb-0 level text-center">
                                                    {getCurrentLevelNo(
                                                        user,
                                                        ranks
                                                    )}
                                                </p>
                                            </div>
                                            <p className="statement text-center">
                                                Increase your multiplier with
                                                every level!
                                            </p>
                                            <div className="current-level-details-wrapper p-2">
                                                {/* MULTIPLIER & EXP */}
                                                <div className="exp mb-0 mb-md-2 w-100 d-flex align-items-center justify-content-between">
                                                    {/* MULTIPLIER */}
                                                    <div className="d-flex multiplier-text">
                                                        <p className="mb-0 pr-1">
                                                            Multiplier
                                                        </p>
                                                        <p className="mb-0 multiplier-value">
                                                            {getCurrentMultiplier(
                                                                user,
                                                                ranks
                                                            )}
                                                            %
                                                        </p>
                                                    </div>
                                                    {/* EXP COUNT */}
                                                    <div className="d-flex align-items-center justify-content-center exp-count px-3">
                                                        <span className="player-exp mr-1">
                                                            {user.exp >
                                                            ranks[
                                                                ranks.length - 1
                                                            ]?.exp
                                                                ? ranks[
                                                                      ranks.length -
                                                                          1
                                                                  ]?.exp.toLocaleString()
                                                                : user.exp.toLocaleString()}
                                                        </span>
                                                        <span className="mx-1">
                                                            /
                                                        </span>
                                                        <span>
                                                            {getCurrentLevelExp(
                                                                user,
                                                                ranks
                                                            ).toLocaleString()}{" "}
                                                            exp
                                                        </span>{" "}
                                                    </div>
                                                </div>
                                                {/* PROGRESS BAR */}
                                                <div className="col-12 px-0">
                                                    <div className="progress mt-0 mt-md-3">
                                                        <div
                                                            className="progress-bar"
                                                            role="progressbar"
                                                            style={{
                                                                width: `${getLevelProgress(
                                                                    user,
                                                                    ranks
                                                                )}%`,
                                                            }}
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* GAP */}
                                    <div className="col-12 mt-4">
                                        <div className="gap text-center">
                                            <img
                                                src={`${window.cdn}icons/icon_arrow_down.png`}
                                                alt="next"
                                            />
                                        </div>
                                    </div>
                                    {/* LEVELS */}
                                    {ranks.map((rank, i) => {
                                        return (
                                            rank.exp > user.exp && (
                                                <React.Fragment
                                                    key={`rank-${i}`}
                                                >
                                                    <div
                                                        className={
                                                            ranks.length - 1 ===
                                                            i
                                                                ? "col-12 mb-3"
                                                                : "col-12 p-0 p-md-3"
                                                        }
                                                    >
                                                        <div className="level-type-wrapper">
                                                            {/* LEVEL */}
                                                            <div className="level-type-head px-3 py-2 d-flex align-items-center justify-content-between">
                                                                {/* LEVEL TITLE */}
                                                                <p className="mb-0">
                                                                    {rank.title}
                                                                </p>
                                                                {/* LEVEL EXP */}
                                                                <div className="d-flex align-items-center justify-content-center px-2 level-exp">
                                                                    <span className="ml-1">
                                                                        {rank.exp.toLocaleString()}{" "}
                                                                        exp
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {/* CONTENT */}
                                                            <div className="level-type-content">
                                                                <p className="mb-0 pt-3 reward-text">
                                                                    Rewards
                                                                </p>
                                                                <div className="my-3 d-flex justify-content-center ticket-text">
                                                                    <p className="ticket pr-1 mb-0">
                                                                        Ticket
                                                                        Multiplier
                                                                    </p>
                                                                    <p className="mb-0 ticket-value">
                                                                        {Math.round(rank.multiplier * 100)}
                                                                        %
                                                                    </p>
                                                                </div>
                                                                <div className="pb-3 d-flex align-items-center justify-content-center gems">
                                                                    <p className="mb-0">
                                                                        {`+ ${rank.gems}`}{" "}
                                                                        gems
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            ranks.length - 1 ===
                                                            i
                                                                ? "d-none col-12 text-center"
                                                                : "col-12 text-center"
                                                        }
                                                    >
                                                        <div className="gap">
                                                            <img
                                                                width={20}
                                                                className="img-fluid"
                                                                src={`${window.cdn}icons/icon_arrow_down.png`}
                                                                alt="next"
                                                            />
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                        );
                                    })}
                                </div>
                                {/* CLOSE BUTTON */}
                                <img
                                    width="36"
                                    className="close-button"
                                    onClick={handleBackButton}
                                    src={`${window.cdn}buttons/button_close.png`}
                                    alt="close-btn"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlayerLevel;
