import axios from "axios";
import {
    GET_ERRORS,
} from "./types";

export const scheduleLiveClass = (formData, mentorId, history) => dispatch => {
    console.log(mentorId)
    axios
        .post("/api/mentor/scheduleclass/" + mentorId, formData)
        .then(res => {
            console.log(res.data)
            history.push("/mentor/dashboard")
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};
