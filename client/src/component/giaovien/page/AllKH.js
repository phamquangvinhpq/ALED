import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import UpdateKH from './UpdateKH';
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";

export default function AllKH() {
  const dispatch  = useDispatch()
  const BaiGiang = useSelector(state =>state)

  let history = useHistory();
  let id = useParams();


  const [isEnable, setIsEnable] = useState(0);
  const [giatriID, setgiatriID] = useState([])
  const [formdata, setformdata] = useState([])





  useEffect(() => {

    loadBaiGiang();

  }, [
    isEnable, dispatch, useSelector
  ])



  const chuyentrangupdate = function (event, value, index) {
    let dulieu1 = "hello";
    <UpdateKH dulieu={dulieu1} />
    history.push(`/giangvien/UpdateKH/${value.id}`);
  }

  const chuyentrangSesion = function (event, value, index) {
    history.push(`/giangvien/Section/${value.id}`);
  }

  let user_id = localStorage.getItem("userid")

  const loadBaiGiang = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `course/user/${user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({type: "GET_DATA", payload: result})
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }


  const deletecourse = (value) => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc muốn xóa`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
          };

          fetch(`${DEFAULT_API}` + `course/delete/${value.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result)
              setIsEnable(isEnable + 1)
            })
            .catch(error => console.log('error', error));
          swal("đã xóa", {
            icon: "success",
          });
        }
      });

  };

 

  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Photo</th>
                <th>Description</th>
                <th className="w-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {BaiGiang.map((value, index) =>
                <tr key={index}>
                  <td>{value.id}</td>
                  <td>{value.courseName}</td>
                  <td>
                    {value.price}
                  </td>
                  <td>
                    <img src={value.image} className="w-100" />
                  </td>
                  <td>{value.description}</td>
                  <td>
                    <a onClick={
                      (event) => {
                        chuyentrangSesion(event, value, index)
                      }} className="btn btn-primary btn-sm btn-block">
                      Manage Content									</a>
                    <a onClick={
                      (event) => {
                        chuyentrangupdate(event, value, index)
                      }} className="btn btn-primary btn-sm btn-block">
                      Edit									</a>
                    <a href="" className="btn btn-danger btn-sm btn-block" onClick={() => deletecourse(value)}>
                      Delete										</a>
                  </td>
                </tr>
              )}


            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}