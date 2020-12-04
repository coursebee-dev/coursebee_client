import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoutUser from "../../actions/logoutAction";
import MyLiveClass from "./MyLiveClass"
import axios from "axios";

function Dashboard({ auth, history }) {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(logoutUser());
  };
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
    <Fragment>
      <div className="cta">

        <div className="cta__nav">
          <div className="cta__nav__actions">
            <h1>Hello {user.name.split(" ")[0]}</h1>
            <p>Thank you for signing in to COURSEBEE. We are continuously working to make this a better platform.</p>
            <button>Join us!</button>
          </div>
          <div className="cta__nav__categories">
            {categories.map((cat, id) => (
              <button key={id}>{cat.title}</button>
            ))}
          </div>
        </div>
        <div className="cta__search">
          <form>
            <h2>Search your course here</h2>
            <input type="search" onChange={e => setSearch(e.target.value)} />
          </form>
        </div>
      </div>
      {search ? (
        <p>{search}</p>
      ) : (

          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hello, </b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  Thank you for signing in to COURSEBEE. We are continuously working to make this a better platform.
                  <br /><br />If you want to join our team send us a message in our{" "}
                  <a href="https://www.facebook.com/coursebee.live" target="_blank" rel="noopener noreferrer">facebook page</a>.
                </p>

              </h4>
              <Link to="/liveclass" className="btn-flat waves-effect orange darken-1">
                View All Live Classes
                <i className="material-icons left">arrow_forward</i>
              </Link>
              <div className="container">
                <MyLiveClass history={history} studentId={auth.user.id} />
              </div>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                onClick={onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable teal darken-1"
              >
                Logout
              </button>
            </div>
          </div>
        )}
    </Fragment>
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