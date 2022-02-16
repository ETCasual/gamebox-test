import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { gsap } from "gsap";
import {
    _firebase,
    auth,
    googleProvider,
    faceboookProvider,
} from "../../../firebase";

const LoginModal = ({ loginRef, loginWrapperRef }) => {
    const history = useHistory();

    useEffect(() => {
        history.push("/");
    }, [history]);

    const onClickLoginPanel = () => {
        gsap.to(loginWrapperRef.current, {
            duration: 1,
            bottom: "-50em",
            ease: "power2.out",
            onStart: () => {
                gsap.to(loginRef.current, {
                    delay: 0.5,
                    duration: 1,
                    autoAlpha: 0,
                    display: "none",
                    ease: "power2.out",
                });
            },
        });
    };

    // GOOGLE LOGIN
    const googleSignIn = async () => {
        try {
            await _firebase
                .auth()
                .setPersistence(_firebase.auth.Auth.Persistence.LOCAL);
            googleProvider.addScope("profile");
            googleProvider.addScope("email");
            const result = await auth.signInWithPopup(googleProvider);
            if (result) {
                sessionStorage.setItem("provider", "google");

                // const isDefault = await isGDefaultImage(
                //     result.credential.accessToken
                // );
                // let user = _firebase.auth().currentUser;
                // user.updateProfile({
                //     photoURL: isDefault
                //         ? "https://avatars.dicebear.com/4.4/api/human/john.svg"
                //         : result.user.providerData[0].photoURL,
                // });

                // ADD LOCALSTORAGE ONLY IF USER IS NEW
                if (result.additionalUserInfo.isNewUser)
                    localStorage.setItem(
                        "isNewUser",
                        result.additionalUserInfo.isNewUser
                    );

                setTimeout(() => {
                    history.push("/");
                }, 500);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    // FACEBOOK LOGIN
    const facebookSignIn = async () => {
        try {
            await _firebase
                .auth()
                .setPersistence(_firebase.auth.Auth.Persistence.LOCAL);
            faceboookProvider.addScope("public_profile");
            faceboookProvider.addScope("email");
            const result = await auth.signInWithPopup(faceboookProvider);
            if (result) {
                sessionStorage.setItem("provider", "facebook");
                nextStep(result);
                // photoURLLarge(
                //     result.user.photoURL.split("/picture")[0],
                //     result.credential.accessToken
                // )
                //     .then((photo) => {
                //         console.log(photo);
                //         if (photo) {
                //             let user = _firebase.auth().currentUser;
                //             user.updateProfile({
                //                 providerId: result.user.providerId,
                //                 displayName: result.user.displayName,
                //                 email: result.user.email,
                //                 photoURL: !photo ? result.user.photoURL : photo,
                //             });
                //         }

                //         nextStep(result);
                //     })
                //     .catch((error) => {
                //         console.log(error);
                //         nextStep(result);
                //     });

                function nextStep(result) {
                    if (result.additionalUserInfo.isNewUser)
                        localStorage.setItem(
                            "isNewUser",
                            result.additionalUserInfo.isNewUser
                        );

                    setTimeout(() => history.push("/"), 500);
                }
            }
        } catch (error) {
            if (
                error.code === "auth/account-exists-with-different-credential"
            ) {
                let existingEmail = error.email;
                let pendingCred = error.credential;

                // CHECKING IF ACCOUNT EXISTS WITH DIFFERENT PROVIDER
                auth.fetchSignInMethodsForEmail(existingEmail).then(function (
                    providers
                ) {
                    if (providers?.[0]?.includes("google")) {
                        // Sign in user to Google with same account.
                        googleProvider.setCustomParameters({
                            login_hint: existingEmail,
                        });

                        auth.signInWithPopup(googleProvider).then(function (
                            result
                        ) {
                            // Link Facebook OAuth credential to existing account.
                            result.user.linkWithCredential(pendingCred);
                            sessionStorage.setItem("provider", "facebook");
                            setTimeout(() => history.push("/"), 500);
                        });
                    } else {
                        console.log("Login: Something went wrong!");
                    }
                });
            }
        }
    };

    return (
        <div className="login" ref={loginRef}>
            <div className="overlay" onClick={onClickLoginPanel} />
            <div
                className="w-100 login-wrapper d-flex flex-column align-items-center justify-content-between"
                ref={loginWrapperRef}
            >
                <div className="col-12 px-3 pt-5 pb-4 content d-flex flex-column align-items-center justify-content-between">
                    <p className="title mb-4">Start your winnings now!</p>
                    <button className="facebook" onClick={facebookSignIn}>
                        <div className="row align-items-center">
                            <div className="col-2 px-1">
                                <img
                                    src={`${window.cdn}social_media/logo_facebook.png`}
                                    alt="facebook"
                                />
                            </div>
                            <div className="col-10 px-1">
                                <span>Sign in with Facebook</span>
                            </div>
                        </div>
                    </button>
                    <button className="google" onClick={googleSignIn}>
                        <div className="row align-items-center">
                            <div className="col-2">
                                <img
                                    src={`${window.cdn}social_media/logo_google.png`}
                                    alt="google"
                                />
                            </div>
                            <div className="col-10 text-left">
                                <span>Sign in with Google</span>
                            </div>
                        </div>
                    </button>
                    <p className="terms text-center mt-3">
                        By creating an account, you agree to our{" "}
                        <Link to={{ pathname: "/terms-and-conditions" }}>
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to={{ pathname: "/privacy-policy" }}>
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
