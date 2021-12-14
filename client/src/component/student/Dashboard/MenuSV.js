import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menusv(props) {
  const change = (value) => {
    props.changleTitle(value);
  };
  return (
    <div>
      <div>
        <div className="col-md-3">
          <div className="customer-sidebar">
            <ul>
              <li onClick={() => change("Dashboard")} className>
                <NavLink to="/student/Dashboard">Dashboard</NavLink>
              </li>
              <li onClick={() => change("Edit Profile")} className>
                <NavLink to="/student/EditProfile">Edit Profile</NavLink>
              </li>
              <li onClick={() => change("Edit Password")} className>
                <NavLink to="/student/EditPassword">Edit Password</NavLink>
              </li>
              <li onClick={() => change("Enrolled Courses")} className>
                <NavLink to="/student/EnrolledCourses">
                  Enrolled Courses
                </NavLink>
              </li>
              <li onClick={() => change("Payment history")} className>
                <NavLink to="/student/PaymentHistory">Payment history</NavLink>
              </li>
              <li onClick={() => change("Favorite")} className>
                <NavLink to="/student/favorite">Favorite</NavLink>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
