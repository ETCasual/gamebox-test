import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
    const { config } = useSelector((state) => state.config);

    const history = useHistory();

    return (
        <section className="tournament-rules">
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
                                    Prize / Reward / Tournament Rules
                                </h4>
                                <small>Effective date: Mar 1, 2022</small>
                                <p className="subtitle my-4">
                                    Welcome to GameBox.
                                </p>
                            </div>
                            {/* GENERAL */}
                            <div className="col-12 mb-4">
                                <p className="title">General</p>
                                <p className="description">
                                    To win prizes in GameBox, there is no
                                    purchase or payment of any kind required to
                                    enter the tournaments for the prizes.
                                </p>
                                <p className="description">
                                    By entering the tournaments, all entrants
                                    agree to abide by and be bound by these
                                    official prizes and tournament rules and
                                    consent to the use of their personal
                                    information to administer the prize and/or
                                    tournament.
                                </p>
                                <p className="description">
                                    The Prize Sponsor reserves the right to
                                    alter the rules of the prize and/or
                                    tournament and cancel the prize and/or
                                    tournament at any time for any reason,
                                    especially in case of any suspicion of fraud
                                    and violation of the prize and tournament
                                    rules.
                                </p>
                            </div>
                            {/* PARTICIPANTS */}
                            <div className="col-12 mb-4">
                                <p className="title">Participants</p>
                                <p className="description">
                                    The prizes and tournaments is open to all
                                    registered users of GameBox and Froyo.Games,
                                    who have reached the age of 18 or the
                                    applicable age of the majority (which is
                                    higher) at the time of entry
                                    ("Participants") and where local regulations
                                    do not prevent in any other way
                                    participation in free tournaments with NFT’s
                                    or Tokens as the prize.
                                </p>
                            </div>
                            {/* PRIZE / REWARD / TOURNAMENT PERIOD */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Prize / Reward / Tournament Period
                                </p>
                                <p className="description">
                                    The featured and premium prize duration is
                                    shown in the GameBox platform as the number
                                    of tickets the prize has collected over the
                                    maximum number of tickets (the draw
                                    condition) of the prize. It displays the
                                    total number of tickets that the prize has
                                    accumulated until it reaches its draw
                                    condition and a winner is chosen for the
                                    prize.
                                </p>
                                <p className="description">
                                    The bonus prize duration is shown in the
                                    GameBox platform as a countdown that
                                    displays the time until the bonus prize ends
                                    and a winner is chosen.
                                </p>
                                <p className="description">
                                    The tournament duration is shown in the
                                    GameBox platform as a countdown that
                                    displays the time until the next Tournament.
                                </p>
                                <p className="description">
                                    It is GameBox's sole discretion to announce
                                    a new prize and/or tournament or cancel
                                    upcoming prize and/or tournament, at any
                                    time, without any reason whatsoever.
                                </p>
                            </div>
                            {/* PARTICIPATION */}
                            <div className="col-12 mb-4">
                                <p className="title">Participation</p>
                                <p className="description">
                                    To enter a Prize/Tournament, user needs to:
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        Register by opening an account with
                                        www.froyo.games. In order to register,
                                        Participants need to accept and agree to
                                        the Privacy Policy, Terms and Conditions
                                        and the Prize and Tournament Rules and
                                        be at least 18 years of age.
                                    </li>
                                    <li>
                                        Use GameBox platform to earn tickets
                                        ("Tickets") that are each worth one (1)
                                        entry into the prize played. Tickets can
                                        be earned in various ways, including (i)
                                        participating in tournaments, (ii) using
                                        the spinner, (iii) other defined
                                        activities in the application. Tickets
                                        have no cash value.
                                    </li>
                                    <li>
                                        In the event of a dispute over the
                                        identity of a participant, each entry
                                        will be considered to have been
                                        submitted by the Registered Owner of the
                                        email address associated with the entry.
                                        "Registered Owner" is defined as the
                                        natural person who is assigned an email
                                        address by an Internet access provider,
                                        on-line service provider or other
                                        organisation/individual that is
                                        responsible for assigning email
                                        addresses for the domain associated with
                                        the submitted email address.
                                    </li>
                                </ul>
                            </div>
                            {/* PRIZE / REWARD AND WINNING A TOURNAMENT */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Prizes and Winning a Tournament
                                </p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        All prizes are awarded to the winners by
                                        the Prize Sponsor. Winners must accept
                                        the Prize as awarded by the Prize
                                        Sponsor or the Prize will be forfeited.
                                        Prizes cannot be transferred or
                                        substituted, except at the Prize
                                        Sponsor's sole discretion. Failure to
                                        verify or declare a winner or otherwise
                                        unclaimed Prizes will result in such
                                        Prizes being forfeited and not awarded.
                                    </li>
                                    <li>
                                        Selected entrants are notified after the
                                        prize and/or tournament via in-app
                                        announcement and/or notification and/or
                                        email.
                                    </li>
                                </ul>

                                <p className="title">Prize Draw</p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        At the end of each Prize Period, a draw
                                        will be held from among all eligible
                                        entries received during the Prize Period
                                        to select a participant eligible to win
                                        the Prize.
                                    </li>
                                    <li>
                                        All available tickets in the prize at
                                        the moment of the draw are entered into
                                        the prize.
                                    </li>
                                    <li>
                                        The Prize winner is announced through
                                        the GameBox platform, right after the
                                        Prize Draw.
                                    </li>
                                    <li>
                                        Odds of winning the Prize depends upon
                                        the number of eligible entries received
                                        by the Prize Sponsor during the Prize
                                        and Tournament Period.
                                    </li>
                                </ul>

                                <p className="title">Bonus Prize</p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        Bonus participation prize is offered as
                                        long as participants enter and win
                                        tickets from any tournament or via the
                                        spinner or via the additional tickets
                                        with ads or gems in the GameBox
                                        platform.
                                    </li>
                                    <li>
                                        Bonus prizes are offered in the form of
                                        NFT’s or Tokens.
                                    </li>
                                    <li>
                                        Winner of the bonus prize / reward is
                                        randomly selected from all participating
                                        participants when the countdown timer
                                        ends.
                                    </li>
                                    <li>
                                        Prize sponsor reserves the right to
                                        change the prize and/or duration of the
                                        prize at its own discretion.
                                    </li>
                                    <li>
                                        Being granted the prize requires no
                                        purchase or payment of any kind.
                                    </li>
                                </ul>

                                <p className="title">Prize Claims</p>
                                <ul className="description pb-3 px-3 m-0">
                                    <li>
                                        All prizes won by entrants must be
                                        claimed within 180 days.
                                    </li>
                                    <li>
                                        Prizes must be claimed by the Prize
                                        Winner for the Prize to be transferred.
                                    </li>
                                    <li>
                                        The Transaction Fee (Gas Fee) when
                                        claiming Prize will be borne by the
                                        Prize Winner.
                                    </li>
                                    <li>
                                        Unminted Prizes and/or Prizes under
                                        promotional campaigns cannot be claimed
                                        by Prize Winners immediately unless
                                        stated by Prize Sponsor. Prize Winners
                                        will need to wait for the Prize to be
                                        minted and/or promotional campaign to
                                        end before the Prize can be claimed. It
                                        is the Prize Sponsor’s sole discretion
                                        to determine the duration of when the
                                        Prize will be minted and/or promotional
                                        campaign ends.
                                    </li>
                                    <li>
                                        The Prize Sponsor will not be
                                        responsible for the transfer duration of
                                        the Prize to the Prize Winner’s
                                        cryptocurrency wallet.
                                    </li>
                                    <li>
                                        The Prize Sponsor will not be held
                                        liable for any loss of Prize.
                                    </li>
                                    <li>
                                        All Prizes are final and non-refundable,
                                        unless stated by the Prize Sponsor.
                                    </li>
                                    <li>
                                        The Prize Sponsor reserves the right to
                                        change the days to claim Prize.
                                    </li>
                                    <li>
                                        To claim any Prize, Prize Winners are
                                        required to connect to a cryptocurrency
                                        wallet.
                                    </li>
                                    <li>
                                        By claiming the Prize, Prize Winners
                                        agree to accept the Terms and
                                        Conditions, Privacy Policy and Prize and
                                        Tournament Rules of Gamebox.
                                    </li>
                                    <li>
                                        Once participants claim their Prize, the
                                        participant (i) confirms compliance with
                                        the tournament rules, and (ii) releases
                                        the Tournament Parties and Prize Sponsor
                                        from any and all liability in connection
                                        with the Tournament or the acceptance,
                                        awarding, use or misuse of any Prize;
                                        The Prize Sponsor reserves the right to
                                        verify any of the foregoing requirements
                                        including, without limitation, proof of
                                        age and jurisdiction of residence prior
                                        to awarding the Prize. If an entrant’s
                                        name is drawn and they are unqualified,
                                        the Prize may be forfeited in the Prize
                                        Sponsor’s sole discretion.
                                    </li>
                                    <li>
                                        Any error in submission will result in
                                        the prize becoming invalid.
                                    </li>
                                    <li>
                                        The Prize Sponsor may interfere with the
                                        claim in the case of any doubt or
                                        failing to comply with the rules. In
                                        case the Prize Sponsor decides to cancel
                                        the claim, the prize will be deemed
                                        invalid.
                                    </li>
                                    <li>
                                        Expiration period - all prizes expire
                                        180 days after the first prize
                                        announcement.
                                    </li>
                                    <li>
                                        Prizes will be cancelled and removed for
                                        users who are no longer eligible.
                                    </li>
                                </ul>

                                <p className="title">Referral reward (i)</p>
                                <p className="description">
                                    The Prize Sponsor rewards existing users for
                                    inviting other users to the service. Users
                                    will receive {config.gemsPerInvite} gems
                                    added to their GameBox account when the
                                    other users register using the user’s invite
                                    link
                                    {config.rewardInvitesRank > 1
                                        ? `reaches level ${config.rewardInvitesRank}`
                                        : ""}
                                    . The invited user will also receive{" "}
                                    {config.gemsPerInvite} gems
                                    {config.rewardInvitesRank > 1
                                        ? `upon reaching level ${config.rewardInvitesRank}`
                                        : ""}{" "}
                                    when they register with GameBox using an
                                    invite link. The Prize Sponsor reserves the
                                    right to evaluate and reject such reward in
                                    suspected cases of fraud.
                                </p>
                                <p className="description">
                                    There is no limit as to how many users that
                                    may be added using the same link.
                                </p>
                                <p className="description">
                                    The Prize Sponsor reserves the right to
                                    change the referral reward at any time at
                                    its own discretion.
                                </p>
                            </div>
                            {/* SUSPEND, MODIFY & TERMINATE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Right to Suspend, Modify and Terminate
                                </p>
                                <p className="description">
                                    The Prize Sponsor reserves the right, in its
                                    sole discretion, to suspend or cancel the
                                    prize and/or tournament at any time if, for
                                    any reason the prize and/or tournament is
                                    not capable of running as planned,
                                    including, without limitation, infection by
                                    computer virus, bugs, tampering,
                                    unauthorised intervention, fraud, technical
                                    failures, or any other causes which corrupt
                                    or affect the administration, security,
                                    fairness, integrity or proper conduct of the
                                    prize and/or tournament ("Interruptions").
                                    The Prize Sponsor reserves the right to
                                    cancel, at its sole discretion, to suspend
                                    and/or modify the prize and/or tournament,
                                    or any part of it and disqualify any
                                    individual who is responsible for any
                                    Interruptions, tampering with the entry
                                    process, the operation of the prize and/or
                                    tournament, or who is otherwise in violation
                                    of these Official Prize and/or Tournament
                                    Rules. If terminated, the Prize Sponsor may,
                                    in its sole discretion, determine the
                                    winners from among all eligible Entries
                                    received up to the time of such action using
                                    the procedures outlined herein. Each prize
                                    will be awarded "as is" and without warranty
                                    of any kind, express or implied (including,
                                    without limitation, any implied warranty of
                                    merchantability or fitness for a particular
                                    purpose).
                                </p>
                            </div>
                            {/* PROPERTY RIGHTS */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Confidentiality, Publicity and Intellectual
                                    Property Rights
                                </p>
                                <p className="description">
                                    For purposes of the Official Prize and/or
                                    Tournament Rules, Intellectual Property
                                    Rights means any trade marks, copyright,
                                    moral rights, performer’s rights,
                                    confidential information, trade secrets and
                                    all or any other intellectual or industrial
                                    property rights, both registered and
                                    unregistered anywhere in the world,
                                    including any renewals and extensions and
                                    including any such rights discovered or
                                    invented after the date hereof.
                                </p>
                                <p className="description">
                                    Each Participant shall keep confidential any
                                    information which the Participant knows or
                                    reasonably ought to know is confidential and
                                    relates to GameBox, GameBox’s business or
                                    the prize and/or tournament.
                                </p>
                                <p className="description">
                                    Each Participant agrees to participate, at
                                    GameBox’s request, in publicity (including
                                    interviews) and further agrees that GameBox
                                    owns all Intellectual Property Rights in,
                                    and may use at GameBox’s absolute
                                    discretion, such publicity/interviews.
                                    GameBox may refer to the Participant’s
                                    association with the prize and/or tournament
                                    in all publicity, marketing and materials.
                                </p>
                                <p className="description">
                                    The Participant shall not publicise his or
                                    her involvement in the prize and/or
                                    tournament or the fact that the Participant
                                    has won any prize (including giving
                                    interviews) except with GameBox’s prior
                                    written consent.
                                </p>
                                <p className="description">
                                    By entering a Tournament or submitting a
                                    video, image, audio file or any other
                                    materials in relation to a Tournament or
                                    Prize (the Products) each Participant: (i)
                                    confirms the grant by the Participant to
                                    GameBox of a worldwide, perpetual, royalty
                                    free licence in the Intellectual Property
                                    Rights in the Products or Prize and/or
                                    Tournament entry, (ii) waives any moral
                                    rights and like rights the Participant has
                                    in relation to the Products or GameBox entry
                                    so that GameBox shall be entitled to use the
                                    Products or GameBox entry in any and all
                                    media at no cost to GameBox and (iii)
                                    warrants to GameBox that the Products or
                                    GameBox entry: (a) are personal and related
                                    specifically to the Participant; (b) are
                                    owned and controlled by the Participant and
                                    that the Participant has the right, power
                                    and authority to grant the rights set out in
                                    these terms and conditions; (c) will not
                                    infringe the Intellectual Property Rights,
                                    privacy or any other rights of any third
                                    party; (d) will not contain anything which
                                    is untrue, defamatory, obscene, indecent,
                                    harassing or threatening; (e) do not violate
                                    any applicable law or regulation (including
                                    any laws regarding anti-discrimination or
                                    false advertising); (f) are not obscene or
                                    pornographic; (g) do not, to the best of the
                                    Participant’s knowledge, contain any viruses
                                    or other computer programming routines that
                                    are intended to damage, detrimentally
                                    interfere with, surreptitiously intercept or
                                    expropriate any system, data or personal
                                    information; (h) are free from any
                                    encumbrances such that GameBox may use the
                                    Products in accordance with and in the
                                    manner set out in these Official Prize
                                    and/or Tournament Rules.
                                </p>
                                <p className="description">
                                    For the avoidance of doubt, all rights
                                    relating to the Prize and/or Tournament
                                    (including the name, title and format of the
                                    Prize and/or Tournament ) will vest
                                    exclusively in GameBox for our own use (in
                                    our absolute discretion). Unless otherwise
                                    stated, prize and/or tournament entries will
                                    not be returned to you.
                                </p>
                            </div>
                            {/* LIMITATION OF LIABILITY & RELEASE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Limitation of Liability and Release
                                </p>
                                <p className="description">
                                    No liability or responsibility is assumed by
                                    the Prize and/or Tournament Parties
                                    resulting from participant's participation
                                    in or attempt to participate in the Prize
                                    and/or Tournament, ability or inability to
                                    upload or download any information in
                                    connection with the Prize and/or Tournament,
                                    or from the disruption of third-party
                                    services such as mail delivery. No
                                    responsibility or liability is assumed by
                                    the Prize and/or Tournament Parties for
                                    Interruptions, technical problems or
                                    technical malfunction arising in connection
                                    with any of the following occurrences which
                                    may affect the operation of the Prize and/or
                                    Tournament: hardware or software errors;
                                    faulty computer, cable, satellite, network,
                                    electronic, Internet connectivity or other
                                    online or network communication problems;
                                    errors or limitations of any Internet
                                    service providers, servers, hosts or other
                                    providers; garbled, jumbled or faulty data
                                    transmissions; failure of any online
                                    transmissions to be sent or received; lost,
                                    late, delayed or intercepted transmissions;
                                    inaccessibility of the Prize and/or
                                    Tournament Platform in whole or in part for
                                    any reason; traffic congestion on the
                                    Internet or the Prize and/or Tournament
                                    Platform's servers; unauthorised human or
                                    non-human intervention of the operation of
                                    the Prize and/or Tournament, including
                                    without limitation, unauthorised tampering,
                                    hacking, theft, virus, bugs, or worms; or
                                    destruction of any aspect of the Prize
                                    and/or Tournament, or loss, miscount,
                                    misdirection, inaccessibility or
                                    unavailability of an email account used in
                                    connection with the Prize and/or Tournament.
                                    The Prize and/or Tournament Parties are not
                                    responsible for any printing, typographical,
                                    technical, computer, network or human error
                                    which may occur in the administration of the
                                    Prize and/or Tournament, the processing of
                                    Tickets or entries, or in any Prize and/or
                                    Tournament-related materials. Use of the
                                    Prize and/or Tournament Platform is at the
                                    user's own risk. The Prize and/orTournament
                                    Parties are not responsible for any personal
                                    injury or property damage or losses of any
                                    kind which may be sustained to user's or any
                                    other person's computer equipment resulting
                                    from participation in the Prize and/or
                                    Tournament. By participating in the Prize
                                    and/or Tournament, entrants agree: (i) to
                                    release, hold harmless and indemnify the
                                    Prize and/or Tournament Parties, and
                                    Froyo.Games from any and all claims, damages
                                    or liabilities arising from or relating to
                                    such participant's participation in the
                                    Prize and/or Tournaments; (ii) all causes of
                                    action arising out of or connected with this
                                    Prize and/or Tournament, or any Prize
                                    awarded, shall be resolved individually,
                                    without resort to any form of class action;
                                    and (iii) any and all claims, judgments, and
                                    awards shall be limited to actual
                                    out-of-pocket costs incurred, excluding
                                    legal fees and court costs. By accepting a
                                    Prize, winner agrees that the Prize and/or
                                    Tournament Sponsor, its parent,
                                    subsidiaries, related or affiliated
                                    companies or, if applicable, any of their
                                    respective advertising or promotion
                                    agencies, or any other company or individual
                                    engaged in the provision of goods or
                                    services related to this Prize and/or
                                    Tournament and their officers, directors,
                                    employees, representatives and agents will
                                    have no liability whatsoever for, and shall
                                    be held harmless by winner against, any
                                    liability for injuries, losses or damages of
                                    any kind to persons or property resulting in
                                    whole or in part, directly or indirectly,
                                    from participation in the Prize and/or
                                    Tournament or from the acceptance,
                                    possession, misuse or use of any Prize. ANY
                                    ATTEMPT BY AN INDIVIDUAL, WHETHER OR NOT A
                                    PARTICIPANT, TO DELIBERATELY DAMAGE,
                                    DESTROY, TAMPER OR VANDALISE THE PRIZE
                                    AND/OR TOURNAMENT PLATFORM OR INTERFERE WITH
                                    THE OPERATION OF THE PRIZE AND / OR
                                    TOURNAMENT IS A VIOLATION OF CRIMINAL AND
                                    CIVIL LAWS, AND THE PRIZE AND/OR TOURNAMENT
                                    SPONSOR RESERVES THE RIGHT TO SEEK DAMAGES
                                    AND DILIGENTLY PURSUE ALL REMEDIES AGAINST
                                    ANY SUCH INDIVIDUAL TO THE FULLEST EXTENT
                                    PERMITTED BY LAW.
                                </p>
                            </div>
                            {/* PRIVACY & PUBLIC RELEASE */}
                            <div className="col-12 mb-4">
                                <p className="title">
                                    Privacy and Public Release
                                </p>
                                <p className="description">
                                    The Prize Sponsor and its authorised agents
                                    will collect, use, and disclose the personal
                                    information provided upon registration and
                                    entry into the Prize and/or Tournament for
                                    the purposes of administering the Tournament
                                    and Prize fulfilment, in accordance with the
                                    Prize Sponsor's Privacy Statement. By
                                    accepting a Prize, winners consent to the
                                    publication and use of their name,
                                    statements, profile pictures, photographs,
                                    image and/or likeness in any form, manner or
                                    media whether now known or hereafter
                                    devised, including, without limitation, in
                                    print, radio, television, in the Prize
                                    and/or Tournament Platform, and on the
                                    Internet for any purpose in connection with
                                    the Prize and/or Tournament including,
                                    without limitation, for the purposes of
                                    advertising and trade, and promoting the
                                    Prize Sponsor and its services, without
                                    further notice or compensation.
                                </p>
                            </div>
                            {/* GENERAL CONDITIONS */}
                            <div className="col-12 mb-4">
                                <p className="title">General Conditions</p>
                                <p className="description">
                                    The Prize Sponsor is not responsible for any
                                    other costs associated with claiming or
                                    using the Prize. The winners are solely
                                    responsible for the reporting and payment of
                                    any and all taxes, if any, that may result
                                    in claiming the prizes in this Prize and/or
                                    Tournament. Prize and/or Tournament Winner
                                    understands that the prize received might be
                                    reduced by tax obligations that arise for
                                    the Prize Sponsor related to awarding such
                                    prize. Decisions of the Prize Sponsor are
                                    final on all matters relating to the Prize
                                    and/or Tournament, including matters of
                                    fact, interpretation, eligibility, procedure
                                    and fulfilment in respect to the Prize
                                    and/or Tournament. The Prize Sponsor
                                    reserves the right at any time to cancel or
                                    modify the Prize and/or Tournament or to
                                    modify or supplement these Official Prize
                                    and/or Tournament Rules without notice, in
                                    its sole discretion, subject to applicable
                                    law.
                                </p>
                                <p className="description">
                                    Questions concerning the construction,
                                    validity, interpretation and enforceability
                                    of these Official Rules, entrants' rights
                                    and obligations, or the rights and
                                    obligations of the Prize Sponsor in
                                    connection with the Prize and/or Tournament,
                                    shall be governed by, and construed in
                                    accordance with, the laws in effect in
                                    Malaysia, without giving effect to any
                                    choice of law or conflict of law rules. Any
                                    waiver of any obligation hereunder by the
                                    Prize Sponsor does not constitute a general
                                    waiver of any obligation to entrants. The
                                    Prize Sponsor reserves the right to update
                                    or modify these Rules at any time, and
                                    without prior notice to you.
                                </p>

                                <p className="description">
                                    The Prize Sponsor may be contacted at{" "}
                                    <a
                                        className="email"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="mailto:support@froyo.games"
                                    >
                                        support@froyo.games
                                    </a>
                                </p>
                            </div>
                            {/* CONTACT */}
                            {/* <div className="col-12 mb-4">
                                    <p className="title">Contacting Us</p>
                                    <p className="description">
                                        If you have any questions regarding our
                                        privacy policy or our practices, please
                                        contact us via email at{" "}
                                        <a
                                            className="email"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="mailto:support@froyo.games"
                                        >
                                            support@froyo.games
                                        </a>
                                        .
                                    </p>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Index;
