import React,{useState,useEffect} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import logoutUser from "../../actions/logoutAction";
import { useHistory  } from 'react-router-dom'

const Profile = (props) => {
    const [myliveclass,setMyliveclass] = useState()
    const getMyLiveClass = async () => {
        try {
            const {data} = await axios.get(`/api/myliveclass/${props.auth?.user.id}`)
            setMyliveclass(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getMyLiveClass()
    },[])

    const history = useHistory();

    const gotoclass = e => {
        history.push(`/classroom/${e.target.value}`)
    }

    const myliveclasses = (
        <div className="col s12">
            <ul style={{ textAlign: "left" }} className="collection">
                {myliveclass?.map((liveClass,id)=>(
                    <li className="collection-item" key={id}>
                        <p className="secondary-content">
                            <button onClick={gotoclass} value={liveClass.topic+liveClass._id} className="btn btn-small waves-effect waves-light hoverable orange darken-1 black-text">Join Class</button>
                        </p>
                        <h6>Topic : {liveClass.topic}</h6>
                        <p>Start Time: {liveClass.start_time.split('T')[0] + " " + liveClass.start_time.split('T')[1]} </p>
                        <p>Duration : {liveClass.duration}</p>
                        <p>Type: {liveClass.class_type}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="section">
                    <div className="col s12">
                        <div className="section">
                            <div className="center-align">
                                <span className="flow-text">{props.auth?.user.name}</span>
                            </div>
                        </div>
                        <ul className="collection">
                            <li id="one" className="collection-item" >Name: {props.auth?.user.name}</li>
                            <li id="two" className="collection-item" >Email: {props.auth?.user.email}</li>
                        </ul>
                    </div>
                    {myliveclasses}
                </div>
            </div>
        </div>
    )
    
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Profile);