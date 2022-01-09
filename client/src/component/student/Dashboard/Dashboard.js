import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Dashboard() {

  const [infoStudent, setInfoStudent] = useState(Object);
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
                <th className="w-40-p">Tổng số khóa học đã đăng ký</th>
                <td>{infoStudent.totalCourse}</td>
              </tr>
              <tr>
                <th>Tổng số tiền đã chi</th>
                <td>{infoStudent.totalMoneySpent}</td>
              </tr>
              <tr>
                <th>Tổng đánh giá được đưa ra</th>
                <td>{infoStudent.totalRatingGiven}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}