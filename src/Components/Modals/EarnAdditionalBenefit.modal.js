import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const EarnAdditionalBenefitModal = ({ handleContinueButton, score }) => {
    const { extraEarning } = useSelector((state) => state.playerTournamentInfo);

    const { t } = useTranslation();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small text-center">
                <p className="additional mb-2">
                    {extraEarning.experience > 0
                        ? t("additionalBenefit.ticket_exp")
                        : t("additionalBenefit.ticket")}
                </p>
                {score >= 0 && (
                    <p className="subtitle mb-3">
                        {t("additionalBenefit.point", { pts: score })}
                    </p>
                )}
                <div className="benefit d-flex align-items-center justify-content-center">
                    {extraEarning.ticket > 0 && (
                        <p className="mb-0 earn-tickets d-flex align-items-center justify-content-center">
                            {t("additionalBenefit.extra_ticket", {
                                count: extraEarning.ticket,
                            })}
                        </p>
                    )}
                    {extraEarning.ticket > 0 && extraEarning.experience > 0 && (
                        <p className="mx-3 mb-0">&</p>
                    )}
                    {extraEarning.experience > 0 && (
                        <p className="mb-0 earn-exp d-flex align-items-center justify-content-center">
                            {t("additionalBenefit.extra_exp", {
                                expts: extraEarning.experience,
                            })}
                        </p>
                    )}
                </div>
                <div className="p-0 btn-wrapper d-flex flex-column mt-4">
                    <button
                        className={"btn-yes"}
                        onClick={handleContinueButton}
                    >
                        {t("btn.continue")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EarnAdditionalBenefitModal;
