import React from 'react'
import { NavLink } from "react-router-dom";

export default function Menusv() {

    return (
        <div>
            <div>
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
                                <NavLink to="/student/PaymentHistory">
                                    Payment history
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
