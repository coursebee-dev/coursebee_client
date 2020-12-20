import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import axios from 'axios';

const seo = {
    title: "Courses : Coursebee",
    description:
        "Courses from top-notch mentors brought to you by coursebee.com.",
    url: "https://coursebee.com/course/",
    image: ""
};

export default function Course() {
    const [search, setSearch] = useState('')
    const [userData, setUserData] = useState()
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)
    const { courses, contentLoaded } = useSelector(state => state.content)
    const { isAuthenticated, user } = useSelector(state => state.auth)
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
        <Fragment>
            <Helmet
                title={seo.title}
                meta={[
                    {
                        name: "description",
                        property: "og:description",
                        content: seo.description
                    },
                    { property: "og:title", content: seo.title },
                    { property: "og:url", content: seo.url },
                ]}
            />
            <div className="coursepage">
                <form onSubmit={e => e.preventDefault()}>
                    <input placeholder="search your favourite courses here" type="search" onChange={e => setSearch(e.target.value)} />
                </form>
                <div className="coursepage__container">
                    <div className="coursepage__container__nav">

                    </div>
                    <div className="coursepage__container__cards">
                        {!contentLoaded ? (
                            <div className="loader"></div>
                        ) : (
                                <Fragment>
                                    {courses?.filter(course => {
                                        return course?.name.toLowerCase().includes(search.toLowerCase()) || course?.description.toLowerCase().includes(search.toLowerCase())
                                    })?.sort().map((course, id) => (
                                        <div key={id} className="card">
                                            <div className="card__content">
                                                <h3>{course.name}</h3>
                                                <div className="tags">

                                                    {course.categories?.map((cat, catid) => (
                                                        <small key={catid} >{cat}</small>
                                                    ))}
                                                    {course.subcategories?.map((scat, scatid) => (
                                                        <small key={scatid}>{scat}</small>
                                                    ))}
                                                </div>
                                                {course?.price === 0 || !course?.price ? (
                                                    <p>Price: Free</p>
                                                ) : (
                                                        <p>Price: {course.price} taka</p>
                                                    )}
                                                {(isAuthenticated && ((user.type !== 'admin') && (user.type !== 'mentor'))) && <Fragment>
                                                    {userData?.enrolledcourses?.includes(course._id) ? (
                                                        <button value={course._id} disabled={true}>Already Enrolled</button>
                                                    ) : (
                                                            <Fragment>
                                                                {items?.some(p => p === course._id) ? (
                                                                    <button value={course._id} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove from cart</button>
                                                                ) : (
                                                                        <button value={course._id} onClick={e => dispatch(addToCart(e.target.value))}>Add to cart</button>
                                                                    )}
                                                            </Fragment>
                                                        )}
                                                </Fragment>}
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            )}
                    </div>
                </div>
            </div>

        </Fragment >
    )
}