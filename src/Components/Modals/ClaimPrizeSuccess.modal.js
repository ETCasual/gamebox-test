import { Link, useHistory } from "react-router-dom";
import getFroyoGamesContactUrl from "Utils/GetFroyoGamesContact";

const ClaimPrizeModalSuccess = ({
    unClaimedPrizes,
    selectedPrize,
    setConfirmationModal,
}) => {
    const history = useHistory();

    const handleContinueClaimReward = () => {
        const _unclaimedPrizes = [...unClaimedPrizes];
        if (_unclaimedPrizes.length > 0) {
            const idx = _unclaimedPrizes.findIndex(
                (e) => e.id === selectedPrize.id
            );
            if (idx > -1) {
                _unclaimedPrizes.splice(idx, 1);
                history.push(`/claim/${_unclaimedPrizes[0].id}`);
            } else {
                history.push(`/claim/${_unclaimedPrizes[0].id}`);
            }
            setConfirmationModal(false);
        }
    };

    return (
        <>
            {/* ALL PRIZES CLAIMED - CONTINUE TO REWARD PAGE MODAL  */}
            {unClaimedPrizes.length === 0 && (
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="modal-body-small text-left">
                        <p className="title">
                            A confirmation email will be sent to you shortly.
                        </p>
                        <p className="subtitle">
                            If you did not receive the email within 72 hours,
                            please contact us at{" "}
                            <a
                                className="email"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={getFroyoGamesContactUrl()}
                            >
                                Froyo Games
                            </a>
                        </p>
                        <div className="p-0 btn-wrapper d-flex mt-4">
                            <Link
                                to={{ pathname: "/profile/rewards" }}
                                className="w-100"
                            >
                                <button className="btn-yes w-100 m-0">
                                    Continue
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            {/* CONTINUE CLAIM MODAL OR CLAIM LATER MODAL */}
            {unClaimedPrizes.length > 0 && (
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="modal-body-small text-left p-3">
                        <p className="title">
                            A confirmation email will be sent to you shortly.
                        </p>
                        <p className="subtitle">
                            If you did not receive the email within 72 hours,
                            please contact us at{" "}
                            <a
                                className="email"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={getFroyoGamesContactUrl()}
                            >
                                Froyo Games
                            </a>
                        </p>
                        <div className="p-0 btn-wrapper d-flex flex-column mt-4">
                            <button
                                className="btn-yes continue w-100 m-0"
                                onClick={() => handleContinueClaimReward()}
                            >
                                Claim next reward
                            </button>
                            <Link to={{ pathname: "/profile/rewards" }}>
                                <button className="claim-later-btn w-100">
                                    Claim later
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClaimPrizeModalSuccess;
