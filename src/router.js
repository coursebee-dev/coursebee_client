import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css'

import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateRouteMentor from "./components/private-route/PrivateRouteMentor";
import PrivateRouteAdmin from "./components/private-route/PrivateRouteAdmin";


import Landing from './components/landing/Landing';
import LandingMentor from './components/landingMentor/LandingMentor';
import LandingAdmin from './components/landingAdmin/LandingAdmin';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import RegisterMentor from './components/authMentor/RegisterMentor';
import LoginMentor from './components/authMentor/LoginMentor';
import RegisterAdmin from './components/authAdmin/RegisterAdmin';
import LoginAdmin from './components/authAdmin/LoginAdmin';
import VerifyEmail from './components/verifyEmail/VerifyEmail';
import About from './components/about/About';
import Course from './components/course/Course';
import Training from './components/training/Training';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import LiveClassList from './components/liveClass/LiveClassList';
import LiveClassRoom from './components/dashboard/LiveClassRoom';
import DashboardMentor from './components/dashboardMentor/DashboardMentor';
import ScheduleClass from './components/dashboardMentor/ScheduleClass';
import LiveClassRoomMentor from './components/dashboardMentor/LiveClassRoomMentor';
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin';
import ViewMentor from './components/dashboardAdmin/ViewMentor';
import ViewMentorDetail from './components/dashboardAdmin/ViewMentorDetail';
import ViewLiveClass from './components/dashboardAdmin/ViewLiveClass';
import ViewStudent from './components/dashboardAdmin/ViewStudent';
import MyLiveClass from './components/dashboard/MyLiveClass';
import LiveClassDetail from './components/liveClass/LiveClassDetail';
import PostPayment from './components/payment/PostPayment';
import ForgotPass from './components/forgotPass/ForgotPass';
import ForgotPassMentor from './components/forgotPass/ForgotPassMentor';
import ForgotPassAdmin from './components/forgotPass/ForgotPassAdmin';
<<<<<<< HEAD
import Terms from './components/LegalDocuments/Terms';
import Privacy from './components/LegalDocuments/Privacy';
import Disclaimer from './components/LegalDocuments/Disclaimer';
import Contact from './components/contact/Contact';
=======
import ChangePass from './components/forgotPass/ChangePass';
>>>>>>> 3cf3bb50b14c0858cb1a3b91014ee107b07ea8da


export default function PathRoute() {
    return (
        <Switch>
            <React.Fragment>
                <Navbar />
                <main className="no-padding">
<<<<<<< HEAD
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/mentor" component={LandingMentor} />
                    <Route exact path="/admin" component={LandingAdmin} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/forgotpass" component={ForgotPass} />
                    <Route exact path="/mentor/register" component={RegisterMentor} />
                    <Route exact path="/mentor/login" component={LoginMentor} />
                    <Route exact path="/mentor/forgotpass" component={ForgotPassMentor} />
                    <Route exact path="/admin/register" component={RegisterAdmin} />
                    <Route exact path="/admin/login" component={LoginAdmin} />
                    <Route exact path="/admin/forgotpass" component={ForgotPassAdmin} />
                    <Route exact path="/verifyemail" component={VerifyEmail} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/liveclass" component={LiveClassList} />
                    <Route exact path="/liveclass/:id" component={LiveClassDetail} />
                    <Route exact path="/course" component={Course} />
                    <Route exact path="/training" component={Training} />
                    <Route exact path="/success" component={PostPayment} />
                    <Route exact path="/failed" component={PostPayment} />
                    <Route exact path="/cancel" component={PostPayment} />
                    <Route exact path="/terms" component={Terms} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route exact path="/disclaimer" component={Disclaimer} />
                    <Route exact path="/contactus" component={Contact} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/dashboard/myliveclass/:id" component={MyLiveClass} />
                    <PrivateRoute exact path="/dashboard/liveclassroom/:classid" component={LiveClassRoom} />
                    <PrivateRouteMentor exact path="/mentor/dashboard" component={DashboardMentor} />
                    <PrivateRouteMentor exact path="/mentor/dashboard/scheduleclass" component={ScheduleClass} />
                    <PrivateRouteMentor exact path="/mentor/dashboard/liveclassroom/:classid" component={LiveClassRoomMentor} />
                    <PrivateRouteAdmin exact path="/admin/dashboard" component={DashboardAdmin} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor" component={ViewMentor} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor/:mentorid" component={ViewMentorDetail} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewliveclass" component={ViewLiveClass} />
                    <PrivateRouteAdmin exact path="/admin/dashboard/viewstudent" component={ViewStudent} />
=======
                <Route exact path="/" component={Landing} />
                <Route exact path="/mentor" component={LandingMentor} />
                <Route exact path="/admin" component={LandingAdmin} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgotpass" component={ForgotPass} />
                <Route exact path="/mentor/register" component={RegisterMentor} />
                <Route exact path="/mentor/login" component={LoginMentor} />
                <Route exact path="/mentor/forgotpass" component={ForgotPassMentor} />
                <Route exact path="/admin/register" component={RegisterAdmin} />
                <Route exact path="/admin/login" component={LoginAdmin} />
                <Route exact path="/admin/forgotpass" component={ForgotPassAdmin} />
                <Route exact path="/changepass/:token" component={ChangePass} />
                <Route exact path="/verifyemail" component={VerifyEmail} />
                <Route exact path="/about" component={About} />
                <Route exact path="/liveclass" component={LiveClassList} />
                <Route exact path="/course" component={Course} />
                <Route exact path="/training" component={Training} />
                <Route exact path="/success" component={PostPayment} />
                <Route exact path="/failed" component={PostPayment} />
                <Route exact path="/cancel" component={PostPayment} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/dashboard/myliveclass/:id" component={MyLiveClass} />
                <PrivateRoute exact path="/dashboard/liveclassroom/:classid" component={LiveClassRoom} />
                <PrivateRouteMentor exact path="/mentor/dashboard" component={DashboardMentor} />
                <PrivateRouteMentor exact path="/mentor/dashboard/scheduleclass" component={ScheduleClass} />
                <PrivateRouteMentor exact path="/mentor/dashboard/liveclassroom/:classid" component={LiveClassRoomMentor} />
                <PrivateRouteAdmin exact path="/admin/dashboard" component={DashboardAdmin} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor" component={ViewMentor} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor/:mentorid" component={ViewMentorDetail} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewliveclass" component={ViewLiveClass} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewstudent" component={ViewStudent} />
>>>>>>> 3cf3bb50b14c0858cb1a3b91014ee107b07ea8da
                </main>
                <Footer />
            </React.Fragment>
        </Switch>
    )
}