// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadGemsList from "redux/thunks/GemsList.thunk";
import { useTranslation } from "react-i18next";

const IAPFroyoGemPacks = ({ handleSelectedGemPackPayment }) => {
    const { user } = useSelector((state) => state.userData);
    const { gemsList } = useSelector((state) => state.gemsList);
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
        const froyoGemPacks = gemsList.filter((g) => g.paymentTypeId === 2);
        setGemList(_.orderBy(froyoGemPacks, ["id"], ["asc"]));
    }, [gemsList]);

    const { t } = useTranslation();

    // TODO:: DISBALED PACKS ON PURCHASE
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
                                <div>
                                    <img
                                        className="img-fluid"
                                        src={gem.ImageUrl}
                                        alt={gem.title}
                                    />
                                </div>
                            </div>
                            <div className="price-wrapper mb-0 d-flex flex-column align-items-center justify-content-center">
                                <p className="price mb-0 d-flex align-items-center">
                                    <img
                                        width="24"
                                        src={`${window.cdn}icons/icon_froyo.png`}
                                        alt="wallet"
                                        className="mr-2"
                                    />
                                    {gem?.price?.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IAPFroyoGemPacks;
