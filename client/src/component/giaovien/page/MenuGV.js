import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { DEFAULT_API } from "../../../conf/env";

export default function MenuGV(props) {
  const [listQA, setListQA] = useState([]);
  const users_id = localStorage.getItem("userid");

  const change = (value) => {
    props.changleTitle(value);
  };
  
  const loadQA = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +`qa/getbystatus?status=0&users_id=${users_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setListQA(result))
      .catch((error) => console.log("error", error));
  };
  console.log(listQA);
  useEffect(() => {
    loadQA();
  }, []);

  return (
    <div>
      <div>
        <div className="col-md-3">
          <div className="customer-sidebar">
            <ul>
              <li onClick={() => change("Dashboard")} className="menuvalue">
                <NavLink to="/giangvien/dashboard">Bảng điều khiển</NavLink>
              </li>
              <li onClick={() => change("Add Course")} className="menuvalue">
                <NavLink to="/giangvien/AddCourse">Thêm khóa học </NavLink>
              </li>
              <li onClick={() => change("All Courses")} className="menuvalue">
                <NavLink to="/giangvien/AllCourses">Tất cả khóa học</NavLink>
              </li>
              <li onClick={() => change("Answered")} className="menuvalue">
                <NavLink to="/giangvien/Answered">Đã trả lời</NavLink>
              </li>
              <li onClick={() => change("Not Answered")} className="menuvalue">
                <NavLink to="/giangvien/NoteAnswered">Chưa trả lời</NavLink> {listQA.length != 0 ? <span class="header__cart-notice">?</span>:""}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
