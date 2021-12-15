import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function ViewDetail() {
  let history = useHistory();
  let author_id = useParams().id;

  const [page, setPage] = useState(0);
  const [infoTeacher, setInfoTeacher] = useState([]);
  const [infoAuthor, setInfoAuthor] = useState({});
  const [listCourse, setListCourse] = useState([]);

  const loadCourse = (page) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:8080/course/get_course_author?author_id=${author_id}&page=${page}`,
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
      `http://localhost:8080/teacheroverview?author_id=${author_id}`,
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
    
    fetch(`http://localhost:8080/teacheroverview/getinfoauthor?author_id=${author_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setInfoAuthor(result))
      .catch(error => console.log('error', error));
  }

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
    history.replace(`/checkout/${value.id}`);
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
              <h1>View Detail</h1>
              <h3>
                <a href="">Home</a>
                <i className="fa fa-angle-right" />
                detail <i className="fa fa-angle-right" />
                viewdetail{" "}
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
                      <i className="fa fa-star" /> Instructor Rating:{" "}
                      {teacher.instructorRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-play-circle" /> Total Courses:{" "}
                      {teacher.totalCourse}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-comment" /> Total Rating:{" "}
                      {teacher.totalRating}
                    </div>
                    <div className="text-muted">
                      <i className="fa fa-user" /> Total Students:{" "}
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
              Education: {infoAuthor.education}
              </p>
              <div className="tab-pane active">
              Description: {infoAuthor.description}
                <br />
              </div>
            </div>
          </div>
          <h2 className="course_title mt_40">All Courses of this Instructor</h2>

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
                      <li>Author: {value.authorName}</li>

                      <li>Category: {value.categoryName}</li>
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
                      <span className="review-text">(Total Reviews: 1)</span>
                    </div>
                    <div className="price">{value.price}$</div>
                    <div className="buy">
                      <a
                        onClick={() => getcheckout(value)}
                        className="btn btn-block btn-success"
                      >
                        Check Out
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
