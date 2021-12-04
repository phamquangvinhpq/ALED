import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Homestd from '../../student/page/Homestd';
import HeaderAdmin from '../common/HeaderAdmin';
import MenuAdmin from '../common/MenuAdmin';
import ApprovedCourses from './ApprovedCourses';
import CourseCategory from './CourseCategory';
import Dashboard from './Dashboard';
import Instructors from './Instructors';
import PaymentHistory from './PaymentHistory';
import PendingCourse from './PendingCourses';
import Students from './Students';
import Users from './Users';

export default function IndexAdmin() {
    return (
        <div>
            <BrowserRouter History={History}>
                <body class="hold-transition fixed skin-blue sidebar-mini">
                    <div class="wrapper">
                        <HeaderAdmin></HeaderAdmin>
                        <MenuAdmin></MenuAdmin>
                        <br/><br/>
                        <Switch>
                            <Route path="/admin/Dashboard">
                                <Dashboard />
                            </Route>

                            <Route path="/admin/users">
                                <Users />
                            </Route>

                            <Route path="/admin/Students">
                                <Students />
                            </Route>

                            <Route path="/admin/PendingCourse">
                                <PendingCourse />
                            </Route>

                            <Route path="/admin/Payment">
                                <PaymentHistory />
                            </Route>

                            <Route path="/admin/Instructors">
                                <Instructors />
                            </Route>

                            <Route path="/admin/CourseCategory">
                                <CourseCategory />
                            </Route>

                            <Route path="/admin/ApprovedCourses">
                                <ApprovedCourses />
                            </Route>
                        </Switch>
                    </div>
                </body>
            </BrowserRouter>
        </div>
    )
}
