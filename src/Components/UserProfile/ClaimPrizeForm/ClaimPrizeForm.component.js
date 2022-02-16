import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

import ClaimPrizeSuccessModal from "Components/Modals/ClaimPrizeSuccess.modal";

import loadClaimedPrizes from "redux/thunks/ClaimedPrizes.thunk";
import loadUnClaimedPrizes from "redux/thunks/UnClaimedPrizes.thunk";
import loadClaimPrize from "redux/thunks/ClaimPrize.thunk";

const ClaimPrizeForm = () => {
    const { id } = useParams();

    const { unClaimedPrizes } = useSelector((state) => state.unClaimedPrizes);
    const { user } = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zipcode: "",
        region: "",
        country: "",
        countryCode: "",
        agreement: false,
    });
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [selectedPrize, setSelectedPrize] = useState(null);

    useEffect(() => {
        if (
            performance.getEntriesByType("navigation")[0] &&
            performance.getEntriesByType("navigation")[0].type === "reload" &&
            user.id > 0
        )
            dispatch(loadUnClaimedPrizes());
    }, [dispatch, user.id]);

    useEffect(() => {
        if (unClaimedPrizes.length > 0) {
            const idx = unClaimedPrizes.findIndex((e) => e.id === parseInt(id));
            if (idx > -1) setSelectedPrize(unClaimedPrizes[idx]);
        } else {
            user.id > 0 && dispatch(loadUnClaimedPrizes());
        }
    }, [unClaimedPrizes, id, dispatch, user.id]);

    useEffect(() => {
        async function getIPInfo() {
            const { data } = await axios.get(
                "https://api.db-ip.com/v2/free/self"
            );
            setFormData((prev) => ({
                ...prev,
                countryCode: data?.countryCode,
                country: data?.countryName,
            }));
        }

        const ipInfo = JSON.parse(localStorage.getItem("ipInfo"));
        if (ipInfo?.country_name.length > 0) {
            setFormData((prev) => ({
                ...prev,
                countryCode: ipInfo?.country_calling_code,
                country: ipInfo?.country_name,
            }));
        } else getIPInfo();
    }, []);

    const handleSubmitClaim = (e) => {
        e.preventDefault();

        if (formData?.agreement) {
            successSubmissionCallback();
            dispatch(
                loadClaimPrize(
                    selectedPrize?.id,
                    formData,
                    successSubmissionCallback
                )
            );
        }
    };

    function successSubmissionCallback() {
        dispatch(loadClaimedPrizes());
        dispatch(loadUnClaimedPrizes());

        setConfirmationModal(true);
    }

    const handlePhoneNumberFormat = (val, formattedValue) => {
        setFormData((prev) => ({
            ...prev,
            countryCode: Number(formattedValue.dialCode),
            phone: val,
        }));
    };

    return (
        <>
            {/* CLAIM FORM */}
            <section id="claim-form">
                <div className="container-fluid min-vh-100">
                    <div className="row">
                        {/* BACK BUTTON */}
                        <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto mt-3 mb-5 d-flex align-items-center justify-content-between">
                            <Link
                                to={{
                                    pathname: "/profile/rewards",
                                }}
                            >
                                <img
                                    className="back-button"
                                    width="40"
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                            </Link>
                            <img
                                className="img-fluid"
                                width={110}
                                src={`${window.cdn}logo/logo_gamebox.png`}
                                alt="GameBox"
                            />
                        </div>
                        <div className="col-12 col-md-10 col-lg-8 col-xl-8 mx-auto mb-5">
                            <div className="prize-info">
                                <p className="prize-content mb-0">
                                    {selectedPrize?.prizeContent}
                                </p>
                                <img
                                    className="img-fluid prize-img mb-4"
                                    width="200"
                                    src={selectedPrize?.prizeImageUrl}
                                    alt="prize"
                                />
                                <h3 className="prize-name mb-3">
                                    {selectedPrize?.prizeTitle}
                                </h3>
                                <h6 className="title mb-5">
                                    Please confirm your name and contact
                                    details.
                                </h6>
                                <form
                                    className="w-100"
                                    onSubmit={handleSubmitClaim}
                                >
                                    <label className="mb-3">Recipient</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullname"
                                            placeholder="Full name"
                                            value={formData?.fullName}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    fullName: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email address"
                                            value={formData?.email}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <PhoneInput
                                            inputProps={{
                                                name: "phone",
                                                required: true,
                                                autoFocus: true,
                                            }}
                                            enableSearch={true}
                                            country={"my"}
                                            value={formData?.phone}
                                            onChange={(val, formattedValue) =>
                                                handlePhoneNumberFormat(
                                                    val,
                                                    formattedValue
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="col-12 mt-5"></div>

                                    <label className="mb-3">
                                        Delivery address
                                    </label>
                                    <div className="form-group">
                                        <textarea
                                            className="w-100"
                                            rows="4"
                                            placeholder="Your address"
                                            value={formData?.address}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    address: e.target.value,
                                                }))
                                            }
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={formData?.city}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        city: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <RegionDropdown
                                                placeholder="State/Province/Region"
                                                required
                                                className="region"
                                                country={formData?.country}
                                                value={formData?.region}
                                                onChange={(val) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        region: val,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-6">
                                            <input
                                                type="tel"
                                                placeholder="Zip Code"
                                                minLength={2}
                                                maxLength={10}
                                                onKeyDown={(e) => {
                                                    if (e.key === ".")
                                                        e.preventDefault();
                                                }}
                                                onInput={(e) =>
                                                    (e.target.value =
                                                        e.target.value.replace(
                                                            /[^0-9]*/g,
                                                            ""
                                                        ))
                                                }
                                                value={formData?.zipcode}
                                                onChange={(e) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        zipcode: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <CountryDropdown
                                                placeholder="Country"
                                                required
                                                className="countries"
                                                value={formData?.country}
                                                onChange={(val) =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        country: val,
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <label className="checkbox-wrapper mt-4">
                                        I agree to the GameBox{" "}
                                        <span className="terms">
                                            <Link to="#">
                                                terms and conditions
                                            </Link>
                                        </span>{" "}
                                        and
                                        <span className="privacy">
                                            <Link to="#"> privacy policy.</Link>
                                        </span>
                                        <input
                                            type="checkbox"
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    agreement: e.target.checked,
                                                }))
                                            }
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                    <button
                                        type="submit"
                                        disabled={
                                            formData?.agreement
                                                ? ""
                                                : "disabled"
                                        }
                                        className={
                                            formData?.agreement
                                                ? "btn btn-submit mt-4"
                                                : "disabled btn btn-submit mt-4"
                                        }
                                    >
                                        Claim Reward
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* SUCCESS MODAL */}
            {confirmationModal && (
                <ClaimPrizeSuccessModal
                    unClaimedPrizes={unClaimedPrizes}
                    selectedPrize={selectedPrize}
                    setConfirmationModal={setConfirmationModal}
                />
            )}
        </>
    );
};

export default ClaimPrizeForm;
