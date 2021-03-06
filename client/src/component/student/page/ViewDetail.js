import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";

export default function ViewDetail() {
  let history = useHistory();
  let author_id = useParams().id;
  let id = useParams();
  const [page, setPage] = useState(0);
  const [infoTeacher, setInfoTeacher] = useState([]);
  const [infoAuthor, setInfoAuthor] = useState({});
  const [listCourse, setListCourse] = useState([]);
  const [damua, setdamua] = useState(false);

  const loadCourse = (page) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` + `course/get_course_author?author_id=${author_id}&page=${page}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setListCourse(result))
      .catch((error) => console.log("error", error));
  };

  const loadInfoTeacher = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` + `teacheroverview?author_id=${author_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setInfoTeacher(result))
      .catch((error) => console.log("error", error));
  };

  const loadInfoAuthor = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `teacheroverview/getinfoauthor?author_id=${author_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setInfoAuthor(result))
      .catch(error => console.log('error', error));
  }
  const user_id = localStorage.getItem("userid")

  useEffect(() => {
    if (isNaN(id.id)) {
      history.push("/404")
      window.location.reload();
    }
    loadCourse(page);
    loadInfoAuthor();
    loadInfoTeacher();
  }, []);

  const chuyenTrang = (page) => {
    setPage(page);
    loadCourse(page);
  };

  function getcheckout(value) {
    checkchoduyet(value)
  }

  const checkchoduyet = (value)=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` +`course/`+value.id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result[0].status==0)
        {
          swal("Th???t B???i", "Kh??a H???c ??ang Ch??? Duy???t", "error")
        }
        else{
          damuakhoahoc(value)
        }
      })
      .catch(error => console.log('error', error));
  }

  const damuakhoahoc = async (value) => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(`${DEFAULT_API}` + `giangvien/test/` + `${user_id}` + `/${value.id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        if (result === "bought") {
          swal("Th???t B???i", "B???n ???? mua kh??a h???c n??y r???i", "error")
        } else {
          history.push(`/checkout/${value.id}`)
        }

      })
      .catch(error => console.log('error', error));
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
              <h1>Chi Ti???t Gi???ng Vi??n</h1>
              <h3>
                <a href="">Trang ch???</a>
                <i className="fa fa-angle-right" />
                Chi ti???t <i className="fa fa-angle-right" />
                Xem chi ti???t{" "}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="row">
            {infoTeacher.map((teacher, value) => (
              <div className="col-md-3 instructor">
                <div className="card">
                  <img
                    src={infoAuthor.image}
                    className="card-img-top img-responsive image"
                    style={{ height: 200, maxWidth: 350 }}
                    alt=""
                  />
                  <div className="profile_content">
                    <p className="card_text"></p>
                    <div className="review">
                      <span>
                        <ReactStars
                          edit={false}
                          value={teacher.instructorRating}
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
                      <i className="fa fa-star" /> ????nh gi?? trung b??nh:{" "}
                      {teacher.instructorRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-play-circle" /> T???ng kh??a h???c:{" "}
                      {teacher.totalCourse}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-comment" /> S??? l?????ng ???????c ????nh gi??:{" "}
                      {teacher.totalRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-user" /> T???ng s??? h???c sinh:{" "}
                      {teacher.totalStudents}
                    </div>
                    <p />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-md-9">
              <h3 className="profile_title">{infoAuthor.name}</h3>
              <p className="profile_sub_title">
                Tr?????ng: {infoAuthor.education}
              </p>
              <div className="tab-pane active">
                Chi ti???t: {infoAuthor.skill}
                <br />
              </div>
            </div>
          </div>
          <h2 className="course_title mt_40">T???t c??? kh??a h???c c???a gi???ng vi??n</h2>

          <div className="row product-item">
            {listCourse.map((value, index) => (
              <div className="col-md-3 course-item">
                <div className="item">
                  <div className="img-container">
                    <img
                      src={value.image}
                      style={{ height: 250, Width: 250 }}
                    />
                  </div>
                  <div className="text-part">
                    <h3>
                      <a href="">{value.courseName}</a>
                    </h3>
                    <ul>
                      <li>Gi???ng vi??n: {value.authorName}</li>

                      <li>Danh m???c: {value.categoryName}</li>
                    </ul>
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
                      </span>
                      <span className="review-text">(T???ng ????nh gi??: {value.totalRating})</span>
                    </div>
                    <div className="price">{value.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    })}</div>
                    <div className="buy">
                      <a
                        onClick={() => getcheckout(value)}
                        className="btn btn-block btn-success"
                      >
                        Mua ngay
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button
                  disabled={page == 0 ? true : false}
                  class="btn btn-primary"
                  onClick={() => chuyenTrang(page - 1)}
                >
                  Tr?????c
                </button>
              </li>
              <li class="page-item">
                <button
                  class="btn btn-primary"
                  onClick={() => chuyenTrang(page + 1)}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
