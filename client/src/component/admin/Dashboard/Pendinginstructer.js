import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

export default function Pendinginstructer() {

    const [isEnable, setIsEnable] = useState(0);
    const [giangVien, setGiangVien] = useState([])
    const [skill, setskill] = useState([])
    const [author, setAuthor] = useState([])
    const [ua, setUa] = useState([])
    const [pageSt, setPageSt] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    let size = 10;
    useEffect(() => {
        loadGiangVien()
    }, [
        isEnable
    ])

    const [sendEmail, setSendEmail] = useState({
        mailText: ''
    })

    const [searchemai, setSearchEmail] = useState('')

    const onInputEmailChange = (event) => {
        setSearchEmail(event.target.value);
    }



    const sendMailForIns = () => {


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": ua,
            "mail": sendEmail.mailText
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + "sendmail", requestOptions)
            .then(response => response.text())
            .then(result => {
                swal("Thành công", "Đã gửi thành công", "success")
            })
            .catch(error => console.log('error', error));

    }

    const onInputSendMail = (event) => {
        setSendEmail({
            mailText: event.target.value
        });
        console.log(event.target.value);
    }

    const backPageSt = async () => {
        const pg = pageSt - 1
        loadGiangVien(pg)
        setPageSt(pg)
    }

    const nextPageSt = async () => {
        const pg = pageSt + 1
        loadGiangVien(pg)
        setPageSt(pg)
    }


    const loadskill = async (value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `getskill/${value}`, requestOptions)

            .then(response => response.json())
            .then(result => {
                setskill(result)

            })
            .catch(error => console.log('error', error));


    }

    const loadAsk = (value) => {
        loadskill(value.id)

    }



    const loadUa = (value) => {
        setUa(value.email)
        console.log(value.email);
    }

    const loadGiangVien = (pg = pageSt, pgsize = size) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

            fetch(`${DEFAULT_API}` + `get-ins-no-isnable?pageno=${pg}&pagesize=${pgsize}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTotalCountSt(result.length)
                    setGiangVien(result)
                    console.log(searchemai)
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
                swal("Thông báo", "Đã kích hoạt", "success")
                setIsEnable(isEnable + 1)
            })
            .catch(error => console.log('error', error));
    }


    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Giảng viên đang chờ duyệt</h1>
                </div>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                                <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo email" name='email' onChange={onInputEmailChange} /> 
                                </div>
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
                                        {giangVien.filter((value)=>{
                                            if(searchemai == ""){
                                                return value
                                            }else if(value.email.toLowerCase().includes(searchemai.toLowerCase())){
                                                return value
                                            }
                                        }).map((value, index) =>
                                            <tr key={index}>
                                                <td>{index + 1}</td>
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
                                                    <a onClick={() => loadAsk(value)} className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1"> Xem kỹ năng </a>


                                                    <a onClick={() => huyActive(value)}
                                                        className="btn btn-success btn-block btn-xs"
                                                    >Chấp nhận</a>
                                                    <a onClick={() => loadUa(value)}
                                                        className="btn btn-danger btn-block btn-xs" data-toggle="modal" data-target="#sendMail"
                                                    >Gửi thông báo</a>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Trước</button>
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Sau</button>
                                </nav>
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
                            {skill.map((value) =>
                                <textarea rows="6" cols="60" disabled>
                                    {value.skill}
                                </textarea>
                            )}
                            <h4 className="modal-title">Ảnh</h4>
                            {skill.map((value) =>
                                <img
                                    src={value.photo} className="w-200" />



                            )}

                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="sendMail" className="modal fade" role="dialog">
                <div className="modal-dialog w-50-p">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Thông báo</h4>
                        </div>

                        <div className="modal-body">
                            <input type="text" rows="9" cols="70" className="form-control" name="email" value={"Gửi tới: " + ua} disabled />
                            <textarea rows="9" cols="70" name='mail' placeholder="Lời nhắn" onChange={onInputSendMail} />

                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" onClick={sendMailForIns} data-dismiss="modal">Gửi</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>

    )
}