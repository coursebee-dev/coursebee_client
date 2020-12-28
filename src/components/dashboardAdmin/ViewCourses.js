import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import M from 'materialize-css'
export default function ViewCourses() {
    const [courses, setCourses] = useState([])
    const getCourses = async () => {
        const { data } = await axios.get('/api/admin/get/courses')
        if (data.success) {
            setCourses(data.courses)
        } else {
            M.toast({ html: data.message })
        }
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div style={{ marginTop: "20px" }}>
            <blockquote>
                <h4>Courses for review</h4>
            </blockquote>
            {courses?.filter(course => course.submitted === true && course.approved === false)?.map((course, id) => (
                <div key={id} className="admincourselist">
                    <div className="card">
                        <h3>{course.name}</h3>
                        <Link to={`/admin/dashboard/courses/${course._id}`} className="btn">Review Course</Link>
                    </div>
                </div>
            ))}
            <blockquote>
                <h4>Approved Courses</h4>
            </blockquote>
            {courses?.filter(course => course.submitted === true && course.approved === true)?.map((course, id) => (
                <div key={id} className="admincourselist">
                    <div className="card">
                        <h3>{course.name}</h3>
                        <Link to={`/admin/dashboard/courses/${course._id}`} className="btn">Review Course</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
