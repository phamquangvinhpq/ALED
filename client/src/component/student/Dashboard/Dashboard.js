import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Dashboard() {

  const [infoStudent, setInfoStudent] = useState({
    totalCourse : 0,
    totalMoneySpent : 0,
    totalRatingGiven : 0
  });
  const user_id = localStorage.getItem("userid");

  const loadInfoStudent = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +`studentoverview?user_id=${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setInfoStudent(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadInfoStudent();
  }, []);


  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th className="w-40-p">Số Khóa Học Đã Mua</th>
                <td>{infoStudent.totalCourse}</td>
              </tr>
              <tr>
                <th>Tổng Số Tiền Đã Mua</th>
                <td>{infoStudent.totalMoneySpent.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                })}</td>
              </tr>
              <tr>
                <th>Tổng Số Đánh Giá</th>
                <td>{infoStudent.totalRatingGiven}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}