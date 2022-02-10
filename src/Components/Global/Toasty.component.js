import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { RESET_TOAST } from "redux/types";

const Toasty = () => {
    const { toasty } = useSelector((state) => state.toasty);
    const dispatch = useDispatch();

    let toastyRef = useRef(null);

    useEffect(() => {
        toastyRef.current.removeAttribute("style");

        if (toasty?.message) {
            gsap.to(toastyRef.current, {
                duration: 0.5,
                autoAlpha: 1,
                x: 0,
                ease: "circ.out",
                onComplete: () => {
                    gsap.to(toastyRef.current, {
                        delay: 3,
                        duration: 0.5,
                        x: "120%",
                        autoAlpha: 0,
                        ease: "circ.out",
                        onComplete: () => {
                            dispatch({
                                type: RESET_TOAST,
                            });
                        },
                    });
                },
            });
        }
    }, [toasty?.message, dispatch]);

    return (
        <div className="toasty" ref={toastyRef}>
            <p className="mb-0">{toasty?.message}</p>
        </div>
    );
};

export default Toasty;
