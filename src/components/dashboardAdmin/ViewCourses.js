import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import M from 'materialize-css'
export default function ViewCourses() {
    const [courses, setCourses] = useState([])
    const getCourses = async () => {
        const { data } = await axios.get('/api/mentor/course')
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
        <div className="container">
            <div className="row" style={{ marginTop: "40px" }}>
                <div className="col s12">
                    <blockquote>
                        <h4>Courses for review</h4>
                    </blockquote>
                    {courses?.filter(course => course.submitted === true && course.approved === false).map((course, id) => (
                        <div key={id} className="card green">
                            <div className="card-content text-white">
                                <span className="card-title">{course.name}</span>
                                <Link to={`/admin/dashboard/courses/${course._id}`} className="btn">Review Course</Link>
                            </div>
                        </div>
                    ))}
                    <blockquote>
                        <h4>Approved Courses</h4>
                    </blockquote>
                    {courses?.filter(course => course.submitted === true && course.approved === true).map((course, id) => (
                        <div key={id} className="card green">
                            <div className="card-content text-white">
                                <span className="card-title">{course.name}</span>
                                <Link to={`/admin/dashboard/courses/${course._id}`} className="btn">Review Course</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
