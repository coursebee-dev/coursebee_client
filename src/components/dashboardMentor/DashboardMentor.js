import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
import liveClass from '../../images/liveClass.jpg'
import onlineCourse from '../../images/onlineCourse.jpg'
class DashboardMentor extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth; return (
      <div>
        <div>
          <HeaderImg />
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
              {this.props.auth.user.adminVerify === false ? <h5 className="red-text">Your information is still under review. You will be reviewed within 24 hours</h5> : null}
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }} >
                <div style={{ width: "500px" }} className="card large">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img src={liveClass} alt="live class" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">LIVE CLASS<i className="material-icons right">more_vert</i></span>
                    {this.props.auth.user.adminVerify === true ? <p><Link to="#">Schedule A Live Class</Link></p> : <p className="red-text">You can schedule a live class once you are approved</p>}
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">LIVE CLASS<i className="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                  </div>
                </div>
                <div style={{ width: "500px" }} className="card large">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img src={onlineCourse} alt="online course" />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">ONLINE COURSE<i className="material-icons right">more_vert</i></span>
                    {this.props.auth.user.adminVerify === true ? <p><Link to="#">Drop An Online Course</Link></p> : <p className="red-text">You can drop an online course once you are approved</p>}
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">ONLINE COURSE<i className="material-icons right">close</i></span>
                    <p>Here is some more information about this product that is only revealed once clicked on.</p>
                  </div>
                </div>
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
      </div>
    );
  }
}

DashboardMentor.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardMentor);