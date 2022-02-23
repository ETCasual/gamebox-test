const defaultUserImage = (e) => {
    e.target.src = `${window.cdn}icons/icon_profile.png`;
};

const defaultGameImage = () => {
    return "https://images-na.ssl-images-amazon.com/images/I/418V46UrfUL._SX258_BO1,204,203,200_.jpg";
};

export { defaultUserImage, defaultGameImage };
