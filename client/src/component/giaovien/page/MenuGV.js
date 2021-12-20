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
              <li onClick={() => change("All Courses")} className="menuvalue">
                <NavLink to="/giangvien/AllCourses">All Courses</NavLink>
              </li>
              <li onClick={() => change("Answered")} className="menuvalue">
                <NavLink to="/giangvien/Answered">Answered</NavLink>
              </li>
              <li onClick={() => change("Not Answered")} className="menuvalue">
                <NavLink to="/giangvien/NoteAnswered">Not Answered</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
