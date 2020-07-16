import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../../App.css';
import axios from 'axios';

class AccountMentor extends Component {
    constructor() {
        super();
        this.state = {
            nameEdit: false,
            emailEdit: false,
            interestEdit: false
        }

    }

    toggleEdit(param) {
        switch (param) {
            case "name":

                this.setState({ nameEdit: !this.state.nameEdit });
                break;
            case "email":

                this.setState({ emailEdit: !this.state.emailEdit });
                break;

            case "interest":

                this.setState({ interestEdit: !this.state.interestEdit });
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <div className="row editProfileForm">
                <div className="col s12">
                    {this.state.nameEdit ? (
                        <div className="row editProfileField">
                            <div className="col s12">

                                <input />
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small">Update</button>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small" value="name" onClick={e => this.toggleEdit(e.target.value)}>cancel</button>
                            </div>
                        </div>
                    ) : (
                            <div className="row">
                                <div className="col s9">
                                    <p>name</p>
                                </div>
                                <div className="col s3">
                                    <button className="btn btn-small" value="name" onClick={e => this.toggleEdit(e.target.value)}>edit</button>
                                </div>
                            </div>
                        )}


                </div>
                <div className="col s12">
                    {this.state.emailEdit ? (
                        <div className="row">
                            <div className="col s12">

                                <input />
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small">Update</button>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small" value="email" onClick={e => this.toggleEdit(e.target.value)}>cancel</button>
                            </div>
                        </div>
                    ) : (
                            <div className="row">
                                <div className="col s9">
                                    <p>Email</p>
                                </div>
                                <div className="col s3">
                                    <button className="btn btn-small" value="email" onClick={e => this.toggleEdit(e.target.value)}>edit</button>
                                </div>
                            </div>
                        )}
                </div>
                <div className="col s12">
                    {this.state.interestEdit ? (
                        <div className="row">
                            <div className="col s12">

                                <input />
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small">Update</button>
                            </div>
                            <div className="col s6">
                                <button className="btn btn-small" value="interest" onClick={e => this.toggleEdit(e.target.value)}>cancel</button>
                            </div>
                        </div>
                    ) : (
                            <div className="row">
                                <div className="col s9">
                                    <p>Interests</p>
                                </div>
                                <div className="col s3">
                                    <button className="btn btn-small" value="interest" onClick={e => this.toggleEdit(e.target.value)}>edit</button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
AccountMentor.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AccountMentor)
