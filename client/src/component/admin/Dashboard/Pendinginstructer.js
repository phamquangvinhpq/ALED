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
    const [page, setPage] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    const [layValue,setLayValue] = useState('')
    let size = 10;
    useEffect(() => {
        loadGiangVien()
    }, [
        isEnable
    ])

    const [sendEmail, setSendEmail] = useState('')

    const [searchemai, setSearchEmail] = useState('')

    const onInputEmailChange = (event) => {
        setSearchEmail(event.target.value);
    }



    const sendMailForIns = () => {


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": ua,
            "mail": sendEmail
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

    const onChaneInputSendMail = (event) => {
        setLayValue(event.target.value)
        if(event.target.value==1){


            setSendEmail("Chào bạn ,\n"+"Chúng tôi đã nhận được thông báo ứng tuyển của bạn về việc đăng ký làm giảng viện tại website ALED \n"+
			"Sau khi xem xét kỹ lưỡng chúng tôi cảm thấy bạn có khả năng phù hợp với Website của chúng tôi\n"+
			"Vui lòng gửi CV đầy đủ về email của chúng tôi!!\n"+"CVbao gồm : 1 Bản CV đầy đủ về bản thân,CMT hoặc CCCD photo có công chứng,Bằng đại học hoặc các chứng chỉ liên quan photo có công chứng\n"+
            "Vui lòng trả lời lại email để xác nhận thông tin!!\n"+
			"Xin cảm ơn!!"
            );

        }else if(event.target.value==2){
            setSendEmail("Chào bạn,\n"+
			"Chúng tôi đã nhận được đầy đủ CV của bạn,"+
			"Đội ngũ tại ALED đã xem xét cụ thể. Chúng tôi cảm thấy khả năng của bạn phù hợp để làm giảng viên tại Website "+
			" Bạn có thể sử dụng tài khoản đã đăng ký sau khi nhận được email này!!\n"+
			"Tất cả các hoạt động của bạn sẽ phải tuẩn thủ các điều khoản ở mục đăng ký\n"+
			
			"Xin cảm ơn!!");
        }else{
            setSendEmail("Chào bạn ,\n"+
			"Chúng tôi đã nhận được thông báo ứng tuyển của bạn về việc đăng ký làm giảng viện tại website ALED."+
			" Sau khi xem xét kỹ lưỡng chúng tôi cảm thấy bạn chưa phù hợp với Website của chúng tôi. \n"+
			"Chúng tôi đánh giá cao khả năng của bạn.\n"+
             "Hy vọng chúng có thể hợp tác với bạn trong tương lai !!\n"+
			"ALED trân trọng !!!");
        }
        console.log(event.target.value);
    }


    const backPageSt = async () => {
        const pg = pageSt - 1
        loadGiangVien(pg)
        setPageSt(pg)
    }



    const nextPageSt = async () => {
        const pg =  pageSt + 1
        loadGiangVien(pg)
        setPageSt(pg)
        console.log(pg);
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
                                                        className="btn btn-info btn-block btn-xs" data-toggle="modal" data-target="#sendMail"
                                                    >Gửi thông báo</a>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt <= 0} onClick={backPageSt} >Trước</button>
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt/size)} onClick={nextPageSt} >Sau</button>
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
                            <input className="form-check-input" type="radio" name="flexRadioDefault" value={1} onChange={onChaneInputSendMail} id="flexRadioDefault1" /> Yêu cầu gửi CV
                            <input className="form-check-input1" type="radio" name="flexRadioDefault" value={2} onChange={onChaneInputSendMail}  id="flexRadioDefault1" /> Xác nhận giảng viên
                            <input className="form-check-input1" type="radio" name="flexRadioDefault" value={3} onChange={onChaneInputSendMail}  id="flexRadioDefault1" /> Từ chối
                            <br/>
                            <textarea rows="9" cols="70" name='mail' placeholder="Lời nhắn" disabled value={sendEmail} />
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