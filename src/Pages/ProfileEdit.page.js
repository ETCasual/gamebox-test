import React, { useState } from "react";

import AvatarSelection from "Components/UserProfile/AvatarSelection/AvatarSelection.component";
import EditUserInfo from "Components/UserProfile/EditUserInfo/EditUserInfo.component";

const ProfileEdit = () => {
    const [isAvatarSelectionShown, setIsAvatarSelectionShown] = useState(false);
    const [avatar, setAvatar] = useState(null);

    // AVATAR SELECTION
    const handleAvatarSelectionPanel = () => {
        document.body.style.overflow = "hidden";
        setIsAvatarSelectionShown(true);
    };
    const handleAvatarSelectionBackButton = () => {
        document.body.style.overflow = "visible";
        setIsAvatarSelectionShown(false);
    };
    const handleSelectedAvatar = (path) => {
        document.body.style.overflow = "visible";
        setAvatar(path);
        setIsAvatarSelectionShown(false);
    };

    return (
        <>
            {isAvatarSelectionShown && (
                <AvatarSelection
                    handleSelectedAvatar={handleSelectedAvatar}
                    handleBackButton={handleAvatarSelectionBackButton}
                />
            )}
            <EditUserInfo
                avatar={avatar}
                handleAvatarSelectionPanel={handleAvatarSelectionPanel}
            />
        </>
    );
};

export default ProfileEdit;
