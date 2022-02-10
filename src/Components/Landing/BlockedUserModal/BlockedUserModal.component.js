import React from "react";

const BlockedUserModal = ({ setBlockedArchivedModal }) => {
    const getAccountErrorType = () => {
        const type = sessionStorage.getItem("errorType") || null;
        if (type !== null && type === "Blocked") return "Blocked";
        else if (type !== null && type === "Archived") return "Archived";
        else return false;
    };

    return (
        <div className="blocked-modal">
            <div className="wrapper p-4 d-flex flex-column align-items-center justify-content-center">
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
                <p className="mb-3">
                    For more information, please contact support at
                    hello@esportsmini.com
                </p>
                <button onClick={() => setBlockedArchivedModal(false)}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default BlockedUserModal;
