// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadGemsList from "redux/thunks/GemsList.thunk";
import { useTranslation } from "react-i18next";

const IAPCardGemPacks = ({ handleSelectedGemPackPayment }) => {
    const { user } = useSelector((state) => state.userData);
    const { gemsList } = useSelector((state) => state.gemsList);
    const { ipInfo, exchangeRate } = useSelector((state) => state.exchangeRate);
    const dispatch = useDispatch();

    const [gemList, setGemList] = useState([]);

    // ON RELOAD
    useEffect(() => {
        if (
            performance.getEntriesByType("navigation")[0] &&
            performance.getEntriesByType("navigation")[0].type === "reload"
        ) {
            if (user.id) dispatch(loadGemsList());
        }
    }, [dispatch, user.id]);

    // GEMS
    useEffect(() => {
        const creditCardGemPacks = gemsList.filter(
            (g) => g.paymentTypeId === 1
        );
        setGemList(_.orderBy(creditCardGemPacks, ["id"], ["asc"]));
    }, [gemsList]);

    const { t } = useTranslation();

    return (
        <div className="col-12">
            <div className="row">
                {gemList.map((gem, i) => (
                    <div
                        key={`gems-${i}`}
                        className={`col-12 col-sm-6 col-md-4 px-1 px-md-2 px-lg-2 mb-4 pack ${
                            gem?.status === 0 ? "opacity-0-5" : ""
                        }`}
                    >
                        <div
                            style={{
                                cursor:
                                    gem?.status === 1 ? "pointer" : "default",
                            }}
                            onClick={() =>
                                gem?.status === 1
                                    ? handleSelectedGemPackPayment(
                                          gem.id,
                                          gem.price,
                                          gem.quantity
                                      )
                                    : null
                            }
                        >
                            <div className="gem-info text-center position-relative">
                                <p className="mb-1 pt-2 gem-title text-center">
                                    {gem.title}
                                </p>
                                <p className="mb-1 quantity">
                                    {t("iap.cards.gem_count", {
                                        count: gem.quantity?.toLocaleString(),
                                    })}
                                </p>
                                <img
                                    className="img-fluid"
                                    src={gem.ImageUrl}
                                    alt={gem.title}
                                />
                            </div>
                            <div className="price-wrapper mb-0 d-flex flex-column align-items-center justify-content-center">
                                <p className="mb-1 price">
                                    {t("iap.payment.currency", {
                                        price: gem?.price?.toFixed(2),
                                    })}
                                </p>
                                {ipInfo?.currency &&
                                    ipInfo?.currency !== "SGD" && (
                                        <p className="mb-0 estimation">
                                            {t("iap.payment.estimated_price")}
                                            {exchangeRate?.rates[
                                                ipInfo?.currency
                                            ] && (
                                                <span className="estimation-value">
                                                    {`${
                                                        ipInfo?.currency ===
                                                        "MYR"
                                                            ? "RM"
                                                            : ipInfo?.currency
                                                    }
                                                    ${(
                                                        exchangeRate?.rates[
                                                            ipInfo?.currency
                                                        ] * gem?.price
                                                    ).toFixed(2)}`}
                                                </span>
                                            )}
                                        </p>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IAPCardGemPacks;
