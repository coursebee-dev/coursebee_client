import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
class LiveClassRoom extends Component {
    componentDidMount() {
        console.log(this.props.match.params.classid)
        const domain = 'meet.jit.si';
        const options = {
            roomName: this.props.match.params.classid,
            width: '100%',
            height: '100%',
            userInfo: {
                email: this.props.auth.user.email,
                displayName: this.props.auth.user.name
            },
            configOverwrite: {
                startWithAudioMuted: true,
                disableInviteFunctions: true
            },
            interfaceConfigOverwrite: {
                filmStripOnly: true,
                HIDE_INVITE_MORE_HEADER: true,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                    'livestreaming', 'etherpad', 'settings', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
                ]
            },
            parentNode: document.querySelector('#studentmeet')
        };
        new window.JitsiMeetExternalAPI(domain, options);
        document.querySelector('.navbar-fixed').style.display = "none";
        document.querySelector('.page-footer').style.display = "none";
    }
    componentWillUnmount() {
        document.querySelector('.navbar-fixed').style.display = "block";
        document.querySelector('.page-footer').style.display = "block";
    }
    render() {
        return (
            <div style={{ display: 'flex', width: '100%' }} id='studentmeet'>

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
