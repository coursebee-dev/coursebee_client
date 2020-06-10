import React,{useState,useEffect} from "react";
import axios from "axios";
export default function Mentor() {
    const [allMentors,setAllMentors] = useState()
    const [isLoading,setIsLoading] = useState(false)
    
    useEffect(()=> {
        getMentors()
    },[])

    const getMentors = async () =>{
        setIsLoading(true)
        try {
          const {data} = await axios.get('/api/admin/allMentors')
          setAllMentors(data)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
      }

    const onVerifyClick = mentorId => async e => {
        e.preventDefault();
        try {
            const {data} = await axios.put('/api/admin/verifyMentor/' + mentorId)
            if (data.message === 'success') {
                getMentors()
            } else {
                throw Error({ message: "failed" })
            }
        } catch (error) {
            console.log(error)
        }
      }

    const mentors = allMentors?.map(mentor => (
        <ul className="collection" key={mentor._id}>
        <li className="collection-item">
          <span className="title">{mentor.name}</span>
          <p>{mentor.email}</p>
          <p>{mentor.organization}</p>
          <p>{mentor.position}</p>
          <p>{mentor.mobileNo}</p>
          <p>
            {mentor.adminVerify ? "verified" : <button onClick={onVerifyClick(mentor._id)} className="btn btn-small waves-effect waves-light hoverable black">Verify</button>}   
          </p>
          <br />
        </li>
        </ul>
      ));

      const loader = (
        <div className="progress">
      <div className="indeterminate"></div>
  </div>
      )

    return (
        <div className="container left-align">
              <h5>Mentors in Coursebee</h5>
              {isLoading? <>{loader}</> : <>{mentors}</>}
              </div>
        
    )
}
