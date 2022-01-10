import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Instructors() {
  const [khoaHoc, setKhoaHoc] = useState([])
  const [giangVien, setGiangVien] = useState([])
  let size = 10;
  const [layID, setLayID] = useState({
    id: ""
  })
  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  const [pageCr, setPageCr] = useState(0);
  const [totalCountCr, setTotalCountCr] = useState(0)
  const [searchemai, setSearchEmail] = useState('')
  const [isEnable, setIsEnable] = useState(0);
    const onInputEmailChange = (event) => {
        setSearchEmail(event.target.value);
    }
  useEffect(() => {
    loadGiangVien()
  }, [
    isEnable
  ])

  const layid = (value) => {
    layID.id = value.id
    loadBaiGiang(value.id)
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

  const backPageCr = async () => {
    const pg = pageCr - 1
    loadBaiGiang(layID.id, pg)
    setPageCr(pg)
  }

  const nextPageCr = async () => {
    const pg = pageCr + 1
    loadBaiGiang(layID.id, pg)
    setPageCr(pg)
  }

  const loadBaiGiang = (value, pg = pageCr, pgsize = size) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` + `course/user/${value}?page=${pg}&size=${size}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCountCr(result.length)
        setKhoaHoc(result)
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
    fetch(`${DEFAULT_API}` + `get-gv?pageno=${pg}&pagesize=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setGiangVien(result)
        setTotalCountSt(result.length)
      })
      .catch(error => console.log('error', error));
    }
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="content-header-left">
          <h1>Xem Tất cả Giảng viên</h1>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="box box-info">
              <div className="box-body table-responsive">


                <div id="enrolledCourses1" className="modal fade" role="dialog">
                  <div className="modal-dialog w-50-p">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Số lượng khóa học</h4>
                      </div>
                      <div className="modal-body">
                        <table className="table table-bordered t3">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Tiêu đề</th>
                              <th>Giá</th>
                              <th>Ảnh</th>
                              <th>Mô tả</th>
                            </tr>
                          </thead>
                          <tbody>
                            {khoaHoc.map((value, index) =>
                              <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{value.courseName}</td>
                                <td>
                                  {value.price}
                                </td>
                                <td>
                                  <img src={value.image} className="w-100" />
                                </td>
                                <td>{value.description}</td>

                              </tr>
                            )}
                             <nav aria-label="Page navigation example">
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr == 0} onClick={backPageCr} >Trước</button>
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr >= Math.ceil(totalCountCr / size)} onClick={nextPageCr} >Sau</button>
                            </nav>
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo email" name='email' onChange={onInputEmailChange} /> 
                                </div>

                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th width={50}>STT</th>
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
                                        }).map((value, index) =>
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td>
                          <img src={value.image} alt="" className="w-150" />
                        </td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>
                          {value.status == 1 ? "Active" : "No-Active"}</td>
                        <td>
                          <a href className="btn btn-primary btn-xs btn-block" onClick={() => loadBaiGiang(value)} data-toggle="modal" data-target="#enrolledCourses1"> Xem khóa học </a>
                          <a href className="btn btn-primary btn-xs btn-block" onClick={() => layid(value)} data-toggle="modal" data-target="#enrolledCourses1"> Hiển thị Khóa học </a>


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
        </div>
      </section>
    </div>

  )
}