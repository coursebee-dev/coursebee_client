import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, /*useDispatch*/ } from "react-redux";
//import { Link } from "react-router-dom";
import axios from "axios";
import MyCourses from "./MyCourses";

function Dashboard({ auth, history }) {
  //const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')

  const getCategories = async () => {
    try {
      const { data } = await axios.get('/api/get/categories')
      setCategories(data.categories)
    } catch (error) {
      console.log(error.message)
    }
  }
  const { user } = auth;
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <div>
      <div className="userdash">
        <div className="userdash__greetings">
          <h4>Hello {user.name.split(" ")[0]},</h4>
          <p>Thank you for signing in to COURSEBEE. We are continuously working to make this a better platform. If you want to join our team send us a message in our <a href="https://www.facebook.com/coursebee.live" target="_blank" rel="noopener noreferrer">facebook page</a>.</p>
        </div>

        <div className="userdash__nav">
          {categories.map((cat, id) => (
            <button key={id}>{cat.title}</button>
          ))}
        </div>
        <div className="userdash__search">
          <form>
            <h2>Search your course here</h2>
            <input type="search" onChange={e => setSearch(e.target.value)} />
          </form>
        </div>
        {search ? (
          <MyCourses search={search} />
        ) : (
            <div>Hello</div>
          )}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Dashboard);