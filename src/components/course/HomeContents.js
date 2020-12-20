import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartAction'

export default function HomeContents() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { courses, contentLoaded } = useSelector(state => state.content)
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const { items } = useSelector(state => state.cart)
    return (
        <div className="hc">
            <div className="hc__nav">
                <button>Popular courses</button>
                <button>New Courses</button>
                <button>Upcoming</button>
                <button onClick={() => history.push('/course')}>All Courses</button>
            </div>
            {!contentLoaded ? <div className="loader"></div> : (
                <div className="hc__container">
                    {courses?.map((course, id) => (
                        <div key={id} className="card">
                            <div className="card__body">
                                <p><b>{course.name}</b></p>
                                <p>
                                    {course.categories?.map((ccat, ccatid) => (
                                        <small key={ccatid} className="chip">{ccat}</small>
                                    ))}

                                    {course.subcategories?.map((sccat, sccatid) => (
                                        <small key={sccatid} className="chip">{sccat}</small>
                                    ))}
                                </p>
                                {(isAuthenticated && ((user.type !== 'admin') && (user.type !== 'mentor'))) && <Fragment>
                                    {items?.some(p => p === course._id) ? (
                                        <button value={course._id} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove from cart</button>
                                    ) : (
                                            <button value={course._id} onClick={e => dispatch(addToCart(e.target.value))}>Add to cart</button>
                                        )}
                                </Fragment>}
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    )
}