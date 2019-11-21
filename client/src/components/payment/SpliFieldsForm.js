import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import { connect } from "react-redux";
import * as actions from "../../actions/index";
import axios from "axios";

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "14px",
        color: "#424770",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "lightgray"
        },
        "::selection": {
          color: "pink"
        }
      },
      invalid: {
        color: "#c23d4b"
      },
      complete: {
        color: " #98FF98"
      }
    }
  };
};

const buttonStyle = {
  display: "block",
  width: "100%",
  height: "37px",
  backgroundColor: "#6772e5",
  borderRadius: "2px",
  fontWeight: "600",
  color: "#fff",
  cursor: "pointer",
  outline: "none",
  borderStyle: "none",
  marginTop: "15px"
};

class _SplitFieldsForm extends Component {
  state = {
    errorMessage: "",
    amount: ""
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(res => {
        let amount = this.state.amount;
        let token = res.token;
        axios("/api/stripepay", {
          method: "POST",
          headers: { "content-type": "application/json" },
          data: JSON.stringify({ token, amount })
        });
      });
      // redirect, clear state, thank you alert
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="split-form">
          <label htmlFor="amount">Amount to buy</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={this.state.amount}
            onChange={e =>
              e.target.value > 0
                ? this.setState({ amount: e.target.value })
                : this.setState({ amount: 1 })
            }
          />

          <label>
            Card number
            <CardNumberElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Expiration date
            <CardExpiryElement
              {...createOptions()}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="split-form">
          <label>
            CVC
            <CardCVCElement {...createOptions()} onChange={this.handleChange} />
          </label>
          <label>
            Postal code
            <input
              name="name"
              type="text"
              placeholder="94115"
              className="StripeElement"
              required
            />
          </label>
        </div>
        <div className="error" role="alert">
          {this.state.errorMessage}
        </div>
        <button style={buttonStyle}>Pay</button>
      </form>
    );
  }
}

export default injectStripe(
  connect(
    null,
    actions
  )(_SplitFieldsForm)
);
