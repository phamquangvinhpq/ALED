import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Students() {

  const [giangVien, setGiangVien] = useState([])
  const [KhoaHoc,setKhoaHoc] = useState([])
  const [payment,setPayment] = useState([])
  useEffect(() => {
    loadGiangVien()
  }, [
  ])

  const loadBaiGiang = (value) => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `mycourse/${value.id}`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        setKhoaHoc(result) 
      console.log(result);})
      .catch(error => console.log('error', error));
  }

  const loadpayment = (value) => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `orders/${value.id}`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        setPayment(result) 
      console.log(result);})
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

    fetch(`${DEFAULT_API}` + `get-hs`, requestOptions)
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
              {KhoaHoc.map((value,index)=>
                <tr key={index}>
                <td>{value.id}</td>
                <td><img src={value.image} className="w-100" /></td>
                <td>{value.name}</td>
              
                <td>
                  <a href={`/ detail/${value.course}`} target="_blank" className="btn btn-info btn-sm"  >Course Detail</a>
                </td>
               
              </tr>
              )}
                
              
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
                    <th>Content</th>
                    <th>money</th>
                    <th>bank</th>
                    <th>Create Date</th>
                    <th>Status</th>
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
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>


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
                        {value.status == 1 ? "Active" : "No-Active" }  </td>
                        <td>
                        <a href className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1" onClick={() => loadBaiGiang(value)}>Enrolled Courses</a>
                    <a data-toggle="modal" data-target="#enrolledCourses2" className="btn btn-success btn-xs btn-block" onClick={() => loadpayment(value)} target="_blank">Payment
                      History</a>
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