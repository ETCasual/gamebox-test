// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useEffect, useState } from "react";

// COMPONENTS
import Navbar from "Components/Landing/Navbar/Navbar.component";
import Login from "Components/Landing/Content/Login.component";
import { useSelector } from "react-redux";
import NavigationHOC from "Components/Global/NavigationHOC.component";
import { useHistory } from "react-router";
import { Trans, useTranslation } from "react-i18next";

// HELPER FUNCTION

const Index = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [isFirstEncounter, setIsFirstEncounter] = useState(true);
    const { push } = useHistory();
    const { user } = useSelector((state) => state.userData);
    const { t } = useTranslation();
    useEffect(() => {
        // TODO: Check why user cant be fetched at this page
        user.id && setLoginModal(false);
        user.id && !isFirstEncounter && push("/");
    }, [user.id, push, isFirstEncounter]);
    return (
        <>
            {/* TOP NAVIGATION BAR */}
            {user.id ? (
                <NavigationHOC />
            ) : (
                <Navbar setLoginModal={setLoginModal} />
            )}

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
