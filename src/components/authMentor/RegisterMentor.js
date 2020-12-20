import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerMentor } from "../../actions/authActionMentor";
import ReCAPTCHA from 'react-google-recaptcha';
import "../../App.scss";
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
            interest: "",
            interests: [],
            captcha: false,
            errors: {}
        };
        this.onInterstChange = this.onInterstChange.bind(this)
        this.addInterest = this.addInterest.bind(this)
        this.deleteInterest = this.deleteInterest.bind(this)
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
        if (this.state.captcha) {
            this.props.registerMentor(newUser, this.props.history);
        } else {
            alert('Please verify captcha!')
        }
        this.setState({ loading: false })
    };

    onInterstChange(e) {
        this.setState({ interest: e.target.value })
    }

    addInterest(e) {
        e.preventDefault()
        this.setState(state => {
            const interests = [...state.interests, state.interest]
            return {
                interests,
                interest: '',
            };
        });
        console.log(this.state.interests)
    }

    verifyCaptcha(response) {
        if (response) {
            this.setState({ captcha: true })
        }
    }

    deleteInterest(e) {
        e.preventDefault()
        this.setState({
            interests: []
        });
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
                            <small className="red-text">{errors.name}</small>
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
                        {this.state.interests?.map((interest, id) => (
                            <div className="chip" key={id}>
                                {interest}
                            </div>
                        ))}
                        <div className="auth__form__control">
                            <label htmlFor="interests">Interests (you may add multiple)</label>
                            <input
                                onChange={this.onInterstChange}
                                value={this.state.interest}
                                error={errors.interests}
                                id="interests"
                                type="text"
                                maxLength="120"
                            />
                            <div>
                                <button disabled={!this.state.interest} onClick={this.addInterest}>Add Interest</button>
                                <button disabled={!this.state.interests[0]} onClick={this.deleteInterest}>Clear Interest</button>
                            </div>
                            <small className="errortext">{errors.interests}</small>
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
                        <p>Already have an account? <Link to="/mentor/login">Login</Link></p>
                        <Link to="/forgotpass">Forgot Password?</Link>
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