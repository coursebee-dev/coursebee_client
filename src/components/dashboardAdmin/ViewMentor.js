import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
export default class ViewMentor extends Component {
    constructor() {
        super();
        this.state = {
            allMentors: []
        };
    }
    componentDidMount() {
        axios.get('/api/admin/allMentors')
            .then(res => {
                this.setState({ allMentors: res.data })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }
    onViewDetailClick = mentorId => e => {
        e.preventDefault();
        this.props.history.push('/admin/dashboard/viewmentor/' + mentorId)
    }
    render() {
        const allMentors = this.state.allMentors.map(mentor => (
            <li className="collection-item" key={mentor._id}>
                <p className="secondary-content">
                    <button onClick={this.onViewDetailClick(mentor._id)} className="btn btn-small waves-effect waves-light hoverable black">View Details</button>
                </p>
                <h6>Name : {mentor.name}</h6>
                <p>Email: {mentor.email}</p>
                <p>Organization : {mentor.organization}</p>
                <p>Position : {mentor.position}</p>
                <p>Mobile No. : {mentor.mobileNo}</p>
                <p>Verification Status: {mentor.adminVerify?"verified":"not verified"}</p>
                
                
            </li>
        ));
        return (
            
            <div style={{width:"100%",margin:"50px"}}>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
                <h4 style={{margin:"50px"}} className="center-align">MENTORS IN COURSEBEE</h4>
                <ul className="collection">{allMentors}</ul>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
        )
    }
}
