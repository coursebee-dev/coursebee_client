import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import tinymce from 'tinymce';
import '../../App.css';

class FreeClass extends Component {
    constructor() {
        super();
        this.state = {
            topic: "",
            class_type: "Free",
            start_date: "",
            start_time: "",
            duration: "",
            description: "",
            errors: {}
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
        tinymce.init({
            selector: '#freeclassdescription',
            inline: true
        });
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
    }
    handleEditorChange = (e) => {
        this.setState({ description: e.target.value })
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        if (this.state.topic === "") {
            this.setState({ errors: { topic: "Topic field is required" } })
            return
        }
        if (this.state.class_type === "") {
            this.setState({ errors: { class_type: "Class type field is required" } })
            return
        }
        if (this.state.start_date === "") {
            this.setState({ errors: { start_date: "Date field is required" } })
            return
        }
        if (this.state.start_time === "") {
            this.setState({ errors: { start_time: "Time field is required" } })
            return
        }
        if (this.state.duration === "") {
            this.setState({ errors: { duration: "Duration field is required" } })
            return
        }
        const startTime = new Date(`${this.state.start_date}T${this.state.start_time}:00Z`)
        startTime.setHours(startTime.getHours() - 6)// timezone:Asia/Dhaka
        const tempTime = new Date()
        tempTime.setHours(tempTime.getHours() - 2)
        if (tempTime >= startTime) {
            this.setState({ errors: { start_date: "Schedule at least two hours before", start_time: "Schedule at least two hours before" } })
            return
        }
        const formData = {
            mentorId: this.props.auth.user.id,
            topic: this.state.topic,
            class_type: this.state.class_type,
            description: this.state.description,
            start_time: startTime.toISOString(),//start time in iso format UTC
            duration: this.state.duration,
        }
        console.log(formData)
        this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)
    }

    render() {
        const { errors } = this.state;
        return (
            <>
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
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
                            <div className="input-field col s12">
                                <div className="input-field col s12" id="freeclassdescription" onChange={this.handleEditorChange}></div>
                                <label htmlFor="freeclassdescription">Description</label>
                                <span className="red-text">
                                    {errors.description}
                                    {errors.descriptionnotfound}
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
                                <label htmlFor="start_date">start date  </label>
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
                                <label htmlFor="start_time">start time  </label>
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
                                    className={classnames("", {
                                        invalid: errors.duration || errors.durationnotfound
                                    })}
                                />
                                <label htmlFor="duration">duration in minutes</label>
                                <span className="red-text">
                                    {errors.duration}
                                    {errors.durationnotfound}
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
            </>
        );
    }
}
FreeClass.propTypes = {
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
)(FreeClass);