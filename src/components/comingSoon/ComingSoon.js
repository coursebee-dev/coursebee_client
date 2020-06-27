import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ComingSoon extends Component {
    render() {
        return (
            <div>
                <div style={{ minHeight: "70vh" }} className="container valign-wrapper">
                    <div className="valign">
                        <h3>
                            Coming Soon ...
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ComingSoon)
