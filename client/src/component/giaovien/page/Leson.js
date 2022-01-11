import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
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
    section_id: "",
  });

  
  let history = useHistory();
  let id = useParams();
  const [giatriID, setgiatriID] = useState(-1)

  const getData = (value) => {
    setgiatriID(value.id);
    lession.name = value.name;
    console.log(value)
    lession.linkVideo = value.linkVideo;
    lession.section_id = value.section_id;
  }

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  useEffect(() => {
    if(isNaN(id.id))
    {
      history.push("/404")
      window.location.reload();
    }
    checkkhoahocuser();
    getLessionBySection();
    jquer();
    loadbaithi();
  }, [status]);

  const changeHandler = (event) => {
    if(event.target.files[0].type != "video/mp4"){
      swal("Thất bại", "Chỉ được chọn file mp4", "warning")
      document.getElementById("uploadFile").value=""
    }else{
      setSelectedFile(event.target.files[0]);
    }
    
  };

  const changeHandler1 = (event) => {
    if(event.target.files[0].type != "video/mp4"){
      swal("Thất bại", "Chỉ được chọn file mp4", "warning")
      document.getElementsByName("uploadFile1").value=""
    }else{
      setSelectedFile1(event.target.files[0]);
    }
  };

  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 10;

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

  let user_id=localStorage.getItem("userid")

  const checkkhoahocuser = async () =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}`+`giangvien/Coursebyid/${user_id}/${id.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result==="no"){
          swal("Thông báo", "Bạn không có quyền truy cập vào khóa học này", "warning")
          history.push("/giangvien/AllCourses")
         
        }
        else{
          loaddanhmuc();
        }
      })
      .catch(error => console.log('error', error));
  }

  const xemThu = (id, demo) => {
    if (demo == 0) {
      demo = 1;
    } else {
      demo = 0;
    }

    console.log(demo);

    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}lession/updateXemThu?id=${id}&demo=${demo}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        swal("Thành Công","","success")
        getLessionBySection()
      })
      .catch((error) => console.log("error", error));
  };


  const updateLession = () => {
    var regexKhoangTrang = /\S/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(lession.name)){
      swal("Failed", "Tên không được để trống", "warning")
    
    }else if(regexKitu.test(lession.name)){
      swal("Failed", "Tên không chứ kí tự đặc biệt", "warning")
    
    }else{
    var formdata = new FormData();
    formdata.append("id", giatriID);
    formdata.append("file", selectedFile1);
    formdata.append("name", lession.name);
    formdata.append("linkVideo", lession.linkVideo);
    formdata.append("type", "video/mp4");
    formdata.append("section_id",  lession.section_id);
    formdata.append("Courseid",  lession.section_id);


    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };



    fetch(`${DEFAULT_API}` + "lession/", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.loicode == -1) {
          swal("Thất Bại",result.message,"error")
        } else {
          swal("Thành Công","Cập nhật bài học thành công","success")
        }
      })
      .catch(error => console.log('error', error)
      );
    }
  }


  const onChangeSection = (event) => {
    setSelectedSection(event.target.value);
    console.log(event.target.value);
    setStatus(status+1)

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
    $('#kiemtra').hide();

    $('#lessonTypeSelect').on('click', function () {
      if ($('#lessonTypeSelect').val() == '') {
        $('#youtubeBox').hide();
        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#kiemtra').hide();
        $('#durationBox').hide();
      } else if ($('#lessonTypeSelect').val() == 'video_youtube') {
        $('#youtubeBox').show();
        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#kiemtra').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'kiem_tra') {
        $('#kiemtra').show();

        $('#vimeoBox').hide();
        $('#mp4Box').hide();
        $('#pdfBox').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'video_mp4') {
        $('#youtubeBox').hide();
        $('#kiemtra').hide();
        $('#vimeoBox').hide();
        $('#mp4Box').show();
        $('#pdfBox').hide();
        $('#durationBox').show();
      } else if ($('#lessonTypeSelect').val() == 'pdf') {
        $('#youtubeBox').hide();
        $('#vimeoBox').hide();
        $('#kiemtra').hide();
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
      swal("Failed", "Tên không chứ ký tự đặc biệt", "warning")
    
    }else{
    var formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("name", lession.name);
    formdata.append("section_id", selectedSection);
    formdata.append("Courseid",  id.id);
    formdata.append("linkVideo",  selectedSectionbaithi);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "lession", requestOptions)
      .then(response => response.text())
      .then(result => {
        swal("Thông báo", "Thêm thành công", "success")
         setStatus(status + 1) })
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

        fetch(`${DEFAULT_API}` + "lession/" + value.id, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.loicode == -1) {
              swal("Thất Bại", result.message, "error")
            } else {
              swal("Thành Công", "", "success")
              setStatus(status + 1);
            }
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
    console.log(event.target.value);
  };



// -------------------------------------------------------------------------------------------
const [danhsachbaithi, setdanhsachbaithi] = useState([])

const [selectedSectionbaithi, setSelectedSectionbaithi] = useState(-1);



// -----------------------------------------------------------
const loadbaithi = () =>{
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`http://localhost:8080/api/getexambyid/`+selectedSection, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      setdanhsachbaithi(result)
    }
      )
    .catch(error => console.log('error', error));
}

