import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
//import { Link } from "react-router-dom"
import forgotPassEmail from "../../actions/forgotPassEmail";
import classnames from "classnames";

class ForgotPass extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            errors: {},
        };
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.name === "") {
            this.setState({ errors: { name: "Topic field is required" } })
            return
        }
        if (this.state.email === "") {
            this.setState({ errors: { email: "Class type field is required" } })
            return
        }
        const userData = {
            name: this.state.name,
            email: this.state.email,
            type: "student"
        };
        //console.log(JSON.stringify(userData));
        this.props.forgotPassEmail(userData);

    };
    render() {
        const { errors } = this.state;
        return (
            <div>
                <div style={{ marginTop: "8rem", marginBottom: "8rem" }} className="row">
                    <div className="col s8 offset-s1" style={{padding:"2%"}} >
                        <h4>
                            Please verify your Username and Email
                        </h4>
                        <div>
                            We will send an email to reset your password<br />
                            please open the email and click on the given link
                        </div>
                    </div>
                    <div className="col s8 offset-s1">
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
                                <label htmlFor="name">Username</label>
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
                                    Verify
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
ForgotPass.propTypes = {
    forgotPassEmail: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    forgotPassEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass)
