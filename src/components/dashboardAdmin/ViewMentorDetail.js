import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";


export default class ViewMentorDetail extends Component {
    constructor() {
        super();
        this.state = {
            mentor: {}
        };
    }
    componentDidMount() {
        console.log('/api/admin/allMentors/' + this.props.match.params.mentorid)
        axios.get('/api/admin/allMentors/' + this.props.match.params.mentorid)
            .then(res => {
                //console.log(res.data)
                this.setState({ mentor: res.data })
                //console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }
    onVerifyClick = e => {
        e.preventDefault();
        axios.put('/api/admin/verifyMentor/' + this.props.match.params.mentorid)
            .then(res => {
                if (res.data.message === 'success') {
                    this.setState(state => {
                        state.mentor.adminVerify = true;
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
        return (
            <div style={{ width: "100%" }}>
                <div className="container">
                    <h2>{this.state.mentor.name}</h2>
                    <h5>{this.state.mentor.email}</h5>
                    <h5>{this.state.mentor.organization}</h5>
                    <h5>{this.state.mentor.position}</h5>
                    <h5>{this.state.mentor.mobileNo}</h5>
                    <h5>{this.state.mentor.adminVerify ?
                        <div> verified <br /><br /><button onClick={this.onVerifyClick} className="btn btn-small waves-effect waves-light hoverable red">Suspend</button></div>
                        :
                        <div> suspended <br /><br /><button onClick={this.onVerifyClick} className="btn btn-small waves-effect waves-light hoverable black">Verify</button></div>
                    }
                    </h5>
                    <Link to="/admin/dashboard/viewmentor" className="btn-flat waves-effect orange darken-1">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                    </Link>
                </div>
            </div>
        )
    }
}
