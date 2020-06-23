import React, { Component } from 'react'
import FreeClass from './FreeClass';
import PaidClass from './PaidClass';
import M from "materialize-css"

export default class ScheduleClass extends Component {
    componentDidMount(){
        M.Tabs.init(document.querySelector(".tabs"));
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s6"><a href="#freeclass">free class</a></li>
                            <li className="tab col s6"><a className="active" href="#paidclass">paid class</a></li>
                        </ul>
                    </div>
                    <div id="freeclass" className="col s12"><FreeClass history={this.props.history}/></div>
                    <div id="paidclass" className="col s12"><PaidClass history={this.props.history}/></div>
                </div>
            </div>
        )
    }
}
