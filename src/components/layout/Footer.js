import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from '../../images/logo.png';

const Footer = ({ auth, setFootHeight }) => {
    const heightRef = useRef(null)
    useEffect(() => {
        if (heightRef.current) {

            let footerheight = heightRef.current.offsetHeight;
            setFootHeight(footerheight)

        }
    }, [heightRef, setFootHeight])
    return (
        <footer ref={heightRef}>
            <ul >
                <li ><Link to="/about">About</Link></li>
                <li ><Link to="/contactus" title="Contact">Contact</Link></li>
                <li ><Link to="/disclaimer">Disclaimer</Link></li>
                <li ><Link to="/privacy">Privacy</Link></li>
                <li ><Link to="/terms">Terms</Link></li>
                {auth.isAuthenticated ? null : <li><Link to="/admin">Admin</Link></li>}
                {auth.isAuthenticated ? <li ><Link to="#">Settings</Link></li> : null}
            </ul>
            <div className='footer__copyright'>
                <Link to="/" ><img src={logo} alt="COURSEBEE" /></Link>
                <p >© Kernel Technologies</p>
            </div>
        </footer>
    );
}
Footer.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(Footer);