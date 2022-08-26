import React from "react";
import { Link, useHistory } from "react-router-dom";

const Index = () => {
    const history = useHistory();

    return (
        <section className="tnc">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-9">
                        <div className="row">
                            {/* BACK BUTTON */}
                            <div className="col-12 mb-3 mb-md-4">
                                <Link
                                    className="back-button"
                                    to={{
                                        pathname: "/profile/settings",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <img
                                        src={`${window.cdn}buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                    <span className="ml-2">Back</span>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-4">
                            {/* MAIN DESCRIPTION */}
                            <div className="col-12 main-desc mb-5">
                                <h4 className="title mb-4">
                                    Terms {"&"} Conditions
                                </h4>
                                <p className="description">
                                    We provide a fun space for you to play games
                                    with your friends and others across the
                                    world. We need your help to keep it an
                                    environment that is safe and fun for you.
                                </p>
                                <p className="description">
                                    These rules apply to all interactions with
                                    others both within the game and in our
                                    respective communities, services and
                                    environments. These standards act as a guide
                                    to how you should interact within our
                                    ecosystems, including but not limited to the
                                    examples below.
                                </p>
                                <p className="description">
                                    Violation of these rules could result in
                                    actions taken against your account including
                                    a permanent ban.
                                </p>
                            </div>
                            {/* PERSONAL INFO */}
                            <div className="col-12 mb-4">
                                <p className="title">Personal Information</p>
                                <p className="description">
                                    We encourage you to never share your
                                    personal information. The sharing of
                                    personal information of others aside from
                                    display names and player IDs are not allowed
                                    across all our games and our various social
                                    ecosystems.
                                </p>
                            </div>
                            {/* BULLYING & HARASSMENT */}
                            <div className="col-12 mb-4">
                                <p className="title">Bullying and Harassment</p>
                                <p className="description">
                                    We believe that respect is the basis of a
                                    good community – when chatting, playing or
                                    creating user names/guild names, any
                                    behaviour that is predatory, threatening,
                                    intimidating, lewd, demeaning, derogatory,
                                    invasive of privacy, or abusive will not be
                                    tolerated.
                                </p>
                            </div>
                            {/* IMPERSONATING OTHERS */}
                            <div className="col-12 mb-4">
                                <p className="title">Impersonating Others</p>
                                <p className="description">
                                    Don’t impersonate or claim to be others,
                                    whether its users, celebrities, officials,
                                    streamers, GameBox staff or anyone else.
                                    Don’t post the work of others and pose it as
                                    your own! This would be considered stealing
                                    and could lead to severe consequences.
                                </p>
                            </div>
                            {/* CHEATING AND ABUSE */}
                            <div className="col-12 mb-4">
                                <p className="title">Cheating and Abuse</p>
                                <p className="description">
                                    Fair play goes a long way to ensure a
                                    satisfying experience. Any discussions or
                                    attempts to cheat or exploit bugs and
                                    glitches that impact the game could lead to
                                    potential banning. If you find any exploits,
                                    we would be grateful if you could report it
                                    to us!
                                </p>
                            </div>
                            {/* DIVERSIIY */}
                            <div className="col-12 mb-4">
                                <p className="title">Diversity</p>
                                <p className="description">
                                    We encourage social interactions between
                                    people of all walks of life. Do not
                                    marginalize, demean or discriminate against
                                    other users or groups.
                                </p>
                            </div>
                            {/* ILLEGAL ACTIVITIES */}
                            <div className="col-12 mb-4">
                                <p className="title">Illegal Activities</p>
                                <p className="description">
                                    Discussions of or active Illegal and
                                    dangerous activities including but not
                                    limited to gambling, drug use, phishing etc
                                    is not allowed. Respect local laws and do
                                    report to us if you find others in the
                                    community discussing or participating in
                                    these illegal activities.
                                </p>
                            </div>
                            {/* CONSEQUENCES */}
                            <div className="col-12 mb-4">
                                <p className="title">Consequences</p>
                                <p className="description">
                                    Violations of any of these rules will be
                                    reviewed on an individual basis, and
                                    appropriate action will be taken if
                                    necessary. Repeat offenses and severity will
                                    be considered before bans or other measures
                                    are taken against the respective accounts on
                                    each game.
                                </p>
                                <p className="description">
                                    Accounts that have been banned may lose
                                    access to the game account, items, digital
                                    currencies, and other items earned or
                                    purchased.
                                </p>
                                <p className="description">
                                    Supporting one another will result in more
                                    fun, joy, and excitement, so let's work
                                    together to create a positive environment!
                                </p>
                            </div>
                            {/* AUTO-RENEWABLE SUBSCRIPTION */}
                            {/* <div className="col-12 mb-4">
                                    <p className="title">
                                        Auto-Renewable Subscription
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            By purchasing the subscription, it
                                            is understood that the subscription
                                            will be automatically renewed unless
                                            turned off or canceled at least
                                            24-hours before the item period
                                            ends.
                                        </li>
                                        <li>
                                            You may cancel your subscription by
                                            proceeding to your Account page on
                                            your respective platform and
                                            choosing to unsubscribe.
                                        </li>
                                        <li>
                                            The cancellation of auto-renewal
                                            will stop subscriptions from the
                                            next cycle. Your current
                                            subscription will still be active
                                            for the remaining duration.
                                        </li>
                                    </ul>
                                </div> */}
                            {/* DATA DELETION REQUEST */}
                            <div className="col-12 mb-4">
                                <p className="title">Data Deletion Request</p>
                                <p className="description">
                                    If you would like us to delete User Provided
                                    Data that you have provided through the
                                    Service, please contact us at{" "}
                                    <a
                                        className="email"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="mailto:support@froyo.games"
                                    >
                                        support@froyo.games
                                    </a>
                                    . Please keep in mind that some or all of
                                    the User Provided Data may be required for
                                    our Service to function properly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
