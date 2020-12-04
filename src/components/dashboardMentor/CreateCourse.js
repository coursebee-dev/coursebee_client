import React, { useState, useEffect, useCallback } from 'react'
import M from 'materialize-css'
import CreateCourseForm from './CreateCourseForm'
import axios from 'axios'
import CourseList from './CourseList'
import PropTypes from "prop-types";
import { connect } from "react-redux";

function CreateCourse({ auth }) {
    const [createCourse, setCreateCourse] = useState(false)
    const [courses, setCourses] = useState([])
    const createCourseHandler = async () => {
        /*const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
        let token = localStorage.getItem('vimeo_token')
        if (!token) {
            try {
                const { data } = await axios.get('/api/mentor/vimeoauthurl')
                console.log(data)
                window.open(data.url, '_self');
            } catch (error) {
                console.log(error.message)
            }
        }*/
        setCreateCourse(set => !set)
    }

    const getCourses = useCallback(async () => {
        const { data } = await axios.post('/api/mentor/course', {
            mentorid: auth.user.id
        })
        if (data.success) {
            setCourses(data.courses)
        } else {
            M.toast({ html: data.message })
        }
    }, [auth.user.id])

    useEffect(() => {
        getCourses()
    }, [getCourses])

    return (
        <div style={{ margin: "30px", }}>
            <div>
                <button className="btn btn-small orange" onClick={createCourseHandler}>{createCourse ? <>Cancel</> : <>Create a new course</>}</button>
            </div>
            {createCourse ? <CreateCourseForm createCourseHandler={createCourseHandler} /> : <CourseList courses={courses} />}
        </div>
    )
}

CreateCourse.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(CreateCourse)