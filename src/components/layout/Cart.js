import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../actions/cartAction'

export default function Cart() {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.cart)
    return (
        <div className={`${items?.length === 0 ? 'hide' : 'cart'}`}>
            <h1>Cart</h1>
            <p>Total number of items: {items?.length}</p>
            {items?.map((item, id) => (
                <div key={id}>
                    <p>{item}</p>
                    <button value={item} onClick={e => dispatch(removeFromCart(e.target.value))}>Remove Item</button>
                </div>
            ))}
            {/*<button onClick={() => dispatch(clearCart())}>Empty Cart</button>*/}
        </div>
    )
}
