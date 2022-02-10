// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

// COMPONENTS
import ClaimedPrizeDetailModal from "Components/Modals/ClaimedPrizeDetail.modal";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";

const Rewards = () => {
    const { claimedPrizes } = useSelector((state) => state.claimedPrizes);
    const { unClaimedPrizes } = useSelector((state) => state.unClaimedPrizes);
    const { config } = useSelector((state) => state.config);

    const history = useHistory();

    const [claimedPrizesData, setClaimedPrizesData] = useState([]);
    const [unClaimedPrizesData, setUnClaimedPrizesData] = useState([]);
    const [currentButtonType, setCurrentButtonType] = useState("");
    const [isClaimedPrizeDetailPopupOpen, setIsClaimedDetailPopupOpen] =
        useState(false);
    const [claimedPrizeDetails, setClaimedPrizeDetails] = useState("");

    const claimedPrizeButtonRef = useRef(null);
    const unClaimedPrizeButtonRef = useRef(null);
    const gliderRef = useRef(null);
    const unClaimedPrizeAvailableRef = useRef(null);

    const prizeTypeDict = {
        1: "Featured",
        2: "Premium",
        3: "Time Sensitive",
        4: "Daily Bonus",
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            if (currentButtonType === "Unclaimed Rewards") {
                gliderRef.current.style.width = `${unClaimedPrizeButtonRef.current.offsetWidth}px`;
                gliderRef.current.style.transform = `translateX(${
                    unClaimedPrizeButtonRef.current.offsetWidth +
                    (window.innerWidth <= 768 ? 5 : 25)
                }px)`;
            } else {
                setTimeout(() => {
                    gliderRef.current.style.width = `${claimedPrizeButtonRef.current.offsetWidth}px`;
                    gliderRef.current.style.transform = `translateX(0px)`;
                }, 200);
            }
        }

        return () => window.removeEventListener("resize", handleResize, false);
    }, [currentButtonType]);

    useEffect(() => {
        gliderRef.current.style.width = `${claimedPrizeButtonRef.current.offsetWidth}px`;
        setClaimedPrizesData(claimedPrizes);
    }, [claimedPrizes]);

    useEffect(() => {
        const tl = gsap.timeline();

        if (unClaimedPrizes.length > 0) {
            setUnClaimedPrizesData(unClaimedPrizes);
            tl.to(unClaimedPrizeAvailableRef.current, {
                duration: 0.7,
                opacity: 1,
                repeat: -1,
                yoyo: true,
                backgroundColor: "#FDC43D",
                ease: "power2.out",
            });
        } else {
            unClaimedPrizeAvailableRef.current.style = "";
        }

        return () => tl.kill();
    }, [unClaimedPrizes]);

    const handleRewards = (item) => {
        let selectedElement = item.target.textContent;
        if (currentButtonType === selectedElement) return;

        if (selectedElement === "Claimed Rewards") {
            gliderRef.current.style.width = `${claimedPrizeButtonRef.current.offsetWidth}px`;
            gliderRef.current.style.transform = "translateX(0%)";

            setCurrentButtonType("Claimed Rewards");

            const tl = gsap.timeline();
            tl.to(".unclaimed", {
                duration: 0.3,
                scale: 0,
                ease: "power4.out",
                onStart: () => {
                    document
                        .querySelectorAll("#rewards-panel .filter button")
                        .forEach((e) => e.classList.remove("active"));
                    document
                        .querySelector(".btn_claim")
                        .classList.add("active");
                },
                onComplete: () => {
                    document.querySelectorAll(".unclaimed").forEach((e) => {
                        e.classList.add("d-none");
                    });
                },
            }).to(".claimed", {
                duration: 0.3,
                scale: 1,
                ease: "power4.out",
                onStart: () => {
                    document.querySelectorAll(".claimed").forEach((e) => {
                        e.classList.remove("d-none");
                    });
                },
            });
        } else if (selectedElement === "Unclaimed Rewards") {
            gliderRef.current.style.width = `${unClaimedPrizeButtonRef.current.offsetWidth}px`;
            gliderRef.current.style.transform = `translateX(${
                unClaimedPrizeButtonRef.current.offsetWidth +
                (window.innerWidth <= 768 ? 5 : 25)
            }px)`;

            setCurrentButtonType("Unclaimed Rewards");

            const tl = gsap.timeline();
            tl.to(".claimed", {
                duration: 0.3,
                scale: 0,
                ease: "power4.out",
                onStart: () => {
                    document
                        .querySelectorAll("#rewards-panel .filter button")
                        .forEach((e) => e.classList.remove("active"));
                    document
                        .querySelector(".btn_unclaim")
                        .classList.add("active");
                },
                onComplete: () => {
                    document.querySelectorAll(".claimed").forEach((e) => {
                        e.classList.add("d-none");
                    });
                },
            }).to(".unclaimed", {
                duration: 0.3,
                scale: 1,
                ease: "power4.out",
                onStart: () => {
                    document.querySelectorAll(".unclaimed").forEach((e) => {
                        e.classList.remove("d-none");
                    });
                },
            });
        }
    };

    const getClaimedDate = (claimedOn) => {
        let playerTimeZone = (new Date().getTimezoneOffset() / 60) * -1;
        let claimedTimeZone =
            (new Date(claimedOn * 1000).getTimezoneOffset() / 60) * -1;

        if (playerTimeZone !== claimedTimeZone) {
            let correctDateTime = new Date(
                (claimedOn + playerTimeZone * 60 * 60) * 1000
            );
            return correctDateTime.toDateString();
        }
        return new Date(claimedOn * 1000).toDateString();
    };

    const getRemainingDaysToClaim = (createdOn) => {
        let todayDate = new Date().getDate();
        let createdOnDate = new Date(createdOn * 1000).getDate();
        let remaining = 0;
        if (todayDate >= createdOnDate) {
            remaining = config?.daysToClaimPrize - (todayDate - createdOnDate);
            if (remaining <= 0) return "Expired";
            return `${remaining} Days Left to Claim`;
        } else {
            remaining = createdOnDate - todayDate;
            if (remaining <= 0) return "Expired";
            return `${remaining} Days Left to Claim`;
        }
    };

    return (
        <>
            {/* CLAIMED PRIZE DETAILS MODAL */}
            {isClaimedPrizeDetailPopupOpen && (
                <ClaimedPrizeDetailModal
                    data={claimedPrizeDetails}
                    onCloseButtonClick={() => {
                        setIsClaimedDetailPopupOpen(false);
                    }}
                />
            )}
            {/* BACK BUTTON */}
            <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8 px-md-0 px-lg-3 px-xl-4 justify-content-between">
                    <Link
                        onClick={scrollToTop}
                        to={{
                            pathname: history?.location?.state?.prevPath || "/",
                            state: {
                                prevPath: "/",
                            },
                        }}
                    >
                        <img
                            className="back-button"
                            width="42"
                            src={`${window.cdn}art_assets/buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </Link>
                </div>
            </div>
            {/* REWARDS */}
            <section id="rewards-panel">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-11 col-lg-8 col-xl-8">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <h4 className="title mb-4">Rewards</h4>
                                    <div className="col-12 px-0 filter d-flex w-100">
                                        <button
                                            ref={claimedPrizeButtonRef}
                                            className="btn_claim active mr-4 mr-md-5"
                                            onClick={(e) => handleRewards(e)}
                                        >
                                            <p className="mb-0">
                                                Claimed Rewards
                                            </p>
                                        </button>
                                        <button
                                            ref={unClaimedPrizeButtonRef}
                                            className="btn_unclaim position-relative"
                                            onClick={(e) => handleRewards(e)}
                                        >
                                            <p className="mb-0">
                                                Unclaimed Rewards
                                            </p>
                                            <div
                                                className="unclaimed-status-icon"
                                                ref={unClaimedPrizeAvailableRef}
                                            />
                                        </button>
                                        <div
                                            className="glider"
                                            ref={gliderRef}
                                        />
                                    </div>
                                </div>
                                {/* CLAIMED */}
                                {claimedPrizesData?.map((data, i) => {
                                    return (
                                        data?.claimedOn > 0 && (
                                            <div
                                                className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3 claimed"
                                                key={`claimed-${i}`}
                                            >
                                                <div className="row">
                                                    <div className="col-12 px-md-2">
                                                        <div
                                                            className="card-wrapper"
                                                            style={{
                                                                backgroundImage: `url("${data.prizeImageUrl}")`,
                                                            }}
                                                            onClick={() => {
                                                                setClaimedPrizeDetails(
                                                                    data
                                                                );
                                                                setIsClaimedDetailPopupOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <div className="overlay"></div>
                                                            <div className="badges">
                                                                {data.prizeContent ||
                                                                    prizeTypeDict[
                                                                        data
                                                                            .prizeType
                                                                    ]}
                                                            </div>
                                                            <div className="prize-text">
                                                                <div className="card-title pl-3">
                                                                    {
                                                                        data.prizeTitle
                                                                    }
                                                                </div>
                                                                <div className="card-subtitle pl-3">
                                                                    {`Claimed on ${getClaimedDate(
                                                                        data.claimedOn
                                                                    )}`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    );
                                })}
                                {claimedPrizes.length === 0 && (
                                    <div className="col-12 claimed">
                                        <h4>
                                            You have not won any rewards yet.
                                        </h4>
                                        <p>
                                            But don't give up.{" "}
                                            <Link to="/" onClick={scrollToTop}>
                                                Click here
                                            </Link>{" "}
                                            to look for more rewards. The next
                                            one might be yours.
                                        </p>
                                    </div>
                                )}
                                {/* UNCLAIMED */}
                                {unClaimedPrizesData?.map((data, i) => (
                                    <div
                                        className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3 unclaimed d-none"
                                        key={`unclaimed-${i}`}
                                    >
                                        <Link
                                            to={{
                                                pathname:
                                                    getRemainingDaysToClaim(
                                                        data?.createdOn
                                                    ) !== "Expired"
                                                        ? `/claim/${data.id}`
                                                        : "#",
                                            }}
                                        >
                                            <div className="row">
                                                <div className="col-12 px-md-2">
                                                    <div
                                                        className="card-wrapper"
                                                        style={{
                                                            backgroundImage: `url("${data.prizeImageUrl}")`,
                                                        }}
                                                    >
                                                        <div className="overlay"></div>
                                                        <div className="col-12 py-3">
                                                            <div className="badges mb-1">
                                                                {data.prizeContent ||
                                                                    prizeTypeDict[
                                                                        data
                                                                            .prizeType
                                                                    ]}
                                                            </div>
                                                        </div>
                                                        <div className="prize-text">
                                                            <div className="card-title pl-3">
                                                                {
                                                                    data.prizeTitle
                                                                }
                                                            </div>
                                                            <div className="card-subtitle pl-3">
                                                                {getRemainingDaysToClaim(
                                                                    data.createdOn
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                                {unClaimedPrizesData.length === 0 && (
                                    <div className="col-12 unclaimed d-none">
                                        <h4>You have no rewards to claim.</h4>
                                        <p>
                                            But don't give up.{" "}
                                            <Link to="/" onClick={scrollToTop}>
                                                Click here
                                            </Link>{" "}
                                            to look for more rewards. The next
                                            one might be yours.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Rewards;
