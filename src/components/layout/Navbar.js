import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserIcon from "../userIcon/UserIcon"
import styled from 'styled-components';
import logo from '../../images/logo.png';
import live from '../../images/live.gif';

const LinkBrand = styled(Link)`
    height: 64px;
	:hover {
        background-color: white;
	}
`
const Navbar = ({ auth, setNavHeight }) => {
    const heightRef = useRef(null)
    useEffect(() => {
        if (heightRef.current) {

            let navbarheight = heightRef.current.offsetHeight;
            setNavHeight(navbarheight)

        }
    }, [heightRef, setNavHeight])
    return (
        <header ref={heightRef} className="no-padding">
            <nav className="navbar">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
                <ul>
                    <li>
                        <Link to="/course">Courses</Link>
                    </li>
                    <li>
                        <Link to="/training">Training</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <ul style={{ display: "none" }} className="sidenav" id="mobile-demo">
                <li><LinkBrand to="/" ><img style={{ height: "60px" }} src={logo} alt="COURSEBEE" /></LinkBrand></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/liveclass"><img src={live} style={{ width: "10px", marginRight: "5px" }} alt="live" />Live Classroom</Link></li>
                <li><Link to="/course">Courses</Link></li>
                <li><Link to="/training">Training</Link></li>
                {auth.isAuthenticated ? <li><Link className="grey" to="#">{auth.user.name}</Link></li> :
                    <li>
                        <Link to="/mentor">
                            Mentors Here!
                                </Link>
                    </li>
                }
                <li><Link to="#!" className="sidenav-close"><i className="material-icons">close</i></Link></li>
            </ul>
            <div style={{ display: "none" }} className="navbar-fixed">
                <nav style={{ height: "64px" }} className="white z-depth-2">
                    <div className="nav-wrapper">
                        <ul className="left">
                            <li><Link to="#" style={{ height: "64px" }} data-target="mobile-demo" className="sidenav-trigger">

                                <i style={{ lineHeight: "64px" }} className="material-icons">menu</i></Link>
                            </li>

                            <li><LinkBrand to="/" ><img style={{ height: "60px" }} src={logo} alt="COURSEBEE" /></LinkBrand></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/liveClass"><img src={live} alt="live" style={{ width: "10px", marginRight: "5px" }} />Live Classroom</Link></li>
                            <li><Link to="/course">Courses</Link></li>
                            <li><Link to="/training">Training</Link></li>
                            {auth.isAuthenticated ? <li><UserIcon /></li> :
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
Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Navbar);
