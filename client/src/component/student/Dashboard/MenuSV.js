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
              <li onClick={() => change("Tổng Quan")} className>
                <NavLink to="/student/Dashboard">Tổng Quan</NavLink>
              </li>
              <li onClick={() => change("Thông Tin")} className>
                <NavLink to="/student/EditProfile">Thông Tin</NavLink>
              </li>
              <li onClick={() => change("Đổi Mật Khẩu")} className>
                <NavLink to="/student/EditPassword">Đổi Mật Khẩu</NavLink>
              </li>
              <li onClick={() => change("Khóa Học Đã Mua")} className>
                <NavLink to="/student/EnrolledCourses">
                  Khóa Học Đã Mua
                </NavLink>
              </li>
              <li onClick={() => change("Lịch Sử Mua Hàng")} className>
                <NavLink to="/student/PaymentHistory">Lịch Sử Mua Hàng</NavLink>
              </li>
              <li onClick={() => change("Yêu Thích")} className>
                <NavLink to="/student/favorite">Yêu Thích</NavLink>
              </li>
            </ul>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
