import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "Global.scss";
import { Provider } from "react-redux";
import store from "redux/store";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

window.cdn =
    "https://gamebox-froyo.s3.ap-southeast-1.amazonaws.com/app/assets/";

ReactDOM.render(
    // REDUX STORE PROVIDER
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// serviceWorker.register();
// serviceWorker.fcmRegister();
