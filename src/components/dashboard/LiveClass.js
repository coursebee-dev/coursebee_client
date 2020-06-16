import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {Helmet} from 'react-helmet'
class LiveClass extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: []
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.getLiveClasses()
    }
    onRegisterClick = async (e) =>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const seo = {
            title: "Coursebee : Live Classrom",
            description:
                "Interactive live classes are coming soon.",
            url: "https://coursebee.com/liveClassroom/",
            image: ""
        };
        const liveClasses = this.state.liveClasses.map(liveClass => (
            <li className="collection-item" key={liveClass._id}>
                <p className="secondary-content">
                   <button onClick={this.onRegisterClick} value={liveClass.meetingid} className="btn btn-small waves-effect waves-light hoverable orange darken-1 black-text">Register</button>
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
                <Helmet
                    title={seo.title}
                    meta={[
                        {
                            name: "description",
                            property: "og:description",
                            content: seo.description
                        },
                        { property: "og:title", content: seo.title },
                        { property: "og:url", content: seo.url },
                    ]}
                />
                <h4 style={{ margin: "50px" }}>Scheduled Classes</h4>
                <ul style={{ textAlign: "left" }} className="collection">{liveClasses}</ul>
            </div>
        )
    }
}

LiveClass.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(LiveClass);
