import { Link, useHistory } from "react-router-dom";
import { scrollToTop } from "../../Utils/ScrollToTop";

const SubscriptionModalPopup = ({ handleGetGemsLaterBtn }) => {
    const history = useHistory();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title">Out of Gems?</p>
                <p className="subtitle">
                    It appears that you don't have enough Gems. Gems can be used
                    to purchase free spins and earn additional tickets and
                    experience points.
                </p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="btn-no col p-0"
                        onClick={handleGetGemsLaterBtn}
                    >
                        Get Gems later
                    </button>
                    <div className="col p-0">
                        <Link
                            onClick={scrollToTop}
                            to={{
                                pathname: "/iap",
                                state: {
                                    prevPath: history.location.pathname,
                                },
                            }}
                        >
                            <button className="btn-yes w-100">Get Gems now!</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModalPopup;
