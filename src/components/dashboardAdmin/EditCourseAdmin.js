import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import ContentCardAdmin from './ContentCardAdmin'
import M from 'materialize-css'

export default function EditCourseAdmin({ match }) {
    const [course, setCourse] = useState()
    const [reveal, setReveal] = useState(false)
    const getCourse = useCallback(
        async () => {
            const { data } = await axios.get(`/api/admin/getcourse/${match.params.courseid}`)
            setCourse(data.course)
        },
        [match.params.courseid],
    )

    const approveCourse = async () => {
        try {
            const { data } = await axios.put(`/api/admin/course/${course._id}/approve`)
            M.toast({ html: data.message })
            getCourse()
        } catch (error) {
            console.log(error)
            M.toast({ html: error.message })
        }
    }

    useEffect(() => {
        getCourse()
    }, [getCourse])
    return (
        <div style={{ margin: "40px" }}>
            <h1>{course?.name}</h1>
            <button onClick={() => setReveal(rev => !rev)} className="btn-small blue">{reveal ? "Hide" : "See"} description</button>
            {reveal ? (
                <div dangerouslySetInnerHTML={{ __html: course?.description }} />
            ) : null}
            {course?.contents?.map((content, id) => (
                <ContentCardAdmin key={id} id={course?._id} content={content} getCourse={getCourse} />
            ))}
            <button className="btn" disabled={course?.approved} onClick={approveCourse}>{course?.approved ? "Approved Course" : "Approve Course"}</button>
        </div>
    )
}
