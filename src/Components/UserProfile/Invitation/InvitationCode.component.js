// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AES from "crypto-js/aes";

const Invitation = ({ handleBackButton }) => {
    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);

    const [copiedText, setCopiedText] = useState(false);

    let shareUrl = "";

    const encryption = AES.encrypt(
        user.id.toString(),
        process.env.REACT_APP_SECRET_PHRASE
    ).toString();
    const ciphertext = encodeURIComponent(encryption);

    shareUrl = `Hey! Use my link to sign up for GameBox and get ${config.gemsPerInvite} gems immediately after you register. \n\nSign up at: ${window.location.origin}/invite/${ciphertext}`;

    const handleInvite = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopiedText(true);

        setTimeout(() => {
            setCopiedText(false);
        }, 3000);
    };

    return (
        <section id="your-team">
            <div className="container invitation-modal">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6">
                        <div className="row">
                            <div className="col-12 team-wrapper">
                                {/* CLOSE BUTTON */}
                                <img
                                    className="close-button"
                                    onClick={handleBackButton}
                                    src={`${window.cdn}buttons/button_close.png`}
                                    alt="close-btn"
                                />
                                {/* TITLE & SUBTITLE */}
                                <div className="main-title">
                                    <p className="title mb-2 mb-md-3">
                                        Add Friends {"&"} Get Gems
                                    </p>
                                    <p className="subtitle mb-1">
                                        {`Share your referral code with your
                                            friends and get ${config.gemsPerInvite} Gems on us (for
                                            you and your friend) when your
                                            friend creates an account with us.`}
                                    </p>
                                </div>
                                {/* INVITATION CODE */}
                                <div
                                    className="text-center invite mt-3 mt-md-4 p-3"
                                    onClick={handleInvite}
                                >
                                    {!copiedText && (
                                        <p className="invite-label mb-1 mb-md-2">
                                            Tap to copy
                                        </p>
                                    )}
                                    {/* COPIED TEXT */}
                                    {copiedText && (
                                        <p className="text-center copied mb-1 mb-md-2">
                                            Copied!
                                        </p>
                                    )}
                                    <p className="invite-link mb-1">
                                        {`${
                                            window.location.origin
                                        }/invite/${ciphertext.slice(0, 5)}...`}
                                    </p>
                                </div>
                                {/* FOOTER */}
                                <div className="invitation-footer d-flex justify-content-between">
                                    <p className="terms-conditions mt-3 mt-md-4">
                                        Terms and conditions apply.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Invitation;
