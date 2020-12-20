import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import ContentCardAdmin from './ContentCardAdmin'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

export default function EditCourseAdmin({ match }) {
    const [course, setCourse] = useState()
    const [reveal, setReveal] = useState(false)
    const [price, setPrice] = useState(0)
    const [editPrice, setEditPrice] = useState(false)
    const history = useHistory()
    const getCourse = useCallback(
        async () => {
            const { data } = await axios.get(`/api/admin/getcourse/${match.params.courseid}`)
            setCourse(data.course)
        },
        [match.params.courseid],
    )

    const asignPrice = async e => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/admin/video/setprice/${course._id}`, {
                price: price
            })
            if (data.success) {

                getCourse()
            }
            console.log(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const approveCourse = async () => {
        try {
            const { data } = await axios.put(`/api/admin/course/${course._id}/approve`)
            M.toast({ html: data.message })
            if (data.success) {
                getCourse()
                history.push('/admin/dashboard/courses')
            }
        } catch (error) {
            console.log(error)
            M.toast({ html: error.message })
        }
    }

    useEffect(() => {
        getCourse()
    }, [getCourse])

    // useEffect(() => {
    //     if (course?.price) {
    //         setEditPrice(false)
    //     }
    //     //console.log(course)
    // }, [course])
    return (
        <div className="editcourseadmin">
            <h1>{course?.name}</h1>
            <button onClick={() => setReveal(rev => !rev)} className="btn-small blue">{reveal ? "Hide" : "See"} description</button>
            {reveal ? (
                <div className="description" dangerouslySetInnerHTML={{ __html: course?.description }} />
            ) : null}
            {course?.contents?.map((content, id) => (
                <ContentCardAdmin key={id} id={course?._id} content={content} getCourse={getCourse} />
            ))}
            {editPrice ?
                <form onSubmit={asignPrice}>
                    <label htmlFor="price">{course?.price ? "Edit" : "Set"} Price</label>
                    <input defaultValue={price || course?.price} name="price" id="price" type="number" min="0" onClick={e => setPrice(e.target.value)} />
                    <button type="button" onClick={() => setEditPrice(ep => !ep)}>Cancel </button>
                </form>
                :
                <button onClick={() => setEditPrice(ep => !ep)}>Edit Price</button>
            }
            <button className="btn" disabled={course?.approved} onClick={approveCourse}>{course?.approved ? "Approved Course" : "Approve Course"}</button>
        </div>
    )
}
