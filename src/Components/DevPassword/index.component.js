import React, { useState, useEffect } from "react";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

import Landing from "Pages/Landing.page";

import { getCookie, saveCookie } from "Utils/ManageCookies";

const Index = () => {
    const [state, setstate] = useState("");

    useEffect(() => {
        const cookieRes = getCookie("devAuthHash");
        if (cookieRes) {
            setstate(cookieRes);
            handleAuthPassword(cookieRes);
        }
    }, []);

    const handleAuthPassword = (cookie) => {
        const passHash = hmacSHA512(
            cookie,
            process.env.REACT_APP_SECRET_PHRASE
        );
        const hashInBase64 = Base64.stringify(passHash);
        if (process.env.REACT_APP_AUTHENTICATION === hashInBase64) {
            saveCookie("devAuthHash", hashInBase64);
            setstate(hashInBase64);
        }
    };

    return (
        <>
            {process.env.REACT_APP_AUTHENTICATION !== state && (
                <div className="container d-flex align-items-center justify-content-center min-vh-100">
                    <div className="d-flex flex-column">
                        <img
                            className="img-fluid mb-4 mx-auto"
                            width="200"
                            src={`${window.cdn}art_assets/logo/logo_esportsmini.png`}
                            alt="Esports Mini"
                        />
                        <input
                            className="p-2 rounded border"
                            placeholder="Type password here"
                            type="password"
                            onChange={(e) => handleAuthPassword(e.target.value)}
                        />
                    </div>
                </div>
            )}
            {process.env.REACT_APP_AUTHENTICATION === state && <Landing />}
        </>
    );
};

export default Index;
