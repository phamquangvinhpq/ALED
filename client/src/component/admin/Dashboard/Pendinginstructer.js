import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";


export default function Pendinginstructer() {

    const [isEnable, setIsEnable] = useState(0);
    const [giangVien, setGiangVien] = useState([])
    const [skill, setskill] = useState([])

    useEffect(() => {
        loadGiangVien()
    }, [
        isEnable
    ])


    const loadskill = async (value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`${DEFAULT_API}` +`getskill/${value.id}`, requestOptions)
         
            .then(response => response.json())
            .then(result => {setskill(result)
            
        })
            .catch(error => console.log('error', error));
            console.log(value.id);

    }

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
                console.log("hiha:" + value.id);
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
                                            <th>Tên</th>
                                            <th>Ảnh</th>
                                            <th>Email</th>
                                            <th>Điện thoại</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {giangVien.map((value, index) =>
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{value.name}</td>
                                                <td>
                                                    <img
                                                        src={value.image} className="w-100" />
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
                                                    <a onClick={()=> loadskill(value)} className="btn btn-primary btn-xs btn-block" data-toggle="modal"  data-target="#enrolledCourses1"> Xem kỹ năng </a>


                                                    <a onClick={() => huyActive(value)}
                                                        className="btn btn-success btn-block btn-xs"
                                                    >Chấp nhận</a>

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

            <div id="enrolledCourses1" className="modal fade" role="dialog">
                <div className="modal-dialog w-50-p">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Kỹ năng</h4>
                        </div>
                        <div className="modal-body">
                        {skill.map((value,index) =>
                            <textarea rows="9" cols="70" disabled>
                               {value.skill}
                            </textarea>
)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}