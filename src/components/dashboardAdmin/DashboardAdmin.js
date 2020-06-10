import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/logoutAction";
//import HeaderImg from "../layout/HeaderImg"
import Mentor from "../adminComponents/Mentor";
import User from "../adminComponents/User";
import M from 'materialize-css';

class DashboardAdmin extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
    M.Tabs.init(this.Tabs);
  }

  setLoader (set) {
    this.setState({isLoading:set})
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/");
    this.props.logoutUser();
  };
  render() {
    //const { user } = this.props.auth;
    return (
      <div>
        {/*<HeaderImg />*/}
        <div></div>
        <div className="row">
          <div className="col s12 center-align">
              <div className="row">
                <div className="col s12">
                  <div className="container">
                  <ul className="tabs" ref={Tabs => {
                        this.Tabs = Tabs;
                    }}>
                    <li className="tab col s3"><a href="#mentors" >Mentors</a></li>
                    <li className="tab col s3"><a href="#users" >Users</a></li>
                    <li className="tab col s3"><a href="#requests" >Requests</a></li>
                    <li className="tab col s3"><a href="#webinars">Webinars</a></li>
                  </ul>
                  </div>
                </div>
                  <div id="mentors" className="col s12"><Mentor isLoading={this.state.isLoading} setLoader={set=>this.setLoader(set)} /></div>
                  <div id="users" className="col s12"><User /></div>
                  <div id="requests" className="col s12"><Mentor /></div>
                  <div id="webinars" className="col s12"><Mentor /></div>
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