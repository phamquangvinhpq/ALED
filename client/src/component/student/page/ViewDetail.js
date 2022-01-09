import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';

export default function ViewDetail() {
  let history = useHistory();
  let author_id = useParams().id;

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
      `${DEFAULT_API}` +`course/get_course_author?author_id=${author_id}&page=${page}`,
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
      `${DEFAULT_API}` +`teacheroverview?author_id=${author_id}`,
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
    
    fetch(`${DEFAULT_API}` +`teacheroverview/getinfoauthor?author_id=${author_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setInfoAuthor(result))
      .catch(error => console.log('error', error));
  }
  const user_id = localStorage.getItem("userid")

  useEffect(() => {
    loadCourse(page);
    loadInfoAuthor();
    loadInfoTeacher();
  }, []);

  const chuyenTrang = (page) => {
    setPage(page);
    loadCourse(page);
  };

  function getcheckout(value) {
    damuakhoahoc(value)
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
                alert("you bought this course")
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
              <h1>Xem chi tiết</h1>
              <h3>
                <a href="">Trang chủ</a>
                <i className="fa fa-angle-right" />
                Chi tiết <i className="fa fa-angle-right" />
                Xem chi tiết{" "}
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
                      <i className="fa fa-star" /> Đánh giá :{" "}
                      {teacher.instructorRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-play-circle" /> Tổng số khóa học:{" "}
                      {teacher.totalCourse}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-comment" /> Tổng số đánh giá:{" "}
                      {teacher.totalRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-user" /> Tổng số sinh viên:{" "}
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
              Trường học : {infoAuthor.education}
              </p>
              <div className="tab-pane active">
              Mô tả: {infoAuthor.description}
                <br />
              </div>
            </div>
          </div>
          <h2 className="course_title mt_40">Tất cả khóa học của giảng viên</h2>

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
                      <li>Tác giả: {value.authorName}</li>

                      <li>Danh mục: {value.categoryName}</li>
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
                      <span className="review-text">(Tổng số đánh giá: 1)</span>
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
                        Thanh toán
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
                  Previous
                </button>
              </li>
              <li class="page-item">
                <button
                  class="btn btn-primary"
                  onClick={() => chuyenTrang(page + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
