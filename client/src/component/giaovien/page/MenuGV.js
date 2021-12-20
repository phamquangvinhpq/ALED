import React from "react";
import { NavLink } from "react-router-dom";
export default function MenuGV(props) {
  const change = (value) => {
    props.changleTitle(value);
  };
  return (
    <div>
      <div>
        <div className="col-md-3">
          <div className="customer-sidebar">
            <ul>
              <li onClick={() => change("Dashboard")} className="menuvalue">
                <NavLink to="/giangvien/dashboard">Dashboard</NavLink>
              </li>
              <li onClick={() => change("Add Course")} className="menuvalue">
                <NavLink to="/giangvien/AddCourse">Add Course</NavLink>
              </li>
              <li onClick={() => change(" All Courses")} className="menuvalue">
                <NavLink to="/giangvien/AllCourses">All Courses</NavLink>
              </li>
              <li
                onClick={() => change("Withdraw History")}
                className="menuvalue"
              >
                <NavLink to="/giangvien/WithdrawHistory">Withdraw History</NavLink>
              </li>
              <li
                onClick={() => change("Withdraw Money")}
                className="menuvalue"
              >
                <NavLink to="/giangvien/WithdrawMoney">Withdraw History</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
