import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
export default function PendingCourse() {


    const [isEnable, setIsEnable] = useState(0);
    const [khoahoc,setKhoaHoc] = useState([])
    const [pageSt, setPageSt] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    const [ua, setUa] = useState([])
    let size = 10;
    useEffect(()=> {
            loadkhoahoc()
    },[
        isEnable
    ])
    let history = useHistory()
    const [searchTitle, setSearchTitle] = useState('')

    const onInputTitleChange = (event) => {
        setSearchTitle(event.target.value);
    }
    const section = (value) => {
      if(isNaN(value.id)){
        history.push("/404")
        window.location.reload();
      }else{
        <NavLink to={`/admin/Section/${value.id}`} />
      }
    }


    const sendMail = async (value) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "email": value.email
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`${DEFAULT_API}` + `sendmailreport?userId=${value.author_id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
          swal("Thành công", "Đã gửi thành công", "success")
        })
        .catch(error => console.log('error', error));
    }


    const backPageSt = async () => {
      const pg = pageSt - 1
      loadkhoahoc(pg)
      setPageSt(pg)
    }
  
    const nextPageSt = async () => {
      const pg = pageSt + 1
      loadkhoahoc(pg)
      setPageSt(pg)
    }

    const loadkhoahoc = (pg = pageSt, pgsize = size) =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (searchTitle) {
          fetch(`${DEFAULT_API}` + `get-all-cou-no-act-by-title?courseName=${searchTitle}&page=${pg}&size=${pgsize}`, requestOptions)
              .then(response => response.json())
              .then(result => {
                  setTotalCountSt(result.length)
                  setKhoaHoc(result)
                  setIsEnable(isEnable + 1)
              })
              .catch(error => console.log('error', error));
      } else {
        fetch(`${DEFAULT_API}` + `course/cour-no-act?page=${pg}&size=${pgsize}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              setTotalCountSt(result.length)
                setKhoaHoc(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    
          }
    }

    const deletecourse = (value) => {
        swal({
          title: "Are you sure?",
          text: `Are you sure you want to cancel?`,
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
                .then(response => response.json())
                .then(result => {
                  console.log(result)
                  setIsEnable(isEnable + 1)
                })
                .catch(error => console.log('error', error));
              swal("đã hủy", {
                icon: "success",
              });
            }
          });
        }

        const Accept = async (value) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
        
            var raw = JSON.stringify({
              "id": value.id,
              "status": 1
            });
        
            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
        
            fetch(`${DEFAULT_API}` + "course/accept", requestOptions)
              .then(response => response.json())
              .then(result => {
                console.log(result)
                console.log("hiha:" +value.id);
                swal("Thông báo", "Đã duyệt", "success")
                setIsEnable(isEnable + 1)
              })
              .catch(error => console.log('error', error));
          }
          

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Các khóa học đang chờ duyệt</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo tiêu đề" name='email' onChange={onInputTitleChange} /> 
                                </div>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>SL</th>
                                        <th>Tiêu đề</th>
                                        <th>Giá</th>
                                        <th>Ảnh</th>
                                        <th>Danh mục</th>
                                        <th>Giảng viên</th>
                                        <th>Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {khoahoc.filter((value)=>{
                                            if(searchTitle == ""){
                                                return value
                                            }else if(value.courseName.toLowerCase().includes(searchTitle.toLowerCase())){
                                                return value
                                            }
                                        }).map((value,index)=>
                                         <tr key={index}>
                                         <td>{value.id}</td>
                                         <td>{value.courseName}</td>
                                         <td>
                                             {value.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}
                                         </td>
                                         <td>
                                             <img
                                                 src={value.image}
                                                 className="w-100" />
                                         </td>
                                         <td>
                                             {value.categoryName}
                                         </td>
                                         <td>
                                             {value.authorName}
                                         </td>
                                         <td>
                                             {/* <a href="#"
                                                className="btn btn-success btn-block btn-xs" target="_blank">See Course
                                                 Details</a> */}
                                             <NavLink to={`/admin/Section/${value.id}`} className="btn btn-info btn-block btn-xs" >Xem chi tiết nội dung khóa học</NavLink>
                                             <a onClick={() => Accept(value)}
                                                className="btn btn-success btn-block btn-xs"
                                                >Chập nhận</a>
                                             <a onClick={() => deletecourse(value)}
                                                className="btn btn-danger btn-block btn-xs"
                                                >Không chấp nhận</a>
                                                <a onClick={() => sendMail(value)}
                                                className="btn btn-danger btn-block btn-xs"
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
                        <h4 className="modal-title">Number Of Courses</h4>
                      </div>
                      <div className="modal-body">
                       

                       
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>



        </div>



    )
}