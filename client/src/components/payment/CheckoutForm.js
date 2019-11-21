import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import SplitFieldsForm from "./SpliFieldsForm";

export class CheckoutForm extends React.Component {
  render() {
    return (
      <StripeProvider apiKey={this.props.stripePublicKey}>
        <Elements>
          <SplitFieldsForm />
        </Elements>
      </StripeProvider>
    );
  }
}

export default CheckoutForm;
