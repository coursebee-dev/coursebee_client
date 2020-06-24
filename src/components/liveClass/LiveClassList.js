import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet'
import M from "materialize-css"

class LiveClassList extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: [],
            loading: false,
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
    onRegisterClick = e => {
        const liveclassid = e.target.value
        const liveclasstype = e.target.id
        if(!this.props.auth.isAuthenticated || this.props.auth.user.type !== "student"){
            M.toast({ html: "Please login as a student"})
            return
        }
        
        if(liveclasstype==="Free"){
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
            .then(res => {
                M.toast({ html: res.data.message })
            })
            .catch(err => {
                M.toast({ html: "Server Error"})
                console.log(err)
            });
        } else if(liveclasstype==="Paid") {
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
            .then(res => {
                console.log(res.data)
                window.open(res.data.GatewayPageURL);
            })
            .catch(err => {
                M.toast({ html: "Server Error"})
                console.log(err)
            });
        }
    }
    componentDidMount() {
        this.getLiveClasses()
        
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
                {(() => {
                    switch (liveClass.class_type) {
                    case "Free":   return (
                        <p className="secondary-content">
                            <button value={liveClass._id} id={liveClass.class_type} onClick={this.onRegisterClick} className="btn btn-small waves-effect waves-light hoverable orange darken-1 black-text">Register for free</button>
                        </p>
                    );
                    case "Paid": return (
                        <p className="secondary-content">
                            <button value={liveClass._id} id={liveClass.class_type} /*id="sslczPayBtn" postdata={paymentData} endpoint="https://coursebee-server-staging.herokuapp.com/api/payment" order={liveClass._id+Math.random().toString(36).substring(7)}*/ onClick={this.onRegisterClick} className="btn btn-small waves-effect waves-light hoverable orange darken-1 black-text">Register for ৳ {liveClass.price}</button>
                        </p>
                    );
                    }
                })()}
                <h6>Topic : {liveClass.topic}</h6>
                <div dangerouslySetInnerHTML={{__html: liveClass.description}} />
                <p>Start Time: {new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()} </p>
                <p>Duration : {liveClass.duration}</p>
                <p>Type: {liveClass.class_type}</p>
            </li>
        ));
        return (
            <div className="container" >
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
                <ul style={{width:"100%",textAlign: "left" }} className="collection">{liveClasses.reverse()}</ul>
                <Link style={{ margin: "40px" }} to="/" className="btn-flat waves-effect teal darken-1 white-text">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                </Link>
            </div>
        )
    }
}

LiveClassList.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(LiveClassList);
