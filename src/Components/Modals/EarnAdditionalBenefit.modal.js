import { useSelector } from "react-redux";

const EarnAdditionalBenefitModal = ({ handleContinueButton }) => {
    const score = localStorage.getItem("currentGameScore");

    const { extraEarning } = useSelector((state) => state.playerTournamentInfo);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small text-center">
                <p className="additional mb-2">
                    {`Additional tickets ${
                        extraEarning.experience > 0
                            ? "and experience points"
                            : ""
                    } earned`}
                </p>
                {score >= 0 && (
                    <p className="subtitle mb-3">You scored {score} points.</p>
                )}
                <div className="benefit d-flex align-items-center justify-content-center">
                    {extraEarning.ticket > 0 && (
                        <p className="mb-0 earn-tickets d-flex align-items-center justify-content-center">
                            {extraEarning.ticket} tickets
                        </p>
                    )}
                    {extraEarning.ticket > 0 && extraEarning.experience > 0 && (
                        <p className="mx-3 mb-0">{"&"}</p>
                    )}
                    {extraEarning.experience > 0 && (
                        <p className="mb-0 earn-exp d-flex align-items-center justify-content-center">
                            {extraEarning.experience} exp
                        </p>
                    )}
                </div>
                <div className="p-0 btn-wrapper d-flex flex-column mt-4">
                    <button
                        className={"btn-yes"}
                        onClick={handleContinueButton}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EarnAdditionalBenefitModal;
