import qs from "querystring";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
} from "./types";
import setCurrentUser from "./setUser";

// Register User
export const registerMentor = (userData, history) => dispatch => {
    axios
        .post("/api/mentor/register", userData)
        .then(res => {
            console.log(res.data)
            history.push("/verifyemail", res.data)
        }) // re-direct to email verification on successful register
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


// Login - get user token
export const loginMentor = (userData, history) => dispatch => {
    axios
        .post("/api/mentor/login", qs.stringify(userData))
        .then(res => {
            // Save to localStorage// Set token to localStorage
            const { token } = res.data;
            // Decode token to get user data
            const decoded = jwt_decode(token);
            if (decoded.emailVerify === false) {
                history.push("/verifyEmail", decoded)
            } else {
                localStorage.setItem("jwtToken", token);
                // Set token to Auth header
                setAuthToken(token);
                // Set current user
                dispatch(setCurrentUser(decoded));
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};