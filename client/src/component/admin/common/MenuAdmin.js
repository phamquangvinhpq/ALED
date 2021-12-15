import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <br /><br />
          <li className="treeview active">
            <a href="/admin/Dashboard">
              <i className="fa fa-laptop" /> <span className="fa-laptop1">Dashboard</span>
            </a>
          </li>

        
          <li className="treeview">
            <a href="#" >
              <i className="fa fa-newspaper-o" />
              <span className="fa-newspaper-o1">Course</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li > 
                <NavLink to="/admin/CourseCategory">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Course Category</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/ApprovedCourses">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Approved Courses</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/PendingCourse">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Pending Courses</span>
                </NavLink>
              </li>
             
              
            </ul>
          </li>
          
          <li className="treeview ">
            <a href="#">
              <i className="fa fa-user-circle-o" />
              <span className="fa-newspaper-o1">User Section</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
            <li > 
                <NavLink to="/admin/users">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Users</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/Students">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Students</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/Instructors">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Instructors</span>
                </NavLink>
              </li>
              <li>
              <NavLink to="/admin/Pendinginstructer">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Pending Instructors</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="treeview ">
          <NavLink to="/admin/Payment">
              <i className="fa fa-usd" /> <span className="fa-laptop1">Payment History</span>
           </NavLink>
          </li>

        </ul>
      </section>
    </aside>
  )
}
