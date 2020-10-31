import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
class LiveClassRoomMentor extends Component {
    render() {
        return (
            <div style={{ display: 'flex', width: '100%' }}>

            </div>
        )
    }
}

LiveClassRoomMentor.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassRoomMentor);
