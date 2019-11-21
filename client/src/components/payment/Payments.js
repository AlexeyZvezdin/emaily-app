import React, { Component } from "react";

import InjectedCheckoutForm from "./CheckoutForm";

const PaymentsStyles = {
  maxWidth: "450px",
  margin: "20px auto",
  padding: " 25px",
  borderRadius: "4px",
  boxShadow: "rgb(189, 179, 201) 0px 2px 4px 2px"
};

class Payments extends Component {
  render() {
    return (
      <div style={PaymentsStyles}>
        <h5>React Stripe Elements Example</h5>
        <InjectedCheckoutForm
          stripePublicKey={process.env.REACT_APP_STRIPE_KEY}
        />
      </div>
    );
  }
}

export default Payments;
