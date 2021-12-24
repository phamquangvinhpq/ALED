import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import UpdateKH from './UpdateKH';
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";

export default function AllKH() {
  const dispatch = useDispatch()
  const BaiGiang = useSelector(state => state)

  let history = useHistory();
  let id = useParams();


  const [isEnable, setIsEnable] = useState(0);
  const [giatriID, setgiatriID] = useState([])
  const [formdata, setformdata] = useState([])
  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 10;




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

  const backPageSt = async () => {
    const pg = pageSt - 1
    loadBaiGiang(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loadBaiGiang(pg)
    setPageSt(pg)
  }
  let user_id = localStorage.getItem("userid")

  const loadBaiGiang = async (pg = pageSt, pgsize = size) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `course/get-all-by-user?usersId=${user_id}&page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "GET_DATA", payload: result })
        setTotalCountSt(result.length)
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }


  const deletecourse = (value) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure you want to delete?`,
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
                  <td>{index + 1}</td>
                  <td>{value.courseName}</td>
                  <td>
                    {value.price}
                  </td>
                  <td>
                    <img src={value.image} style={{ height: 80 }} className="w-100" />
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

                  </td>
                </tr>
              )}


            </tbody>
          </table>
          <nav aria-label="Page navigation example">
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Previous</button>
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Next</button>
                </nav>
        </div>
      </div>
    </div>
  )
}
