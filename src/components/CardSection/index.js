import React from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  // classes: { base: 'form-input form-control'},
  style: {
    base: {
      color: "#303238",
      fontSize: "16px",
      fontFamily: "sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#CFD7DF"
      }
    },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      }
    }
  }
};

function CardSection() {
  return (
    // <label>
    <div className="form-group">
      <label className="form-label">Card Number </label>
      <CardNumberElement className="form-input form-control" options={CARD_ELEMENT_OPTIONS} />
      <label className="form-label">Expiration </label>
      <CardExpiryElement className="form-input form-control" options={CARD_ELEMENT_OPTIONS}/>
      <label className="form-label">CVC </label>
      <CardCvcElement className="form-input form-control" options={CARD_ELEMENT_OPTIONS}/>
    </div>
  );
}

export default CardSection;