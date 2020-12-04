import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import ReCAPTCHA from 'react-google-recaptcha';

class Register extends Component {
    constructor() {
        super();
        this.verifyCaptcha = this.verifyCaptcha.bind(this)
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            institution: "",
            subject: "",
            captcha: false,
            errors: {},
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
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.type === "student") {
                this.props.history.push("/dashboard");
            } else if (this.props.auth.user.type === "mentor") {
                this.props.history.push("mentor/dashboard");
            } else if (this.props.auth.user.type === "admin") {
                this.props.history.push("admin/dashboard");
            }
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            institution: this.state.institution,
            subject: this.state.subject,
            type: "student"
        };
        //console.log(JSON.stringify(newUser));
        if (this.state.captcha) {
            this.props.registerUser(newUser, this.props.history);
        } else {
            alert('Please verify captcha!')
        }
    };

    verifyCaptcha(response) {
        if (response) {
            this.setState({ captcha: true })
        }
    }

    render() {
        const { errors } = this.state;
        let captcha_secret = process.env.REACT_APP_NOT_CAPTCHA_SECRET
        return (
            <div className="container">
                <div className="auth">
                    <div className="auth__nav">
                        <Link to="/">Back to home</Link>
                    </div>
                    <form className="auth__form" noValidate onSubmit={this.onSubmit}>
                        <div className="auth__form__control">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                            />
                            <small className="errortext">{errors.name}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <small className="errortext">{errors.email}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password"
                            />
                            <small className="errortext">{errors.password}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                            />
                            <small className="errortext">{errors.password}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="institution">Institution</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.institution}
                                error={errors.institution}
                                id="institution"
                                type="text"
                            />
                            <small className="errortext">{errors.institution}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="subject">Subject</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.subject}
                                error={errors.subject}
                                id="subject"
                                type="text"
                            />
                            <small className="errortext">{errors.subject}</small>
                        </div>
                        <div className="auth__form__control">
                            <ReCAPTCHA
                                sitekey={`${captcha_secret}`}
                                onChange={this.verifyCaptcha}
                            />
                        </div>
                        <div className="auth__form__control">
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                    <div className="auth__footer">
                        <p>Already have an account? <Link to="/login">login</Link></p>
                        <Link className="orange-text text-darken-1" to="/forgotpass">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));