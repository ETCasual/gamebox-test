import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "Global.scss";
import "swiper/swiper-bundle.min.css";
import { Provider } from "react-redux";
import store from "redux/store";
import App from "./App";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./i18n";
import { register } from "serviceWorker";

// import * as serviceWorker from "./serviceWorker";
const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITEKEY;

window.cdn =
    "https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/assets/";

ReactDOM.render(
    // REDUX STORE PROVIDER
    <Provider store={store}>
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
            <React.Suspense fallback="loading">
                <App />
            </React.Suspense>
        </GoogleReCaptchaProvider>
    </Provider>,
    document.getElementById("root")
);

register();
// serviceWorker.fcmRegister();
