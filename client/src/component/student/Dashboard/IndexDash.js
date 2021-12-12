import React from 'react'
import Dashboard from './Dashboard'
import FooterStudent from '../Common/FooterStudent';
import HeaderStudent from '../Common/HeaderStudent';
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Menusv from './MenuSV';
import EditPassword from './EditPassword';
import EnrolledCourses from './EnrolledCourses';
import ListCourse from './EditProfile';

import Not404 from './Not404';
import Favorite from '../page/Favorite';
import PaymentHistory from './PaymentHistory';



export default function IndexDash() {
    
    return (
        <div>
            <BrowserRouter History={History}>
            <HeaderStudent ></HeaderStudent>
             <div className="page-content customer">
                    <div className="container">
                    <Menusv />
                <Switch>
                    <Route  path="/student/Dashboard">
                        <Dashboard />
                    </Route>
                    <Route  path="/student/EditPassword">
                        <EditPassword />
                    </Route>
                    <Route  path="/student/EditProfile">
                        <ListCourse />
                    </Route>
                    <Route  path="/student/EnrolledCourses">
                        <EnrolledCourses />
                    </Route>
                    <Route  path="/student/PaymentHistory">
                        <PaymentHistory />
                    </Route>
                    <Route  path="/student/favorite">
                        <Favorite />
                    </Route>
                    <Route path="/">   
                        <Not404 />
                    </Route>
              
                </Switch>
                </div>
                </div>
                <FooterStudent />
            </BrowserRouter>
        </div>
    )
}
