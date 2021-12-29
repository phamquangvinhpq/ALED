import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";

export default function Users() {

    const [giangVien, setGiangVien] = useState([])
    const [isEnable, setIsEnable] = useState(0);


  useEffect(() => {
    loadGiangVien()
  }, [
      isEnable
  ])



  const huyActive = async (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "id": value.id,
      "status": value.status
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "status", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(value.status == 0){
          
          alert("đã kích hoạt lại")
        setIsEnable(isEnable + 1)
        }else{
          alert("đã tạm khóa")
          setIsEnable(isEnable + 1)
        }
      })
      .catch(error => console.log('error', error));
  }

  const loadGiangVien = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `get-hs-and-gv`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setGiangVien(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

    return (
        
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Users (Students / Instructors)</h1>
                </div>
                <div className="content-header-right">
                <NavLink to="/admin/adduser" className="btn btn-primary btn-sm">Thêm mới</NavLink>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width={50}>SL</th>
                                            <th>Ảnh</th>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Trạng thía</th>
                                            <th width={120}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {giangVien.map((value,index) =>
                                             <tr key={index}>
                                             <td>{value.id}</td>
                                             <td><img src={value.image} alt="" className="w-150" /></td>
                                             <td>{value.name}</td>
                                             <td>{value.email}</td>
                                             <td>
                                                 {value.status == 1 ? "Active" : "No-Active" } </td>
                                                 <td>
                                                <a  className="btn btn-warning btn-xs btn-block" onClick={() => huyActive(value)} >Thay đổi tranh thái</a>
                                                
                                            </td>
                                         </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}