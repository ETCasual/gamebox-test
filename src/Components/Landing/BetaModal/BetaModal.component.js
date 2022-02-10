import React from "react";

const BetaModal = ({ setModal }) => {
    return (
        <div className="beta-modal">
            <div className="wrapper p-4 d-flex flex-column align-items-center justify-content-center">
                <img
                    width={110}
                    className="img-fluid"
                    src={`${window.cdn}art_assets/logo/logo_esportsmini.png`}
                    alt="Esports Mini"
                />
                <p className="mt-4 mb-5">
                    Welcome to Esports Mini. We have closed our Playtest Phase
                    1. As of 30 December 2021, no real prize will be given to
                    the winners.
                    <br />
                    <br />
                    <span className="region-clause">
                        Please be informed that tournaments are open to people
                        with Malaysian address and prizes will only be given to
                        participants with Malaysian address only!
                    </span>
                </p>
                <button onClick={() => setModal(false)}>Continue</button>
            </div>
        </div>
    );
};

export default BetaModal;
