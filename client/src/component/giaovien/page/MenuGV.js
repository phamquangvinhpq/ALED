import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuGV() {

    
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


                <div className="col-md-3">
                    <div className="customer-sidebar">
                        <ul>
                            <li className>
                                <NavLink to="/giangvien/Dashboard">
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className>
                              <NavLink to="/giangvien/AddCourse">
                                    Add Course			
                                    </NavLink>
                            </li>
                            <li className>
                            <NavLink to="/giangvien/AllCourses">
                                    All Courses		
                                    </NavLink>	
                            </li>
                            <li className>
                            <NavLink to="/giangvien/AddCourse">
                                    Withdraw History	
                                    </NavLink>	
                            </li>
                            <li className>
                                <a href="">
                                    Withdraw Money			</a>
                            </li>
                        </ul>
                    </div>			</div>

            </div>
        </div>


    )
}
