import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Loading() {
    const { loginStatus } = useSelector((state) => state.userData);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="loading-modal d-flex flex-column align-items-center justify-content-center">
            <img
                width={300}
                src={`${window.cdn}logo/logo_gamebox.png`}
                alt="logo"
            />

            {loginStatus.loading && !loginStatus.ready && (
                <p className="loading-text">Loading user details...</p>
            )}
            {loginStatus.ready && (
                <p className="redirect-text">User details loaded!</p>
            )}
        </div>
    );
}

export default Loading;
