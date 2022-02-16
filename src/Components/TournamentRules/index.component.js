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
                        className="d-flex align-items-center justify-content-center"
                    >
                        <img
                            className="back-button"
                            width="40"
                            src={`${window.cdn}buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </Link>
                </div>
            </div>

            {/* TOURNAMENT RULES */}
            <section className="tournament-rules">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="row">
                                {/* MAIN DESCRIPTION */}
                                <div className="col-12 main-desc mb-5">
                                    <h4 className="title mb-4">
                                        Prize / Reward / Tournament Rules
                                    </h4>
                                    <small>Effective date: Dec 15, 2021</small>
                                    <p className="subtitle my-4">
                                        Welcome to GameBox.
                                    </p>
                                </div>
                                {/* GENERAL */}
                                <div className="col-12 mb-4">
                                    <p className="title">General</p>
                                    <p className="description">
                                        To win prizes / rewards in GameBox,
                                        there is no purchase or payment of any
                                        kind required to enter the tournaments
                                        for the prizes / rewards.
                                    </p>
                                    <p className="description">
                                        By entering prizes / rewards /
                                        tournaments, all entrants agree to abide
                                        by and be bound by these official prize
                                        / reward / tournament rules and consent
                                        to the use of their personal information
                                        to administer the prize / reward /
                                        tournament.
                                    </p>
                                    <p className="description">
                                        The Prize / Reward Sponsor reserves the
                                        right to alter the rules of the prize /
                                        reward / tournament and cancel the prize
                                        / reward / tournament at any time for
                                        any reason, especially in case of any
                                        suspicion of fraud and violation of the
                                        tournament rules.
                                    </p>
                                </div>
                                {/* PARTICIPANTS */}
                                <div className="col-12 mb-4">
                                    <p className="title">Participants</p>
                                    <p className="description">
                                        The Prize / Reward / Tournament is open
                                        to all registered users of GameBox, who
                                        have reached the age of 18 or the
                                        applicable age of the majority (which is
                                        higher) at the time of entry
                                        ("Participants") and where local
                                        regulations do not prevent in any other
                                        way participation in free tournaments
                                        with physical or digital prizes/rewards.
                                    </p>
                                </div>
                                {/* PRIZE / REWARD / TOURNAMENT PERIOD */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Prize / Reward / Tournament Period
                                    </p>
                                    <p className="description">
                                        The Prize / Reward is announced in the
                                        GameBox application and/or on GameBox
                                        web as a total number of tickets the
                                        prize / reward has collected, that
                                        displays the period until the prize /
                                        reward has a winner.
                                    </p>
                                    <p className="description">
                                        The Bonus Prize / Reward is announced in
                                        the GameBox application and/or on
                                        GameBox web as a countdown that displays
                                        the time until the bonus prize / reward
                                        ends.
                                    </p>
                                    <p className="description">
                                        The Tournament is announced in the
                                        GameBox application and/or on GameBox
                                        web as a countdown that displays the
                                        time until the next Tournament. It is
                                        GameBox's sole discretion to announce a
                                        new prize / reward / tournament or
                                        cancel upcoming prize / reward /
                                        tournament, at any time, without any
                                        reason whatsoever.
                                    </p>
                                </div>
                                {/* PARTICIPATION */}
                                <div className="col-12 mb-4">
                                    <p className="title">Participation</p>
                                    <p className="description">
                                        To enter a Prize / Reward / Tournament,
                                        user needs to:
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Register by connecting with Facebook
                                            or Gmail. In order to register,
                                            Participants need to accept and
                                            agree to the Privacy Statement,
                                            Terms of Use and the Prize / Reward
                                            / Tournament Rules and be at least
                                            18 years of age.
                                        </li>
                                        <li>
                                            Use GameBox App and/or Web to earn
                                            tickets ("Tickets") that are each
                                            worth one (1) entry into the prize /
                                            reward played. Tickets can be earned
                                            in various ways, including (i)
                                            participating in tournaments
                                            (playing games), (ii) using the
                                            spinner, (iii) other defined
                                            activities in the application.
                                            Tickets have no cash value.
                                        </li>
                                        <li>
                                            In the event of a dispute over the
                                            identity of an entrant, each entry
                                            will be considered to have been
                                            submitted by the Registered Owner of
                                            the email address associated with
                                            the entry. "Registered Owner" is
                                            defined as the natural person who is
                                            assigned an email address by an
                                            Internet access provider, on-line
                                            service provider or other
                                            organization/individual that is
                                            responsible for assigning email
                                            addresses for the domain associated
                                            with the submitted email address.
                                        </li>
                                    </ul>
                                </div>
                                {/* PRIZE / REWARD AND WINNING A TOURNAMENT */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Prizes / Rewards and Winning a
                                        Tournament
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            All prizes / rewards are awarded to
                                            the winners by the Prize / Reward
                                            Sponsor. Winners must accept the
                                            Prize / Reward as awarded by the
                                            Prize / Reward Sponsor or the Prize
                                            / Reward will be forfeited. Prizes /
                                            Rewards cannot be transferred or
                                            substituted, except at the Prize /
                                            Reward Sponsor's sole discretion.
                                            Failure to verify or declare a
                                            winner or otherwise unclaimed Prizes
                                            / Rewards will result in such Prizes
                                            / Rewards being forfeited and not
                                            awarded.
                                        </li>
                                        <li>
                                            Selected entrants are notified after
                                            the prize / reward / tournament via
                                            in-app announcement and/or
                                            notification.
                                        </li>
                                    </ul>

                                    <p className="title">Prize / Reward Draw</p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            At the end of each Prize / Reward
                                            Period, a random draw will be held
                                            from among all eligible entries
                                            received during the Tournament
                                            Period to select an entrant(s)
                                            eligible to win the Prize / Reward.
                                        </li>
                                        <li>
                                            All available tickets in the prize
                                            /reward at the moment of the draw
                                            are entered into the prize / reward.
                                        </li>
                                        <li>
                                            The Prize / Reward winner is
                                            announced through GameBox App or/and
                                            GameBox Web, right after the Prize /
                                            Reward Draw.
                                        </li>
                                        <li>
                                            Odds of winning the Prize / Reward
                                            depends upon the number of eligible
                                            entries received by the Prize /
                                            Reward Sponsor during the Prize /
                                            Reward / Tournament Period.
                                        </li>
                                    </ul>

                                    <p className="title">
                                        Bonus prizes / rewards
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            Bonus prizes / rewards participation
                                            is offered as long as participants
                                            enter and win tickets from any
                                            tournament or via the spinner in the
                                            GameBox App or/and GameBox Web.
                                        </li>
                                        <li>
                                            Bonus prizes / rewards offer prizes
                                            / rewards in the form of physical or
                                            digital prizes / rewards.
                                        </li>
                                        <li>
                                            Winner of the bonus prize / reward
                                            is randomly selected from all
                                            participating participants when the
                                            countdown timer ends.
                                        </li>
                                        <li>
                                            Prize / reward sponsor reserves the
                                            right to change the prize / reward /
                                            duration of the prize / reward at
                                            its own discretion.
                                        </li>
                                        <li>
                                            Being granted the prize / reward
                                            requires no purchase or payment of
                                            any kind.
                                        </li>
                                    </ul>

                                    <p className="title">
                                        Prize / Reward Claims
                                    </p>
                                    <ul className="description pb-3 px-3 m-0">
                                        <li>
                                            All prizes / rewards won by entrants
                                            must be claimed within 30 days.
                                        </li>
                                        <li>
                                            Physical prizes / rewards will be
                                            sent out via courier (courier
                                            company subject to prize / reward
                                            sponsor's discretion) to the address
                                            provided by the prize / reward
                                            winner within 30 days after prize /
                                            reward redemption.
                                        </li>
                                        <li>
                                            Prize / Reward sponsor will not be
                                            held liable to any damage suffered
                                            by physical prize / reward during
                                            the delivery.
                                        </li>
                                        <li>
                                            All prizes / rewards are final and
                                            non-refundable, unless stated by the
                                            prize / reward sponsor.
                                        </li>
                                        <li>
                                            Digital prizes / rewards will be
                                            sent to the email address of the
                                            prize / reward winner within 30 days
                                            after prize / reward redemption.
                                        </li>
                                        <li>
                                            Prize / Reward sponsor reserves the
                                            right to change the days to claim
                                            prize / reward or/and the day the
                                            prize / reward is sent out at any
                                            time.
                                        </li>
                                        <li>
                                            To claim a prize / reward, prize /
                                            reward winners are required to
                                            submit (a) name, (b) email address,
                                            (c) mobile phone or landline number
                                            and (d) mailing address.
                                        </li>
                                        <li>
                                            Winners must accept the Terms and
                                            Conditions, Privacy Policy and
                                            Tournament Rules of GameBox before
                                            submitting the claim submission.
                                        </li>
                                        <li>
                                            Once participants submit their prize
                                            / reward claim, the participant (i)
                                            confirms compliance with the
                                            tournament rules, and (ii) releases
                                            the Tournament Parties from any and
                                            all liability in connection with the
                                            Tournament or the acceptance,
                                            awarding, use or misuse of any Prize
                                            / Reward; The Prize / Reward Sponsor
                                            reserves the right to verify any of
                                            the foregoing requirements
                                            including, without limitation, proof
                                            of age and jurisdiction of residence
                                            prior to awarding the Prize /
                                            Reward. If an entrant’s name is
                                            drawn and they are unqualified, the
                                            Prize may be forfeited in the Prize
                                            / Reward Sponsor’s sole discretion.
                                        </li>
                                        <li>
                                            Any incomplete submission will
                                            result in the prize / reward
                                            becoming invalid.
                                        </li>
                                        <li>
                                            When a user requests a prize /
                                            reward claim and all rules and
                                            conditions are met, Prize / Reward
                                            Sponsor will deliver the prize /
                                            reward within 30 days after
                                            receiving a complete claim request.
                                        </li>
                                        <li>
                                            Prize / Reward sponsor may return
                                            claim requests if incomplete,
                                            wrongly filled-in or reject the
                                            withdrawal request in case of any
                                            doubt or failing to comply with the
                                            rules. In case Prize / Reward
                                            Sponsor decides to reject the claim
                                            request, the prize / reward will be
                                            deemed invalid.
                                        </li>
                                        <li>
                                            Expiration period - all prize /
                                            reward expires 30 days after the
                                            first prize / reward announcement.
                                        </li>
                                        <li>
                                            Users who are no longer eligible for
                                            the prize / reward, prize / reward
                                            will be cancelled and removed.
                                        </li>
                                    </ul>

                                    <p className="title">Referral reward (i)</p>
                                    <p className="description">
                                        Prize / Reward sponsor rewards existing
                                        users for inviting their friends to the
                                        service. Users get 5 gems added to their
                                        GameBox account for each friend that
                                        registers using the user’s provided
                                        link. The invited friend will also get 5
                                        gems upon registering with the link
                                        provided. Prize / Reward sponsor
                                        reserves the right to evaluate and
                                        reject such reward in suspected cases of
                                        fraud.
                                    </p>
                                    <p className="description">
                                        Prize / reward sponsor reserves the
                                        right to change the referral reward at
                                        any time at its own discretion.
                                    </p>

                                    <p className="title">
                                        Referral reward (ii) - For future use
                                    </p>
                                    <p className="description">
                                        Prize / Reward sponsor rewards existing
                                        users for inviting their friends to the
                                        service. Users get 5 gems added to their
                                        GameBox account for each user that
                                        reaches level 3 on GameBox. The invited
                                        friend will also get 5 gems upon
                                        registering with the link provided; the
                                        Prize / Reward sponsor reserves the
                                        right to evaluate and reject such reward
                                        in case of fraud suspicion. The limit
                                        for such a reward is set for a maximum
                                        of 5 referral rewards per account.
                                    </p>
                                    <p className="description">
                                        Prize / reward sponsor reserves the
                                        right to change the referral reward at
                                        any time at its own discretion.
                                    </p>
                                </div>
                                {/* SUSPEND, MODIFY & TERMINATE */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Right to Suspend, Modify and Terminate
                                    </p>
                                    <p className="description">
                                        The Prize / Reward Sponsor reserves the
                                        right, in its sole discretion, to
                                        suspend or cancel the prize / reward /
                                        tournament at any time if, for any
                                        reason the prize / reward / tournament
                                        is not capable of running as planned,
                                        including, without limitation, infection
                                        by computer virus, bugs, tampering,
                                        unauthorized intervention, fraud,
                                        technical failures, or any other causes
                                        which corrupt or affect the
                                        administration, security, fairness,
                                        integrity or proper conduct of the prize
                                        / reward / tournament ("Interruptions").
                                        The Prize / Reward Sponsor reserves the
                                        right to cancel, at its sole discretion,
                                        to suspend and/or modify the prize /
                                        reward / tournament, or any part of it
                                        and disqualify any individual who is
                                        responsible for any Interruptions,
                                        tampering with the entry process, the
                                        operation of the prize / reward /
                                        tournament Apps, or who is otherwise in
                                        violation of these Official Prize /
                                        Reward / Tournament Rules. If
                                        terminated, the prize / reward Sponsor
                                        may, in its sole discretion, determine
                                        the winners from among all eligible
                                        Entries received up to the time of such
                                        action using the procedures outlined
                                        herein. Each prize / reward will be
                                        awarded "as is" and without warranty of
                                        any kind, express or implied (including,
                                        without limitation, any implied warranty
                                        of merchantability or fitness for a
                                        particular purpose).
                                    </p>
                                </div>
                                {/* PROPERTY RIGHTS */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Confidentiality, Publicity and
                                        Intellectual Property Rights
                                    </p>
                                    <p className="description">
                                        For purposes of the Official Prize /
                                        Reward / Tournament Rules, Intellectual
                                        Property Rights means any trade marks,
                                        copyright, moral rights, performer’s
                                        rights, confidential information, trade
                                        secrets and all or any other
                                        intellectual or industrial property
                                        rights, both registered and unregistered
                                        anywhere in the world, including any
                                        renewals and extensions and including
                                        any such rights discovered or invented
                                        after the date hereof.
                                    </p>
                                    <p className="description">
                                        Each Participant shall keep confidential
                                        any information which the Participant
                                        knows or reasonably ought to know is
                                        confidential and relates to GameBox,
                                        GameBox’s business or the prize / reward
                                        / tournament.
                                    </p>
                                    <p className="description">
                                        Each Participant agrees to participate,
                                        at GameBox’s request, in publicity
                                        (including interviews) and further
                                        agrees that GameBox owns all
                                        Intellectual Property Rights in, and may
                                        use at GameBox’s absolute discretion,
                                        such publicity/interviews. GameBox may
                                        refer to the Participant’s association
                                        with the prize / reward / tournament in
                                        all publicity, marketing and materials.
                                    </p>
                                    <p className="description">
                                        The Participant shall not publicise his
                                        or her involvement in the prize / reward
                                        / tournament or the fact that the
                                        Participant has won any prize (including
                                        giving interviews) except with GameBox’s
                                        prior written consent.
                                    </p>
                                    <p className="description">
                                        By entering a Tournament or submitting a
                                        video, image, audio file or any other
                                        materials in relation to a Tournament or
                                        Prize / Reward (the Products) each
                                        Participant: (i) confirms the grant by
                                        the Participant to GameBox of a
                                        worldwide, perpetual, royalty free
                                        licence in the Intellectual Property
                                        Rights in the Products or Prize / Reward
                                        / Tournament entry, (ii) waives any
                                        moral rights and like rights the
                                        Participant has in relation to the
                                        Products or GameBox entry so that
                                        GameBox shall be entitled to use the
                                        Products or GameBox entry in any and all
                                        media at no cost to GameBox and (iii)
                                        warrants to GameBox that the Products or
                                        GameBox entry: (a) are personal and
                                        related specifically to the Participant;
                                        (b) are owned and controlled by the
                                        Participant and that the Participant has
                                        the right, power and authority to grant
                                        the rights set out in these terms and
                                        conditions; (c) will not infringe the
                                        Intellectual Property Rights, privacy or
                                        any other rights of any third party; (d)
                                        will not contain anything which is
                                        untrue, defamatory, obscene, indecent,
                                        harassing or threatening; (e) do not
                                        violate any applicable law or regulation
                                        (including any laws regarding
                                        anti-discrimination or false
                                        advertising); (f) are not obscene or
                                        pornographic; (g) do not, to the best of
                                        the Participant’s knowledge, contain any
                                        viruses or other computer programming
                                        routines that are intended to damage,
                                        detrimentally interfere with,
                                        surreptitiously intercept or expropriate
                                        any system, data or personal
                                        information; (h) are free from any
                                        encumbrances such that GameBox may use
                                        the Products in accordance with and in
                                        the manner set out in these Official
                                        Prize / Reward / Tournament Rules.
                                    </p>
                                    <p className="description">
                                        For the avoidance of doubt, all rights
                                        relating to the Prize / Reward /
                                        Tournament (including the name, title
                                        and format of the Prize / Reward /
                                        Tournament ) will vest exclusively in
                                        GameBox for our own use (in our absolute
                                        discretion). Unless otherwise stated,
                                        prize / reward / tournament entries will
                                        not be returned to you.
                                    </p>
                                </div>
                                {/* LIMITATION OF LIABILITY & RELEASE */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Limitation of Liability and Release
                                    </p>
                                    <p className="description">
                                        No liability or responsibility is
                                        assumed by the Prize / Reward /
                                        Tournament Parties resulting from
                                        entrant's participation in or attempt to
                                        participate in the Prize/ Reward /
                                        Tournament, ability or inability to
                                        upload or download any information in
                                        connection with the Prize / Reward /
                                        Tournament, or from the disruption of
                                        third-party services such as mail
                                        delivery. No responsibility or liability
                                        is assumed by the Prize / Reward /
                                        Tournament Parties for Interruptions,
                                        technical problems or technical
                                        malfunction arising in connection with
                                        any of the following occurrences which
                                        may affect the operation of the Prize /
                                        Reward / Tournament: hardware or
                                        software errors; faulty computer, cable,
                                        satellite, network, electronic, Internet
                                        connectivity or other online or network
                                        communication problems; errors or
                                        limitations of any Internet service
                                        providers, servers, hosts or other
                                        providers; garbled, jumbled or faulty
                                        data transmissions; failure of any
                                        online transmissions to be sent or
                                        received; lost, late, delayed or
                                        intercepted transmissions;
                                        inaccessibility of the Prize / Reward /
                                        Tournament App in whole or in part for
                                        any reason; traffic congestion on the
                                        Internet or the Prize / Reward /
                                        Tournament App's servers; unauthorized
                                        human or non-human intervention of the
                                        operation of the Prize / Reward /
                                        Tournament, including without
                                        limitation, unauthorized tampering,
                                        hacking, theft, virus, bugs, or worms;
                                        or destruction of any aspect of the
                                        Prize / Reward / Tournament, or loss,
                                        miscount, misdirection, inaccessibility
                                        or unavailability of an email account
                                        used in connection with the Prize /
                                        Reward / Tournament. The Prize / Reward
                                        / Tournament Parties are not responsible
                                        for any printing, typographical,
                                        technical, computer, network or human
                                        error which may occur in the
                                        administration of the Prize / Reward /
                                        Tournament, the processing of Tickets or
                                        entries, or in any Prize / Reward /
                                        Tournament-related materials. Use of the
                                        Prize / Reward / Tournament App is at
                                        the user's own risk. The Prize / Reward
                                        / Tournament Parties are not responsible
                                        for any personal injury or property
                                        damage or losses of any kind which may
                                        be sustained to user's or any other
                                        person's computer equipment resulting
                                        from participation in the Prize / Reward
                                        / Tournament. By participating in the
                                        Prize / Reward / Tournament, entrants
                                        agree: (i) to release, hold harmless and
                                        indemnify the Prize / Reward /
                                        Tournament Parties, Facebook, Inc.,
                                        Apple, Inc., and Google Inc. from any
                                        and all claims, damages or liabilities
                                        arising from or relating to such
                                        entrant's participation in the Contest;
                                        (ii) all causes of action arising out of
                                        or connected with this Prize / Reward /
                                        Tournament, or any Prize / Reward
                                        awarded, shall be resolved individually,
                                        without resort to any form of class
                                        action; and (iii) any and all claims,
                                        judgments, and awards shall be limited
                                        to actual out-of-pocket costs incurred,
                                        excluding legal fees and court costs. By
                                        accepting a Prize / Reward, winner
                                        agrees that the Prize / Reward /
                                        Tournament Sponsor, its parent,
                                        subsidiaries, related or affiliated
                                        companies or, if applicable, any of
                                        their respective advertising or
                                        promotion agencies, or any other company
                                        or individual engaged in the provision
                                        of goods or services related to this
                                        Prize / Reward / Tournament and their
                                        officers, directors, employees,
                                        representatives and agents will have no
                                        liability whatsoever for, and shall be
                                        held harmless by winner against, any
                                        liability for injuries, losses or
                                        damages of any kind to persons or
                                        property resulting in whole or in part,
                                        directly or indirectly, from
                                        participation in the Contest or from the
                                        acceptance, possession, misuse or use of
                                        any Prize. ANY ATTEMPT BY AN INDIVIDUAL,
                                        WHETHER OR NOT AN ENTRANT, TO
                                        DELIBERATELY DAMAGE, DESTROY, TAMPER OR
                                        VANDALIZE THE CONTEST APP OR INTERFERE
                                        WITH THE OPERATION OF THE CONTEST IS A
                                        VIOLATION OF CRIMINAL AND CIVIL LAWS,
                                        AND THE CONTEST SPONSOR RESERVES THE
                                        RIGHT TO SEEK DAMAGES AND DILIGENTLY
                                        PURSUE ALL REMEDIES AGAINST ANY SUCH
                                        INDIVIDUAL TO THE FULLEST EXTENT
                                        PERMITTED BY LAW.
                                    </p>
                                </div>
                                {/* PRIVACY & PUBLIC RELEASE */}
                                <div className="col-12 mb-4">
                                    <p className="title">
                                        Privacy and Public Release
                                    </p>
                                    <p className="description">
                                        The Prize / Reward / Tournament Sponsor
                                        and its authorized agents will collect,
                                        use, and disclose the personal
                                        information provided upon registration
                                        and entry into the Prize / Reward /
                                        Tournament for the purposes of
                                        administering the Tournament and Prize /
                                        Reward fulfillment, in accordance with
                                        the Prize / Reward / Tournament
                                        Sponsor's Privacy Statement. By
                                        accepting a Prize / Reward, winners
                                        consent to the publication and use of
                                        their name, statements, profile
                                        pictures, photographs, image and/or
                                        likeness in any form, manner or media
                                        whether now known or hereafter devised,
                                        including, without limitation, in print,
                                        radio, television, in the Prize / Reward
                                        / Tournament App, and on the Internet
                                        for any purpose in connection with the
                                        Prize / Reward / Tournament including,
                                        without limitation, for the purposes of
                                        advertising and trade, and promoting the
                                        Contest Sponsor and its services,
                                        without further notice or compensation.
                                    </p>
                                </div>
                                {/* GENERAL CONDITIONS */}
                                <div className="col-12 mb-4">
                                    <p className="title">General Conditions</p>
                                    <p className="description">
                                        The Prize / Reward Sponsor is not
                                        responsible for any other costs
                                        associated with claiming or using the
                                        Prize / Reward. The winners are solely
                                        responsible for the reporting and
                                        payment of any and all taxes, if any,
                                        that may result in claiming the prizes /
                                        rewards in this Prize / Reward /
                                        Tournament. Prize / Reward / Tournament
                                        Winner understands that the prize /
                                        Reward received might be reduced by tax
                                        obligations that arise for the Prize /
                                        Reward Sponsor related to awarding such
                                        prize / reward. Decisions of the Prize /
                                        Reward Sponsor are final on all matters
                                        relating to the Prize / Reward /
                                        Tournament, including matters of fact,
                                        interpretation, eligibility, procedure
                                        and fulfillment in respect to the Prize
                                        / Reward / Tournament. The Prize /
                                        Reward Sponsor reserves the right at any
                                        time to cancel or modify the Prize /
                                        Reward / Tournament or to modify or
                                        supplement these Official Prize / Reward
                                        / Tournament Rules without notice, in
                                        its sole discretion, subject to
                                        applicable law.
                                    </p>
                                    <p className="description">
                                        Questions concerning the construction,
                                        validity, interpretation and
                                        enforceability of these Official Rules,
                                        entrants' rights and obligations, or the
                                        rights and obligations of the Prize /
                                        Reward Sponsor in connection with the
                                        Prize / Reward / Tournament, shall be
                                        governed by, and construed in accordance
                                        with, the laws in effect in Malaysia,
                                        without giving effect to any choice of
                                        law or conflict of law rules. Any waiver
                                        of any obligation hereunder by the Prize
                                        / Reward Sponsor does not constitute a
                                        general waiver of any obligation to
                                        entrants. The Prize / Reward Sponsor
                                        reserves the right to update or modify
                                        these Rules at any time, and without
                                        prior notice to you.
                                    </p>
                                    <p className="description">
                                        This promotion is in no way sponsored,
                                        endorsed or administered by, or
                                        associated with, Facebook, Google or
                                        Apple.
                                    </p>
                                    <p className="description">
                                        The Prize / Reward / Tournament sponsor
                                        may be contacted at{" "}
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
