import React, { Component } from 'react'

export default class PostPayment extends Component {
    render() {
        return (
            <div>
                <h1>Payment {this.props.match.path.substr(1)}</h1>
            </div>
        )
    }
}
