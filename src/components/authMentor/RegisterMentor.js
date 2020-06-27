import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMentor } from "../../actions/authActionMentor";
import classnames from "classnames";
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
            interests: "",
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
            interests: this.state.interests,
            type: "mentor"
        };
        console.log(JSON.stringify(newUser));
        if (this.state.captcha) {
            this.props.registerMentor(newUser, this.props.history);
        } else {
            alert('Please verify captcha!')
        }
        this.setState({ loading: false })
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
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/mentor" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Back to home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Register</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link className="orange-text text-darken-1" to="/mentor/login">Log in</Link>
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.mobileNo}
                                    error={errors.mobileNo}
                                    id="mobileNo"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.mobileNo
                                    })}
                                />
                                <label htmlFor="mobileNo">Mobile No.</label>
                                <span className="red-text">{errors.mobileNo}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.organization}
                                    error={errors.organization}
                                    id="organization"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.organization
                                    })}
                                />
                                <label htmlFor="organization">Organization</label>
                                <span className="red-text">{errors.organization}</span>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.position}
                                    error={errors.position}
                                    id="position"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.position
                                    })}
                                />
                                <label htmlFor="position">Position</label>
                                <span className="red-text">{errors.position}</span>
                            </div>
                            <div className="input-field col s12">
                                <textarea
                                    onChange={this.onChange}
                                    value={this.state.interests}
                                    error={errors.interests}
                                    id="interests"
                                    type="text"
                                    maxLength="120"
                                    className={classnames("materialize-textarea", {
                                        invalid: errors.interests
                                    })}
                                />
                                <label htmlFor="interests">Interests (you may add multiple)</label>
                                <span className="red-text">{errors.interests}</span>
                            </div>
                            {this.state.captcha ? (
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
                                        Sign up
                                </button>
                                </div>
                            ) : (
                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <ReCAPTCHA
                                            sitekey={`${captcha_secret}`}
                                            onChange={this.verifyCaptcha}
                                        />
                                    </div>
                                )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
Register.propTypes = {
    registerMentor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { registerMentor }
)(withRouter(Register));