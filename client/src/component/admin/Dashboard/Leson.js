import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { Player } from 'video-react';
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
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

  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 5;

  const backPageSt = async () => {
    const pg = pageSt - 1
    loaddanhmuc(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loaddanhmuc(pg)
    setPageSt(pg)
  }

  let id = useParams();
  localStorage.setItem("courseid",id.id);
  const [giatriID, setgiatriID] = useState(-1)

  const getData = (value) => {
    setgiatriID(value.id);
    lession.name = value.name;
    console.log(value)
    lession.linkVideo = value.linkVideo;
    lession.section_id = value.selectedSection;
  }
  let history = useHistory();
  var chek=isNaN(id.id);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  useEffect(() => {
    if(chek==true)
    {
      history.push("/404")
      window.location.reload();
    }
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
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(lession.name)){
      swal("Failed", "Tên không được để trống", "warning")
    
    }else if(regexKitu.test(lession.name)){
      swal("Failed", "Tên không được chứa kí tự đặc biệt", "warning")
    
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



  const loaddanhmuc = async (pg = pageSt, pgsize = size) => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/${id.id}?page=${pg}&size=${pgsize}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTotalCountSt(result.length)
        console.log(result);
        setListSection(result);
      })
      .catch((error) => console.log("error", error));
  };


  const addLession = () => {

    var regexKhoangTrang = /\S/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(lession.name)){
      swal("Failed", "Tên không được để trống", "warning")
    
    }else if(regexKitu.test(lession.name)){
      swal("Failed", "Tên không chứa kí tự đặc biệt", "warning")
    
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
      title: "Bạn chắc chứ ?",
      text: `Bạn có chắc là muốn xóa ?`,
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

        fetch(`${DEFAULT_API}` + "lession/admin/" + value.id, requestOptions)
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
                    <h1>Xem bài học</h1>
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
                Chương
              </NavLink>
            </li>
            <li className="active">
              <a href="#tab_lesson" data-toggle="tab">
                Bài học
              </a>
            </li>
          </ul>
          <div className="tab-pane" id="tab_lesson">
            <div className="box box-info pt_0">
              <div className="box-body">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                  <h3 className="sec_title">Tất cả các bài học</h3>
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
                                <th className="w-10-p">STT</th>
                                  <th className="w-40-p">Tên Bài Học</th>
                                  <th className="w-30-p">Tên Chương</th>
                                  <th className="w-15-p">Nội Dung</th>
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
                                      {value.type=="test" ?   <a className="btn btn-info "   href={`/exam/` + value.linkVideo} >
                                        <i  /> Xem bài thi
                                      </a> :  <a className="btn btn-block btn-warning btn-sm" data-toggle="modal" data-target="#myModalAllWatch0" onClick={() => getData(value)} >
                                        <i className="fa fa-video-camera" /> Xem
                                      </a>}
                                     

                                    </td>
                                    <td>
                                     
                                    
                                      <a href className="btn btn-danger btn-sm" onClick={() => deleteLession(value)}>Xóa</a>
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
              <nav aria-label="Page navigation example">
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Trước</button>
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Sau</button>
                </nav>
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
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
    </div>
  );
}








