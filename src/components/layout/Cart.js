import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { removeFromCart } from '../../actions/cartAction'

export default function Cart() {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)
    const { courses } = useSelector(state => state.content)
    return (
        <div className={`${((items?.length === 0) || (location.pathname === "/checkout")) ? 'hide' : 'cart'}`}>
            <h1>Cart</h1>
            <p>Total number of items: {items?.length}</p>
            {courses.filter(course => {
                return items?.includes(course._id)
            })?.map((course, id) => (
                <div key={id} className="cart__item">
                    <h3>{course.name}</h3>
                    <button value={course._id} onClick={e => dispatch(removeFromCart(e.target.value))}>X</button>
                </div>
            ))}
            {/*<button onClick={() => dispatch(clearCart())}>Empty Cart</button>*/}
            <button onClick={() => history.push('/checkout')}>Checkout</button>
        </div>
    )
}
