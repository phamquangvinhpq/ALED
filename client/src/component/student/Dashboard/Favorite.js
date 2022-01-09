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
      title: "Bạn chắc chứ?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục tệp tưởng tượng này!",
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
            swal("Đồ ngốc! Tệp tưởng tượng của bạn đã bị xóa!", {
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
                <th>Tiêu đề khóa học</th>
                <th className="w-100">Ảnh</th>
                <th>Nội dung khóa học</th>
                <th>Hành động</th>
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
                  Nội dung khóa học
                </a>
              </td>
              <td>
              <button onClick={() => clickDelete(favorite.course_id)} type="button" class="btn btn-danger">Bỏ thích</button>
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
