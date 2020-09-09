
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { scheduleLiveClass } from "../../actions/liveClassAction";
import { Editor } from '@tinymce/tinymce-react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
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
            categories: [],
            category: [],
            subcategory: [],
            errors: {}
        };
        this.getCategories = this.getCategories.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    getCategories = async () => {
        try {
            const { data } = await axios.get('api/admin/category');
            this.setState({ categories: data });
        } catch (error) {
            console.log(error.message)
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.auth.user.adminVerify === false) {
            this.props.history.push("mentor/dashboard");
        }
        this.getCategories()
    }
    // handleEditorChange = (content, editor) => {
    //     console.log('Content was updated:', content);
    //     this.setState({ description: content })
    // }
    // onChange = e => {
    //     this.setState({ [e.target.id]: e.target.value });
    // };
    // onSubmit = e => {
    //     e.preventDefault();
    //     if (this.state.topic === "") {
    //         this.setState({ errors: { topic: "Topic field is required" } })
    //         return
    //     }
    //     if (this.state.class_type === "") {
    //         this.setState({ errors: { class_type: "Class type field is required" } })
    //         return
    //     }
    //     if (this.state.start_date === "") {
    //         this.setState({ errors: { start_date: "Date field is required" } })
    //         return
    //     }
    //     if (this.state.start_time === "") {
    //         this.setState({ errors: { start_time: "Time field is required" } })
    //         return
    //     }
    //     if (this.state.duration === "") {
    //         this.setState({ errors: { duration: "Duration field is required" } })
    //         return
    //     }
    //     const startTime = new Date(`${this.state.start_date}T${this.state.start_time}:00Z`)
    //     startTime.setHours(startTime.getHours() - 6)// timezone:Asia/Dhaka
    //     const tempTime = new Date()
    //     tempTime.setHours(tempTime.getHours() - 2)
    //     if (tempTime >= startTime) {
    //         this.setState({ errors: { start_date: "Schedule at least two hours before", start_time: "Schedule at least two hours before" } })
    //         return
    //     }
    //     const formData = {
    //         mentorId: this.props.auth.user.id,
    //         topic: this.state.topic,
    //         class_type: this.state.class_type,
    //         description: this.state.description,
    //         price: this.state.price,
    //         start_time: startTime.toISOString(),//start time in iso format UTC
    //         duration: this.state.duration,
    //     }
    //     console.log(formData)
    //     this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)
    // }

    render() {
        //const { errors } = this.state;
        let API_KEY = process.env.REACT_APP_NOT_TINYMCE_API_KEY;
        return (
            <div>
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Formik initialValues={{
                            topic: "",
                            description: "",
                            class_type: "",
                            start_date: "",
                            end_date: "",
                            week_day: "",
                            time: "",
                            duration: "",
                            category: [],
                            subcategory: [],
                            classtime: [],
                            academicExcellence: "",
                        }}
                            validate={values => {
                                const errors = {};
                                if (!values.topic) {
                                    errors.topic = "Class topic name is required!";
                                }

                                if (!values.description) {
                                    errors.description = "CLass description is required!";
                                }

                            }}
                            onSubmit={values => {
                                console.log(values)
                                const formData = {
                                    mentorId: this.props.auth.user.id,
                                    topic: values.topic,
                                    class_type: values.class_type,
                                    description: values.description,
                                    //price: this.state.price,
                                    start_date: values.start_date,
                                    time: values.time,
                                    end_date: values.end_date,
                                    duration: values.duration,
                                    academicExcellence: values.academicExcellence,
                                    category: values.category,
                                    subcategory: values.subcategory,
                                    classtime: values.classtime
                                }
                                console.log(formData)
                                this.props.scheduleLiveClass(formData, this.props.auth.user.id, this.props.history)

                            }}>
                            {({ handleSubmit, setFieldValue, values }) => (
                                <Form onSubmit={handleSubmit}>
                                    <div className="input-field col s12">
                                        <label htmlFor="topic">Topic</label>
                                        <Field type="text" id="topic" name="topic" placeholder="Class topic name" />
                                        <ErrorMessage name="topic" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="input-field col s12">
                                        <span>Description</span>
                                        <Editor
                                            apiKey={API_KEY}
                                            init={{
                                                height: 500,
                                                menubar: 'edit insert format table tools help',
                                                plugins: [
                                                    ' autolink media lists link charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime table paste code wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat '
                                            }}
                                            onEditorChange={desc => setFieldValue("description", desc)}
                                        />
                                        <ErrorMessage name="description" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <div className="col s12">
                                        <label htmlFor="class_type">Class type  </label>
                                        <Field
                                            id="class_type"
                                            name="class_type"
                                            className="browser-default"
                                            as="select"
                                        >
                                            <option defaultValue="">Select Type</option>
                                            {/*<option value="Open" disabled>Open For All</option>*/}
                                            <option value="Free">Free Registration</option>
                                            <option value="Paid">Paid Live Class</option>
                                        </Field>
                                        <ErrorMessage name="class_type" render={msg => <span className="red-text">{msg}</span>} />
                                    </div>
                                    <section>
                                        <div className="col s12 m6" style={{ marginTop: "20px" }}>
                                            <label >Select Liveclass Level</label>
                                            {this.state.categories?.map(cat => (
                                                <p key={cat._id}>
                                                    <label>
                                                        <Field type="checkbox" name="category" value={cat.title} />
                                                        <span>{cat.title}</span>
                                                    </label>
                                                </p>
                                            ))}
                                        </div>
                                        <br />
                                        {values && values.category.length === 0 ? null : (
                                            <div className="col s12 m6" style={{ maxHeight: "500px", marginTop: "20px", overflow: "scroll", position: "relative" }}>
                                                <label>Select Liveclass Subjects</label>
                                                {this.state.categories && this.state.categories
                                                    .filter(sub => values.category.some(s => sub.title.includes(s)))
                                                    .map(((sub, id) => (
                                                        <div key={id}>
                                                            <h5>Category: {sub.title}</h5>
                                                            {sub.subcategory.map((subcat, id) => (
                                                                <p key={id}>
                                                                    <label>
                                                                        <Field name="subcategory" type="checkbox" value={subcat.name} />
                                                                        <span>{subcat.name}</span>
                                                                    </label>
                                                                </p>
                                                            ))}
                                                        </div>
                                                    )))
                                                }
                                            </div>
                                        )}
                                    </section>
                                    <div className="section" style={{ padding: "10px", marginBottom: "10px" }}>
                                        <label htmlFor="start_date">Start Date</label>
                                        <Field type="date" id="start_date" name="start_date" />
                                    </div>
                                    <div className="section" style={{ padding: "10px", marginBottom: "10px" }}>
                                        <label htmlFor="duration">Duration</label>
                                        <Field type="number" id='duration' name="duration" min="0" />
                                    </div>
                                    <div className="section" style={{ padding: "10px", marginBottom: "10px" }}>
                                        <label htmlFor="end_date">End Date</label>
                                        <Field type="date" id="end_date" name="end_date" />
                                    </div>
                                    <div className="section" style={{ padding: "10px", marginBottom: "10px" }}>
                                        <label htmlFor="time">Time</label>
                                        <Field type="time" id="time" name="time" />
                                    </div>
                                    <div className="section" style={{ padding: "10px", marginBottom: "10px" }}>
                                        <label htmlFor="week_day">Select Week Day </label>
                                        <Field
                                            id="week_day"
                                            name="week_day"
                                            className="browser-default"
                                            as="select"
                                        >
                                            <option defaultValue="">Select day of the week</option>
                                            {/*<option value="Open" disabled>Open For All</option>*/}
                                            <option value="1">Monday</option>
                                            <option value="2">Tuesday</option>
                                            <option value="3">Wednesday</option>
                                            <option value="4">Thursday</option>
                                            <option value="5">Friday</option>
                                            <option value="6">Saturday</option>
                                            <option value="7">Sunday</option>
                                        </Field>
                                    </div>
                                    <button className="btn orange btn-small" onClick={(e) => {
                                        e.preventDefault();
                                        let dateArray = []
                                        let start = new Date(Date.parse(values.start_date.toString() + "T" + values.time.toString()))
                                        let end = new Date(Date.parse(values.end_date.toString() + "T" + values.time.toString()))
                                        dateArray.push(start)
                                        while (start < end) {
                                            let a = new Date(start.setDate(start.getDate() + 1))
                                            if (a.getDay() == values.week_day) {
                                                dateArray.push(a)
                                            }
                                            start = new Date(start.setDate(start.getDate() + 1))
                                        }
                                        dateArray.push(end)
                                        setFieldValue("classtime", dateArray)
                                        //let dates = this.generateDates(values.start_date.toLocaleDateString(), values.end_date.toLocaleDateString(), values.week_day)
                                    }}>Generate Date</button>
                                    <div className="section">
                                        {values.classtime.map((ct, id) => (
                                            <div key={id}>
                                                <b>{ct.toString()}</b>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor="academicExcellence">Academic Excellence</label>
                                        <Field type="text" id="academicExcellence" name="academicExcellence" placeholder="Academic excellence" />
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
                                            className="btn btn-large waves-effect waves-light hoverable orange"
                                        >Schedule</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div >
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