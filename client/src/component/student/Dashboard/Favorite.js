import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import  { Redirect } from 'react-router-dom'
export default function Favorite() {
  const [listFavorite, setListFavorite] = useState([]);
  const [status, setStatus] = useState(0);
  let user_id = localStorage.getItem("userid")
  let history = useHistory();

  const loadFavorite = () => {
    fetch(`${DEFAULT_API}` +`favorite?user_id=` + user_id)
      .then((response) => response.json())
      .then((data) => 
       setListFavorite(data),
       console.log(listFavorite));
  };

  const redirect = (id) => {
    history.push(`/detail/${id}`)
    window.location.reload();
  

  };

  const clickDelete = (course_id) => {
    console.log(user_id + course_id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };
        
        fetch(`${DEFAULT_API}` +`favorite?user_id=${user_id}&course_id=${course_id}` , requestOptions)
          .then(response => response.text())
          .then(result => {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
            setStatus(status+1)
          })
          .catch(error => console.log('error', error));
      }
    });
  }

  useEffect(() => {
    loadFavorite();
  }, [status]);

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
                <th className="w-100">Thumbnail</th>
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
              <td>
                <img src={favorite.image} alt="" />
              </td>
              <td>
                <a className="btn btn-info btn-sm" onClick={() => redirect(favorite.course_id) }  >
                  Course Content
                </a>
              </td>
              <td>
              <button onClick={() => clickDelete(favorite.course_id)} type="button" class="btn btn-danger">Unlike</button>
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
