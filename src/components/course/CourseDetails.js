import React, { Fragment, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function CourseDetails({ match }) {
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({})
    const { user } = useSelector(state => state.auth)
    const history = useHistory()
    const [userData, setUserData] = useState()
    const getCourse = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/api/courseinfo/${match.params.id}`)
            if (data.success) {
                setCourse(data.course)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [match.params.id])

    useEffect(() => {
        getCourse()
    }, [getCourse])

    const getUser = useCallback(async () => {
        try {
            const { data } = await axios.get(`/api/userinfo/${user.id}`)
            if (data.success) {
                setUserData(data.user)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [user.id])
    useEffect(() => {
        getUser()
    }, [getUser])

    return (
        <div className="coursedetailspage">
            {loading ? <div className="loader"></div> : (
                <Fragment>
                    <h1>{course.name}</h1>
                    {/* {isAuthenticated && <button>Add to card</button>} */}
                    <div className="description" dangerouslySetInnerHTML={{ __html: course.description }} />
                    {userData?.enrolledcourses?.includes(course._id) && <button onClick={() => history.push(`/watch/${course._id}`)}>Start/Continue course</button>}
                </Fragment>
            )}
        </div>
    )
}
