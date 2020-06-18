import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function LiveClassRoom({match}) {
    
    const startMeeting = () => {
        const domain = 'meet.jit.si';
        const options = {
            roomName: match.params.id,
            width: '1080px',
            height: '800px',
            configOverwrite: {
                disableInviteFunctions: true
            },
            interfaceConfigOverwrite: {
                HIDE_INVITE_MORE_HEADER: true,
                TOOLBAR_BUTTONS: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                    'fodeviceselection', 'hangup', 'profile', 'chat', 'etherpad', 'raisehand',
                    'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
                    'tileview', 'videobackgroundblur', 'help'
                ]
            },
            parentNode: document.querySelector('#studentmeet')
        };
        new window.JitsiMeetExternalAPI(domain, options);
    }

    useEffect(()=>{
        startMeeting()
    },[])


    return (
        <div className="container">
                <div style={{display:'flex',width: '100%'}} id='studentmeet'></div>
        </div>
    )
}

LiveClassRoom.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(LiveClassRoom);