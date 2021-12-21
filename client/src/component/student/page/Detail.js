import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import Checkout1 from './Checkout1';

export default function Detail() {

  const [listSection, setListSection] = useState([]);
  const [sectionId, setSectionId] = useState(-1);
  const [status, setStatus] = useState(0);
  const [video, setvideo] = useState([]);
  const [thongtin, setthongtin] = useState([]);
  const [coursebyid, setcoursebyid] = useState([]);
  const [userrate, setuserrate] = useState([]);
  const [trangthai, settrangthai] = useState(false);


  const [damua, setdamua] = useState(false);
  let history = useHistory();
  let id = useParams();
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0);
  let pagesize = 3
  const [infoTeacher, setInfoTeacher] = useState([]);
  const [infoAuthor, setInfoAuthor] = useState({});

  useEffect(() => {
    countKH();
    loaddanhmuc();
    getCoursebyid();
    getLessionBySection();
    loaduserrate();
    damuakhoahoc();


  }, [status])

  const loadInfoAuthor = (author_id) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `teacheroverview/getinfoauthor?author_id=${author_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setInfoAuthor(result)

      })
      .catch(error => console.log('error', error));
  }

  const loadInfoTeacher = (authorId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `teacheroverview?author_id=${authorId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setInfoTeacher(result);
      })
      .catch(error => console.log('error', error));
  };

  let user_id = localStorage.getItem("userid")

  const damuakhoahoc = async () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `giangvien/test/` + `${user_id}` + `/${id.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        if (result === "bought") {
          setdamua(true)
        }

      })
      .catch(error => console.log('error', error));
  }



  const countKH = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `count/${id.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        setthongtin(result)

      })
      .catch(error => console.log('error', error));
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
        setListSection(result);

      })
      .catch((error) => console.log("error", error));
  };

  function chuyentrang(value) {
    history.push(`/wath/video/${value}`)

  }

  const loaduserrate = async (pg = page, pgsize = pagesize) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${DEFAULT_API}` + `rate?userId=${id.id}&page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCount(result.length)
        setuserrate(result)
      })
      .catch(error => console.log('error', error));
  }

  const nextPage = async () => {
    const pg = page + 1
    loaduserrate(pg)
    setPage(pg)
  }

  const backPage = async () => {
    const pg = page - 1
    loaduserrate(pg)
    setPage(pg)
    console.log(page);
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
        console.log(result);
        setvideo(result);

      })
      .catch((error) => console.log("error", error));
  };


  const getCoursebyid = async () => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${DEFAULT_API}` + `course/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result[0].status == 0) {
          settrangthai(true)
        }
        setcoursebyid(result)
        loadInfoTeacher(result[0].author_id)
        loadInfoAuthor(result[0].author_id)
      })
      .catch(error => console.log('error', error));
  }

  const tesst = (value) => {
    setSectionId(value.id)
    getLessionBySection();
    setStatus(status + 1)
  }

  function getcheckout(value) {

    history.push(`/checkout/${value}`)

  }

  function viewDetail(value) {

    history.push(`/Viewdetail/${value}`)

  }



  return (
    <div>
      <div
        className="page-banner"
        style={{ backgroundImage: "url(/assets/uploads/banner_course.jpg)" }}
      >
        <div className="page-banner-bg" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Detail</h1>
              <h3>
                <a href="../index.html">Home</a>
                <i className="fa fa-angle-right" />
                detail{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          {coursebyid.map((value, index) => (
            <div className="row">
              <div className="col-md-3">
                <div className="product-single-video">
                  <div className="play_video">
                    <div className="bg_fade" />
                    <img src={value.image} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-single-item">
                  <h2>{value.courseName}</h2>
                  <h3>By: {value.authorName}</h3>
                  <div className="review-comment-line">
                    <div className="review">
                      <span>
                        {value.rate ? (
                          <ReactStars
                            edit={false}
                            value={value.rate}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        ) : (
                          "Chưa có đánh giá"
                        )}
                      </span>
                      {value.rate}
                      <span>&ensp; (Total Reviews: {thongtin})</span>
                    </div>
                  </div>
                  <div className="short-des">
                    Description: {value.description}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="download-buy-section">
                  <div className="price">{value.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}</div>
                  <div className="buy-now">
                    {trangthai == true ? "đang chờ duyệt" :
                      <div>
                        {damua == false ? <a

                          className="btn btn-block btn-warning"
                          onClick={() => getcheckout(value.id)}
                        >
                          Proceed to Checkout
                        </a> : <a
                          href=''
                          className="btn btn-info btn-sm"
                          onClick={() => chuyentrang(value.id)}
                        >
                          xem
                        </a>}</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}


          <h2 className="course_title mt_20">Reviews ({thongtin})</h2>
          <div className="product-single-review">
            <div className="review-item">
              {userrate.map((value, index) => (
                <div className="row">
                  <div className="col-md-1">
                    <div className="reviewer">
                      <img
                        src="http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-11">
                    <div className="review-rating">
                      <div className="review">
                        <ReactStars
                          edit={false}
                          value={value.rate}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                        />{" "}
                        
                      </div>
                    </div>
                    <div className="review-by">{value.user} </div>

                    <div className="review-comment">
                      <p>{value.comment} </p>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline-primary" disabled={page == 0}
                onClick={backPage}>Previous
              </button>
              <button type="button" className="btn btn-outline-primary"
                disabled={page >= Math.ceil(totalCount / pagesize)} onClick={nextPage}>Next
              </button>

            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="course_title">Course Content</h2>
              <div className="accordion-section mt_20">
                <div
                  className="panel-group"
                  id="accordion"
                  role="tablist"
                  aria-multiselectable="true"
                >
                  {listSection.map((value, index) => (
                    <div className="panel panel-default">
                      <div
                        className="panel-heading p-3 mb-3"
                        role="tab"
                        id="heading1"
                      >
                        <h3 className="panel-title">
                          <a
                            onClick={() => tesst(value)}
                            className="collapsed"
                            role="button"
                            title
                            data-toggle="collapse"
                            data-parent="#accordion"
                            href={"#collapse" + index}
                            aria-expanded="false"
                            aria-controls="collapse1"
                          >
                            {value.name}{" "}
                          </a>
                        </h3>
                      </div>
                      <div
                        id={"collapse" + index}
                        className="panel-collapse collapse"
                        role="tabpanel"
                        aria-labelledby="heading1"
                      >
                        <div className="table-responsive panel-body px-3 mb-4">
                          <table className="table table-bordered table-striped front-end-course-table">
                            <tbody>
                              <tr>
                                <th>Lesson Title</th>
                                <th>Lesson Preview</th>

                              </tr>
                              {video.map((value, index) => (
                                <tr>
                                  <td>{value.name}</td>
                                  <td>
                                    <div>Enrolled Course First</div>
                                    <div
                                      id="myModalAllWatch0"
                                      className="modal fade video_popup"
                                      role="dialog"
                                    >
                                      <div className="modal-dialog w-60-p">
                                        <div className="modal-content">
                                          <div className="modal-body">
                                            <iframe
                                              width={560}
                                              height={315}
                                              src="https://www.youtube.com/embed/kkGeOWYOFoA"
                                              frameBorder={0}
                                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                            />
                                          </div>
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
                                  </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <h2 className="course_title mt_20">Instructor Detail</h2>
          <div className="row mt_20">
            <div className="col-md-3 instructor">
              <div className="card">
                <img src={infoAuthor.image} className="card-img-top img-responsive image"    style={{ height: 200, maxWidth: 350 }} alt=""
                />
                {infoTeacher.map((value, i) => (
                  <div className="profile_content">
                    <p className="card_text"></p>
                    <div className="review">
                      <span>
                        <ReactStars
                          edit={false}
                          value={value.instructorRating}
                          size={24}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                        />
                      </span>
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-star" /> Instructor Rating{" "}
                      {value.instructorRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-play-circle" /> Total Courses:{" "}
                      {value.totalCourse}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-comment" /> Total Rating:{" "}
                      {value.totalRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-user" /> Total Students:{" "}
                      {value.totalStudents}
                    </div>
                    <p />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              <h3 className="profile_title">Name: {infoAuthor.name}</h3>
              <p className="profile_sub_title">
                Education: {infoAuthor.education}
              </p>
              <div className="tab-pane active">
                Description: {infoAuthor.description}
                <br />
              </div>
              <div className="author-detail-button mt_30">
                <a
                  className="btn btn-success btn-lg"
                  onClick={() => viewDetail(infoAuthor.id)}

                >
                  View Detail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}