import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
class LiveClassRoom extends Component {

    render() {
        return (
            <div style={{ display: 'flex', width: '100%' }}>

            </div>
        )
    }
}

LiveClassRoom.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassRoom);
