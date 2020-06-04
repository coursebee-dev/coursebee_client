import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/private-route/PrivateRoute";

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
import LiveClass from './components/liveClass/LiveClass';
import Course from './components/course/Course';
import Training from './components/training/Training';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import DashboardMentor from './components/dashboardMentor/DashboardMentor';
import DashboardAdmin from './components/dashboardAdmin/DashboardAdmin';
 
export default function PathRoute() {
    return (
    <Switch>
        <React.Fragment>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/mentor" component={LandingMentor} />
            <Route exact path="/admin" component={LandingAdmin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/mentor/register" component={RegisterMentor} />
            <Route exact path="/mentor/login" component={LoginMentor} />
            <Route exact path="/admin/register" component={RegisterAdmin} />
            <Route exact path="/admin/login" component={LoginAdmin} />
            <Route exact path="/verifyEmail" component={VerifyEmail} />
            <Route exact path="/about" component={About} />
            {/*<Route exact path="/comingSoon" component={ComingSoon} />*/}
            <Route exact path="/liveClassroom" component={LiveClass} />
            <Route exact path="/course" component={Course} />
            <Route exact path="/training" component={Training} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/mentor/dashboard" component={DashboardMentor} />
            <PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} />
            <Footer />
        </React.Fragment>
    </Switch>
)}