import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { Player } from 'video-react';
import swal from "sweetalert";

export default function Leson() {
  const [listSection, setListSection] = useState([]);
  const [video, setvideo] = useState([]);

  const [status, setStatus] = useState(0);
  const [selectedSection, setSelectedSection] = useState(-1);

  const [sectionId, setSectionId] = useState(-1);

  const [lession, setLession] = useState({
    name: "",
    linkVideo: "",
    section_id: selectedSection,
  });


  let id = useParams();
  const [giatriID, setgiatriID] = useState(-1)

  const getData = (value) => {
    setgiatriID(value.id);
    lession.name = value.name;
    console.log(value)
    lession.linkVideo = value.linkVideo;
    lession.section_id = value.selectedSection;
  }

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  useEffect(() => {
    loaddanhmuc();
    getLessionBySection();
    jquer();
  }, [status]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const changeHandler1 = (event) => {
    setSelectedFile1(event.target.files[0]);
  };


  const getLessionBySection = async () => {

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `${DEFAULT_API}` + "lession/find-all-by-section?sectionId=" + sectionId, requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvideo(result);
      })
      .catch((error) => console.log("error", error));
  };

  const tesst = (value) => {
    setSectionId(value.id)
    getLessionBySection();
    setStatus(status + 1)
  }



  const updateLession = () => {
    var regexKhoangTrang = /\S/;
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexName.test(lession.name)){
      swal("Thất bại", "Name chỉ được nhập chữ và không được bỏ trống", "warning")
    }else if(!regexKhoangTrang.test(lession.name)){
      swal("Thất bại", "Name không được bỏ trống", "warning")
    
    }else if(regexKitu.test(lession.name)){
      swal("Thất bại", "Name không được chứa kí tự", "warning")
    
    }else{
    var formdata = new FormData();
    formdata.append("id", giatriID);
    formdata.append("file", selectedFile1);
    formdata.append("name", lession.name);
    formdata.append("linkVideo", lession.linkVideo);
    formdata.append("type", "video/mp4");
    formdata.append("section_id", selectedSection);

    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };



    fetch(`${DEFAULT_API}` + "lession/", requestOptions)
      .then(response => response.text())
      .then((result) => {
        console.log("đã gọi api");
        setStatus(status + 1)
        console.log(result)
      })
      .catch(error => console.log('error', error)
      );
    }
  }


  const onChangeSection = (event) => {
    setSelectedSection(event.target.value);

  };



  const jquer = () => {

    $('#youtubeBox10').hide();
    $('#mp4Box10').hide();

    $('#lessonTypeSelect10').on('click', function () {
      if ($('#lessonTypeSelect10').val() == '') {
        $('#youtubeBox10').hide();
        $('#mp4Box10').hide();
      }
      else if ($('#lessonTypeSelect10').val() == 'video_mp410') {
        $('#youtubeBox10').hide();
        $('#mp4Box10').show();
      }
      else if ($('#lessonTypeSelect10').val() == 'video_youtube10') {
        $('#youtubeBox10').show();
        $('#mp4Box10').hide();
      }
    }
    );

    $('#youtubeBox').hide();
    $('#vimeoBox').hide();
    $('#mp4Box').hide();
    $('#durationBox').hide();
    $('#showMe').hide();

    $('#lessonTypeSelect').on('click', function () {
      if ($('#lessonTypeSelect').val() == '') {
        $('#youtubeBox').hide();
        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#durationBox').hide();
      } else if ($('#lessonTypeSelect').val() == 'video_youtube') {
        $('#youtubeBox').show();
        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'video_vimeo') {
        $('#youtubeBox').hide();
        $('#vimeoBox').show();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'video_mp4') {
        $('#youtubeBox').hide();
        $('#vimeoBox').hide();
        $('#mp4Box').show();
        $('#pdfBox').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'pdf') {
        $('#youtubeBox').hide();
        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').show();
        $('#durationBox').hide();
      }
    });



  }



  const loaddanhmuc = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/${id.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setListSection(result);
      })
      .catch((error) => console.log("error", error));
  };


  const addLession = () => {
    
    var regexKhoangTrang = /\S/;
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexName.test(lession.name)){
      swal("Thất bại", "Name chỉ được nhập chữ và không được bỏ trống", "warning")
    }else if(!regexKhoangTrang.test(lession.name)){
      swal("Thất bại", "Name không được bỏ trống", "warning")
    
    }else if(regexKitu.test(lession.name)){
      swal("Thất bại", "Name không được chứa kí tự", "warning")
    
    }else{
    var formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("name", lession.name);
    formdata.append("linkVideo", lession.linkVideo);
    formdata.append("type", "video/mp4");
    formdata.append("section_id", selectedSection);
 
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "lession", requestOptions)
      .then(response => response.text())
      .then(result => { setStatus(status + 1) })
      .catch(error => console.log('error', error));
  }
  };



  const deleteLession = (value) => {
    swal({
      title: "Are you sure?",
      text: `Are you sure you want to delete?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`${DEFAULT_API}` + "lession/" + value.id, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            setStatus(status + 1);
          })
          .catch((error) => console.log("error", error));
        swal("Đã xóa", {
          icon: "success",
        });
      }
    });
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setLession({
      ...lession,
      [name]: value,
    });
  };

  return (
    <div>
<div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Lession</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div className="nav-tabs-custom instructor-content-tab">
          <ul className="nav nav-tabs">
            <li>
              <NavLink
                to={`/admin/Section/${id.id}`}
                href="#tab_chapter"
                data-toggle="tab"
              >
                Chapter
              </NavLink>
            </li>
            <li className="active">
              <a href="#tab_lesson" data-toggle="tab">
                Lesson
              </a>
            </li>
          </ul>
          <div className="tab-pane" id="tab_lesson">
            <div className="box box-info pt_0">
              <div className="box-body">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                  <h3 className="sec_title">All Lessons</h3>
                  {listSection.map((value, index) =>
                    <div className="panel panel-default">
                      <div className="panel-heading" role="tab" id="headingTwo">
                        <h4 className="panel-title">
                          <a onClick={() => tesst(value)} className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href={`#ok` + index} aria-expanded="false" aria-controls="collapseTwo">
                            {value.name}
                          </a>
                        </h4>
                      </div>
                      <div id={`ok` + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="panel-body">
                          <div className="table-responsive">
                          <table className="table table-bordered table-striped" >
                              <thead>
                                <tr>
                                <th className="w-10-p">ID</th>
                                  <th className="w-40-p">Name</th>
                                  <th className="w-30-p">Lesson Section ID</th>
                                  <th className="w-15-p">Lesson Content</th>
                                  <th >Action </th>
                                </tr>
                              </thead>
                              <tbody>
                                {video.map((value, index) => (
                                  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.section_id}</td>
                                    <td>
                                      <a className="btn btn-block btn-warning btn-sm" data-toggle="modal" data-target="#myModalAllWatch0" onClick={() => getData(value)} >
                                        <i className="fa fa-video-camera" /> Watch Video
                                      </a>

                                    </td>
                                    <td>
                                     
                                      <a href className="btn btn-danger btn-sm" onClick={() => deleteLession(value)}>Delete</a>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
 
    <div>


      {/* model video */}
      <div
        id="myModalAllWatch0" className="modal"  aria-hidden="true"  >
        <div id="myForm" className="modal-dialog w-50-p" >
          <div className="modal-content">
            <form>
              <div >
                <ReactPlayer
                  controls
                  width="100%"
                  height="400px"
                  url={lession.linkVideo}
                />

              </div>
            </form>
            <div className="modal-footer">
              <button

                type="button"
                className="btn btn-default"
                data-dismiss="modal"

              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
    </div>
  );
}








