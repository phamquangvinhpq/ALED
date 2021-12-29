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
    linkVideo: "https://www.youtube.com/watch?v=CS2A8shF6To",
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
    setNote((values) => ({ ...values, note : value.note, id : value.id }));
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

    fetch(`${DEFAULT_API}` +`contentqa/student`, requestOptions)
      .then(response => response.text())
      .then(result => loadQA())
      .catch(error => console.log('error', error));
      setContentMess((values) => ({
        ...values,
        content : ""
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
    
    fetch(`${DEFAULT_API}` +`contentqa/getallcontentstudent?users_id=${user_id}&course_id=+${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => setListQA(result))
      .catch(error => console.log('error', error));
  };

  const deleteNoteClick = (value) => {
    swal({
      title: "Are you sure?",
      text: "If you delete, you cannot restore!",
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
    
        fetch(`${DEFAULT_API}` +`note/` + value, requestOptions)
          .then((response) => response.json())
          .then((result) => getListNote())
          .catch((error) => console.log("error", error));
      }
    });
  };

  const addNoteClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    setNote((values) => ({ ...values, id : 0 }));

    var raw = JSON.stringify(note);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +`note`, requestOptions)
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

    fetch(`${DEFAULT_API}` +`note`, requestOptions)
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
      `${DEFAULT_API}` +`note?users_id=` +
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
    damua();
    loaddanhmuc();
    getLessionBySection();
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
                    <h5>WordPress Development Beginner to Pro</h5>
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
              <div className="course-video-part">
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

                    <li
                      className="tab-three"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={getListNote}
                    >
                      <span>note</span>
                    </li>
                    <li className="tab-four">
                      <span>announcement</span>
                    </li>
                  </ul>
                  <div className="hr-line" />
                </div>
                <div className="tab-content">
                  <div className="tab-one-content tab-content-bg overview-content lost active">
                    <div className="video-tab-title">
                      <h5>about this course</h5>
                    </div>
                    <p className="margin-top-20">
                      Advanced story telling techniques for writers: Personas,
                      Characters &amp; Plots Proven Tips and Tricks of the
                      Digital Marketing Trade growth Hacking. Unique Ways of
                      Promoting a Business from Scratch
                    </p>
                    <div className="video-tab-title margin-top-30">
                      <h5>what you'll learn?</h5>
                    </div>
                    <div className="content-list-items margin-top-20">
                      <div className="row">
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> Delectus harum
                            deserunt ut optio corporis cum facilis aliquid
                            tempore
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> Veniam maiores
                            adipisci placeat ipsa dolorem culpa ipsam tenetur
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> Minima fugit nobis
                            earum exercitationem a deleniti veniam maiores
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> Atque minima fugit
                            nobis earum exercitationem ipsa obcaecati
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="video-tab-title margin-top-30">
                      <h5>by the numbers</h5>
                    </div>
                    <div className="content-list-items margin-top-20">
                      <div className="row">
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> skill level : beginner
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> lecture : 40
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> student : 50
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> video length : 02:00
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span className="single-list">
                            <i className="fa fa-check" /> language : english
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="video-tab-title margin-top-30">
                      <h5>certificate</h5>
                    </div>
                    <p className="margin-top-20">
                      Get Course certificate by completing entire course
                    </p>
                    <div className="video-tab-title margin-top-30">
                      <h5>description</h5>
                    </div>
                    <p className="margin-top-20">
                      This course is aimed at teaching photographers what it
                      takes to improve your techniques to earn more money.You'll
                      start with the basics and tackle how a camera operates,
                      the types of cameras and lenses available, and equipment
                      you'll need for accomplishing your goals.{" "}
                    </p>
                    <span className="uppercase-font">
                      UPDATED WITH A 273-PAGE NOTEBOOK &amp; NEW LESSONS
                    </span>
                    <p className="margin-top-20">
                      This online photography course will teach you how to take
                      amazing images and even sell them, whether you use a
                      smartphone, mirrorless or DSLR camera.{" "}
                    </p>
                    <ul className="caret-list">
                      <li>
                        <i className="fa fa-caret-right" /> What do all these
                        packages, tools, libraries and frameworks do?
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> What IS a library
                        and what's the difference to a framework?
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> Which framework
                        should you learn? Angular, React.js or Vue.js?
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> What about jQuery?
                      </li>
                    </ul>
                    <div className="video-tab-title margin-top-30">
                      <h5>what you will learn</h5>
                    </div>
                    <ul className="caret-list">
                      <li>
                        <i className="fa fa-caret-right" /> Understand how
                        cameras work and what gear you need
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> Master shooting in
                        manual mode and understanding your camera
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> Know what equipment
                        you should buy no matter what your budget
                      </li>
                      <li>
                        <i className="fa fa-caret-right" /> Follow our practical
                        demonstrations to see how we shoot in real-world
                        scenarios
                      </li>
                    </ul>
                  </div>
                  <div className="tab-two-content tab-content-bg q-a-content lost">
                    <div className="header-search">
                      <form action="#">
                        <input type="text" placeholder="Search Question" />
                        <button type="submit">
                          <i className="fa fa-search" />
                        </button>
                      </form>
                    </div>
                    <div className="video-tab-title margin-top-30">
                      <h5>10 questions in this course</h5>
                    </div>
                    <div className="hr-line" />
                    <div className="single-question">
                      <div className="question-image">
                        <img
                          src="assets/images/question-image.png"
                          alt="image"
                        />
                      </div>
                      <div className="question-content">
                        <h6>how to install wordpress in cpanel?</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.!
                        </p>
                        <div className="content-bottom">
                          <h6>john doe</h6>
                          <span>5 min ago</span>
                          <span>
                            <a>
                              <i className="fa fa-comments" /> 10 comments
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="single-question">
                      <div className="question-image">
                        <img
                          src="assets/images/question-image.png"
                          alt="image"
                        />
                      </div>
                      <div className="question-content">
                        <h6>how to install wordpress in cpanel?</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.!
                        </p>
                        <div className="content-bottom">
                          <h6>john doe</h6>
                          <span>5 min ago</span>
                          <span>
                            <a>
                              <i className="fa fa-comments" /> 10 comments
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="single-question">
                      <div className="question-image">
                        <img
                          src="assets/images/question-image.png"
                          alt="image"
                        />
                      </div>
                      <div className="question-content">
                        <h6>how to install wordpress in cpanel?</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.!
                        </p>
                        <div className="content-bottom">
                          <h6>john doe</h6>
                          <span>5 min ago</span>
                          <span>
                            <a>
                              <i className="fa fa-comments" /> 10 comments
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="single-question">
                      <div className="question-image">
                        <img
                          src="assets/images/question-image.png"
                          alt="image"
                        />
                      </div>
                      <div className="question-content">
                        <h6>how to install wordpress in cpanel?</h6>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.!
                        </p>
                        <div className="content-bottom">
                          <h6>john doe</h6>
                          <span>5 min ago</span>
                          <span>
                            <a>
                              <i className="fa fa-comments" /> 10 comments
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tab-three-content tab-content-bg note-content lost">
                    <div className="header-search">
                      <form action="#">
                        <input  type="text" placeholder="Create New Note" />
                        <button type="submit">
                          <i className="fa fa-plus" />
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="tab-four-content tab-content-bg announcement-content lost">
                    <div className="announcement-top">
                      <div className="top-image">
                        <img
                          src="assets/images/course-instructor-2.png"
                          alt="image"
                        />
                      </div>
                      <div className="top-name">
                        <h6>john doe</h6>
                        <span>product designer</span>
                      </div>
                    </div>
                    <h5>My 7 Favorite Learning &amp; Growth Techniques</h5>
                    <p className="margin-top-20">
                      Hey! <br />A lot of you have asked me for my personal
                      approach towards learning, how I learn new things and how
                      I overcome motivational issues.In this article and video,
                      I share my seven favorite techniques,
                    </p>
                    <p className="margin-top-20">
                      "hacks" and thoughts on those topics - and I hope they are
                      helpful to you as well!
                    </p>
                    <p className="margin-top-20">
                      Unfortunately this will result in delayed responses by me
                      in the Q&amp;A section and to direct messages. This is
                      only for the next week and once back I will be back to
                      100%.
                    </p>
                    <p className="margin-top-20">
                      I will continue to do my best to respond to as many
                      questions as possible but only one person, regularly I
                      spend 4-5 hours daily on this and with over 440000
                      students as you can image that its a lot of work.
                    </p>
                    <div className="announcement-comment margin-top-30">
                      <div className="comment-image">
                        <img
                          src="assets/images/course-instructor-3.png"
                          alt="image"
                        />
                      </div>
                      <div className="comment-box">
                        <form action="#">
                          <input type="text" placeholder="Enter Your Comment" />
                        </form>
                      </div>
                    </div>
                  </div>
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
                                  <a
                                    onClick={() => getData(value)}
                                    className="btn btn-light"
                                  >
                                    <input
                                      type="checkbox"
                                      defaultChecked={checked}
                                    />{" "}
                                    &nbsp;&nbsp;
                                    <i className="fa fa-play-circle" />{" "}
                                    {value.name}
                                  </a>
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
                    <i className="fa fa-remove" style={{fontSize: '24px'}} 
                      onClick={() => deleteNoteClick(value.id)}
                    />
                    &ensp;
                    <i className="fa fa-edit" style={{fontSize: '24px'}} 
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
                            Reply
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
                Close
              </button>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}
