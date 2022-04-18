import { useEffect } from "react";
import { isBrowser } from "react-device-detect";

const SelectWalletsModalPopup = ({ handleInstructionsCloseBtn, handleConnectMetamask, handleConnectWalletConnect }) => {
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-connect-wallet position-relative p-0">
                <img
                    className="close-button"
                    onClick={handleInstructionsCloseBtn}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />
                <div className="col-12 p-4 connect-wallet-title-wrapper">
                    <h5 className="title">Connect wallet</h5>
                </div>
                <div className="col-12 my-5 connect-wallet-list">
                    <div className="d-flex align-items-center">
                        {isBrowser &&
                            <div className="col-6 connect-wallet-item text-center"
                                onClick={handleConnectMetamask}>
                                <img
                                    className="icon"
                                    width="64"
                                    height="64"
                                    src={`${window.cdn}logo/logo_metamaskfox_01.png`}
                                    alt="metamask"
                                />
                                <p className="wallet-name">
                                    Metamask
                                </p>
                            </div>
                        }
                        <div className="col-6 connect-wallet-item text-center"
                            onClick={handleConnectWalletConnect}>
                            <img
                                className="icon"
                                width="64"
                                height="64"
                                src={`${window.cdn}logo/logo_walletconnect_01.png`}
                                alt="metamask"
                            />
                            <p className="wallet-name">
                                WalletConnect
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectWalletsModalPopup;
