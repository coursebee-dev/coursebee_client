import React, { Component } from 'react'
import axios from "axios";
export default class LiveClassMentor extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: []
        }
    }
    componentDidMount() {
        console.log(this.props.mentorId)
        axios.get('/api/mentor/liveclass/' + this.props.mentorId)
            .then(res => {
                this.setState({ liveClasses: res.data })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <li className="collection-item" key={liveClass._id}>
                <p className="secondary-content">Approval Status :
                { liveClass.approved ?<span> Approved</span>:<span className="red-text"> Waiting Approval</span>}
                </p>

                <h6>Topic : {liveClass.topic}</h6>
                <p>Start Time: {liveClass.start_time.split('T')[0]+ " " + liveClass.start_time.split('T')[1]} </p>
                <p>Duration : {liveClass.duration}</p>
                <p>Agenda: {liveClass.agenda}</p>
                <p>Password : {liveClass.password}</p>
            </li>
        ));
        return (
            <div style={{ margin: "50px" }}>
                <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
                <ul style={{ textAlign: "left" }} className="collection">{liveClasses}</ul>
            </div>
        )
    }
}
