import React, { Fragment, useCallback, useEffect, useState } from 'react'
import axios from 'axios'

export default function HomeCourseContainer({ search }) {
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
        <div className="hcc">
            {loading ? <div className="loader"></div> : (
                <Fragment>
                    {
                        courses?.filter(course => {
                            return course?.name.toLowerCase().includes(search.toLowerCase()) || course?.description.toLowerCase().includes(search.toLowerCase())
                        }).map((c, id) => (
                            <div className="paper" key={id}>
                                <h3>{c.name}</h3>
                                <MentorName id={c.mentorId} />
                                <div>
                                    {c.categories.map((cat, catid) => (
                                        <span key={catid} className="chip"><small>{cat}</small></span>
                                    ))}
                                    {c.subcategories.map((scat, scatid) => (
                                        <span key={scatid} className="chip"><small>{scat}</small></span>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </Fragment>
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
    return <p>Mentor: {payload}</p>;
}
