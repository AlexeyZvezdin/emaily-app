import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends React.Component {
  renderContext() {
    switch (this.props.auth) {
      case null: {
        return "Loading";
      }
      case false: {
        return <a href="/auth/google">Log In with Google</a>;
      }
      default: {
        return [
          <li key="1" style={{ margin: "0 5px" }}>
            <span>Credits: {this.props.auth.credits}</span>
          </li>,
          <li key="2">
            <a href="/api/logout">Logout</a>
          </li>
        ];
      }
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContext()}
            <li>
              <a href="collapsible.html">JavaScript</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);
