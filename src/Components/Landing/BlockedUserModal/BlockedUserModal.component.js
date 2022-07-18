import React, { useEffect } from "react";

const BlockedUserModal = ({ setBlockedArchivedModal }) => {
    const getAccountErrorType = () => {
        const type = sessionStorage.getItem("errorType") || null;
        if (type !== null && type === "Blocked") return "Blocked";
        else if (type !== null && type === "Archived") return "Archived";
        else if (type !== null && type === "Unusual") return "Unusual";
        else return false;
    };

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => {
            sessionStorage.removeItem("errorType");
            document.documentElement.style.overflowY = "visible";
        };
    }, []);

    return (
        <div className="blocked-modal">
            <div className="wrapper p-4 d-flex flex-column align-items-start justify-content-start">
                {getAccountErrorType() === "Blocked" && (
                    <>
                        <h3>Your account has been Blocked.</h3>
                        <p className="mb-3">
                            We’ve detected unusual activity on your account and
                            have blocked your account as a security precaution.
                        </p>
                    </>
                )}
                {getAccountErrorType() === "Archived" && (
                    <>
                        <h3>Your account has been Archived.</h3>
                        <p className="mb-3">
                            We’ve detected unusual activity on your account and
                            have blocked your account as a security precaution.
                        </p>
                    </>
                )}
                {getAccountErrorType() === "Unusual" && (
                    <>
                        <h3>Unusual Activity!</h3>
                        <p className="mb-3">
                            We noticed unusual activity in your GameBox account
                            and have logged you out.
                        </p>
                    </>
                )}

                <p className="mb-3">
                    For more information, please contact support at{" "}
                    <span>
                        <a href="mailto:support@froyo.games">
                            support@froyo.games
                        </a>
                    </span>
                </p>
                <button
                    className="p-3"
                    onClick={() => setBlockedArchivedModal(false)}
                >
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default BlockedUserModal;
