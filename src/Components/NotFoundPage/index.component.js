// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useEffect, useState } from "react";

// COMPONENTS
// import Navbar from "Components/Landing/Navbar/Navbar.component";
import Login from "Components/Landing/Content/Login.component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Trans, useTranslation } from "react-i18next";
import { getToken } from "Utils/GetToken";
import { loadLoginStatus } from "redux/thunks/Login.thunk";
import { RiHome2Line, RiArrowGoBackFill } from "react-icons/ri";

// HELPER FUNCTION

const Index = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [isFirstEncounter, setIsFirstEncounter] = useState(true);
    const { push } = useHistory();
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();

    useEffect(() => {
        user.id && setLoginModal(false);
        user.id && !isFirstEncounter && push("/");
    }, [user.id, push, isFirstEncounter, dispatch]);

    useEffect(() => {
        const token = getToken();
        dispatch(
            loadLoginStatus({
                noAuth: token === null && user.id === null ? true : false,
                loading: token !== null && user.id === null ? true : false,
                ready: token !== null && user.id > 0 ? true : false,
            })
        );
    }, [user.id, dispatch]);
    return (
        <>
            {/* TOP NAVIGATION BAR */}

            {/*  <HeaderHOC /> */}

            <section id="not_found_page">
                <div className="container-fluid px-0">
                    <div className="col-12 col-md-10 col-xl-7 mx-auto main-wrapper">
                        <div className="row-col justify-content-center text-center">
                            <div className="col">
                                <img
                                    src={`${window.cdn}assets/error404.png`}
                                    alt="error"
                                />
                            </div>
                            <div className="col my-5">
                                <p className="title">{t("404.title")}</p>
                            </div>
                            <div className="col">
                                <p>
                                    <Trans i18nKey="404.subtitle">
                                        <>0</>
                                        <br />
                                        <>2</>
                                    </Trans>
                                </p>
                            </div>
                            <div className="col-btn">
                                <div
                                    className="cta-btn mb-2"
                                    onClick={() => history.goBack()}
                                >
                                    <RiArrowGoBackFill size={27} />{" "}
                                    {t("btn.back")}
                                </div>
                                <div
                                    className="cta-btn"
                                    onClick={() => history.push("/")}
                                >
                                    <RiHome2Line size={27} /> {t("btn.home")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {loginModal && (
                <Login
                    setLoginModal={setLoginModal}
                    setIsFirstEncounter={setIsFirstEncounter}
                />
            )}
        </>
    );
};

export default Index;
