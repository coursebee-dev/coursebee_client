import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
class DashboardAdmin extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <HeaderImg />
        <div></div>
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hello, </b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                Thank you for signing in to COURSEBEE. We are continuously working to make this a better platform.
                <br /><br />If you want to join our team send us a message in our{" "}
                <a href="https://www.facebook.com/coursebee.live" target="_blank" rel="noopener noreferrer">facebook page</a>.
              </p>
            </h4>
            <div className="container left-align">
              <Link to="/admin/dashboard/viewmentor" style={{ margin: "15px", width: "100%" }} className="btn btn-large waves-effect waves-light hoverable black">View All Mentors</Link>
            </div>
            <div className="container left-align">
              <Link to="/admin/dashboard/viewliveclass" style={{ margin: "15px", width: "100%" }} className="btn btn-large waves-effect waves-light hoverable black">View All Live Classes</Link>
            </div>
            <div className="container left-align">
              <Link to="/admin/dashboard/viewstudent" style={{ margin: "15px", width: "100%" }} className="btn btn-large waves-effect waves-light hoverable black">View All Students</Link>
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable teal darken-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

DashboardAdmin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardAdmin);