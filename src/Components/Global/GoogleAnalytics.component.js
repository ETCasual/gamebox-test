import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';

const TRACKING_ID = process.env.REACT_APP_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID);

export default function GoogleAnalytics() {
    const { pathname } = useLocation();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: pathname, 
            title: pathname
        });
    }, [pathname]);

    return null;
}
