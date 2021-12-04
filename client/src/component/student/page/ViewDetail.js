import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useDispatch, useSelector } from 'react-redux'

export default function ViewDetail() {
  const dispatch  = useDispatch()
  const BaiGiang = useSelector(state =>state)
  
  const [khoahoc,setkhoahoc] = useState({
    courseName: "",
    price: "",
    image: "",
    description: "",
    status: "",
    category_id: "",
    author_id: "",
    users_id: "",
    type: ""
  })

  const [giatriID, setgiatriID] = useState([])
  let id = useParams();
  const [danhmuc,setdanhmuc] = useState({
    cateName: ""
  })

  const [isEnable, setIsEnable] = useState(0);

  useEffect(() => {
    GetByCategory()
    loadCategory();
    
  }, [
    isEnable,dispatch, useSelector
  ])

  const [page,setPage] = useState(0);
  const [totalCount,setTotalCount] = useState(0)
  let pagesize = 2

  const nextPage = async() => {
    const pg = page < Math.ceil(totalCount/pagesize) ? page + 1 : page
    GetByCategory(pg)
    setPage(pg)
    console.log(page);
  }

  const backPage = async () => {
    const pg = page === 0 ? 0 : page - 1
    GetByCategory(pg)
    setPage(pg)
    console.log(page);
  }



  const GetByCategory = async (pg = page, pgsize = pagesize) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}`  + `course/get-all-by-category?categoryId=${id.id}&page=${page}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {  dispatch({type: "GET_DATA", payload: result})
           setTotalCount(result.length)
        })
      .catch(error => console.log('error', error));
    
  }


  let userid = localStorage.getItem("userid")

  const addCart =  (value) => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({

  "image": value.image,
  "price": value.price,
  "user_id": userid,
  "course_id": value.id
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/cart/add", requestOptions)
  .then(response => response.json())
  .then(result => setIsEnable(isEnable + 1))
  .catch(error => console.log('error', error));
  }

  const loadCour = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`course`, requestOptions)
      .then(response => response.json())
      .then(result => {
       setkhoahoc(result)
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

 
  

  const loadCategory = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`category/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        danhmuc.cateName = result.name;
        console.log("name:" + result.name);
      })
      .catch(error => console.log('error', error));
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
                detail  <i className="fa fa-angle-right" />
                viewdetail            </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3 instructor">
              <div className="card">
                <img src="uploads/user-9.jpg" className="card-img-top img-responsive image" alt="" />
                <div className="profile_content">
                  <p className="card_text">
                  </p><div className="review">
                    <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star-half-o" /> (<span>4.33</span>)
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-star" /> Instructor Rating 4.33
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-play-circle" /> Total Courses: 6
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-comment" /> Total Rating: 5
                  </div>
                  <div className="text-muted">
                    <i className="fa fa-user" /> Total Students: 9
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
            </div>
          </div>
          <h2 className="course_title mt_40">All Courses of this Instructor</h2>
          

                <div className="row product-item">
            <div className="col-md-3 course-item">
            {BaiGiang.map((value,index)=>{
              return(
              <div className="item" >
                <div className="img-container" key={index}>
                <img src={value.image} style={ {maxHeight: 250 , maxWidth: 250} } />
                </div>
                <div className="text-part">
                  <h3>
                    <a href="../../course/magento-2-essential-video-training.html">
                        {value.courseName}
                    </a>
                  </h3>
                  <ul>
                    <li>Instructor: David Beckham</li>
                   
                        <li >Category: {danhmuc.cateName}</li>
                     
                    
                  </ul>
                  <div className="review">
                    <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /> 5.0 <span className="review-text">
                      (Total Reviews: 1)
                    </span>
                  </div>
                  <div className="price">
                    {value.price}$
                  </div>
                  <div className="buy">
                    <a  onClick={() => addCart(value)} className="btn btn-block btn-success">Add to Cart</a>
                  </div>
                </div>
              </div>
              )

            })}
            </div>
          </div>
          <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onClick={backPage}>Previous</a></li>
                  <li class="page-item"><a class="page-link" onClick={nextPage}>Next</a></li>
                </ul>
              </nav>
          
        </div>
      </div>
    </div>

  )
}