import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
export default class ViewLiveClass extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: []
        }
    }
    componentDidMount() {
        axios.get('/api/admin/allliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            });
    }
    onApproveClick = (liveId) => e => {
        e.preventDefault();
        axios.put(`/api/admin/approvelive/${liveId}`)
            .then(res => {
                if (res.data.message === 'success') {
                    this.setState(state => {
                        state.liveClasses.find(live => live._id === liveId).approved = true;
                        return state
                    });
                    //console.log(this.state.mentor)
                } else {
                    throw Error({ message: "failed" })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <li className="collection-item" key={liveClass._id}>
                <p className="secondary-content">Approval Status :<br/>
                    {liveClass.approved ? <span> Approved</span> : <span className="red-text"> Waiting Approval<br/><br/><button onClick={this.onApproveClick(liveClass._id)} className="btn btn-small waves-effect waves-light hoverable black">Approve</button></span>}
                </p>
               
                <h6>Topic : {liveClass.topic}</h6>
                <p>Start Time: {liveClass.start_time.split('T')[0] + " " + liveClass.start_time.split('T')[1]} </p>
                <p>Duration : {liveClass.duration}</p>
                <p>Agenda: {liveClass.agenda}</p>
                <p>Password : {liveClass.password}</p>
            </li>
        ));
        return (
            <div style={{ margin: "50px" }}>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
                <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
                <ul style={{ textAlign: "left" }} className="collection">{liveClasses}</ul>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
        )
    }
}
