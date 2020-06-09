import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
import HeaderImg from "../layout/HeaderImg"
import axios from "axios";
class DashboardAdmin extends Component {
  constructor() {
    super();
    this.state = {
      allMentors: []
    };
  }
  componentDidMount() {
    axios.get('/api/admin/allMentors')
      .then(res => {
        this.setState({ allMentors: res.data })
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      });
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };
  onVerifyClick = mentorId => e => {
    e.preventDefault();
    axios.put('/api/admin/verifyMentor/' + mentorId)
      .then(res => {
        if (res.data.message === 'success') {
          this.state.allMentors.find(mentor => mentor._id === mentorId).adminVerify = true;
          this.setState(this.state)
          console.log(res.data)
        } else {
          throw Error({ message: "failed" })
        }
      })
      .catch(err => {
        console.log(err)
      });
  }
  render() {
    const allMentors = this.state.allMentors.map(mentor => (
      <li className="collection-item" key={mentor._id}>
        <span class="title">{mentor.name}</span>
        <p>{mentor.email}</p>
        <p>{mentor.organization}</p>
        <p>{mentor.position}</p>
        <p>{mentor.mobileNo}</p>
        <p>
          {mentor.adminVerify ? "verified" : <button onClick={this.onVerifyClick(mentor._id)} className="btn btn-small waves-effect waves-light hoverable black">Verify</button>}   
        </p>
        <br />
      </li>
    ));
    const { user } = this.props.auth;
    return (
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
            <div className="container left-align">
              <h5>Mentors in Coursebee</h5>
              <ul className="collection">
                {allMentors}
              </ul>
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