import axios from "axios";

const forgotPassEmail = (userData) => () =>{
    console.log("In forgotpassemail")
    axios
        .get("/api/email/forgotpass", {params:userData})
        .then(res => {
            console.log(res.data)
        }) 
        .catch(err =>{
            console.log(err)
        });
}

export default forgotPassEmail;