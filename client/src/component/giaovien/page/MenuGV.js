import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { DEFAULT_API } from "../../../conf/env";

export default function MenuGV(props) {
  const [listQA, setListQA] = useState([]);
  const [status, setstatus] = useState(0);

  const users_id = localStorage.getItem("userid");

  const change = (value) => {
    props.changleTitle(value);
    setstatus(status+1)
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
  }, [status]);

  return (
    <div>
      <div>
        <div className="col-md-3">
          <div className="customer-sidebar">
            <ul>
              <li onClick={() => change("Tổng quát")} className="menuvalue">
                <NavLink to="/giangvien/dashboard">Tổng Quát</NavLink>
              </li>
              <li onClick={() => change("Thêm khóa học")} className="menuvalue">
                <NavLink to="/giangvien/AddCourse">Thêm khóa học </NavLink>
              </li>
              <li onClick={() => change("Tất cả khóa học")} className="menuvalue">
                <NavLink to="/giangvien/AllCourses">Tất cả khóa học</NavLink>
              </li>
              <li onClick={() => change("Câu hỏi đã trả lời ")} className="menuvalue">
                <NavLink to="/giangvien/Answered">Đã trả lời</NavLink>
              </li>
              <li onClick={() => change("Câu hỏi chưa trả lời")} className="menuvalue">
                <NavLink to="/giangvien/NoteAnswered">Chưa trả lời</NavLink> {listQA.length != 0 ? <span class="header__cart-notice">?</span>:""}
              </li>
              <li onClick={() => change("Câu Hỏi")} className="menuvalue">
                <NavLink to="/giangvien/question">Câu Hỏi</NavLink>
              </li>
              <li onClick={() => change("Đề thi")} className="menuvalue">
                <NavLink to="/giangvien/dethi">Đề Thi</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
