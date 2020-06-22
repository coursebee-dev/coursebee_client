import React,{useState} from 'react'
import FreeClass from './FreeClass';
import PaidClass from './PaidClass';
import { Link } from "react-router-dom";

export default function ScheduleClass() {
    const [liveclass,setLiveClass] = useState()
    let schedulecLass;

    const setclass = (value) => {
        setLiveClass(value)
    }

    const freeclass = <FreeClass />
    const paidclass = <PaidClass />

    if(liveclass==="free") {
        schedulecLass=freeclass
    } else if (liveclass==="paid") {
        schedulecLass=paidclass
    } else {
        schedulecLass=null
    }

    return (
        <div className="container">
            <div className="row z-depth-1">
                <div className="col s6 offset-s2">
                    <Link to="/mentor/dashboard" className="btn-flat waves-effect orange">
                        <i className="material-icons left">keyboard_backspace</i>Go Back
                    </Link>
                    <div className="schedule col s12" style={{ paddingLeft: "11.250px" }}>
                        <h4>
                            <b>Schedule Class</b> Below
                        </h4>
                    </div>
                    <div className="row schedule">
                        <div className="freepaid">
                            <button className="btn-large" value="free" onClick={e=>setclass(e.target.value)}>Schedule a Free Class</button>
                        </div>
                        <div className="freepaid">
                            <button className="btn-large" value="paid" onClick={e=>setclass(e.target.value)}>Schedule a Paid Class</button>
                        </div>
                    </div>
                </div>
                {schedulecLass}
            </div>                
        </div>
    )
}
