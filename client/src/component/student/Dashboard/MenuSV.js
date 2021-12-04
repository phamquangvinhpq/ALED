import React from 'react'
import { NavLink } from "react-router-dom";

export default function Menusv() {

    return (
        <div>
            <div>
                <div className="page-banner bg-6c5ce7 pt_20 pb_20">
                    <div className="page-banner-bg" />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Add Course</h1>
                            </div>
                        </div>
                    </div>
                </div>

                    <br />
                <div className="col-md-3">
                    <div className="customer-sidebar">
                        <ul>
                            <li className>
                                <NavLink to="/student/Dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className>
                                <NavLink to="/student/EditProfile">
                                    Edit Profile
                                </NavLink>
                            </li>
                            <li className>
                                <NavLink to="/student/EditPassword">
                                    Edit Password
                                </NavLink>
                            </li>
                            <li className>
                                <NavLink to="/student/EnrolledCourses">
                                    Enrolled Courses
                                </NavLink>
                            </li>
                            <li className>
                                <NavLink to="/student/favorite">
                                    Favorite
                                </NavLink>
                            </li>

                        </ul>
                    </div>			</div>

            </div>
        </div>


    )
}
