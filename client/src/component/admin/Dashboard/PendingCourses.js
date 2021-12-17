import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

export default function PendingCourse() {


    const [isEnable, setIsEnable] = useState(0);
    const [khoahoc,setKhoaHoc] = useState([])
    useEffect(()=> {
            loadkhoahoc()
    },[
        isEnable
    ])

    const loadkhoahoc = () =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `course/cour-no-act`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setKhoaHoc(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    

    }

    const deletecourse = (value) => {
        swal({
          title: "Are you sure?",
          text: `Bạn có chắc muốn hủy`,
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
                alert("đã duyệt")
                setIsEnable(isEnable + 1)
              })
              .catch(error => console.log('error', error));
          }
          

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Pending Courses</h1>
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
                                        <th>SL</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Photo</th>
                                        <th>Category</th>
                                        <th>Instructor</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {khoahoc.map((value,index)=>
                                         <tr key={index}>
                                         <td>{value.id}</td>
                                         <td>{value.courseName}</td>
                                         <td>
                                             {value.price}
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
                                             <NavLink to={`/admin/Section/${value.id}`} className="btn btn-info btn-block btn-xs" >See Course
                                                        Content Details</NavLink>
                                             <a onClick={() => Accept(value)}
                                                className="btn btn-danger btn-block btn-xs"
                                                >Accept</a>
                                             <a onClick={() => deletecourse(value)}
                                                className="btn btn-success btn-block btn-xs"
                                                >Cancel</a>
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