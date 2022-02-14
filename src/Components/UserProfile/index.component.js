import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Profile from "Components/UserProfile/Profile/Profile.component";
import PlayerLevel from "Components/UserProfile/PlayerLevel/PlayerLevel.component";
import InvitationCode from "Components/UserProfile/Invitation/InvitationCode.component";
import HighScore from "Components/UserProfile/HighScore/HighScore.component";

import loadHighScore from "redux/thunks/HighScore.thunk";

const Index = ({ isProfilePanelShown, handleBackButton }) => {
    const { user } = useSelector((state) => state.userData);
    const { ranks } = useSelector((state) => state.ranks);

    const dispatch = useDispatch();

    const [isPlayerLevelShown, setIsPlayerLevelShown] = useState(false);
    const [isTeamShown, setIsTeamShown] = useState(false);
    const [isHighScoreShown, setIsHighScoreShown] = useState(false);
    useEffect(() => {
        dispatch(loadHighScore());
    }, [dispatch]);

    // PLAYER LEVEL
    const handlePlayerLevelPanel = () => {
        document.body.style.overflow = "hidden";
        setIsPlayerLevelShown(true);
    };
    const handlePlayerLevelPanelBackButton = () => {
        document.body.style.overflow = "visible";
        setIsPlayerLevelShown(false);
    };

    // TEAM
    const handleTeamPanel = () => {
        document.body.style.overflow = "hidden";
        setIsTeamShown(true);
    };
    const handleTeamPanelBackButton = () => {
        document.body.style.overflow = "visible";
        setIsTeamShown(false);
    };

    // HIGHSCORE
    const handleHighScorePanel = () => {
        setIsHighScoreShown(true);
    };
    const handleHighScoreBackButton = () => {
        setIsHighScoreShown(false);
    };

    if (isPlayerLevelShown) {
        return (
            <>
                <Profile
                    isProfilePanelShown={isProfilePanelShown}
                    handlePlayerLevelPanel={handlePlayerLevelPanel}
                    handleTeamPanel={handleTeamPanel}
                    handleHighScorePanel={handleHighScorePanel}
                    handleBackButton={handleBackButton}
                />
                <PlayerLevel
                    user={user}
                    ranks={ranks}
                    handleBackButton={handlePlayerLevelPanelBackButton}
                />
            </>
        );
    } else if (isTeamShown) {
        return (
            <>
                <Profile
                    isProfilePanelShown={isProfilePanelShown}
                    handlePlayerLevelPanel={handlePlayerLevelPanel}
                    handleTeamPanel={handleTeamPanel}
                    handleHighScorePanel={handleHighScorePanel}
                    handleBackButton={handleBackButton}
                />
                <InvitationCode handleBackButton={handleTeamPanelBackButton} />
            </>
        );
    } else if (isHighScoreShown) {
        return <HighScore handleBackButton={handleHighScoreBackButton} />;
    } else {
        return (
            <Profile
                handlePlayerLevelPanel={handlePlayerLevelPanel}
                handleTeamPanel={handleTeamPanel}
                handleHighScorePanel={handleHighScorePanel}
            />
        );
    }
};

export default Index;
