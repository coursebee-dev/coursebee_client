import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
export default class ViewStudent extends Component {
    constructor() {
        super();
        this.state = {
            allStudents: []
        };
    }
    componentDidMount() {
        axios.get('/api/admin/allStudents')
            .then(res => {
                this.setState({ allStudents: res.data })
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        const allStudents = this.state.allStudents.map(student => (
            <li className="collection-item" key={student._id}>
                <h6>Name : {student.name}</h6>
                <p>Email: {student.email}</p>
                <p>Institution : {student.institution}</p>
                <p>Subject : {student.subject}</p>
            </li>
        ));
        return (

            <div style={{ width: "100%", margin: "50px" }}>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                    <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
                <h4 style={{ margin: "50px" }} className="center-align">Students IN COURSEBEE</h4>
                <ul className="collection">{allStudents}</ul>
                <Link to="/admin/dashboard" className="btn-flat waves-effect orange darken-1">
                    <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
        )
    }
}
