import React from 'react'
import { useHistory } from 'react-router-dom'
export default function CourseList({ courses }) {

    const history = useHistory()
    const gotoCourse = e => {
        const { value } = e.target
        history.push(`/mentor/dashboard/editcourse/${value}`)
    }

    return (
        <div className="createcourselist">
            {courses?.map((course, id) => (
                <div className="coursecard" key={id}>
                    <h3>{course.name}</h3>
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
