import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuSV() {

    return (
        <div>
            <br /><br /><br /><br /> <br /><br />
            
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


                <div className="col-md-3">
                    <div className="customer-sidebar">
                        <ul>
                            <li className>
                                <NavLink to="/dashboard/concac">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className>
                              <NavLink to="/dashboard/editprofile">
                                    Edit Profile			
                                    </NavLink>
                            </li>
                            <li className>
                            <NavLink to="/dashboard/editpass">
                                    Edit Password
                                    </NavLink>	
                            </li>
                            <li className>
                            <NavLink to="/dashboard/enrolledcourses">
                                    Enrolled Courses
                                    </NavLink>	
                            </li>
                            
                        </ul>
                    </div>			</div>

            </div>
        </div>


    )
}
