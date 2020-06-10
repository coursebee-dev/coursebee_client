import React,{ Component } from "react";
import axios from "axios";
import M from "materialize-css";

export default class Mentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMentors: null,
    }
  }

  getMentors = async () =>{
    try {
      const {data} = await axios.get('/api/admin/allMentors')
      this.setState({ allMentors: data })
    } catch (error) {
      console.log(error)
    }
  }
  
  componentDidMount() {
      this.getMentors()
      var colups = document.querySelectorAll('.collapsible')
       M.Collapsible.init(colups,{});
  }

    onVerifyClick = mentorId => async e => {
        e.preventDefault();
        try {
            const {data} = await axios.put('/api/admin/verifyMentor/' + mentorId)
            if (data.message === 'success') {
                this.getMentors()
            } else {
                throw Error({ message: "failed" })
            }
        } catch (error) {
            console.log(error)
        }
      }

    render() {
      const mentors = (
        this.state.allMentors?.map((mentor,id) => (
          <li key={mentor._id}>
          <div className="collapsible-header">{id+1}) {mentor.name}</div>
        <div className="collapsible-body">
          <span>
            <span className="title">{mentor.name}</span>
              <p>{mentor.email}</p>
              <p>{mentor.organization}</p>
              <p>{mentor.position}</p>
              <p>{mentor.mobileNo}</p>
              <p>
                {mentor.adminVerify ? "verified" : <button onClick={this.onVerifyClick(mentor._id)} className="btn btn-small waves-effect waves-light hoverable black">Verify</button>}   
              </p>
          </span>
          </div>
          </li>
        ))
        )
  
        const loader = (
          <div className="container">
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          </div>
        )
      if (this.props.isLoading)
          return <>{loader}</>
      else  if (!this.props.isLoading) 
        return (
        <div className="container left-align">
              <h5>Mentors in Coursebee</h5>
                <ul className="collapsible" >
                  {mentors}
                </ul>
              </div>
        
    )
    }
}
