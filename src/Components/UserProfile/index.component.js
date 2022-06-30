import React, { useState } from "react";
import { useSelector } from "react-redux";

import Profile from "Components/UserProfile/Profile/Profile.component";
import PlayerLevel from "Components/UserProfile/PlayerLevel/PlayerLevel.component";
import InvitationCode from "Components/UserProfile/Invitation/InvitationCode.component";

const Index = ({ isProfilePanelShown, handleBackButton }) => {
    const { user } = useSelector((state) => state.userData);
    const { ranks } = useSelector((state) => state.ranks);

    const [isPlayerLevelShown, setIsPlayerLevelShown] = useState(false);
    const [isTeamShown, setIsTeamShown] = useState(false);

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

    if (isPlayerLevelShown) {
        return (
            <>
                <Profile
                    isProfilePanelShown={isProfilePanelShown}
                    handlePlayerLevelPanel={handlePlayerLevelPanel}
                    handleTeamPanel={handleTeamPanel}
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
                    handleBackButton={handleBackButton}
                />
                <InvitationCode handleBackButton={handleTeamPanelBackButton} />
            </>
        );
    } else {
        return (
            <Profile
                handlePlayerLevelPanel={handlePlayerLevelPanel}
                handleTeamPanel={handleTeamPanel}
            />
        );
    }
};

export default Index;
