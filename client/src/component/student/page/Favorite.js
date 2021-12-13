import React, { useEffect, useState } from "react";
export default function Favorite() {
  const [listFavorite, setListFavorite] = useState([]);
  let user_id = localStorage.getItem("userid")

  const loadFavorite = () => {
    fetch("http://localhost:8080/favorite?user_id=" + user_id)
      .then((response) => response.json())
      .then((data) => 
       setListFavorite(data),
       
       console.log(listFavorite));
  };

  useEffect(() => {
    loadFavorite();
  }, []);

  return (
    <div>
        <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th hidden>ID</th>
                <th>STT</th>
                <th>Course Title</th>
                <th className="w-100">Image</th>
                <th>Course Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {listFavorite.map((favorite, index) => (
              <tr>
              <td hidden>{favorite.id}</td>
              <td>{index+1}</td>
              <td>{favorite.course_name}</td>
              <td>No Rating Given </td>
              <td>
                <a target="_blank" className="btn btn-info btn-sm">
                  Course Content
                </a>
              </td>
              <td>
              <button type="button" class="btn btn-danger">Unlike</button>
              </td>
            </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
