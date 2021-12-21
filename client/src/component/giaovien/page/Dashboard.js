import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Dashboard() {

  const [infoStudent, setInfoStudent] = useState([]);
  const user_id = localStorage.getItem("userid");

  const loadInfoStudent = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +`teacheroverview?author_id=${user_id}`, requestOptions)   
       .then((response) => response.json())
      .then((result) => {setInfoStudent(result)
        console.log(result);
      })
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
            {infoStudent.map((value,index)=> 
            <tbody>
              <tr>
                <th className="w-40-p">Total Enrolled Courses</th>
                <td>{value.totalCourse}</td>
              </tr>
              <tr>
                <th>Total Rating Given</th>
                <td>{value.totalRating}</td>
              </tr>
              <tr>
                <th>Total Student</th>
                <td>{value.totalStudents}</td>
              </tr>
              <tr>
                <th>Total instructorRating</th>
                <td>{value.instructorRating}</td>
              </tr>
            </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}