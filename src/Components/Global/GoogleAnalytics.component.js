import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-5PK1M5GPM6";
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
