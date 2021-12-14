import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";


export default function Pendinginstructer() {

    const [isEnable, setIsEnable] = useState(0);
    const [giangVien,setGiangVien] = useState([])

    useEffect(() => {
        loadGiangVien()
    }, [
        isEnable
    ])

    const loadGiangVien = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        fetch(`${DEFAULT_API}` + `get-ins-no-isnable`, requestOptions)
          .then(response => response.json())
          .then(result => {
            setGiangVien(result)
            console.log(result)
          })
          .catch(error => console.log('error', error));
      }

    const huyActive = async (value) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
          "id": value.id,
          "isEnable": 1
        });
    
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(`${DEFAULT_API}` + "isenable", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            console.log("hiha:" +value.id);
            alert("đã kích hoạt")
            setIsEnable(isEnable + 1)
          })
          .catch(error => console.log('error', error));
      }


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Pending Instructer</h1>
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
                                        <th>STT</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {giangVien.map((value,index)=>
                                         <tr key={index}>
                                         <td>{value.id}</td>
                                         <td>{value.name}</td>
                                         <td>
                                         <img
                                                 src={value.image} className="w-100"/>             
                                         </td>
                                         <td>
                                         {value.email}
                                              </td>
                                         <td>
                                         {value.phone}
                                         </td>
                                         <td>
                                         {value.address}
                                         </td>
                                         <td>
                                             <a href="#"
                                                className="btn btn-success btn-block btn-xs" target="_blank">View Skill
                                               </a>
 
                                             <a onClick={() => huyActive(value)}
                                                className="btn btn-danger btn-block btn-xs"
                                                >Accept</a>
             
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