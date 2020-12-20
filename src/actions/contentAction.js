import { GET_COURSES, COURSE_LOADED } from './types';
import axios from 'axios'

export const getCourses = () => dispatch => {
    axios.get(`${process.env.REACT_APP_NOT_AXIOS_BASE_URL}/api/get/courses`)
        .then(resdata => {
            dispatch({
                type: GET_COURSES,
                payload: resdata.data.courses,
            })
            dispatch({
                type: COURSE_LOADED
            })
        })
        .catch(error => {
            console.log(error.message)
            dispatch({
                type: GET_COURSES,
                payload: [],
            })
            dispatch({
                type: COURSE_LOADED
            })
        })
}