// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadGemsList from "redux/thunks/GemsList.thunk";

const IAP = ({ handleGemsPaymentPanel }) => {
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
        setGemList(_.orderBy(gemsList, ["id"], ["asc"]));
    }, [gemsList]);

    return (
        <>
            <section id="iap-items">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                            {/* GEMS */}
                            <div className="gems-wrapper">
                                <p className="title mb-4 ml-2 d-flex align-items-end">
                                    Purchase Gems
                                </p>
                                <div className="col-12">
                                    <div className="row">
                                        {gemList.map((gem, i) => (
                                            <div
                                                key={`gems-${i}`}
                                                className={`col-6 col-md-4 col-lg-4 col-xl-3 px-1 px-md-2 px-lg-2 mb-4 pack`}
                                                onClick={() =>
                                                    handleGemsPaymentPanel(
                                                        gem.id,
                                                        gem.price,
                                                        gem.quantity
                                                    )
                                                }
                                            >
                                                <div className="gem-info text-center p-2">
                                                    <p className="mb-1 gem-title text-center">
                                                        {gem.title}
                                                    </p>
                                                    <p className="mb-1 quantity">
                                                        {gem.quantity?.toLocaleString()}{" "}
                                                        GEMS
                                                    </p>
                                                    <img
                                                        width="200"
                                                        className="img-fluid"
                                                        src={gem.ImageUrl}
                                                        alt={gem.title}
                                                    />
                                                </div>
                                                <div className="price mb-0 d-flex flex-column text-center">
                                                    {`${gem?.price?.toFixed(
                                                        2
                                                    )} Froyo Tokens`}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IAP;
