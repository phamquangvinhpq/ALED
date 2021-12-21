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
    var regexKhoangTrang = /\S/;
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;

    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexName.test(Section.namesection)){
      swal("Failed", "Name Only text can be entered and cannot be left blank", "warning")
    }else if(!regexKhoangTrang.test(Section.namesection)){
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
        console.log(result)
        alert("đã sửa")
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

<div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Chapter</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div className="nav-tabs-custom instructor-content-tab">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#tab_chapter" data-toggle="tab">Chapter</a></li>
            <li><NavLink to={`/admin/lession/${id.id}`} href="#tab_lesson" data-toggle="tab">Lesson</NavLink></li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="tab_chapter">
              <div className="box box-info pt_0">
                <div className="box-body">
                 
               

                  <h3 className="sec_title">All Chapters</h3>
                  <div className="table-responsive">
                    <table id className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>Serial</th>
                          <th>Chapter Title</th>
                         
                     
                        </tr>
                      </thead>
                      <tbody>
                        {DSsection.map((value, index) =>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.name}</td>
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
                        </div>
                    </div>
                </div>
            </section>
        </div>


    </div>

  )
}
