import React, { Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import logo from '../../images/logo.png';
import logoutUser from '../../actions/logoutAction'


const Navbar = ({ auth, setNavHeight }) => {
    const dispatch = useDispatch()
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
                    {auth.isAuthenticated ?
                        (
                            <Fragment>
                                <li>
                                    <Link to="/dashboard">Account</Link>
                                </li>
                                <li>
                                    <Link to="/" onClick={() => dispatch(logoutUser())}>Logout</Link>
                                </li>
                            </Fragment>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                </ul>
            </nav>
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
