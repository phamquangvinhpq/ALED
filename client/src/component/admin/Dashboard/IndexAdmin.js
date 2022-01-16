import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Homestd from '../../student/page/Homestd';
import HeaderAdmin from '../common/HeaderAdmin';
import MenuAdmin from '../common/MenuAdmin';
import ApprovedCourses from './ApprovedCourses';
import CourseCategory from './CourseCategory';
import Dashboard from './Dashboard';
import Instructors from './Instructors';
import EditCategory from './EditCategory'
import Report from './Report'
import PaymentHistory from './PaymentHistory';
import PendingCourse from './PendingCourses';
import Students from './Students';
import Users from './Users';
import AddCategory from "./AddCategory";
import Leson from './Leson';
import Section from './Section';
import Pendinginstructer from './Pendinginstructer';
import AddUser from './AddUser';
import Chungchi from './Chungchi';

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

                            <Route path="/admin/adduser">
                                <AddUser />
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
                            <Route path="/admin/Chungchi">
                                <Chungchi />
                            </Route>

                            <Route path="/admin/Instructors">
                                <Instructors />
                            </Route>

                            <Route path="/admin/CourseCategory">
                                <CourseCategory />
                            </Route>

                            <Route path="/admin/addCategory">
                                <AddCategory />
                            </Route>

                            <Route path="/admin/editCategory/:id">
                                <EditCategory />
                            </Route>

                            <Route path="/admin/ApprovedCourses">
                                <ApprovedCourses />
                            </Route>

                            <Route path="/admin/lession/:id">
                                <Leson />
                            </Route>

                            <Route path="/admin/Section/:id">
                                <Section />
                            </Route>

                            <Route path="/admin/Pendinginstructer">
                                <Pendinginstructer />
                            </Route>

                            <Route path="/admin/Report">
                                <Report />
                            </Route>
                        </Switch>
                    </div>
                </body>
            </BrowserRouter>
        </div>
    )
}