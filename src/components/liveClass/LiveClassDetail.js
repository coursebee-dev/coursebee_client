import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class LiveClassDetail extends Component {
    constructor() {
        super();
        this.state = {
            liveClasses: {},
            loading: false,
        }
        this.getLiveClass = this.getLiveClass.bind(this)
    }

    getLiveClass = async () => {
        try {
            const { data } = await axios.get(`/api/liveclassdetails/${this.props.match.params.id}`)
            this.setState({ liveClasses: data })
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getLiveClass()
    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    <h1>Topic: {this.state.liveClasses.topic}</h1>
                    <h4>Description:</h4>
                    <div dangerouslySetInnerHTML={{ __html: this.state.liveClasses.description }} />
                    <p>Start Time: {new Date(this.state.liveClasses.start_time).toLocaleDateString() + " " + new Date(this.state.liveClasses.start_time).toLocaleTimeString()} </p>
                    <p>Duration : {Math.round(this.state.liveClasses.duration / 60)} hour {this.state.liveClasses.duration % 60} minutes </p>
                    <p>Type: {this.state.liveClasses.class_type}</p>
                </div>
            </div>
        )
    }
}
