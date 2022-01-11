import React, { useEffect } from 'react'
import useState from 'react-usestateref'
import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';
import { Link, useParams } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import ReactPlayer from 'react-player';

export default function Detail() {

  const [listSection, setListSection] = useState([]);
  const [sectionId, setSectionId] = useState(-1);
  const [status, setStatus] = useState(0);
  const [video, setvideo] = useState([]);
  const [thongtin, setthongtin] = useState([]);
  const [coursebyid, setcoursebyid] = useState([]);
  const [userrate, setuserrate] = useState([]);
  const [trangthai, settrangthai] = useState(false);
  const [videoDemo, setVideoDemo] = useState("")


  const [damua, setdamua] = useState(false);
  let history = useHistory();
  let id = useParams();
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(0);
  let pagesize = 3
  const [infoTeacher, setInfoTeacher] = useState([]);
  const [infoAuthor, setInfoAuthor] = useState({});
var chek=isNaN(id.id);

  useEffect(() => {
    if(chek==true)
    {
      history.push("/404")
      window.location.reload();
    }
   
   
    countKH();
    loaddanhmuc();
    getCoursebyid();
    getLessionBySection();
    loaduserrate();
    damuakhoahoc();


  }, [status])

  const xemThu = (value) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `lession/${value}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setVideoDemo(result.linkVideo)
        console.log(result.linkVideo)
      })
      .catch(error => console.log('error', error));
  }

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
              <h1>Chi tiết</h1>
              <h3>
                <a href="../index.html">Trang chủ</a>
                <i className="fa fa-angle-right" />
                chi tiết{" "}
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
                  <h3>{value.authorName}</h3>
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
                          "There are no reviews yet"
                        )}
                      </span>
                      {value.rate}
                      <span>&ensp; (Tổng đánh giá: {thongtin})</span>
                    </div>
                  </div>
                  <div className="short-des">
                    Mô tả: {value.description}
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
                  {damua==false ? <a
                  
                    className="btn btn-block btn-warning"
                    onClick={() => getcheckout(value.id)}
                  >
                    Thanh toán
                  </a>: <a
                 
                    className="btn btn-info btn-sm"
                    onClick={()=> chuyentrang(value)}
                  >
                   xem
                  </a> }</div>
}
                </div>

                  
                </div>
              </div>
            </div>
          ))}


          <h2 className="course_title mt_20">Đánh giá ({thongtin})</h2>

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

                onClick={backPage}>Trước
              </button>
              <button type="button" className="btn btn-outline-primary"
                disabled={page >= Math.ceil(totalCount / pagesize)} onClick={nextPage}>Sau
              </button>

            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="course_title">Nội dung khóa học</h2>
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
                                <th>Tên bài học</th>
                                <th>Xem thử</th>
                                <th>Thời lượng bài học</th>
                              </tr>
                              {video.map((value, index) => (
                                <tr>
                                  <td>{value.name}</td>
                                  <td>
                                    {value.demo == 1 ? <FaVideo onClick={() => xemThu(value.id)} data-toggle="modal" data-target="#myModalAllWatch0" /> : <FaVideoSlash />}
                                    <div
                                      id="myModalAllWatch0" className="modal" aria-hidden="true"  >
                                      <div id="myForm" className="modal-dialog w-50-p" >
                                        <div className="modal-content">
                                          <form>
                                            <div >
                                              <ReactPlayer
                                                controls
                                                width="100%"
                                                height="400px"
                                                url={videoDemo}
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
                                  </td>
                                  <td>Chưa</td>
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
          <h2 className="course_title mt_20">Chi tiết giảng viên</h2>
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
                      <i className="fa fa-star" /> Đánh giá giảng viên{" "}
                      {value.instructorRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-play-circle" /> Tổng khóa học:{" "}
                      {value.totalCourse}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-comment" /> Tổng đánh giá:{" "}
                      {value.totalRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-user" /> Tổng học sỉnh:{" "}
                      {value.totalStudents}
                    </div>
                    <p />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-9">
              <h3 className="profile_title">Tên: {infoAuthor.name}</h3>
              <p className="profile_sub_title">
                Trường học: {infoAuthor.education}
              </p>
              <div className="tab-pane active">
                Mô tả: {infoAuthor.description}
                <br />
              </div>
              <div className="author-detail-button mt_30">
                <a
                  className="btn btn-success btn-lg"
                  onClick={() => viewDetail(infoAuthor.id)}

                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}