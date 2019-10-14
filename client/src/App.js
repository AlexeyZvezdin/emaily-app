import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./actions/index";

import Header from "./components/Header";
import Landing from "./components/Landing";

const Dashboard = () => <h2>Dasboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route component={Landing} exact path="/" />
            <Route exact component={Dashboard} path="/surveys" />

            <Route exact component={SurveyNew} path="/surveys/new" />
          </div>
          <div></div>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
