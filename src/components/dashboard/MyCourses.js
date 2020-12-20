import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
export default function MyCourses({ search }) {
    const [userData, setUserData] = useState()
    const { user } = useSelector(state => state.auth)
    const history = useHistory()

    const { courses, contentLoaded } = useSelector(state => state.content)
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
        <div className="hcc">
            {search && <p>Search result for : "{search}"</p>}
            {!contentLoaded ? <div className="loader"></div> : (
                <Fragment>
                    {
                        courses?.filter(course => {
                            return userData?.enrolledcourses?.includes(course._id)
                        })?.filter(course => {
                            return course?.name.toLowerCase().includes(search.toLowerCase()) || course?.description.toLowerCase().includes(search.toLowerCase())
                        })?.map((c, id) => (
                            <div className="paper" key={id}>
                                <h3>{c.name}</h3>
                                <div>
                                    {c.categories?.map((cat, catid) => (
                                        <span key={catid} className="chip"><small>{cat}</small></span>
                                    ))}
                                    {c.subcategories?.map((scat, scatid) => (
                                        <span key={scatid} className="chip"><small>{scat}</small></span>
                                    ))}
                                </div>
                                <button className="action__button" onClick={() => history.push(`/course/${c._id}`)}>View course</button>
                            </div>
                        ))
                    }
                </Fragment>
            )}
        </div>
    )
}
