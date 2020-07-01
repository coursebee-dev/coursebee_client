import React, { Component } from 'react'

export default class Contact extends Component {
    render() {
        return (
            <div className="container">
                <br />
                <br />
                <br />
                {/*Form*/}
                <form>
                    <div className="container">
                        {/*Row for Name*/}
                        <h1>Contact us</h1>

                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="name">Name</label>
                                <br />
                                <input type="text" name="name" id="name" placeholder="First Name Or Username" className="validate" required />
                            </div>
                        </div>
                        {/*Row for Name End*/}
                        {/*Row for Email and Telephone Number*/}
                        <div className="row">
                            {/*Column for Email*/}
                            <div className="input-field col s12 m6 l6">
                                <label htmlFor="email">Email</label>
                                <br />
                                <input type="text" name="email" id="email" placeholder="example@******.com" className="validate" required />
                            </div>
                            {/*Column for Email End*/}
                            {/*Column for telephone input*/}
                            <div className="input-field col s12 m6 l6">
                                <label htmlFor="telephone">Telephone</label>
                                <br />
                                <input type="tel" name="telephone" id="telephone" placeholder="01*********" className="validate" />
                            </div>
                            {/*Column for telephone input End*/}
                        </div>
                        {/*Row for Email and Telephone Number End*/}
                        {/*Row for School or Company Name*/}
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="name">School/Organisation Name</label>
                                <br />
                                <input type="text" name="company_name" id="company_name" placeholder="Enter your School or Organisation Name" className="validate" required="required" />
                            </div>
                        </div>
                        {/*Row for School or Company Name End*/}
                        {/*Row for Comment(Textfield)*/}
                        <div className="row">
                            <div className="input-field col s12">
                                <label htmlFor="message">Message</label><br />
                                <textarea name="message" className="materialize-textarea" defaultValue={""} />
                            </div>
                        </div>
                        <button type="submit" className="waves-effect waves-light orange btn">Submit</button>
                    </div>
                    {/*Row for Comment(Textfield) End*/}
                </form>
                {/*Form Ends*/}
            </div>
        )
    }
}
