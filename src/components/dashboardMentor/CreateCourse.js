import React, { useState, useEffect, useCallback } from 'react'
import CreateCourseForm from './CreateCourseForm'
import axios from 'axios'
import CourseList from './CourseList'
import { useSelector } from "react-redux";

function CreateCourse() {
    const { auth } = useSelector(state => state)
    const [createCourse, setCreateCourse] = useState(false)
    const [courses, setCourses] = useState([])
    const createCourseHandler = async () => {
        setCreateCourse(set => !set)
        getCourses()
    }

    const getCourses = useCallback(async () => {
        const { data } = await axios.post('/api/mentor/course', {
            mentorid: auth.user.id
        })
        if (data.success) {
            setCourses(data.courses)
        } else {
            console.log(data.message)
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

export default CreateCourse;