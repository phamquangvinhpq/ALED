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


  const [giatriID, setgiatriID] = useState([])

  const [DSsection, setDSsection] = useState([])
  const [isEnable, setIsEnable] = useState(0);
  let id = useParams();

  useEffect(() => {

    loadsection();

  }, [
    isEnable
  ])

  const loadsection = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
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


  const addsection = () => {
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
        console.log(result)
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


  const deletesection = (value) => {
    swal({
      title: "Are you sure?",
      text: `Bạn có chắc muốn xóa`,
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
            .then(response => response.text())
            .then(result => {
              console.log(result)
              setIsEnable(isEnable + 1)
            })
            .catch(error => console.log('error', error));
          swal("đã xóa", {
            icon: "success",
          });
        }
      });

  };


  const updateSection = () => {

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
        console.log(result)
        alert("đã sửa")
        setIsEnable(isEnable + 1)
      })
      .catch(error => console.log('error', error));
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
                      <label className="col-sm-2 control-label">Chapter Order *</label>
                      <div className="col-sm-6">
                        <input type="text" autoComplete="off" className="form-control" name="chapter_order" defaultValue />
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
                          <th>Chapter Order</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DSsection.map((value, index) =>
                          <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>1</td>
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
