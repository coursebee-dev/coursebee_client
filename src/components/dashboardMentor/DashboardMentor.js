import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
import liveClass from '../../images/liveClass.jpg'
import onlineCourse from '../../images/onlineCourse.jpg'
import LiveClassMentor from './LiveClassMentor'
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
              {this.props.auth.user.adminVerify === false ?
                <h5 className="red-text">Your account has been suspended. Your information is under review.
                <br />To schedule live classes or submit online courses please send us an email</h5>
                :
                <div style={{ padding: '5%', display: "flex", justifyContent: "space-around", flexWrap: "wrap" }} >
                  <Link to="/mentor/dashboard/scheduleclass" style={{ margin: "5%", padding: '0', width: "400px", height: "auto" }} className="btn btn-large waves-effect waves-light hoverable white black-text">
                    <div style={{ height: "80%" }}><img style={{ width: "100%" }} src={liveClass} alt="live class" /></div>
                    <div style={{ marginBottom: "20px" }}>Schedule A Live Class Now</div>
                  </Link>
                  <Link to="#" style={{ margin: "5%", padding: '0', width: "400px", height: "auto" }} className="btn btn-large waves-effect waves-light hoverable white black-text">
                    <div style={{ height: "80%" }}><img style={{ width: "100%" }} src={onlineCourse} alt="online course" /></div>
                    <div style={{ marginBottom: "20px" }}>Drop An Online Course Now</div>
                  </Link>
                </div>
              }
              <LiveClassMentor mentorId={this.props.auth.user.id}/>
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