const onChangeSectionbaithi = (event) => {
  setSelectedSectionbaithi(event.target.value);
  document.getElementById("title").value="bài kiểm tra"
};




  return (
    <div>
      <div className="col-md-9">
        <div className="nav-tabs-custom instructor-content-tab">
          <ul className="nav nav-tabs">
            <li>

              <NavLink
                to={`/giangvien/Section/${id.id}`}
                href="#tab_chapter"
                data-toggle="tab"
              >
                Chương
              </NavLink>
            </li>
            <li className="active">
              <a href="#tab_lesson" data-toggle="tab">
                Video
              </a>
            </li>
          </ul>
          <div className="tab-pane" id="tab_lesson">
            <div className="box box-info pt_0">
              <div className="box-body">
                <h3 className="sec_title mt_0">Thêm </h3>
                <form
                  action=""
                  className="form-horizontal"
                  encType="multipart/form-data"
                  method="post"
                  acceptCharset="utf-8"
                >
                  <div className="form-group">
                    <label className="col-sm-3 control-label">
                      Chọn chương *
                    </label>
                    <div className="col-sm-6">
                      <select
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="namesection"
                        value={selectedSection}
                        onChange={onChangeSection}
                      >
                        <option>-- Chọn danh mục --</option>

                        {listSection.map((value, index) => {
                          return (
                            <option value={value.id} key={index}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>

                      
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3 control-label">
                      Tên video *
                    </label>
                    <div className="col-sm-6">
                      <input
                      id="title"
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="name"
                        onChange={onInputChange}
                      />
                    </div>
                  </div>


                  <div>
                    <div className="form-group">
                      <label className="col-sm-3 control-label">
                        Thể loại video *
                      </label>
                      <div className="col-sm-6">
                        <select
                          name="lesson_type"
                          className="form-control select2 w-100-p"
                          id="lessonTypeSelect"
                        >
                          <option value="" >
                            Chọn thể loại
                          </option>
                          <option value="video_youtube">Video (YouTube)</option>

                          <option value="video_mp4">File</option>

                          <option value="kiem_tra">bài kiểm tra</option>

                        </select>
                      </div>
                    </div>
                    <div className="form-group" id="youtubeBox">
                      <label className="col-sm-3 control-label">
                        Đường dẫn Youtube
                      </label>
                      <div className="col-sm-6">
                       <h4>đang cập nhập</h4>
                      </div>
                    </div>
                    <div className="form-group" id="kiemtra">
                      <label className="col-sm-3 control-label">
                      Thêm bài kiểm tra
                      </label>
                      <div className="col-sm-6">
                      <select
                        type="text"
                        autoComplete="off"
                        className="form-control"
                        name="namesection"
                        value={selectedSectionbaithi}
                        onChange={onChangeSectionbaithi}
                      >
                        <option>-- Select Category --</option>

                        {danhsachbaithi.map((value, index) => {
                          return (
                            <option value={value.id} defaultValue={value.title} key={index}>
                              {value.title}
                            </option>
                          );
                        })}
                      </select>
                       <a href="" data-toggle="modal" data-target="#exampleModalCenter">thêm bài kiểm tra</a>
                      </div>
                    </div>
                    <div className="form-group" id="mp4Box">
                      <label className="col-sm-3 control-label">
                        Tải File
                      </label>
                      <div className="col-sm-6 pt_5">
                        <input type="file" name="lesson_mp4" id="uploadFile" accept="video/*" onChange={changeHandler} /><span className="c-red">
                          (Chỉ chọn dạng Mp4)</span>
                      </div>
                    </div>

                  </div>

                  <div className="form-group">
                    <label className="col-sm-3 control-label" />
                    <div className="col-sm-6">
                      <button
                        type="button"
                        onClick={addLession}
                        className="btn btn-success pull-left"
                        name="form1"
                      >
                        Đồng ý
                      </button>
                    </div>
                  </div>
                </form>

                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="false">
                  <h3 className="sec_title">Tất cả bài học</h3>
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
                                  <th className="w-30-p">Xem Thử</th>
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
                                    <td>{value.demo == 1 ? 
                                      <FaVideo onClick={() => xemThu(value.id, value.demo)} /> : <FaVideoSlash  onClick={() => xemThu(value.id, value.demo)}/>}</td>
                                    <td>{value.section_id}</td>
                                    <td>
                                      <a className="btn btn-block btn-warning btn-sm" data-toggle="modal" data-target="#myModalAllWatch0" onClick={() => getData(value)} >
                                        <i className="fa fa-video-camera" /> Xem
                                      </a>

                                    </td>
                                    <td>
                                      <a
                                        href
                                        className="btn btn-primary btn-sm"
                                        data-target="#add-author" data-toggle="modal"
                                        onClick={() => getData(value)}
                                      >
                                        Sửa
                                      </a>
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
      {/* model sửa  */}
      <div className="modal" id="add-author" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
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
              <h4 className="modal-title">Sửa Bài Học</h4>
            </div>
            <div className="modal-body">
              <form className="form-horizontal"
                encType="multipart/form-data"
                acceptCharset="utf-8">
                <div className="form-group mb_5 ovh">
                  {/* <label

                    className="col-sm-4 control-label pt_5"
                  >
                    Select Chapter *
                  </label> */}
                  {/* <div className="col-sm-8">
                    <select
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="namesection"
                      onChange={onChangeSection}
                    >
                      <option>{selectedSection}</option>

                      {listSection.map((value, index) => {
                        return (
                          <option value={value.id} key={index}>
                            {value.name}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                </div>


                <div className="form-group mb_5 ovh">
                  <label

                    className="col-sm-4 control-label pt_5"
                  >
                    Tên bài học *
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="name"
                      onChange={onInputChange}
                      value={lession.name}
                    />
                  </div>
                </div>
                

                <div className="form-group mb_5 ovh">
                  <label className="col-sm-4 control-label">
                    Thể loại bài học *
                  </label>
                  <div className="col-sm-8">
                    <select
                      name="lesson_type"
                      className="form-control select2 w-100-p"
                      id="lessonTypeSelect10"
                    >
                      <option value="" >
                        Chọn thể loại
                      </option>
                      <option value="video_youtube10">
                        Video (YouTube)
                      </option>
                      <option value="video_mp410">File</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" id="youtubeBox10">
                  <label className="col-sm-4 control-label pt_5">
                    Bài học từ Youtbe
                  </label>
                  <div className="col-sm-8">
                  <h4>đang cập nhập</h4>
                  </div>
                </div>
                <div className="form-group" id="mp4Box10">
                  <label className="col-sm-4 control-label pt_5">
                    Tải File
                  </label>
                  <div className="col-sm-8">
                    <input type="file" name="lesson_mp4" id="uploadFile1" accept="video/*" onChange={changeHandler1} /><span className="c-red">(
                      Chỉ dùng định dạng Mp4)</span>
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
                    onClick={updateLession}
                  >
                    Cập nhật
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
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>


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



                      {/* model thêm bài thi  */}

                      <div>

  {/* Modal */}
  <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          ...
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>


{/* tạo 1 trang tạo bài thi, hiển thị table các bài thi, có nút add thêm bài thi , ở trang lession sẽ hiển thị cái chọn 
type là bài thi thì sẽ chọn bài thi hoặc là thêm bào thi mới thêm xong sẽ lưu lại xuống lession */}

    </div>
  );
}








