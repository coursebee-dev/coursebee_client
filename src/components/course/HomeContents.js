import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function HomeContents() {
    const history = useHistory()
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const getCourses = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/api/get/courses')
            setCourses(data.courses)
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        getCourses()
    }, [getCourses])
    return (
        <div className="hc">
            <div className="hc__nav">
                <button>Popular courses</button>
                <button>New Courses</button>
                <button>Upcoming</button>
                <button onClick={() => history.push('/course')}>All Courses</button>
            </div>
            {loading ? <div className="loader"></div> : (
                <div className="hc__container">
                    {courses.map((course, id) => (
                        <div key={id} className="card">
                            <div className="card__body">
                                <p><b>{course.name}</b></p>
                                <p>
                                    {course.categories.map((ccat, ccatid) => (
                                        <small key={ccatid} className="chip">{ccat}</small>
                                    ))}
                                </p>
                                <p>
                                    {course.subcategories.map((sccat, sccatid) => (
                                        <small key={sccatid} className="chip">{sccat}</small>
                                    ))}
                                </p>
                                <MentorName id={course.mentorId} />
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}

const MentorName = ({ id }) => {
    const [payload, setPayload] = useState('')
    const getMentorName = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/get/mentorname/${id}`)
            if (data.success) {
                setPayload(data.name)
            } else {
                setPayload(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [id])
    useEffect(() => {
        getMentorName()
    }, [id, getMentorName])

    return <p>{payload}</p>;
}