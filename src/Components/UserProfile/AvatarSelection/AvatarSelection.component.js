// REACT & REDUX
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const AvatarSelection = ({ handleSelectedAvatar, handleBackButton }) => {
    const { user } = useSelector((state) => state.userData);

    let avatarWrapperRef = useRef(null);
    let bottomRef = useRef(null);

    const avatarArr = [
        window.cdn + "avatars/avatar_01.png",
        window.cdn + "avatars/avatar_02.png",
        window.cdn + "avatars/avatar_03.png",
        window.cdn + "avatars/avatar_04.png",
        window.cdn + "avatars/avatar_05.png",
        window.cdn + "avatars/avatar_06.png",
        window.cdn + "avatars/avatar_07.png",
        window.cdn + "avatars/avatar_08.png",
        window.cdn + "avatars/avatar_09.png",
        window.cdn + "avatars/avatar_10.png",
        window.cdn + "avatars/avatar_11.png",
        window.cdn + "avatars/avatar_12.png",
        window.cdn + "avatars/avatar_13.png",
        window.cdn + "avatars/avatar_14.png",
        window.cdn + "avatars/avatar_15.png",
        window.cdn + "avatars/avatar_16.png",
        window.cdn + "avatars/avatar_17.png",
        window.cdn + "avatars/avatar_18.png",
        window.cdn + "avatars/avatar_19.png",
        window.cdn + "avatars/avatar_20.png",
    ];

    useEffect(() => {
        let _ref = avatarWrapperRef.current;
        avatarWrapperRef.current.addEventListener(
            "scroll",
            handleScroll,
            false
        );

        function handleScroll() {
            if (avatarWrapperRef.current.scrollTop > 10) {
                bottomRef.current.style.bottom = 0;
                bottomRef.current.style.opacity = 1;
                bottomRef.current.style.visibility = "visible";
            } else {
                bottomRef.current.style.bottom = "-30px";
                bottomRef.current.style.opacity = 0;
                bottomRef.current.style.visibility = "hidden";
            }
        }
        handleScroll();

        return () => {
            _ref.removeEventListener("scroll", handleScroll, false);
        };
    }, []);

    const onClickAvatarImage = (path) => {
        document.querySelectorAll(".avatar-selection").forEach((e) => {
            if (e.classList.value.includes("active")) {
                e.classList.remove("active");
            }
        });
        if (path.localName === "img") {
            path.classList.add("active");
            handleSelectedAvatar(path.currentSrc);
        }
    };

    return (
        <section id="avatar-selection">
            <div className="container-fluid position-relative">
                <div className="row justify-content-center">
                    {/* BACK BUTTON */}
                    <div className="col-11 col-md-9 col-lg-7 col-xl-6">
                        <img
                            onClick={handleBackButton}
                            className="close-btn"
                            src={`${window.cdn}buttons/button_close_01.png`}
                            alt="close-btn"
                        />
                        <div className="edge-blur top"></div>
                        <div className="edge-blur bottom" ref={bottomRef}></div>

                        <div className="row wrapper" ref={avatarWrapperRef}>
                            {/* AVATARS */}
                            {avatarArr.map((e, i) => (
                                <div
                                    key={i}
                                    className="col-4 col-md-4 px-2 mb-4 d-flex align-items-center justify-content-center"
                                    onClick={(e) =>
                                        onClickAvatarImage(e.target)
                                    }
                                >
                                    <img
                                        className={
                                            e === user?.picture
                                                ? "active avatar-selection"
                                                : "avatar-selection"
                                        }
                                        src={e}
                                        alt="avatar"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AvatarSelection;
