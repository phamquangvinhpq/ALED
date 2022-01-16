import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { DEFAULT_API } from "../../../conf/env";
import { useHistory } from "react-router-dom";

export default function Courvideo() {
  const [listSection, setListSection] = useState([]);
  const [video, setvideo] = useState([]);
  const [status, setStatus] = useState(0);
  const [sectionId, setSectionId] = useState(-1);
  const [checked, setChecked] = useState(false);

  const [lession, setLession] = useState({
    linkVideo: "https://www.youtube.com/watch?v=eybyQcXUdzM",

  });

  let id = useParams();
  let history = useHistory();
  const user_id = localStorage.getItem("userid");

  const [lessionId, setLesssionId] = useState(-1);
  const [listNote, setListNote] = useState([]);
  const [listQA, setListQA] = useState([]);
  const [contentMess, setContentMess] = useState({
    user_id: user_id,
    course_id: id.id,
    people: 0,
  });

  const [note, setNote] = useState({
    users_id: user_id,
  });

  const handleChangeNote = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNote((values) => ({ ...values, [name]: value }));
    console.log(note)
  };

  const editNoteClick = (value) => {
    setNote((values) => ({ ...values, note: value.note, id: value.id }));
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContentMess((values) => ({ ...values, [name]: value }));
  };

  const sendMess = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(contentMess);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `contentqa/student`, requestOptions)
      .then(response => response.text())
      .then(result => loadQA())
      .catch(error => console.log('error', error));
    setContentMess((values) => ({
      ...values,
      content: ""
    }));
  }

  const tinNhan = (value) => {
    if (value.people === 1) {
      return (
        <li className="clearfix">
          <div className="message-data text-right">
            <span className="message-data-time">{value.author_name} |</span>
            <span className="message-data-time">{value.time}</span>
          </div>
          <div className="message other-message float-right">{value.content}</div>
        </li>
      )
    } else {
      return (
        <li className="clearfix">
          <div className="message-data">
            <span className="message-data-time">{value.user_name} |</span>
            <span className="message-data-time">{value.time}</span>
          </div>
          <div className="message my-message">{value.content}</div>
        </li>
      )
    }
  };

  const loadQA = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `contentqa/getallcontentstudent?users_id=${user_id}&course_id=+${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => setListQA(result))
      .catch(error => console.log('error', error));
  };

  const deleteNoteClick = (value) => {
    swal({
      title: "Bạn chắc chứ ?",
      text: "Nếu bạn xóa, Bạn sẽ không thể khôi phục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          var requestOptions = {
            method: "DELETE",
            redirect: "follow",
          };

          fetch(`${DEFAULT_API}` + `note/` + value, requestOptions)
            .then((response) => response.json())
            .then((result) => getListNote())
            .catch((error) => console.log("error", error));
        }
      });
  };

  const addNoteClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    setNote((values) => ({ ...values, id: 0 }));

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` + `note`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setNote((values) => ({ ...values, note: "" }));
        getListNote()
      })
      .catch((error) => console.log("error", error));
  };

  const editNote = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` + `note`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setNote((values) => ({ ...values, note: "" }));
        getListNote()
      })
      .catch((error) => console.log("error", error));
  };

  const getListNote = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` + `note?users_id=` +
      user_id +
      `&lession_id=` +
      note.lession_id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setListNote(result);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (user_id == null) {
      alert("vui lòng đăng nhập")
      history.push('/home');
      window.location.reload()
    }
    damua();
    getLessionByTime();
    loaddanhmuc();
    getLessionBySection();
    ttkh1();
  }, [status]);


  const getLessionBySection = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `${DEFAULT_API}` + "lession/find-all-by-section?sectionId=" + sectionId,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setvideo(result);

      })
      .catch((error) => console.log("error", error));
  };

  const damua = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` + `giangvien/test/` + `${user_id}` + `/${id.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result === "nobought") {
          history.push("/home");
          window.location.reload();

        }
      })
      .catch((error) => console.log("error", error));
  };

  const getData = (value) => {
    lession.linkVideo = value.linkVideo;
    setNote((values) => ({ ...values, lession_id: value.id }));

    setStatus(status + 1);
  };

  const tesst = (value) => {
    setSectionId(value.id);
    getLessionBySection();
    setStatus(status + 1);
  };


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
        setListSection(result);
      })
      .catch((error) => console.log("error", error));
  };

  function chuyentranghome() {
    history.push("/home");
  }

  const checkDaxem = (value, index) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": value.id,
      "status": index
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/lession/updateStaus", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const getLessionByTime = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/lession/getlessionbytime", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.loicode == -1) {
          lession.linkVideo = "https://www.youtube.com/watch?v=eybyQcXUdzM"
        } else {
          lession.linkVideo = result.linkVideo
        }
      })
      .catch(error => console.log('error', error));
  }

  const videoVuaXem = (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": value.id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/lession/updateTime", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const [ttkh, setttkh] = useState([]);
  const [tenkhchungchi, settenkhchungchi] = useState({
    tenkh:''
  });

  var fullname=localStorage.getItem("fullname");
  const ttkh1 = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/course/` + id.id, requestOptions)
      .then(response => response.json())
      .then(result => {

        setttkh(result)
        result.map((value)=>
        tenkhchungchi.tenkh=value.courseName
        )
      })
      .catch(error => console.log('error', error));
  }

  const chungchi = () => {
    window.location=`http://localhost:8080/Pdf/xuat?name=`+fullname+`&tenkh=`+tenkhchungchi.tenkh
    
  }


  const [formReport, setFormReport] = useState();
  const [selectedFile, setSelectedFile] = useState()

  const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
  };

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormReport((values) => ({ ...values, [name]: value }));
  }

  const report = (event) => {
    event.preventDefault();

    var formdata = new FormData();
    formdata.append("content", formReport.content);
    formdata.append("users_id", user_id);
    formdata.append("course_id", id.id);
    formdata.append("status", 0);
    formdata.append("file", selectedFile );

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/report", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.loicode == -1){
        swal("Thất Bại", result.message, "error")
      }
      else{
        swal("Thành Công", "Chúng tôi sẽ xem xét báo cáo của bạn và liên hệ lại với bạn qua email", "success")
      }
    })
    .catch(error => console.log('error', error));
  }

  return (
    <div>
      <header className="header-section-backend">
        {/* main Header Starts */}
        <div className="main-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="header-left">
                  <div className="header-logo">
                    <a>
                      <img src="/assets/uploads/logoaled.png" alt="logo" />
                    </a>
                  </div>
                  <div className="header-title">
                    {ttkh.map((value) =>
                      <h5>{value.courseName}</h5>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="header-backend-buttons">
                  <a
                    href="/student/EnrolledCourses"
                    className="template-button"
                  >
                    Back To My Course
                  </a>
                  <a href="/home" className="template-button-2">
                    {" "}
                    Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <br />
      <section className="course-video-section padding-bottom-110">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 p-3 order-0 order-lg-2">
              <div className="course-video-part" >
                <ReactPlayer
                  controls
                  width="100%"
                  height="500px"
                  url={lession.linkVideo}
                />
              </div>
              <div className="course-video-tab padding-top-60">
                <div className="tab">
                  <ul>
                    <li className="tab-one active">
                      <span>overview</span>
                    </li>
                    <li
                      onClick={() => loadQA()}
                      className="tab-two"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter1"
                    >
                      <span>Q&amp;A</span>
                    </li>

                    {note.lession_id == null ? <li
                      className="tab-three"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                    >
                      <span>note</span>
                    </li> : <li
                      className="tab-three"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={getListNote}
                    >
                      <span>note</span>
                    </li>}

                    <li className="tab-four" onClick={chungchi}>
                      <span >Chứng chỉ</span>
                    </li>
                    <li>
                      <span data-toggle="modal" data-target="#myModalRating1">
                        Báo cáo
                      </span>
                    </li>
                  </ul>
                  <div className="hr-line" />
                </div>

              </div>
            </div>
            <div className="col-lg-4 p-0 order-1 order-lg-2">
              <div className="video-playlist-sidebar">
                <h3>Danh Sách Bài Học</h3>
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="false"
                >
                  <div class="accordion" id="myAccordion">
                    {listSection.map((value, index) => (
                      <div class="panel">
                        <a
                          onClick={() => tesst(value)}
                          className="btn btn-light"
                          data-toggle="collapse"
                          data-target={`#collapsible` + index}
                          data-parent="#myAccordion"
                        >
                          {value.name}
                        </a>
                        <div id={`collapsible` + index} class="collapse">
                          <div className="card-body">
                            {video.map((value, index) => (
                              <div className="single-course-video">
                                <form>
                                  {value.type == "test" ? <a href={`/exam/` + value.linkVideo}

                                    className="btn btn-light"
                                  >
                                    <i className="fa fa-play-circle" />{" "}
                                    {value.name}
                                  </a> : <a

                                    onClick={() => getData(value)}
                                    className="btn btn-light"
                                  >
                                    {/* {daxem(value.status)} */}
                                    {value.status === 1 ? <span><input
                                      onClick={() => checkDaxem(value, 0)}
                                      type="checkbox"
                                      defaultChecked="checked"
                                    />
                                      &nbsp;&nbsp;</span> : <span><input
                                        onClick={() => checkDaxem(value, 1)}
                                        type="checkbox"
                                      />
                                      &nbsp;&nbsp;</span>}
                                    <i className="fa fa-play-circle" />{" "}
                                    <a onClick={() => videoVuaXem(value)}> {value.name}</a>
                                  </a>}

                                </form>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                NOTE
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="tab-three-content tab-content-bg note-content lost">
              <br />
              <span>
                <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg"
                  onChange={handleChangeNote}
                  type="text"
                  placeholder="Create New Note"
                  name="note"
                  value={note.note}
                />
                <a onClick={addNoteClick} className="btn btn-primary">
                  <i class="fa fa-plus"> Add</i>
                </a>
                &ensp;
                <a onClick={editNote} className="btn btn-primary">
                  <i class="fa fa-plus"> Update</i>
                </a>
              </span>
              <ul>
                {listNote.map((value, index) => (
                  <li>
                    {value.note}
                    <i className="fa fa-remove" style={{ fontSize: '24px' }}
                      onClick={() => deleteNoteClick(value.id)}
                    />
                    &ensp;
                    <i className="fa fa-edit" style={{ fontSize: '24px' }}
                      onClick={() => editNoteClick(value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>



      <div
        class="modal fade"
        id="exampleModalCenter1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                QA Question
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="tab-three-content tab-content-bg note-content lost">
              <div className="container">
                <div className="row clearfix">
                  <div className="col-lg-6">
                    <div className="chat">
                      <div className="chat-header clearfix">
                        {/* <div className="row">
                          <div className="col-lg-6">
                            <a
                              href="javascript:void(0);"
                              data-toggle="modal"
                              data-target="#view_info"
                            >
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                alt="avatar"
                              />
                            </a>
                            <div className="chat-about">
                              <h6 className="m-b-0">Aiden Chavez</h6>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="chat-history">
                        {listQA.map((value, index) => (
                          <ul className="m-b-0">
                            {tinNhan(value)}
                          </ul>)
                        )}
                      </div>
                      <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                          <input onChange={handleChange}
                            value={contentMess.content}
                            type="text"
                            className="form-control"
                            placeholder="Enter text here..."
                            name="content"
                          />
                          <br />
                          <br />
                          <div className="input-group-prepend">
                            <button disabled={contentMess.content ? false : true}
                              type="button"
                              className="tab-two"
                              class="btn btn-success"
                              onClick={sendMess}
                            >
                              phản hồi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="myModalRating1" className="modal fade" role="dialog">
            <div className="modal-dialog w-40-p">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">×</button>
                  <h4 className="modal-title">Báo Cáo</h4>
                </div>

                <div className="modal-body">
                  <form acceptCharset="utf-8" />
                  <div className="form-group">
                    <label htmlFor>Chọn tệp</label>
                    <input type="file" name="lesson_mp4" id="uploadFile" accept="image/*, video/mp4*" onChange={changeHandler} /><span className="c-red">
                          (Chỉ được chọn tệp ảnh hoặc video dạng MP4)</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor>Nội dung báo cáo vi phạm chi tiết</label>
                    <textarea name="content" className="form-control h-100" cols={20} rows={10} required defaultValue={""} onChange={onInputChange} />
                  </div>
                  <button type="submit" className="btn btn-default btn-success" name="form_rating" onClick={report}>Gửi Báo Cáo</button>
                </div>
               
                <div className="modal-footer">
                  <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>Đóng</b></button>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
}
