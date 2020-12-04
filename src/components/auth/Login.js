import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../../actions/authAction";


function Login({ auth, errors }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        window.scrollTo(0, 0)
        if (auth.isAuthenticated) {
            history.push("/dashboard"); // push user to dashboard when they login
        }
        if (auth.isAuthenticated) {
            if (auth.user.type === "student") {
                history.push("/dashboard");
            } else if (auth.user.type === "mentor") {
                history.push("/mentor/dashboard");
            } else if (auth.user.type === "admin") {
                history.push("/admin/dashboard");
            }
        }
    }, [auth.user.type, history, auth.isAuthenticated])
    useEffect(() => {
        if (errors) {
            setLoading(false)
        }
    }, [errors])

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)
        const userData = {
            email: email,
            password: password
        };
        dispatch(loginUser(userData, history))
        setLoading(true)
    }

    return (
        <div className="container">
            <div className="auth">
                <div className="auth__nav">
                    <Link to="/">Back to home</Link>
                </div>
                <form className="auth__form" noValidate onSubmit={onSubmit}>
                    <div className="auth__form__control">
                        <label htmlFor="email">Email</label>
                        <input onChange={e => setEmail(e.target.value)} error={errors.email} id="email" type="email" />
                        <small className="errortext">{errors.email} {errors.emailnotfound}</small>
                    </div>
                    <div className="auth__form__control">
                        <label htmlFor="password">Password</label>
                        <input onChange={e => setPassword(e.target.value)} error={errors.password} id="password" type="password" />
                        <small className="errortext"> {errors.password} {errors.passwordincorrect}</small>
                    </div>
                    <div className="auth__form__control">
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                                <button type="submit">
                                    Login
                                </button>
                            )}
                    </div>
                </form>
                <div className="auth__footer">
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <Link to="/forgotpass">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}
Login.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
)(Login);