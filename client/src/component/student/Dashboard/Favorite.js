import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import  { Redirect } from 'react-router-dom'
export default function Favorite() {
  const [listFavorite, setListFavorite] = useState([]);
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(0);
  let user_id = localStorage.getItem("userid")
  let history = useHistory();

  const loadFavorite = (page) => {
    fetch(`${DEFAULT_API}favorite?user_id=${user_id}&page=${page}`)
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
      title: "Bạn chắc chắn chứ?",
      text: "",
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
            swal("Bỏ yêu thích thành công", {
              icon: "success",
            });
            setStatus(status+1)
          })
          .catch(error => console.log('error', error));
      }
    });
  }

  useEffect(() => {
    loadFavorite(page);
  }, [status]);

  const chuyenTrang = (page) => {
    setPage(page);
    loadFavorite(page);
  };

  return (
    <div>
        <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th hidden>ID</th>
                <th>STT</th>
                <th>Tên Khóa Học</th>
                <th className="w-100">Ảnh</th>
                <th>Nội Dung</th>
                <th>Hành Động</th>
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
                  Xem Chi Tiết
                </a>
              </td>
              <td>
              <button onClick={() => clickDelete(favorite.course_id)} type="button" class="btn btn-danger">Bỏ Thích</button>
              </td>
            </tr>
            ))}
            </tbody>
          </table>
          <button className="btn btn-info btn-sm"
          disabled={page == 0 ? true : false}
          class="btn btn-primary"
          onClick={() => chuyenTrang(page - 1)}
          >
            Trước
          </button>
          <p class="btn btn-primary">{page+1}</p>
          <button className="btn btn-info btn-sm"
          class="btn btn-primary"
          onClick={() => chuyenTrang(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
