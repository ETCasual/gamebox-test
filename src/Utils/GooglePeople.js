import axios from "axios";

const isGDefaultImage = async (token) => {
    try {
        const { data } = await axios.get(process.env.REACT_APP_PEOPLE_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.photos[0].default) return data.photos[0].default;
        return false;
    } catch (error) {
        console.log(error);
    }
};

export default isGDefaultImage;
