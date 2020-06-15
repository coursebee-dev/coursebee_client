import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { scheduleLiveClass } from "../../actions/liveClassAction";
class ScheduleClass extends Component {
    constructor() {
        super();
        this.state = {
            topic: "",
            start_date: "",
            start_time: "",
            duration: "",
            password: "",
            agenda: "",
            errors:{},
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const formData = {
            mentorId: this.props.auth.user.id,
            topic: this.state.topic,
            type: 2,
            start_time: this.state.start_date + "T" + this.state.start_time + ":00",
            duration: this.state.duration,
            timezone: "Asia/Dhaka",
            password: this.state.password,
            agenda: this.state.agenda
        }
        console.log(formData)
        this.props.scheduleLiveClass(formData,this.props.auth.user.id,this.props.history)
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/mentor/dashboard" className="btn-flat waves-effect orange">
                            <i className="material-icons left">keyboard_backspace</i>Go Back
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Schedule Class</b> Below
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.topic}
                                    error={errors.topic}
                                    id="topic"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.topic || errors.topicnotfound
                                    })}
                                />
                                <label htmlFor="topic">topic</label>
                                <span className="red-text">
                                    {errors.topic}
                                    {errors.topicnotfound}
                                </span>
                            </div>              
                            <div className=" col s12">      
                                <input
                                    onChange={this.onChange}
                                    value={this.state.start_date}
                                    error={errors.start_date}
                                    id="start_date"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.start_date || errors.start_datenotfound
                                    })}
                                />
                                <label htmlFor="start_date">start date</label>
                                <span className="red-text">
                                    {errors.start_date}
                                    {errors.start_datenotfound}
                                </span>
                            </div>
                            <div className="col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.start_time}
                                    error={errors.start_time}
                                    id="start_time"
                                    type="time"
                                    className={classnames("", {
                                        invalid: errors.start_time || errors.start_timenotfound
                                    })}
                                />
                                <label htmlFor="start_time">start time</label>
                                <span className="red-text">
                                    {errors.start_time}
                                    {errors.start_timenotfound}
                                </span>
                            </div> 
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.duration}
                                    error={errors.duration}
                                    id="duration"
                                    type="number"
                                    min="0"
                                    className={classnames("materialize-textarea", {
                                        invalid: errors.duration || errors.durationnotfound
                                    })}
                                />
                                <label htmlFor="duration">duration in minutes</label>
                                <span className="red-text">
                                    {errors.duration}
                                    {errors.durationnotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    onChange={this.onChange}
                                    value={this.state.agenda}
                                    error={errors.agenda}
                                    id="agenda"
                                    type="text"
                                    className={classnames("materialize-textarea", {
                                        invalid: errors.agenda || errors.agendanotfound
                                    })}
                                />
                                <label htmlFor="agenda">agenda</label>
                                <span className="red-text">
                                    {errors.agenda}
                                    {errors.agendanotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    minLength={6}
                                    maxLength={10}
                                    pattern="[a-zA-Z0-9@-_*]"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable teal darken-1"
                                >
                                    Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
ScheduleClass.propTypes = {
    scheduleLiveClass: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
const mapDispatchToProps = {
    scheduleLiveClass
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScheduleClass);