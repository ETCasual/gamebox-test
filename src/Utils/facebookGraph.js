import axios from "axios";

const photoURLLarge = async (baseURL, token) => {
    try {
        if(!baseURL.includes('graph')) return false

        const { data } = await axios.get(
            `${baseURL}${process.env.REACT_APP_GRAPH_API}${token}`
        );

        if (data.picture.data.url) return data.picture.data.url;
        return "";
    } catch (error) {
        console.log(error);
    }
};

export default photoURLLarge;
