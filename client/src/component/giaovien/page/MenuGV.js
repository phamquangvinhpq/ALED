import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuGV() {
    return (
        <div>
            <div>
                <div className="col-md-3">
                    <div className="customer-sidebar">
                        <ul>
                            <li className="menuvalue">
                                <NavLink to="/giangvien/dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="menuvalue">
                                <NavLink to="/giangvien/AddCourse">
                                    Add Course
                                </NavLink>
                            </li>
                            <li className="menuvalue">
                                <NavLink to="/giangvien/AllCourses">
                                    All Courses
                                </NavLink>
                            </li>
                            <li className="menuvalue">
                                <NavLink to="/giangvien/AddCourse">
                                    Withdraw History
                                </NavLink>
                            </li>
                            <li className="menuvalue">
                                <a href="">
                                    Withdraw Money
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}
