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
                <NavLink to="/student/Dashboard">Bảng Chi tiết</NavLink>
              </li>
              <li onClick={() => change("Edit Profile")} className>
                <NavLink to="/student/EditProfile">Cập nhật thông tin cá nhân</NavLink>
              </li>
              <li onClick={() => change("Edit Password")} className>
                <NavLink to="/student/EditPassword">Sửa mật khẩu</NavLink>
              </li>
              <li onClick={() => change("Enrolled Courses")} className>
                <NavLink to="/student/EnrolledCourses">
                Các khóa học đã đăng ký
                </NavLink>
              </li>
              <li onClick={() => change("Payment history")} className>
                <NavLink to="/student/PaymentHistory">Lịch sử thanh toán</NavLink>
              </li>
              <li onClick={() => change("Favorite")} className>
                <NavLink to="/student/favorite">Yêu thích</NavLink>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
