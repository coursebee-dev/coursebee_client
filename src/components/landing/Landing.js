import React, { useState, useEffect, useCallback, Fragment } from "react";
//import { Link } from "react-router-dom";
import axios from 'axios'
import HomeCourseContainer from "../course/HomeCourseContainer";
import HomeContents from "../course/HomeContents";
import { useSelector } from "react-redux";

function Landing({ history }) {
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')
  const { isAuthenticated } = useSelector(state => state.auth)
  const getCategories = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/get/categories')
      setCategories(data.categories)
    } catch (error) {
      console.log(error.message)
    }
  }, [setCategories])
  useEffect(() => {
    window.scrollTo = (x, y) => {
      document.documentElement.scrollTop = y;
    }
    window.scrollTo(0, 0)
    getCategories()
  }, [getCategories])
  /*useEffect(() => {
    console.log(categories)
  }, [categories])*/
  return (
    <div style={{ display: "flex", flexDirection: 'column', width: "100%" }}>
      <div className="ctabody">
        <div className="cta">

          <div className="cta__nav">
            <div className="cta__nav__actions">
              <p>Welcome to COURSEBEE.</p>
              {!isAuthenticated &&
                <Fragment>
                  <button onClick={() => history.push('/register')}>Start learning as a student!</button>
                  <button onClick={() => history.push('/mentor/register')}>Join us as a mentor!</button>
                </Fragment>}
            </div>
            <div className="cta__nav__categories">
              {categories.map((cat, id) => (
                <button key={id}>{cat.title}</button>
              ))}
            </div>
          </div>
          <div className="cta__search">
            <form onSubmit={e => e.preventDefault()}>
              <input type="search" placeholder="What to learn? e.g. photography, marketing, self deveopment, excell . . . " onChange={e => setSearch(e.target.value)} />
            </form>
          </div>
        </div>
      </div>
      {search ? (
        <HomeCourseContainer search={search} />
      ) : (
          <HomeContents />
        )}
    </div>
  );
}
export default Landing;