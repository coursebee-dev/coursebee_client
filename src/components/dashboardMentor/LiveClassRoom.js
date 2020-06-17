import React, { Component } from 'react'
export default class CiveClassRoom extends Component {
    componentDidMount() {
        console.log(this.props.match.params.topic)
        const domain = 'meet.jit.si';
        const options = {
            roomName: 'CoursebeeJitsiMeetAPIExample',
            width: '100%',
            height: '100%',
            parentNode: document.querySelector('#meet')
        };
        new window.JitsiMeetExternalAPI(domain, options);
        document.querySelector('.navbar-fixed').style.display = "none";
        document.querySelector('.page-footer').style.display = "none";
    }
    componentWillUnmount(){
        document.querySelector('.navbar-fixed').style.display = "block";
        document.querySelector('.page-footer').style.display = "block";
    }
    render() {
        return (
            <div style={{display:'flex',width: '100%'}} id='meet'>

            </div>
        )
    }
}
