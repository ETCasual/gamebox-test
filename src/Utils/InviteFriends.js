import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import loadFriendInvitation from "redux/thunks/FriendInvitation.thunk";

const inviteFriendsReward = (user, dispatch) => {
    const isNewUser = Boolean(localStorage.getItem("isNewUser"));
    if (user?.id && isNewUser) {
        const inviteCode = localStorage.getItem("inviteCode");
        if (inviteCode !== null) {
            const originalText = decodeURIComponent(inviteCode);
            const decryption = AES.decrypt(
                originalText,
                process.env.REACT_APP_SECRET_PHRASE
            ).toString(Utf8);
            setTimeout(() => {
                dispatch(loadFriendInvitation(parseInt(decryption)));
            }, 1000);
        }
    } else {
        console.log("not a new user!");
        localStorage.removeItem("isNewUser");
    }
};

export default inviteFriendsReward;
