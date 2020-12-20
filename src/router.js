import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss'

import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRouteMentor from "./components/private-route/PrivateRouteMentor";
import PrivateRouteAdmin from "./components/private-route/PrivateRouteAdmin";


import Landing from './components/landing/Landing';
import LandingMentor from './components/landingMentor/LandingMentor';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import RegisterMentor from './components/authMentor/RegisterMentor';
import LoginMentor from './components/authMentor/LoginMentor';
//import RegisterAdmin from './components/authAdmin/RegisterAdmin';
import LoginAdmin from './components/authAdmin/LoginAdmin';
import VerifyEmail from './components/verifyEmail/VerifyEmail';
import About from './components/about/About';
import Course from './components/course/Course';
import Training from './components/training/Training';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import DashboardMentor from './components/dashboardMentor/DashboardMentor';
import ScheduleClass from './components/dashboardMentor/ScheduleClass';
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin';
import ViewMentor from './components/dashboardAdmin/ViewMentor';
import ViewMentorDetail from './components/dashboardAdmin/ViewMentorDetail';
import ViewLiveClass from './components/dashboardAdmin/ViewLiveClass';
import ViewStudent from './components/dashboardAdmin/ViewStudent';
import PostPayment from './components/payment/PostPayment';
import ForgotPass from './components/forgotPass/ForgotPass';
import ForgotPassMentor from './components/forgotPass/ForgotPassMentor';
import ForgotPassAdmin from './components/forgotPass/ForgotPassAdmin';
import Terms from './components/LegalDocuments/Terms';
import Privacy from './components/LegalDocuments/Privacy';
import Disclaimer from './components/LegalDocuments/Disclaimer';
import Contact from './components/contact/Contact';
import ChangePass from './components/forgotPass/ChangePass';
import AccountMentor from './components/dashboardMentor/AccountMentor';
import Categories from './components/dashboardAdmin/Categories';
import CreateCourse from './components/dashboardMentor/CreateCourse';
import EditCourse from './components/dashboardMentor/EditCourse';
import ViewCourses from './components/dashboardAdmin/ViewCourses';
import EditCourseAdmin from './components/dashboardAdmin/EditCourseAdmin';
import Cart from './components/layout/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from './actions/contentAction';
import Checkout from './components/pages/Checkout';
import CourseDetails from './components/course/CourseDetails';
import Watch from './components/dashboard/Watch';


export default function PathRoute() {
    const [navHeight, setNavHeight] = useState(0)
    const [footHeight, setFootHeight] = useState(0)
    const [bodyHeight, setBodyHeight] = useState(0)
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        setBodyHeight(navHeight + footHeight)
    }, [footHeight, navHeight])
    useEffect(() => {
        dispatch(getCourses())
    }, [dispatch])
    return (
        <Switch>
            <React.Fragment>
                <Navbar setNavHeight={navht => setNavHeight(navht)} />
                <main className="no-padding" style={{ minHeight: `calc(100vh - ${bodyHeight}px)` }}>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/mentor" component={LandingMentor} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgotpass" component={ForgotPass} />
                    <Route exact path="/mentor/register" component={RegisterMentor} />
                    <Route exact path="/mentor/login" component={LoginMentor} />
                    <Route exact path="/mentor/forgotpass" component={ForgotPassMentor} />
                    {/*<Route exact path="/admin/register" component={RegisterAdmin} />*/}
                    <Route exact path="/admin/login" component={LoginAdmin} />
                    <Route exact path="/admin/forgotpass" component={ForgotPassAdmin} />
                    <Route exact path="/changepass/:token" component={ChangePass} />
                    <Route exact path="/verifyemail" component={VerifyEmail} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/course" component={Course} />
                    <Route exact path="/training" component={Training} />
                    <Route exact path="/success" component={PostPayment} />
                    <Route exact path="/failed" component={PostPayment} />
                    <Route exact path="/cancel" component={PostPayment} />
                    <Route exact path="/terms" component={Terms} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact path="/disclaimer" component={Disclaimer} />
                    <Route exact path="/contactus" component={Contact} />
                    <Route exact path="/course/:id" component={CourseDetails} />
                    <PrivateRoute exact path="/watch/:id" component={Watch} />
                    <PrivateRoute exact path="/checkout" component={Checkout} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRouteMentor exact path="/mentor/dashboard" component={DashboardMentor} />
                    <PrivateRouteMentor exact path="/mentor/dashboard/scheduleclass" component={ScheduleClass} />
                    <PrivateRouteMentor exact path="/mentor/dashboard/createcourse" component={CreateCourse} />
                    <PrivateRouteMentor exact path="/mentor/dashboard/editcourse/:courseid" component={EditCourse} />
                    <PrivateRouteMentor exact path="/mentor/account" component={AccountMentor} />
                    <PrivateRouteAdmin exact path="/admin/dashboard" component={DashboardAdmin} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor" component={ViewMentor} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor/:mentorid" component={ViewMentorDetail} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewliveclass" component={ViewLiveClass} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewstudent" component={ViewStudent} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/category" component={Categories} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/courses" component={ViewCourses} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/courses/:courseid" component={EditCourseAdmin} />
                    {(isAuthenticated && ((user.type !== 'admin') && (user.type !== 'mentor'))) && <Cart />}
                </main>
                <Footer setFootHeight={footht => setFootHeight(footht)} />
            </React.Fragment>
        </Switch>
    )
}