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
import LiveClass from './components/dashboard/LiveClass';
import DashboardMentor from './components/dashboardMentor/DashboardMentor';
import ScheduleClass from './components/dashboardMentor/ScheduleClass';
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin';
import ViewMentor from './components/dashboardAdmin/ViewMentor';
import ViewMentorDetail from './components/dashboardAdmin/ViewMentorDetail';
import ViewLiveClass from './components/dashboardAdmin/ViewLiveClass';
import ViewStudent from './components/dashboardAdmin/ViewStudent';
import LiveClassRoom from './components/dashboardMentor/LiveClassRoom';

export default function PathRoute() {
    return (
        <Switch>
            <React.Fragment>
                <Navbar />
                <main className="no-padding">
                <Route exact path="/" component={Landing} />
                <Route exact path="/mentor" component={LandingMentor} />
                <Route exact path="/admin" component={LandingAdmin} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/mentor/register" component={RegisterMentor} />
                <Route exact path="/mentor/login" component={LoginMentor} />
                <Route exact path="/admin/register" component={RegisterAdmin} />
                <Route exact path="/admin/login" component={LoginAdmin} />
                <Route exact path="/verifyemail" component={VerifyEmail} />
                <Route exact path="/about" component={About} />
                <Route exact path="/liveclass" component={LiveClass} />
                <Route exact path="/course" component={Course} />
                <Route exact path="/training" component={Training} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRouteMentor exact path="/mentor/dashboard" component={DashboardMentor} />
                <PrivateRouteMentor exact path="/mentor/dashboard/scheduleclass" component={ScheduleClass} />
                <PrivateRouteMentor exact path="/mentor/dashboard/liveclassroom/:topic" component={LiveClassRoom} />
                <PrivateRouteAdmin exact path="/admin/dashboard" component={DashboardAdmin} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor" component={ViewMentor} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewmentor/:mentorid" component={ViewMentorDetail} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewliveclass" component={ViewLiveClass} />
                <PrivateRouteAdmin exact path="/admin/dashboard/viewstudent" component={ViewStudent} />
                </main>
                <Footer />
            </React.Fragment>
        </Switch>
    )
}