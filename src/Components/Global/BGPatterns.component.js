import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BGPatterns = () => {
    let iconsRef = useRef([]);

    useEffect(() => {
        const min = 10;
        const max = 50;

        gsap.utils.toArray(iconsRef.current).forEach((item, idx) => {
            gsap.fromTo(
                item,
                { y: 0 },
                {
                    delay: 0.05 + idx / 3.5,
                    duration: 3,
                    y: `-=${Math.random() * (max - min) + min}px`,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.easeInOut",
                }
            );
        });
    }, []);

    return (
        <div className="patter-wrapper">
            {/* <!-- CIRCLE 1 --> */}
            <img
                alt="circle"
                className="patterns circle-1"
                ref={(elem) => (iconsRef.current[0] = elem)}
                width="77"
                height="77"
                src={`${window.cdn}icons/Shape-04.png`}
            />

            {/* <!-- CIRCLE 2 --> */}
            <img
                alt="circle"
                className="patterns circle-2"
                ref={(elem) => (iconsRef.current[1] = elem)}
                width="77"
                height="77"
                src={`${window.cdn}icons/Shape-07.png`}
            />

            {/* <!-- CIRCLE 3 --> */}
            <img
                alt="circle"
                className="patterns circle-3"
                ref={(elem) => (iconsRef.current[2] = elem)}
                width="77"
                height="77"
                src={`${window.cdn}icons/Shape-01.png`}
            />

            {/* <!-- BOX 1 --> */}
            <img
                alt="box"
                className="patterns box-1"
                ref={(elem) => (iconsRef.current[3] = elem)}
                width="77"
                height="77"
                src={`${window.cdn}icons/Shape-09.png`}
            />

            {/* <!-- BOX 2 --> */}
            <img
                alt="box"
                className="patterns box-2"
                ref={(elem) => (iconsRef.current[4] = elem)}
                width="100"
                height="100"
                src={`${window.cdn}icons/Shape-06.png`}
            />

            {/* <!-- BOX 3 --> */}
            <img
                alt="box"
                className="patterns box-3"
                ref={(elem) => (iconsRef.current[5] = elem)}
                width="100"
                height="100"
                src={`${window.cdn}icons/Shape-03.png`}
            />

            {/* <!-- TRIANGLE 1 --> */}
            <img
                alt="triangle"
                className="patterns triangle-1"
                ref={(elem) => (iconsRef.current[6] = elem)}
                width="80"
                height="80"
                src={`${window.cdn}icons/Shape-05.png`}
            />

            {/* <!-- TRIANGLE 2 --> */}
            <img
                alt="triangle"
                className="patterns triangle-2"
                ref={(elem) => (iconsRef.current[7] = elem)}
                width="80"
                height="80"
                src={`${window.cdn}icons/Shape-08.png`}
            />

            {/* <!-- TRIANGLE 3 --> */}
            <img
                alt="triangle"
                className="patterns triangle-3"
                ref={(elem) => (iconsRef.current[8] = elem)}
                width="80"
                height="80"
                src={`${window.cdn}icons/Shape-02.png`}
            />
        </div>
    );
};

export default BGPatterns;
