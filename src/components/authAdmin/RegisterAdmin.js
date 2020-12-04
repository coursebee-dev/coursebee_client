import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerAdmin } from "../../actions/authActionAdmin";
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
            mobileNo: "",
            organization: "",
            position: "",
            location: "",
            adminKey: "",
            captcha: false,
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
        this.setState({ loading: true })
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            mobileNo: this.state.mobileNo,
            organization: this.state.organization,
            position: this.state.position,
            location: this.state.location,
            adminKey: this.state.adminKey,
            type: "admin"
        };
        if (this.state.captcha) {
            //console.log(JSON.stringify(newUser));
            this.props.registerAdmin(newUser, this.props.history);
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
                    <form noValidate onSubmit={this.onSubmit}>
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
                            <label htmlFor="mobileNo">Mobile No.</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.mobileNo}
                                error={errors.mobileNo}
                                id="mobileNo"
                                type="text"
                            />
                            <small className="errortext">{errors.mobileNo}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="organization">Organization</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.organization}
                                error={errors.organization}
                                id="organization"
                                type="text"
                            />
                            <small className="errortext">{errors.organization}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="position">Position</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.position}
                                error={errors.position}
                                id="position"
                                type="text"
                            />
                            <small className="errortext">{errors.position}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="location">Location</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.location}
                                error={errors.location}
                                id="location"
                                type="text"
                            />
                            <small className="errortext">{errors.location}</small>
                        </div>
                        <div className="auth__form__control">
                            <label htmlFor="adminKey">Admin Key</label>
                            <input
                                onChange={this.onChange}
                                value={this.state.adminKey}
                                error={errors.adminKey}
                                id="adminKey"
                                type="password"
                            />
                            <small className="errortext">{errors.adminKey}</small>
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
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerAdmin }
)(withRouter(Register));