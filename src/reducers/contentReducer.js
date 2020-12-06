import axios from 'axios';
import { GET_COURSES } from "../actions/types";

const getCourses = async () => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_NOT_AXIOS_BASE_URL}/api/get/courses`)
        return data.courses
    } catch (error) {
        console.log(error.message)
        return []
    }
}

const initialState = {
    courses: getCourses(),
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: getCourses()
            }
        default:
            return state;
    }
}