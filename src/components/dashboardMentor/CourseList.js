import React from 'react'
import { useHistory } from 'react-router-dom'
export default function CourseList({ courses }) {

    const history = useHistory()
    const gotoCourse = e => {
        const { value } = e.target
        history.push(`/mentor/dashboard/editcourse/${value}`)
    }

    return (
        <div style={{ marginTop: "40px" }}>
            {courses.map((course, id) => (
                <div key={id}>
                    <h6>{course.name}</h6>
                    <button value={course._id} className="btn btn-small grey" onClick={gotoCourse}>Edit</button>
                    <button className="btn btn-small orange">Submit course</button>
                </div>
            ))}
        </div>
    )
}
