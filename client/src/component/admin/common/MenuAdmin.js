import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
        <br/><br/>
          <li className="treeview active">
            <a href="/admin/Dashboard">
              <i className="fa fa-laptop" /> <span className="fa-laptop1">Dashboard</span>
            </a>
          </li>
          
          <li className="treeview ">
            <a href="#">
              <i className="fa fa-newspaper-o" />
              <span className="fa-newspaper-o1">Course</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li><a href="/admin/CourseCategory"><i className="fa fa-circle-o" />Course Category</a></li>
              <li><a href="/admin/ApprovedCourses"><i className="fa fa-circle-o" />Approved Courses</a></li>
              <li><a href="/admin/PendingCourse"><i className="fa fa-circle-o" />Pending Courses</a></li>
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
              <li><a href="/admin/users"><i className="fa fa-circle-o" />Users</a></li>
              <li><a href="/admin/Students"><i className="fa fa-circle-o" />Students</a></li>
              <li><a href="/admin/Instructors"><i className="fa fa-circle-o" />Instructors</a></li>
            </ul>
          </li>
          <li className="treeview ">
            <a href="/admin/Payment">
              <i className="fa fa-usd" /> <span className="fa-laptop1">Payment History</span>
            </a>
          </li>
          
        </ul>
      </section>
    </aside>
  )
}
