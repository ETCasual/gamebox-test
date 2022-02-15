import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { scrollToTop } from "Utils/ScrollToTop";

const Index = () => {
    const history = useHistory();

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    });

    return (
        <>
            {/* BACK BUTTON */}
            <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                    {/* BACK BUTTON */}
                    <Link
                        onClick={scrollToTop}
                        to={{
                            pathname: "/profile/settings",
                            state: {
                                prevPath: history.location.pathname,
                            },
                        }}
                    >
                        <img
                            className="back-button"
                            width="42"
                            src={`${window.cdn}buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </Link>
                </div>
            </div>

            {/* PRIVACY POLICY */}
            <section className="privacy-policy">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="row">
                                {/* MAIN DESCRIPTION */}
                                <div className="col-12 main-desc mb-5">
                                    <h4 className="title mb-4">
                                        Privacy Policy
                                    </h4>
                                    <p className="description">
                                        This Privacy Policy informs you of our
                                        policies and procedures regarding the
                                        collection, use and disclosure of
                                        personal information we receive from
                                        users. This Privacy Policy applies to
                                        GameBox’s games, websites and
                                        related services, which we here
                                        collectively call the Service. We will
                                        notify you of any material changes by
                                        posting the new Privacy Policy on the
                                        primary access points to our games
                                        service which may be updated from time
                                        to time. You are advised to consult this
                                        policy regularly for any changes.
                                    </p>
                                </div>
                                {/* INFO COLLECTION */}
                                <div className="col-12 main-desc mb-3">
                                    <h4 className="title">
                                        Information Collection and Use:
                                    </h4>
                                </div>
                                {/* PERSONALLY IDENTIFIABLE INFO */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Personally Identifiable Information
                                    </p>
                                    <p className="description">
                                        In the course of using our services, you
                                        may provide us with personally
                                        identifiable information. This refers to
                                        information about you that can be used
                                        to contact or identify you (“Personal
                                        Information”). Personal Information
                                        includes, but is not limited to, your
                                        name and email address. We use your
                                        Personal Information mainly to provide
                                        our services and administer your
                                        inquiries.
                                    </p>
                                    <p className="description">
                                        We use your Personal Information (in
                                        some cases, in conjunction with your
                                        Non-Identifying Information) mainly to
                                        provide our games services, complete
                                        your transactions and administer your
                                        inquiries.
                                    </p>
                                </div>
                                {/* DATA PROVIDED BY YOU */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Data provided by you
                                    </p>
                                    <p className="description">
                                        This is data provided by you and
                                        generated for you when using our Service
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Contact Information (such as but not
                                            limited to name, email address. etc)
                                        </li>
                                        <li>Player Name</li>
                                        <li>Player ID</li>
                                    </ul>
                                </div>
                                {/* DATA COLLETED AUTOMATICALLY */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Data collected automatically
                                    </p>
                                    <p className="description">
                                        This is data that is collected when
                                        using certain features in our service
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>Advertising ID</li>
                                        <li>
                                            ADFA (Apple Identifier for
                                            advertisers)
                                        </li>
                                        <li>Android ID</li>
                                        <li>General Location</li>
                                        <li>
                                            Data Data regarding your use of the
                                            Service, such as gameplay data and
                                            your interactions with other players
                                            within the Service
                                        </li>
                                    </ul>
                                </div>
                                {/* DATA COLLECTED BY OUR PARTNERS */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Data collected by our partners
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Data received by linking with a
                                            third-party tool provided by a
                                            service (such as but not limited to
                                            Facebook, Google Play Game Service
                                            or Game Center)
                                        </li>
                                        <li>
                                            Demographic data (such as to
                                            determine the coarse location of
                                            your IP address)
                                        </li>
                                        <li>Data to fight fraud</li>
                                        <li>
                                            Data for platforms that the games
                                            run on (payment verification etc)
                                        </li>
                                        <li>
                                            Data for advertising and analytics
                                            purposes
                                        </li>
                                    </ul>
                                </div>
                                {/* WHY DATA COLLECTED */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Why is this data collected?
                                    </p>
                                    <p className="description">
                                        The data collected helps us provide our
                                        service including:
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Create accounts that allow you to
                                            save your progress and use our
                                            applications
                                        </li>
                                        <li>Operate the service </li>
                                        <li>Verify and confirm payments</li>
                                        <li>
                                            Provide and deliver products and
                                            services you request
                                        </li>
                                        <li>
                                            Communication and correspondence
                                        </li>
                                    </ul>

                                    <p className="description">
                                        To improve our service for our players
                                        such as:
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>Updates and improvements</li>
                                        <li>
                                            Provide social services within our
                                            service
                                        </li>
                                        <li>Customize our game experience</li>
                                        <li>
                                            Better respond to issues and provide
                                            better support
                                        </li>
                                        <li>
                                            Provide offers in the service, or by
                                            other websites, services and email
                                        </li>
                                        <li>
                                            Share related information such as
                                            updates, alerts and support
                                        </li>
                                        <li>
                                            Enable communication among other
                                            players
                                        </li>
                                    </ul>

                                    <p className="description">
                                        To display personalized advertisements
                                        within the game along with other
                                        websites and services by:
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Track content you access in the
                                            application and your online
                                            behaviour
                                        </li>
                                        <li>
                                            Deliver, target and improve our
                                            advertising and our applications
                                        </li>
                                    </ul>
                                </div>
                                {/* SERVICES SAFE & FAIR */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        We keep our Service safe and fair:
                                    </p>
                                    <p className="description">
                                        In order to keep our services and their
                                        social features safe and fair, prevent
                                        fraud and ensure acceptable use, we have
                                        an interest in processing the necessary
                                        data to:
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Analyze and monitor the use of our
                                            service and social interactions{" "}
                                        </li>
                                        <li>
                                            Moderate communications both
                                            automatically or manually{" "}
                                        </li>
                                        <li>
                                            Take action against players
                                            committing fraud or abuse
                                        </li>
                                    </ul>
                                </div>
                                {/* DATA RETENTION */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Data Retention Policy Managing Your Data
                                    </p>
                                    <p className="description">
                                        All User-Provided data will be retained
                                        as long as you are using our service and
                                        for a reasonable amount of time
                                        thereafter. Collected information will
                                        be retained for up to 24 months and it
                                        may be stored in aggregate after the
                                        duration. If you’d like us to delete
                                        User Provided Data that you have
                                        provided via the Service, please contact
                                        us at{" "}
                                        <Link
                                            className="email"
                                            to={{
                                                pathname:
                                                    "mailto:hello@esportsmini.com",
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            hello@esportsmini.com
                                        </Link>
                                        . Please note that some or all of the
                                        User-Provided Data may be required in
                                        order for our Service to function
                                        properly.
                                    </p>
                                </div>
                                {/* CHILDREN */}
                                <div className="col-12 mb-4">
                                    <p className="title">Children</p>
                                    <p className="description">
                                        We do not knowingly collect, market or
                                        solicit personal data about or direct or
                                        target interest-based advertising to
                                        anyone under the age of 13 or knowingly
                                        allow such persons to use our Services.
                                        If you are under 13, please do not send
                                        any data about yourself to us, including
                                        your name, address, telephone number, or
                                        email address. No one under the age of
                                        13 may provide any personal data. If a
                                        parent or guardian becomes aware that
                                        his or her child has provided us with
                                        information without their consent,
                                        please contact us at{" "}
                                        <Link
                                            className="email"
                                            to={{
                                                pathname:
                                                    "mailto:hello@esportsmini.com",
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            hello@esportsmini.com
                                        </Link>
                                        . We will remove such information within
                                        a reasonable time.
                                    </p>
                                </div>
                                {/* SECURITY */}
                                <div className="col-12 mb-4">
                                    <p className="title">Security</p>
                                    <p className="description">
                                        We are concerned about safeguarding the
                                        confidentiality of your information. We
                                        provide physical, electronic, and
                                        procedural safeguards to protect the
                                        information we process and maintain. For
                                        example, we limit access to this
                                        information to authorized employees and
                                        contractors who need to know that
                                        information in order to operate, develop
                                        or improve our Service. Please be aware
                                        that, although we endeavor to provide
                                        reasonable security for information we
                                        process and maintain, no security system
                                        can prevent all potential security
                                        breaches.
                                    </p>
                                </div>
                                {/* CONSENT */}
                                <div className="col-12 mb-4">
                                    <p className="title">Your Consent</p>
                                    <p className="description">
                                        By using our Service, you are consenting
                                        to our processing of your information as
                                        set forth in this Privacy Policy now and
                                        as amended by us. “Processing,” means
                                        using cookies on a computer/handheld
                                        device or using or touching information
                                        in any way, including, but not limited
                                        to, collecting, storing, deleting,
                                        using, combining and disclosing
                                        information.
                                    </p>
                                </div>
                                {/* CONTACT */}
                                <div className="col-12 mb-4">
                                    <p className="title">Contacting Us</p>
                                    <p className="description">
                                        If you have any questions regarding our
                                        privacy policy or our practices, please
                                        contact us via email at{" "}
                                        <Link
                                            className="email"
                                            to={{
                                                pathname:
                                                    "mailto:hello@esportsmini.com",
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            hello@esportsmini.com
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
