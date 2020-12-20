import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { removeFromCart } from '../../actions/cartAction'
import axios from 'axios';

export default function Checkout() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { courses, contentLoaded } = useSelector(state => state.content)
    const [total, setTotal] = useState(0)
    const { items } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    let stringedItems = JSON.stringify(items)
    const checkout = async () => {
        try {
            const { data } = await axios.post('/api/course/checkout', {
                courses: items,
                total: total,
                userid: user.id
            })
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let price = 0;
        courses.filter(course => {
            return items?.includes(course._id)
        }).map(course => {
            return price += course.price || 0

        })
        setTotal(price)

    }, [stringedItems, items, courses])
    return (
        <div className="checkout">
            {contentLoaded ? (
                <Fragment>
                    {Number(items.length) !== 0 ?
                        <div className="checkout__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl no.</th>
                                        <th>Course Name</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses?.filter(course => {
                                        return items?.includes(course._id)
                                    })?.map((course, id) => (
                                        <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{course.name}</td>
                                            <td>{course?.price || 0}</td>
                                            <td><button value={course._id} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td>Grand Total:</td>
                                        <td>{total}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <button className="action__button" onClick={() => history.push('/course')}>Add more course</button>
                            <button className="action__button" onClick={checkout}>Proceed to checkout</button>
                        </div> :
                        <div className="checkout__body">
                            <p>Cart is empty</p>
                            <button className="action__button" onClick={() => history.push('/course')}>Check our courses now</button>
                        </div>
                    }
                </Fragment>
            ) : <div className="loader"></div>}
        </div>
    )
}
