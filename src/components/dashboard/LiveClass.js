import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Helmet } from 'react-helmet'
import M from "materialize-css"
class LiveClass extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            notify:""
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data })
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.getLiveClasses()
    }
    onRegisterClick = e => {
        console.log(this.props.studentId)
        axios.post('/api/registerliveclass/'+this.props.studentId)
            .then(res => {
                this.setState({ notify: res.data.message })
            })
            .catch(err => {
                console.log(err)
            });

        M.toast({ html: this.state.notify })
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
                    <button onClick={this.onRegisterClick} className="btn btn-small waves-effect waves-light hoverable orange darken-1 black-text">Register</button>
                </p>
                <h6>Topic : {liveClass.topic}</h6>
                <p>Start Time: {liveClass.start_time.split('T')[0] + " " + liveClass.start_time.split('T')[1]} </p>
                <p>Duration : {liveClass.duration}</p>
                <p>Type: {liveClass.class_type}</p>
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
