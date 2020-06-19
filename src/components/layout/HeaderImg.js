import React, { Component } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import hexagon from '../../images/hexagon2.jpg'
import hexagonwebp from '../../images/hexagon2.webp'
class HeaderImg extends Component {
    render() {
        return (
                
                    <img className="" style={{ width: "100vw" }} src={hexagon} alt="header img" />
                
        );
    }
}
HeaderImg.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    auth: state.auth,
});
export default connect(
    mapStateToProps,
)(HeaderImg);