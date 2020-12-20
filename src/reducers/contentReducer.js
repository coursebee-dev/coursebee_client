import { COURSE_LOADED, GET_COURSES } from "../actions/types";


const initialState = {
    courses: [],
    contentLoaded: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
            }
        case COURSE_LOADED:
            return {
                ...state,
                contentLoaded: true,
            }
        default:
            return state;
    }
}