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
            {courses?.map((course, id) => (
                <div key={id}>
                    <h6>{course.name}</h6>
                    {course.approved ? (
                        <button value={course._id} className="btn btn-small green" onClick={gotoCourse}>Course Approved. View course.</button>
                    ) : (
                            <button value={course._id} className="btn btn-small grey" onClick={gotoCourse}>{course?.submitted ? "Course submitted for review - View course" : "Edit"}</button>
                        )}
                </div>
            ))}
        </div>
    )
}
