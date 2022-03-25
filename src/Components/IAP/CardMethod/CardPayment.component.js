// // REACT, REDUX & 3RD PARTY LIBRARIES
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//     useStripe,
//     useElements,
//     CardNumberElement,
//     CardCvcElement,
//     CardExpiryElement,
// } from "@stripe/react-stripe-js";
// import axios from "axios";

// // COMPONENTS
// // import PaymentProcessing from "Components/PaymentGatewayStatus/PaymentProcessing.component";
// // import PaymentFailed from "Components/PaymentGatewayStatus/PaymentFailed.component";

// // REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
// import loadUserDetails from "redux/thunks/UserDetails.thunk";
// import loadIAPurchaseRequest from "redux/thunks/IAPurchaseRequest.thunk";

// const CardPayment = ({ productInfo, handleBackButton }) => {
//     const dispatch = useDispatch();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [clientSecret, setClientSecret] = useState("");
//     const [email, setEmail] = useState("");
//     const [name, setName] = useState("");
//     const [cardType, setCardType] = useState("");
//     const [paymentProcessModal, setPaymentProcessModal] = useState(false);
//     const [paymentFailedModal, setPaymentFailedModal] = useState(false);

//     // GET CLIENT SECRET
//     useEffect(() => {
//         const getClientSecret = async () => {
//             const { data } = await axios({
//                 method: "post",
//                 url: `${
//                     process.env.REACT_APP_STRIPE_ENDPOINT
//                 }/payments/create?total=${Math.ceil(productInfo?.price * 100)}`,
//             });
//             setClientSecret(data.clientSecret);
//         };
//         if (productInfo?.type === "gems") getClientSecret();
//     }, [productInfo.type, productInfo?.price]);

