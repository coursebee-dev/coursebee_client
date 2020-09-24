import React, { Component } from 'react'
import axios from 'axios'
import '../../App.css'
import M from "materialize-css"
import { Link } from "react-router-dom";

export default class LiveClassDetail extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: {},
            mentor: {},
            loading: false,
            showTab : "description"
        }
        this.getMentor = this.getMentor.bind(this)
        this.getLiveClass = this.getLiveClass.bind(this)
    }

    getMentor = async (mentorid) => {
        try {
            const { data } = await axios.get(`/api/mentor/mentorinfo/${mentorid}`)
            this.setState({ mentor: data })
        } catch (error) {
            console.log(error)
        }
    }

    getLiveClass = async () => {
        try {
            const { data } = await axios.get(`/api/liveclassdetails/${this.props.match.params.id}`)
            this.setState({ liveClasses: data })
            this.getMentor(data.mentorId)
        } catch (error) {
            console.log(error)
        }
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
        this.getLiveClass()
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <div className="row">
                    <img src={this.state.liveClasses.banner_url} alt="banner" width="100%" height="600px"/>
                        <div className="col m9">

                            <h1 className="center-align">{this.state.liveClasses.topic}</h1>
                            <blockquote>

                                <p><b>Duration :</b>{this.state.liveClasses.temp_duration } </p>
                                {/*<p><b>Duration :</b> {Math.round(this.state.liveClasses.duration / 60)} hour {this.state.liveClasses.duration % 60} minutes </p>*/}
                                <p><b>Price:</b> {this.state.liveClasses.price} Taka</p>
                                <p><b>Price:</b> <b style={{color: "green"}}>{this.state.liveClasses.price === 0 ? "Price will be published soon"  : "৳ "+this.state.liveClasses.price  }</b> {this.state.liveClasses.prev_price ? <strike style={{color: "red"}}> ৳ {this.state.liveClasses.prev_price}</strike> : ''}</p>
                            </blockquote>

                            <div className="row" style={{ color: "black"}}>
                                <div className="col m6 s6" onClick={() => this.setState({showTab: "description"})}><span className={`details_tab ${this.state.showTab === "description" ? "active_tab" : ''}`}><i class="fa fa-pencil-square-o" aria-hidden="true"></i>Description</span></div>
                                <div className="col m6 s6" onClick={() => this.setState({showTab: "class_schedule"})}><span className={`details_tab ${this.state.showTab === "class_schedule" ? "active_tab" : ''}`}><i class="fa fa-address-book" aria-hidden="true"></i>Course Curriculam</span></div>
                            </div>

                            <div className="row">
                                {
                                  this.state.showTab === "description" ?
                                  (
                                    <div clasName="col m12 s12 description">
                                        <div dangerouslySetInnerHTML={{ __html: this.state.liveClasses.description }}  style={{background: "rgb(241, 241, 241)", padding: "20px"}}/>
                                    </div>
                                  ) :
                                  (
                                    <div clasName="col m12 s12 description">
                                        <div dangerouslySetInnerHTML={{ __html: this.state.liveClasses.class_schedule }}  style={{background: "rgb(241, 241, 241)", padding: "20px"}}/>
                                    </div>
                                  )
                                }
                            </div>

                        </div>
                        <div className="col m3" style={{marginTop: "100px"}}>
                            {/*<div id="card" className="card vertical">*/}
                            {/*    <div className="card-image">*/}
                            {/*        <img className="responsive-img mentors" alt="mentor" src="https://icon-library.com/images/profile-image-icon/profile-image-icon-26.jpg" />*/}
                            {/*    </div>*/}
                            {/*    <div className="card-content">*/}
                            {/*        Mentor:*/}
                            {/*        <span className="card-title">{this.state.mentor.name}</span>*/}
                            {/*        <p>{this.state.mentor.organization}</p>*/}
                            {/*        <p>{this.state.mentor.position}</p>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="card vertical">

                                <div className="card-content">
                                    <h5  className="card-title center-align">Mentor</h5>
                                    <span><b>Name: </b>{this.state.mentor.name}</span>
                                    <p><b>Organization: </b>{this.state.mentor.organization}</p>
                                    <p><b>Position: </b>{this.state.mentor.position}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <Link style={{ margin: "40px" }} to="/liveClass" className="btn-flat waves-effect teal darken-1 white-text">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                    </Link>
                </div>
            </div>
        )
    }
}
