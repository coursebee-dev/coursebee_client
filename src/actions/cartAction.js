import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "./types";
export const addToCart = (pid) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: pid

    })
}

export const removeFromCart = (pid) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: pid

    })
}

export const clearCart = () => dispatch => {
    dispatch({
        type: CLEAR_CART
    })
}

