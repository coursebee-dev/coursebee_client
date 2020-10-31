import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import ContentCardAdmin from './ContentCardAdmin'
import M from 'materialize-css'

export default function EditCourseAdmin({ match }) {
    const [course, setCourse] = useState()
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
            <div dangerouslySetInnerHTML={{ __html: course?.description }} />
            {course?.contents?.map((content, id) => (
                <ContentCardAdmin key={id} content={content} />
            ))}
            <button className="btn" disabled={course?.approved} onClick={approveCourse}>{course?.approved ? "Approved Course" : "Approve Course"}</button>
        </div>
    )
}
