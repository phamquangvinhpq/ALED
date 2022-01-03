import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";



export default function Section() {

  const [Section, setSection] = useState({
    namesection: "",
    course_id: ""
  })


  // check xem thằng giảng viên này có id khóa học này không 

  


  const [giatriID, setgiatriID] = useState([])

  const [DSsection, setDSsection] = useState([])
  const [isEnable, setIsEnable] = useState(0);
  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 10;
  let id = useParams();
  const backPageSt = async () => {
    const pg = pageSt - 1
    loadsection(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loadsection(pg)
    setPageSt(pg)
  }
  useEffect(() => {


    checkkhoahocuser();

  }, [
    isEnable
  ])

  const loadsection = async (pg = pageSt, pgsize = size) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/${id.id}?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCountSt(result.length)
        setDSsection(result)

      })
      .catch(error => console.log('error', error));
  }
  let history = useHistory();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setSection({
      ...Section,
      [name]: value,

    });
    
  }
  let user_id=localStorage.getItem("userid")

  const addsection = () => {
    var regexKhoangTrang = /\S/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(Section.namesection)){
      swal("Failed", "Name not be empty", "warning")
    
    }else if(regexKitu.test(Section.namesection)){
      swal("Failed", "Name must not contain the character", "warning")
    
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": Section.namesection,
      "course_id": id.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "giangvien/Section/", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.loicode==-1){
          swal("nhập đầy đủ thông tin", {
            text: `yêu cầu name ` + " " + result.details ,
             icon: "warning",
          });
         
        }else{
          alert("thêm thành công")
          setIsEnable(isEnable + 1)
        }
       
      })
      .catch(error => console.log('error', error));
    }
  }

  const checkkhoahocuser = async () =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` +`giangvien/Coursebyid/${user_id}/${id.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result==="no"){
          alert("you do not have permission to access this course")
          history.push("/giangvien/AllCourses")
         
        }
        else{
          loadsection();
        }
      })
      .catch(error => console.log('error', error));
  }



  const deletesection = (value) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure you want to delete?`,
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

          fetch(`${DEFAULT_API}` + `giangvien/Section/${value.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              if(result.loicode == -1 ){
                swal("the list has courses", {
                });
              }
              else{
                swal("deleted", {
                  icon: "success",
                });
                setIsEnable(isEnable + 1)
              }
             
            })
            .catch(error => console.log('error', error));
       
        }
      });

  };


  const updateSection = () => {
    var regexKhoangTrang = /\S/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(Section.namesection)){
      swal("Failed", "Name not be empty", "warning")
    
    }else if(regexKitu.test(Section.namesection)){
      swal("Failed", "Name must not contain the character", "warning")
    
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": giatriID,
      "name": Section.namesection,
      "course_id": id.id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "giangvien/Section/", requestOptions)
      .then(response => response.text())
      .then(result => {
       
          setIsEnable(isEnable + 1)
        
      })
      .catch(error => console.log('error', error));
    }
  }

  const layid = (value) => {
    setgiatriID(value.id)
    Section.namesection = value.name
  }

  return (
    <div>
      <div className="col-md-9">
        <div className="nav-tabs-custom instructor-content-tab">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#tab_chapter" data-toggle="tab">Chapter</a></li>
            <li><NavLink to={`/giangvien/Lesson/${id.id}`} href="#tab_lesson" data-toggle="tab">Lesson</NavLink></li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="tab_chapter">
              <div className="box box-info pt_0">
                <div className="box-body">
                  <h3 className="sec_title mt_0">Add Chapter</h3>
                  <form className="form-horizontal" >

                    <div className="form-group">
                      <label className="col-sm-2 control-label">Chapter Title *</label>
                      <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="namesection" onChange={onInputChange} />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="col-sm-2 control-label" />
                      <div className="col-sm-6">

                        <button type="button" name="button" onClick={addsection} className="btn btn-success pull-left">submit</button>
                      </div>
                    </div>

                  </form>

                  <h3 className="sec_title">All Chapters</h3>
                  <div className="table-responsive">
                    <table id className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Serial</th>
                          <th>Chapter Title</th>
                         
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DSsection.map((value, index) =>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.name}</td>
                            
                            <td>
                              <a
                                href
                                className="btn btn-primary btn-sm"
                                data-target="#myModal4" data-toggle="modal"
                                onClick={() => layid(value)}
                              >
                                Edit
                              </a>
                              <a className="btn btn-danger btn-sm" onClick={() => deletesection(value)}>Delete</a>
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
          </div>
        </div>
      </div>

      <div className="modal" id="myModal4" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
        <div className="modal-dialog w-60-p">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                ×
              </button>
              <h4 className="modal-title">Edit Lesson</h4>
            </div>
            <div className="modal-body">
              <form className="form-horizontal"
                encType="multipart/form-data"

                acceptCharset="utf-8">
                <div className="form-group mb_5 ovh">
                  <label

                    className="col-sm-4 control-label pt_5"
                  >
                    Lesson Name *
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="namesection"
                      onChange={onInputChange}
                      value={Section.namesection}
                    />
                  </div>
                </div>
              </form>
              <div className="form-group mb_5 ovh">
                <label className="col-sm-4 control-label" />
                <div className="col-sm-8">
                  <button
                    type="submit"
                    className="btn btn-success pull-left"
                    name="form1"
                    onClick={updateSection}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
