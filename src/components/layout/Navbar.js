import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserIcon from "../userIcon/UserIcon"
import styled from 'styled-components';
import logo from '../../images/logo.png';
const LinkStyled = styled(Link)`
    color: black;
	:hover {
        background-color: #fb8c00;
		color: white;
	}
`
const LinkBrand = styled(Link)`
    height: 64px;
	:hover {
        background-color: white;
	}
`
class Navbar extends Component {
    render() {
        return (
            <header className="no-padding">
                <ul className="sidenav" id="mobile-demo">
                    <li><LinkBrand to="/" ><img style={{ height: "60px" }} src={logo} alt="COURSEBEE" /></LinkBrand></li>
                    <li><LinkStyled to="/about">About Us</LinkStyled></li>
                    <li><LinkStyled to="/liveclass">Live Classroom</LinkStyled></li>
                    <li><LinkStyled to="/course">Courses</LinkStyled></li>
                    <li><LinkStyled to="/training">Training</LinkStyled></li>
                    {this.props.auth.isAuthenticated ? <li><LinkStyled className="grey" to="#">{this.props.auth.user.name}</LinkStyled></li> :
                        <li>
                            <LinkStyled to="/mentor">
                                Mentors Here!
                                </LinkStyled>
                        </li>
                    }
                    <li><Link to="#!" className="sidenav-close"><i className="material-icons">close</i></Link></li>
                </ul>
                <div className="navbar-fixed">
                    <nav style={{ height: "64px" }} className="white z-depth-2">
                        <div className="nav-wrapper">
                            <ul className="left">
                                <li><LinkStyled to="#" style={{ height: "64px" }} data-target="mobile-demo" className="sidenav-trigger">

                                    <i style={{ lineHeight: "64px" }} className="material-icons">menu</i></LinkStyled>
                                </li>

                                <li><LinkBrand to="/" ><img style={{ height: "60px" }} src={logo} alt="COURSEBEE" /></LinkBrand></li>
                            </ul>
                            <ul className="right hide-on-med-and-down">
                                <li><LinkStyled to="/about">About Us</LinkStyled></li>
                                <li><LinkStyled to="/liveClass">Live Classroom</LinkStyled></li>
                                <li><LinkStyled to="/course">Courses</LinkStyled></li>
                                <li><LinkStyled to="/training">Training</LinkStyled></li>
                                {this.props.auth.isAuthenticated ? <li><UserIcon /></li> :
                                    <li>
                                        <Link className="teal darken-1" to="/mentor">
                                            Mentors Here!
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Navbar);