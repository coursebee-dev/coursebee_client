
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import { Editor } from '@tinymce/tinymce-react';
import '../../App.css';

class ScheduleClass extends Component {
    constructor() {
        super();
        this.state = {
            topic: "",
            class_type: "",
            start_date: "",
            start_time: "",
            price: "",
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
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
    }
    handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content);
        this.setState({ description: content })
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
            price: this.state.price,
            start_time: startTime.toISOString(),//start time in iso format UTC
            duration: this.state.duration,
        }
        console.log(formData)
        this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)
    }

    render() {
        const { errors } = this.state;
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
        return (
            <div>
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
                                <Editor
                                    apiKey="24ih6yos0ufi5m49dpgg789u7to27syl18z7wpj3zd80ol3k"
                                    initialValue="<p>Add a description</p>"
                                    init={{
                                        height: 500,
                                        menubar: 'edit insert format table tools help',
                                        plugins: [
                                            ' autolink media lists link charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime table paste code wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                            alignleft aligncenter alignright alignjustify | \
                                            bullist numlist outdent indent | removeformat '
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
                                <span className="red-text">
                                    {errors.description}
                                    {errors.descriptionnotfound}
                                </span>
                            </div>
                            {/* <div className="input-field col s12">
                                <div className="input-field col s12" id="paidclassdescription" onChange={this.handleEditorChange}></div>
                                <label htmlFor="paidclassdescription">Description</label>
                                <span className="red-text">
                                    {errors.description}
                                    {errors.descriptionnotfound}
                                </span>
                            </div> */}
                            <div className="col s12">
                                <label htmlFor="class_type">Class type  </label>
                                <select
                                    onChange={this.onChange}
                                    value={this.state.class_type}
                                    id="class_type"
                                    error={errors.class_type}
                                    className={classnames("browser-default", {
                                        invalid: errors.class_type || errors.class_typenotfound
                                    })}
                                >
                                    <option disabled value="">Select Type</option>
                                    <option value="Open" disabled>Open For All</option>
                                    <option value="Free">Free Registration</option>
                                    <option value="Paid">Paid Live Class</option>
                                </select>
                                <span className="red-text">
                                    {errors.class_type}
                                    {errors.class_typenotfound}
                                </span>
                            </div>
                            <div className="input-field col s12" style={{ display: this.state.class_type === "Free" ? "none" : null }}>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.price}
                                    error={errors.price}
                                    id="price"
                                    type="number"
                                    min="1"
                                    className={classnames("", {
                                        invalid: errors.price || errors.pricenotfound
                                    })}
                                />
                                <label htmlFor="price">Price</label>
                                <span className="red-text">
                                    {errors.price}
                                    {errors.pricenotfound}
                                </span>
                            </div>
                            <div className=" col s12">
                                <label htmlFor="start_date">Start Date  </label>
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
                                <span className="red-text">
                                    {errors.start_date}
                                    {errors.start_datenotfound}
                                </span>
                            </div>

                            <div className="col s12">
                                <label htmlFor="start_time">Start Time  </label>
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
                                <span className="red-text">
                                    {errors.start_time}
                                    {errors.start_timenotfound}
                                </span>
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="duration">duration in minutes</label>
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