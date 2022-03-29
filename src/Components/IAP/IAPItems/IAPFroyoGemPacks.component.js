// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadGemsList from "redux/thunks/GemsList.thunk";

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
        // TODO: FILTER FROYO GEMS
        setGemList(_.orderBy(gemsList, ["id"], ["asc"]));
    }, [gemsList]);

    return (
        <div className="col-12">
            <div className="row">
                {gemList.map((gem, i) => (
                    <div
                        key={`gems-${i}`}
                        className={`col-12 col-md-4 col-lg-4 col-xl-3 px-1 px-md-2 px-lg-2 mb-4 pack ${
                            gem?.status === 0 ? "opacity-0-5" : ""
                        }`}
                        style={{
                            cursor: gem?.status === 1 ? "pointer" : "default",
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
                        <div className="gem-info text-center p-2">
                            <p className="mb-1 gem-title text-center">
                                {gem.title}
                            </p>
                            <p className="mb-1 quantity">
                                {gem.quantity?.toLocaleString()} GEMS
                            </p>
                            <img
                                width="200"
                                className="img-fluid"
                                src={gem.ImageUrl}
                                alt={gem.title}
                            />
                        </div>
                        <div className="price-wrapper mb-0 d-flex flex-column align-items-center justify-content-center">
                            <p className="price mb-0">
                                {`${gem?.price?.toFixed(2)} Froyo Tokens`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IAPFroyoGemPacks;
