import { Link } from "react-router-dom";

const InsufficientGemsModal = ({ setOutOfGems }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2">INSUFFICIENT GEMS.</p>
                <p className="subtitle pl-2">
                    You are out of gems. Please purchase more gems to continue.
                </p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="col btn-no"
                        onClick={() => setOutOfGems(false)}
                    >
                        CANCEL
                    </button>
                    <button className="col btn-yes">
                        <Link to={"/iap"} className="purchase-gems-button">
                            PURCHASE GEMS
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsufficientGemsModal;
