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
            loading: true,
        }
        this.getLiveClasses = this.getLiveClasses.bind(this)
    }

    getLiveClasses = () => {
        axios.get('/api/approvedliveclass')
            .then(res => {
                this.setState({ liveClasses: res.data,loading: false })
            })
            .catch(err => {
                console.log(err)
            });
    }

    seeDetails(e) {
        window.location.replace(`/liveclass/${e.target.value}`)
    }

    onRegisterClick = (liveclasstype) => e => {
        const liveclassid = e.target.value
        //const liveclasstype = e.target.liveclasstype
        //console.log(liveclassid)
        if (!this.props.auth.isAuthenticated || this.props.auth.user.type !== "student") {
            M.toast({ html: "Please login as a student" })
            return
        }

        if (liveclasstype === "Free") {
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
                .then(res => {
                    M.toast({ html: res.data.message })
                })
                .catch(err => {
                    M.toast({ html: "Server Error" })
                    console.log(err)
                });
        } else if (liveclasstype === "Paid") {
            axios.post(`/api/registerliveclass/${this.props.auth.user.id}/${liveclassid}`)
                .then(res => {
                    if (res.data.status === 'success') {
                        window.open(res.data.data);
                    } else {
                        M.toast({ html: "Server Error" })
                        console.log(res.data.message)
                    }

                })
                .catch(err => {
                    M.toast({ html: "Server Error" })
                    console.log(err)
                });
        }
    }
    componentDidMount() {
        this.getLiveClasses();
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
                <div className="collection-item col m4 s12" key={liveClass._id}>
                    <div className="card custom-card">
                        <div className="card-image">
                            <img src={liveClass.banner_url} alt="banner" height="200px" style={{width: "100%"}}/>
                        </div>
                        <div className="card-content">
                            <div className="card-title center-align">{liveClass.topic}</div>
                            {/*<p><b>Start Time: </b>{new Date(liveClass.start_time).toLocaleDateString() + " " + new Date(liveClass.start_time).toLocaleTimeString()} </p>*/}
                            <p><b>Start Date: </b>Coming Soon</p>
                            <p><b>Duration :</b> {liveClass.temp_duration}</p>
                            {/*<p><b>Duration :</b> {Math.round(liveClass.duration / 60)} hour {liveClass.duration % 60} minutes</p>*/}
                            <p><b>Price:</b> {liveClass.price === 0 ? "Price will be published soon"  : liveClass.price + " BDT" }</p>
                        </div>
                        <div className="card-action">
                            <div className="row">
                                <div className="col m12 s12" style={{marginBottom : "10px"}}>
                                    <button
                                        value={liveClass._id}
                                        onClick={this.seeDetails}
                                        className="btn-flat custom_btn">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                <h4 style={{ margin: "50px" }} className="center-align">Live Classes</h4>
                {this.state.loading ? (
                    <div className="progress">
                        <div className="indeterminate blue"></div>
                    </div>
                ) : (
                    <div className="row">{liveClasses.reverse()}</div>
                )}


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
