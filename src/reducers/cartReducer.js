import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/types";

const initialState = {
    items: [],
};

export default function (state = initialState, action) {
    let items = initialState.items;
    switch (action.type) {
        case ADD_TO_CART:
            items.push(action.payload)
            return {
                ...state,
                items: items
            };
        case REMOVE_FROM_CART:
            let i = items.indexOf(action.payload)
            items.splice(i, 1)
            return {
                ...state,
                items: items
            };
        case CLEAR_CART:
            return {
                ...state,
                items: []
            }
        default:
            return state;
    }
}