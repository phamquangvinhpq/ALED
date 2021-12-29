import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Students() {

  const [giangVien, setGiangVien] = useState([])
  const [KhoaHoc, setKhoaHoc] = useState([])
  const [payment, setPayment] = useState([])
  const [layID, setLayID] = useState({
    id: ""
  })


  useEffect(() => {
    loadGiangVien()
  }, [
  ])
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  let size = 10;

  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  const [pageCr, setPageCr] = useState(0);
  const [totalCountCr, setTotalCountCr] = useState(0)

  const layid = (value) => {
    layID.id = value.id
    console.log(value.id);
    loadpayment(value.id)
    loadBaiGiang(value.id)
  }

  const loadBaiGiang = (value, pg = pageCr, pgsize = size) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `mycourse/${value}?page=${pg}&size=${size}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(layID);
        setTotalCountCr(result.length)
        setKhoaHoc(result)
      })
      .catch(error => console.log('error', error));
  }

  const nextPagePay = async () => {
    const pg = page + 1
    loadpayment(layID.id, pg)
    setPage(pg)
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

  const backPagePay = async () => {
    const pg = page - 1
    loadpayment(layID.id, pg)
    setPage(pg)
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

  const loadpayment = (value, pg = page, pgsize = size) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `orders/user/${value}?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCount(result.length)
        setPayment(result)
          ;
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

    fetch(`${DEFAULT_API}` + `get-hs?pageno=${pg}&pagesize=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCountSt(result.length)
        setGiangVien(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div className="content-wrapper">
  <section className="content-header">
    <div className="content-header-left">
      <h1>View Students</h1>
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
                    <h4 className="modal-title">Enrolled Courses</h4>
                  </div>
                  <div className="modal-body">
                  <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tiêu đề khóa học</th>
                <th>Chi tiết khóa học</th>
             
              </tr>
            </thead>
            <tbody>
              {KhoaHoc.map((value,index)=>
                <tr key={index}>
                <td>{value.id}</td>
                <td><img src={value.image} className="w-100" /></td>
                <td>{value.name}</td>
              
                <td>
                  <a href={`/Detail/${value.course}`} target="_blank" className="btn btn-info btn-sm"  >Chi tiết khóa học</a>
                </td>
               
              </tr>
              )}
                
              
            </tbody>
          </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>

      <section className="content-header">
        <div className="content-header-left">
          <h1>View Students</h1>
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
                        <h4 className="modal-title">Enrolled Courses</h4>
                      </div>
                      <div className="modal-body">
                        <table className="table table-bordered t3">
                          <thead>
                            <tr>
                              <th>Serial</th>
                              <th>Thumbnail</th>
                              <th>Course Title</th>
                              <th>Course Detail</th>

                            </tr>
                          </thead>
                          <tbody>
                            {KhoaHoc.map((value, index) =>
                              <tr key={index}>
                                <td>{value.id}</td>
                                <td><img src={value.image} className="w-100" /></td>
                                <td>{value.name}</td>

                                <td>
                                  <a href={`/ detail/${value.course}`} target="_blank" className="btn btn-info btn-sm"  >Course Detail</a>
                                </td>

                              </tr>
                            )}

                            <nav aria-label="Page navigation example">
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr == 0} onClick={backPageCr} >Previous</button>
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr >= Math.ceil(totalCountCr / size)} onClick={nextPageCr} >Next</button>
                            </nav>
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
                </div>


            <div id="enrolledCourses2" className="modal fade" role="dialog">
              <div className="modal-dialog w-50-p">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">×</button>
                    <h4 className="modal-title">Payment Details</h4>
                  </div>
                  <div className="modal-body">
                  <table className="table table-bordered t3">
                <thead>
                  <tr>
                  <th>STT</th>
                    <th>Nội dung</th>
                    <th>Tiền</th>
                    <th>Ngân hàng</th>
                    <th>Ngày tạo</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {payment.map((value,index)=>
                    <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.mota}</td>
                    <td>{value.monny}</td>
                    <td>{value.bank}</td>
                    <td>{value.createDate}</td>
                    <td> {value.status == 0 ? "Completed" : "Uncompleted" }</td>
                </tr>
                  )}
                  
                </tbody>
              </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>

                <div id="enrolledCourses2" className="modal fade" role="dialog">
                  <div className="modal-dialog w-50-p">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Payment Details</h4>
                      </div>
                      <div className="modal-body">
                        <table className="table table-bordered t3">
                          <thead>
                            <tr>
                              <th>STT</th>
                              <th>Content</th>
                              <th>money</th>
                              <th>bank</th>
                              <th>Create Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payment.map((value, index) =>
                              <tr key={index}>
                                <td>{value.id}</td>
                                <td>{value.mota}</td>
                                <td>{value.monny}</td>
                                <td>{value.bank}</td>
                                <td>{value.createDate}</td>
                                <td> {value.status == 0 ? "Completed" : "Uncompleted"}</td>
                              </tr>
                            )}
                            <nav aria-label="Page navigation example">
                              <button type="button" class="btn btn-outline-primary" disabled={page == 0} onClick={backPagePay} >Previous</button>
                              <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount / size)} onClick={nextPagePay} >Next</button>
                            </nav>
                          </tbody>
                        </table>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>

                  </div>
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
              {giangVien.map((value, index) =>
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th width={50}>SL</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th width={120}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {giangVien.map((value, index) =>
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td><img src={value.image} alt="" className="w-150" /></td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>
                          {value.status == 1 ? "Active" : "No-Active"}  </td>
                        <td>
                        <a href className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1" onClick={() => loadBaiGiang(value)}>Các khóa học đã đang ký</a>
                    <a data-toggle="modal" data-target="#enrolledCourses2" className="btn btn-success btn-xs btn-block" onClick={() => loadpayment(value)} target="_blank">Lịch sử thanh toán</a>
                          <a href className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1" onClick={() => layid(value)}>Enrolled Courses</a>
                          <a data-toggle="modal" data-target="#enrolledCourses2" className="btn btn-success btn-xs btn-block" onClick={() => layid(value)} target="_blank">Payment
                            History</a>
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