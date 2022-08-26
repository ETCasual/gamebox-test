const defaultUserImage = (e) => {
    e.target.src = `${window.cdn}icons/icon_profile.svg`;
};

const defaultGameImage = (e) => {
    e.target.src = `${window.cdn}logo/logo_gamebox_mobile.png`;
};

export { defaultUserImage, defaultGameImage };
