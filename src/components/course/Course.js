import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartAction';

const seo = {
    title: "Courses : Coursebee",
    description:
        "Courses from top-notch mentors brought to you by coursebee.com.",
    url: "https://coursebee.com/course/",
    image: ""
};

export default function Course() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)
    //const { courses } = useSelector(state => state.content)
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
        getCourses();
    }, [getCourses])
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
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                                <Fragment>
                                    {courses?.filter(course => {
                                        return course?.name.toLowerCase().includes(search.toLowerCase()) || course?.description.toLowerCase().includes(search.toLowerCase())
                                    }).map((course, id) => (
                                        <div key={id} className="card">
                                            <div className="card__content">
                                                <h3>{course.name}</h3>
                                                <div className="tags">

                                                    {course.categories.map((cat, catid) => (
                                                        <small key={catid} >{cat}</small>
                                                    ))}
                                                    {course.subcategories.map((scat, scatid) => (
                                                        <small key={scatid}>{scat}</small>
                                                    ))}
                                                </div>
                                                {items?.some(p => p === course._id) ? (
                                                    <button value={course._id} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove from cart</button>
                                                ) : (
                                                        <button value={course._id} onClick={e => dispatch(addToCart(e.target.value))}>Add to cart</button>
                                                    )}
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