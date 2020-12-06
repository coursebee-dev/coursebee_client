import { GET_COURSES } from './types';

export const getCourses = () => dispatch => {
    dispatch({
        type: GET_COURSES,
    })
}