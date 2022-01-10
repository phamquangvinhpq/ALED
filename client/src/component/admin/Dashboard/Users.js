import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
export default function Users() {

    const [giangVien, setGiangVien] = useState([])
    const [isEnable, setIsEnable] = useState(0);
    const [pageSt, setPageSt] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    let size = 10;
    const [searchemai, setSearchEmail] = useState('')

    const onInputEmailChange = (event) => {
        setSearchEmail(event.target.value);
    }

  useEffect(() => {
    loadGiangVien()
  }, [
      isEnable
  ])


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
          swal("Thông báo", "Đã kích hoạt lại tài khoản", "success")
        setIsEnable(isEnable + 1)
        }else{
          swal("Thông báo", "Đã tạm khóa lại tài khoản", "success")
          setIsEnable(isEnable + 1)
        }
      })
      .catch(error => console.log('error', error));
  }

  const loadGiangVien = (pg = pageSt, pgsize = size) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
if (searchemai) {
            fetch(`${DEFAULT_API}` + `getallnisbyemail??email=${searchemai}&page=${pg}&size=${pgsize}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setTotalCountSt(result.length)
                    setGiangVien(result)
                    console.log("result123")
                    setIsEnable(isEnable + 1)
                })
                .catch(error => console.log('error', error));
        } else {
    fetch(`${DEFAULT_API}` + `get-hs-and-gv?pageno=${pg}&pagesize=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCountSt(result.length)
        setGiangVien(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
    }
  }

    return (
        
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Tất cả người dùng (Sinh Viên / Giảng viên)</h1>
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
                            <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo email" name='email' onChange={onInputEmailChange} /> 
                                </div>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width={50}>SL</th>
                                            <th>Ảnh</th>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Trạng thái</th>
                                            <th width={120}>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {giangVien.filter((value)=>{
                                            if(searchemai == ""){
                                                return value
                                            }else if(value.email.toLowerCase().includes(searchemai.toLowerCase())){
                                                return value
                                            }
                                        }).map((value,index) =>
                                             <tr key={index}>
                                             <td>{value.id}</td>
                                             <td><img src={value.image} alt="" className="w-150" /></td>
                                             <td>{value.name}</td>
                                             <td>{value.email}</td>
                                             <td>
                                                 {value.status == 1 ? "Hoạt động" : "Dừng hoạt động" } </td>
                                                 <td>
                                                <a  className="btn btn-warning btn-xs btn-block" onClick={() => huyActive(value)} >Thay đổi tranh thái</a>
                                                
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
        </div>

    )
}