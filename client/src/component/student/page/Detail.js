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
  let history = useHistory();
  let id = useParams();

  const [infoTeacher, setInfoTeacher] = useState(Object);
  const [rating, setRating] = useState();

  useEffect(() => {
    countKH();
    loaddanhmuc();
    getCoursebyid();
    getLessionBySection();
  }, [status])


  // useEffect(() => {
  //   loadInfoTeacher();
  // },[loadrating])

  const loadInfoTeacher = (authorId) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8080/teacheroverview?author_id=${authorId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setInfoTeacher(result);
        setRating(result.instructorRating);
        setRating(result.instructorRating);
      })
      .catch(error => console.log('error', error));
  };


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


  const loaduserrate = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `rate/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => { setuserrate(result) })
      .catch(error => console.log('error', error));
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
        setcoursebyid(result);
        loadInfoTeacher(result.author_id)
      })
      .catch(error => console.log('error', error));
  }


  const tesst = (value) => {
    setSectionId(value.id)
    getLessionBySection();
    setStatus(status + 1)
  }

  function getcheckout(value) {

    history.replace(`/checkout/${value.id}`)

  }

  return (
    <div>
      <div className="page-banner" style={{ backgroundImage: 'url(assets/uploads/banner_course.jpg)' }}>
        <div className="page-banner-bg" />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Shopping Cart</h1>
              <h3>
                <a href="../index.html">Home</a>
                <i className="fa fa-angle-right" />
                detail              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          {coursebyid.map((value, index) =>
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
                  <h3>By: David Beckham</h3>
                  <div className="review-comment-line">
                    <div className="review">
                      <span>
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

                      </span>{value.rate}<span>
                        (Total Reviews: {thongtin})
                      </span>

                    </div>
                  </div>
                  <div className="short-des">
                    {value.description}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="download-buy-section">
                  <div className="price">
                    $11.49
                  </div>
                  <div className="buy-now">
                    <a href="" className="btn btn-block btn-primary">Add to Cart</a>
                    <a href="" className="btn btn-block btn-success">View Cart</a>
                    <a href="" className="btn btn-block btn-warning" onClick={() => getcheckout(value)}>Proceed to Checkout</a>

                  </div>

                </div>
              </div>
            </div>
          )}

          <h2 className="course_title mt_20">Course Details</h2>
          <p>Lorem </p>
          <p>Sit</p>
          <p>Copiosae </p>
          <h2 className="course_title mt_20">Reviews ({thongtin})</h2>
          <div className="product-single-review">
            <div className="review-item">
              {userrate.map((value, index) =>
                <div className="row">
                  <div className="col-md-1">
                    <div className="reviewer">
                      <img src="http://windows79.com/wp-content/uploads/2021/02/Thay-the-hinh-dai-dien-tai-khoan-nguoi-dung-mac.png" alt="" />
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
                        /> (3.0)
                      </div>
                    </div>
                    <div className="review-by">
                     {value.user} </div>
                   
                    <div className="review-comment">
                      <p>
                       {value.comment} </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h2 className="course_title">Course Content</h2>
              <div className="accordion-section mt_20">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  {listSection.map((value, index) =>
                    <div className="panel panel-default">
                      <div className="panel-heading p-3 mb-3" role="tab" id="heading1">
                        <h3 className="panel-title">
                          <a onClick={() => tesst(value)} className="collapsed" role="button" title data-toggle="collapse" data-parent="#accordion" href={"#collapse" + index} aria-expanded="false" aria-controls="collapse1">
                            {value.name} </a>
                        </h3>
                      </div>
                      <div id={"collapse" + index} className="panel-collapse collapse" role="tabpanel" aria-labelledby="heading1">
                        <div className="table-responsive panel-body px-3 mb-4">
                          <table className="table table-bordered table-striped front-end-course-table">
                            <tbody>

                              <tr>
                                <th>Lesson Title</th>
                                <th>Lesson Preview</th>
                                <th>Lesson Duration</th>
                              </tr>
                              {video.map((value, index) => (
                                <tr>
                                  <td>{value.name}</td>
                                  <td>
                                    <div>Enrolled Course First</div>
                                    <div id="myModalAllWatch0" className="modal fade video_popup" role="dialog">
                                      <div className="modal-dialog w-60-p">
                                        <div className="modal-content">
                                          <div className="modal-body">
                                            <iframe width={560} height={315} src="https://www.youtube.com/embed/kkGeOWYOFoA" frameBorder={0} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    03:43 </td>
                                </tr>
                              ))}

                            </tbody></table>
                        </div>
                      </div>
                    </div>
                  )}




                </div>
              </div>
            </div>
          </div>
          <h2 className="course_title mt_20">Instructor Detail</h2>
          <div className="row mt_20">
            <div className="col-md-3 instructor">
              <div className="card">
                <img src="uploads/user-9.jpg" className="card-img-top img-responsive image" alt="" />
                <div className="profile_content">
                  <p className="card_text">
                  </p><div className="review">
                    <span>
                      <ReactStars
                        edit={false}
                        value={rating}
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
                    <i className="fa fa-star" /> Instructor Rating {infoTeacher.instructorRating}
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-play-circle" /> Total Courses: {infoTeacher.totalCourse}
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-comment" /> Total Rating: {infoTeacher.totalRating}
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-user" /> Total Students: {infoTeacher.totalStudents}
                  </div>
                  <p />
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <h3 className="profile_title">David Beckham</h3>
              <p className="profile_sub_title">High End Programmer and Developer</p>
              <div className="tab-pane active">
                Lorem<br />
                <br />
                Sit <br />
                <br />
                Copiosae
              </div>
              <div className="author-detail-button mt_30"><a href=""  className="btn btn-success btn-lg">View Detail</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}