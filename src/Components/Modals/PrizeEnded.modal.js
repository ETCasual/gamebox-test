import { useEffect } from "react";

const PrizeEndedModalPopup = ({ handleContinueBtn }) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small position-relative">
                <div className="col-12 p-3">
                    <p className="title">
                        The prize has ended. Please return to homepage to reveal
                        the winner.
                    </p>
                    <button className="btn-yes w-100" onClick={handleContinueBtn}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default PrizeEndedModalPopup;
