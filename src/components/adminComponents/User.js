import React,{ Component } from "react";
import axios from "axios";
import M from "materialize-css";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
        allStudents: null,
    }
  }

  getMentors = async () =>{
    try {
      const {data} = await axios.get('/api/admin/allStudents')
      this.setState({ allStudents: data })
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
      const users = (
        this.state.allStudents?.map((user,id) => (
          <li key={user._id}>
          <div className="collapsible-header">{id+1}) {user.name}</div>
        <div className="collapsible-body">
          <span>
            <span className="title">{user.name}</span>
              <p>{user.email}</p>
              <p>{user.institution}</p>
              <p>{user.subject}</p>
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
              <h5>Users in Coursebee</h5>
                <ul className="collapsible" >
                  {users}
                </ul>
              </div>
        
    )
    }
}

