import { Link, useHistory } from "react-router-dom";

const InsufficientBalanceModalPopup = ({
    onCloseClicked,
    onBuyClicked = () => { }
}) => {
    const history = useHistory();

    return (
        <>
            <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                <div className="modal-body-insufficient-balance position-relative">
                    {/* CLOSE BTN */}
                    <img
                        className="close-button"
                        onClick={onCloseClicked}
                        width="36"
                        src={`${window.cdn}buttons/button_close.png`}
                        alt="close-btn"
                    />

                    <div className="d-flex flex-column align-items-center justify-content-center my-4">
                        <div className="col-12 col-md-8 p-2">
                            <p className="title text-center">
                                INSUFFICIENT GEMS
                            </p>

                            <p className="subtitle text-center my-4">
                                Out of Gems?
                            </p>

                            <Link
                                className="buttons"
                                to={{
                                    pathname: "/iap",
                                    state: {
                                        prevPath: history.location.pathname,
                                    },
                                }}
                                onClick={onBuyClicked}
                            >
                                <button
                                    className="buy-btn d-flex flex-column align-items-center justify-content-center m-auto"
                                >
                                    Get it Now!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InsufficientBalanceModalPopup;
