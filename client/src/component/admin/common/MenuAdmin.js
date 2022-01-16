import React from 'react'
import { NavLink } from "react-router-dom";

export default function MenuAdmin() {
  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <br /><br />
          <li className="treeview active">
          <NavLink to="/admin/Dashboard">
              <i className="fa fa-laptop" /> <span className="fa-laptop1">Thông tin </span>
            </NavLink>
          </li>

          <li className="treeview">
            <a href="#" >
              <i className="fa fa-newspaper-o" />
              <span className="fa-newspaper-o1">Khóa học</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
              <li > 
                <NavLink to="/admin/CourseCategory">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Danh mục khóa học</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/ApprovedCourses">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Các khóa đã phê duyệt</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/PendingCourse">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Các khóa học chờ xử lý</span>
                </NavLink>
              </li>

            </ul>
          </li>
          
          <li className="treeview ">
            <a href="#">
              <i className="fa fa-user-circle-o" />
              <span className="fa-newspaper-o1">Phần người dùng</span>
              <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right" />
              </span>
            </a>
            <ul className="treeview-menu">
            <li > 
                <NavLink to="/admin/users">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Người dùng</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/Students">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Học sinh</span>
                </NavLink>
              </li>
              <li > 
                <NavLink to="/admin/Instructors">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Giảng viên</span>
                </NavLink>
              </li>
              <li>
              <NavLink to="/admin/Pendinginstructer">
                  <i className="fa fa-circle-o" /> <span className="fa-laptop1">Giảng viên chờ duyệt</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="treeview ">
          <NavLink to="/admin/Chungchi">
              <i className="fa fa-book" /> <span className="fa-laptop1">Chứng Chỉ</span>
           </NavLink>
          </li>

          <li className="treeview ">
          <NavLink to="/admin/Payment">
              <i className="fa fa-usd" /> <span className="fa-laptop1">Lịch sử thanh toán</span>
           </NavLink>
          </li>

        </ul>
      </section>
    </aside>
  )
}