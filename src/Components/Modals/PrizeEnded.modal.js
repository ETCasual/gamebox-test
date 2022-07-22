import { useEffect } from "react";

const PrizeEndedModalPopup = ({ handleContinueBtn }) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="pop-up-panel col-12 col-md-6 position-relative">
                <div className="row justify-content-center mx-auto col-10 p-3 m-0">
                    <div className="mb-2">
                        <p className="title text-center mt-2 mt-sm-5 mb-4">
                            PRIZE HAS ENDED
                        </p>
                        <p className="subtitle text-center pb-5 m-0">
                            Please return to homepage to reveal the winner.
                        </p>
                        <button
                            className="btn-yes w-100 py-3 mt-2 mb-2 mb-sm-5"
                            onClick={handleContinueBtn}
                        >
                            CONTINUE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrizeEndedModalPopup;
