import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../actions/cartAction'

export default function HomeCourseContainer({ search }) {
    //const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { courses, contentLoaded } = useSelector(state => state.content)
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const { items } = useSelector(state => state.cart)
    return (
        <div className="hcc">
            {!contentLoaded ? <div className="loader"></div> : (
                <Fragment>
                    {
                        courses?.filter(course => {
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
                                    {(isAuthenticated && ((user.type !== 'admin') && (user.type !== 'mentor'))) && <Fragment>
                                        {items?.some(p => p === c._id) ? (
                                            <button value={c._id} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove from cart</button>
                                        ) : (
                                                <button value={c._id} onClick={e => dispatch(addToCart(e.target.value))}>Add to cart</button>
                                            )}
                                    </Fragment>}
                                </div>
                            </div>
                        ))
                    }
                </Fragment>
            )}
        </div>
    )
}