//     // PAY BUTTON
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) {
//             // Stripe.js has not loaded yet. Make sure to disable
//             // form submission until Stripe.js has loaded.
//             return;
//         }

//         setPaymentProcessModal(true);

//         if (productInfo?.type === "gems") {
//             const { paymentIntent } = await stripe.confirmCardPayment(
//                 clientSecret,
//                 {
//                     payment_method: {
//                         card: elements.getElement(CardNumberElement),
//                         billing_details: {
//                             email: email,
//                             name: name,
//                         },
//                     },
//                 }
//             );
//             if (paymentIntent && paymentIntent.status === "succeeded") {
//                 setPaymentProcessModal(false);
//                 dispatch(
//                     loadIAPurchaseRequest(
//                         paymentIntent.client_secret,
//                         paymentIntent.id,
//                         201,
//                         productInfo?.id,
//                         productInfo?.price
//                     )
//                 );

//                 setTimeout(() => {
//                     dispatch(loadUserDetails());
//                 }, 1000);

//                 handleBackButton(
//                     productInfo?.type,
//                     true,
//                     productInfo?.type === "gems"
//                         ? productInfo?.quantity
//                         : productInfo?.details?.productName
//                 );
//             } else {
//                 setPaymentFailedModal(true);
//                 // handleBackButton(
//                 //     productInfo?.type,
//                 //     false,
//                 //     productInfo?.type === "gems"
//                 //         ? productInfo?.quantity
//                 //         : productInfo?.details?.productName
//                 // );
//                 return;
//             }
//         }
//     };

//     const handleErrorContinue = (view) => {
//         setPaymentFailedModal(view);
//         handleBackButton(
//             productInfo?.type,
//             false,
//             productInfo?.type === "gems"
//                 ? productInfo?.quantity
//                 : productInfo?.details?.productName
//         );
//     };

//     return (
//         <>
//             <div className="container-fluid" id="payment-panel">
//                 <div className="row justify-content-center">
//                     <div className="col-12 col-md-10 col-lg-8 col-xl-8">
//                         <div className="row justify-content-between px-2 mt-2">
//                             {/* BACK BUTTON */}
//                             <button className="d-flex align-items-center justify-content-center p-0">
//                                 <img
//                                     className="back-button"
//                                     width="42"
//                                     onClick={() =>
//                                         handleBackButton(
//                                             productInfo?.type,
//                                             false,
//                                             productInfo?.type === "gems"
//                                                 ? productInfo?.quantity
//                                                 : productInfo?.details
//                                                       ?.productName
//                                         )
//                                     }
//                                     src={`${window.cdn}art_assets/buttons/button_back.png`}
//                                     alt="back-btn"
//                                 />
//                             </button>
//                             <img
//                                 width={110}
//                                 className="img-fluid"
//                                 src={`${window.cdn}art_assets/logo/logo_esportsmini.png`}
//                                 alt="Esports Mini"
//                             />
//                         </div>
//                         <div className="row mt-5">
//                             <div className="col-12 col-lg-5 mb-4 mb-lg-0">
//                                 <h4 className="mb-3 mb-lg-5">
//                                     Payment Summary
//                                 </h4>
//                                 <p className="total-title">Total Payment</p>
//                                 <div className="product p-3 d-flex align-items-center justify-content-between">
//                                     <p className="product-title mb-0">
//                                         {productInfo?.type === "gems"
//                                             ? `${
//                                                   productInfo?.quantity
//                                               } ${productInfo?.type?.toUpperCase()}`
//                                             : productInfo?.details?.productName}
//                                     </p>
//                                     <p className="product-price mb-0">
//                                         {productInfo?.type === "gems"
//                                             ? `SGD ${productInfo?.price?.toFixed(
//                                                   2
//                                               )}`
//                                             : `SGD ${productInfo?.details?.price?.toFixed(
//                                                   2
//                                               )}`}
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="col d-none d-lg-flex align-items-center justify-content-end">
//                                 <div className="line"></div>
//                             </div>
//                             <div className="col-12 col-lg-6">
//                                 <div className="payment-wrapper">
//                                     <h4 className="mb-5">Payment Details</h4>
//                                     {/* PAYMENT */}
//                                     <form onSubmit={handleSubmit}>
//                                         {/* NAME */}
//                                         <div className="form-group">
//                                             <label>Name on card</label>
//                                             <input
//                                                 type="text"
//                                                 className="form-control"
//                                                 id="name"
//                                                 value={name}
//                                                 onChange={(e) =>
//                                                     setName(e.target.value)
//                                                 }
//                                                 required
//                                             />
//                                         </div>
//                                         {/* EMAIL */}
//                                         <div className="form-group">
//                                             <label>Email Address</label>
//                                             <input
//                                                 type="email"
//                                                 className="form-control"
//                                                 id="email"
//                                                 value={email}
//                                                 onChange={(e) =>
//                                                     setEmail(e.target.value)
//                                                 }
//                                                 required
//                                             />
//                                         </div>
//                                         {/* CARD DETAILS */}
//                                         <div className="form-group">
//                                             <label>Card Information</label>
//                                             <div className="col px-0 card-number position-relative">
//                                                 <CardNumberElement
//                                                     onChange={(e) =>
//                                                         setCardType(
//                                                             e.brand ===
//                                                                 "unknown"
//                                                                 ? ""
//                                                                 : e.brand
//                                                         )
//                                                     }
//                                                 />
//                                                 <div className="img-wrapper">
//                                                     {(cardType === "visa" ||
//                                                         cardType === "") && (
//                                                         <img
//                                                             width="24"
//                                                             src={`${window.cdn}art_assets/payment/paymentmethods-04_Visa.png`}
//                                                             alt="visa"
//                                                         />
//                                                     )}
//                                                     {(cardType ===
//                                                         "mastercard" ||
//                                                         cardType === "") && (
//                                                         <img
//                                                             width="24"
//                                                             src={`${window.cdn}art_assets/payment/paymentmethods-03_MasterCard.png`}
//                                                             alt="mastercard"
//                                                         />
//                                                     )}
//                                                     {(cardType === "amex" ||
//                                                         cardType === "") && (
//                                                         <img
//                                                             width="24"
//                                                             src={`${window.cdn}art_assets/payment/paymentmethods-02._AmericanExpress.png`}
//                                                             alt="american_express"
//                                                         />
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div className="d-flex">
//                                                 <div className="col px-0 expiry-date">
//                                                     <CardExpiryElement />
//                                                 </div>
//                                                 <div className="col px-0 ccv">
//                                                     <CardCvcElement />
//                                                     <img
//                                                         className="img-wrapper"
//                                                         width="24"
//                                                         src={`${window.cdn}art_assets/payment/paymentmethods-07_CVC.png`}
//                                                         alt="cvc"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* PAY BUTTON */}
//                                         <button
//                                             type="submit"
//                                             disabled={!stripe}
//                                         >
//                                             {`Pay SGD ${
//                                                 productInfo?.type === "gems"
//                                                     ? productInfo?.price?.toFixed(
//                                                           2
//                                                       )
//                                                     : productInfo?.details?.price?.toFixed(
//                                                           2
//                                                       )
//                                             }`}
//                                         </button>
//                                     </form>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* {paymentProcessModal && <PaymentProcessing />}
//             {paymentFailedModal && (
//                 <PaymentFailed setPaymentFailedModal={handleErrorContinue} />
//             )} */}
//         </>
//     );
// };
// export default CardPayment;
