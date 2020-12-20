import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Player from './Player'

export default function Watch({ match }) {

    const [course, setCourse] = useState()
    const { user } = useSelector(state => state.auth)
    const history = useHistory()
    const [userLoaded, setUserLoaded] = useState(true)
    const [courseLoaded, setCourseLoaded] = useState(true)
    const [selectedContent, setSelectedContent] = useState()
    const [userData, setUserData] = useState()
    const getCourse = useCallback(async () => {
        setCourseLoaded(false)
        try {
            const { data } = await axios.get(`/api/courseinfo/${match.params.id}`)
            if (data.success) {
                setCourse(data.course)
                console.log(data.course)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setCourseLoaded(true)
    }, [match.params.id])

    useEffect(() => {
        getCourse()
    }, [getCourse])


    const getUser = useCallback(async () => {
        setUserLoaded(false)
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
        setUserLoaded(true)
    }, [user.id])
    useEffect(() => {
        getUser()
    }, [getUser])

    const selectContent = (e) => {
        const selected = course?.contents?.find(cont => cont._id === e.target.id)
        setSelectedContent(selected)
        console.log(selected)
    }

    return (
        <Fragment>
            {(courseLoaded && userLoaded) ?
                < Fragment >
                    {userData?.enrolledcourses?.includes(course._id) ?
                        <div className="videopage">
                            <div className="videonav">
                                <ul>
                                    {course?.contents?.map((content, id) => (
                                        <li key={id} id={content._id} onClick={selectContent}>{content?.title}</li>
                                    ))}
                                </ul>
                            </div>
                            <Player selectedContent={selectedContent} />
                        </div> : (
                            <div>
                                <h1>You are not enrolled in this course.</h1>
                                <button onClick={() => history.push(`/course/${course?._id}`)}>Buy this course</button>
                            </div>
                        )
                    }
                </Fragment> : <div className="loader"></div>
            }
        </Fragment >
    )
}
