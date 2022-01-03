import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";
import { event } from 'jquery';

export default function Course() {
  const dispatch = useDispatch()
  const BaiGiang = useSelector(state => state)
  const [isEnable, setIsEnable] = useState(0);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  const [listFavorite, setListFavorite] = useState([]);
  let param = useParams();
  let pagesize = 6
  const [layValue,setLayValue] = useState({
    vlx: ""
  })

  const onChangeValue = (event) =>
  
  {
    layValue.vlx = event.target.value
    loadBaiGiang(event.target.value)

  }

  useEffect(() => {
    if (user_id) {
      loadFavorite();
    }
    loadBaiGiang();

  }, [
    dispatch, useSelector
  ])
  let history = useHistory();
  const loadBaiGiang = async (value,pg = page, pgsize = pagesize) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };
    if (param.id && value == 1) {
      fetch(`${DEFAULT_API}` + `course/get-price-asc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          
          dispatch({ type: "GET_DATA", payload: result })
          console.log("result 321123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 2) {
      fetch(`${DEFAULT_API}` + `course/get-price-desc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("123321")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 3) {
      fetch(`${DEFAULT_API}` + `course/get-price-1-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("result 123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 4) {
      fetch(`${DEFAULT_API}` + `course/get-price-2-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log(" 321")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 5) {
      fetch(`${DEFAULT_API}` + `course/get-price-3-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("result 123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 6) {
      fetch(`${DEFAULT_API}` + `course/get-rate-asc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log(" 321")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 7) {
      fetch(`${DEFAULT_API}` + `course/get-rate-desc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log(" 321")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }
    else if(value == 1) {
      fetch(`${DEFAULT_API}` + `course/price-asc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi")
          setIsEnable(isEnable + 1)
          console.log(param.id);
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 2) {
      fetch(`${DEFAULT_API}` + `course/price-desc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 3) {
      fetch(`${DEFAULT_API}` + `course/price-1?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 4) {
      fetch(`${DEFAULT_API}` + `course/price-2?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 5) {
      fetch(`${DEFAULT_API}` + `course/price-3?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 6) {
      fetch(`${DEFAULT_API}` + `course/rate-asc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 7) {
      fetch(`${DEFAULT_API}` + `course/rate-desc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }
    else if (param.id) {
      fetch(`${DEFAULT_API}` + `course/get-all-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          dispatch({ type: "GET_DATA", payload: result })
          console.log(result)
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else{
      fetch(`${DEFAULT_API}` + `course/get-all-by-page?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "GET_DATA", payload: result })
        setTotalCount(result.length)
      })
    }
  }

  const nextPage = async () => {
    const pg = page + 1
    loadBaiGiang(layValue.vlx,pg)
    setPage(pg)
    console.log(page);
  }

  const backPage = async () => {
    const pg = page - 1
    loadBaiGiang(layValue.vlx,pg)
    setPage(pg)
    console.log(page);
  }

  function chuyentrang(value) {
    history.push(`/Detail/${value.id}`)

  }

  const user_id = localStorage.getItem("userid")

  const checkTym = (value) => {
    if (user_id) {
      if (listFavorite.some(favorite => favorite.course_id === value)) {
        return <span onClick={() => deleteFavorite(value)} className="heart-icon"><i className="fa fa-heart" /></span>
      } else {
        return <span onClick={() => addFavorite(value)} className="heart-icon"><i className="fa fa-heart-o" /></span>
      }
    }
  }

  const loadFavorite = async () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}favorite?user_id=${user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => setListFavorite(result))
      .catch(error => console.log('error', error));
  };

  const deleteFavorite = (value) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}favorite?user_id=${user_id}&course_id=${value}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(swal("Thành Công", "Đã bỏ yêu thích", "success"))
      .then(loadFavorite)
      .catch(error => console.log('error', error));
  };

  const addFavorite = (value) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "user_id": user_id,
      "course_id": value,
      "status": 1
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}favorite`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(swal("Thành Công", "Đã thêm yêu thích", "success"))
      .then(loadFavorite)
      .catch(error => console.log('error', error));
  };


  return (
    // <div>
    //   <div className="course-page-content padding-120">
    //     <div className="container">
    //       <div className="page-content-top margin-bottom-40">
    //         <div className="row align-items-center">
    //           <div className="col-md-6">
    //             <div className="course-tab">
    //               <ul>
    //                 <li className="active" data-filter="*">
    //                   <h3>{}</h3>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="row grid">
    //         {BaiGiang.map((value, index) => (
    //           <div
    //             className="col-lg-4 col-sm-6 grid-item collection"
    //             key={index}
    //           >
    //             <div className="course-single-item">
    //               <div className="course-image">
    //                 <img
    //                   src={value.image}
    //                   style={{ height: 250, maxWidth: 350 }}
    //                   alt="image"
    //                 />
    //                 <br />
    //                 <br />
    //                 <div className="course-video-part">
    //                   <div className="video-play-button">
    //                     {checkTym(value.id)} &ensp;

    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="course-content">
    //                 <h4>
    //                   <a onClick={() => chuyentrang(value)}>
    //                     Name: {value.courseName}
    //                   </a>
    //                 </h4>
    //                 <p className="margin-top-20">
    //                   Description: {value.description}
    //                 </p>
    //                 <div className="signle-progressbar margin-top-20">
    //                   <div className="row align-items-center">


    //                   </div>
    //                 </div>
    //                 <div className="cotent-bottom margin-top-20">
    //                   <div className="content-left">
    //                     <h5>{value.rate ? ("Rating: " + value.rate) : ("Chưa có đánh giá")}</h5>
    //                   </div>
    //                   <div className="content-right">
    //                     <span>
    //                       {value.rate ?
    //                         <ReactStars
    //                           edit={false}
    //                           value={value.rate}
    //                           size={24}
    //                           isHalf={true}
    //                           emptyIcon={<i className="far fa-star"></i>}
    //                           halfIcon={<i className="fa fa-star-half-alt"></i>}
    //                           fullIcon={<i className="fa fa-star"></i>}
    //                           activeColor="#ffd700" /> :
    //                         ""}
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       <nav aria-label="Page navigation example">
    //       <button type="button" class="btn btn-outline-primary" disabled={page == 0}  onClick={backPage} >Previous</button>
    //             <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount/pagesize)}  onClick={nextPage} >Next</button>
    //       </nav>
    //     </div>
    //   </div>
    // </div>

    <div>
      <section className="course-category-section padding-top-120 padding-bottom-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 padding-80">
              <div className="course-category-sidebar">
                <div className="lms-single-widget">
                  {/* <div className="lms-widget-title">
                    
                  </div> */}
                  <div className="form-check" onChange={onChangeValue}>
                  <h4>Lọc theo giá</h4>
                  <label>  <input className="form-check-input" type="radio" value={1} name="sort"   />
                    Tăng dần 
                    </label>
                    <br/>
                  
                  <label> <input className="form-check-input" value={2} type="radio" name="sort" />
                      Giảm dần
                    </label>
                    <br/>
                    <label><input className="form-check-input" type="radio" value={3} name="sort"   />
                       Dưới 500.000 VND
                    </label>
                    <br/>
                  <label>
                    <input className="form-check-input" type="radio" value={4} name="sort"  />
                       Từ 500.000 - 1.000.000 VND
                    </label>
                    <br/>
                    <label> <input className="form-check-input" type="radio" value={5} name="sort"  />
                   
                      Trên 1.000.000 VND
                    </label>
                 
                    </div>
                  
                  <h4>Lọc theo đánh giá</h4>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="6" name="sort" onChange={(event) => onChangeValue(event)}  />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                       Tăng dần
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" value="7" name="sort" onChange={(event) => onChangeValue(event)} />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Giảm dần
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-6">
                    <div className="container">
                      <div className="page-content-top margin-bottom-40">
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="course-tab">
                              <ul>
                                <li className="active" data-filter="*">
                                  <h3>{ }</h3>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row grid">
                        {BaiGiang.map((value, index) => (
                          <div
                            className="col-lg-4 col-sm-6 grid-item collection"
                            key={index}
                          >
                            <div className="course-single-item">
                              <div className="course-image">
                                <img
                                  src={value.image}
                                  style={{ height: 250, maxWidth: 350 }}
                                  alt="image"
                                />
                                <br />
                                <br />
                                <div className="course-video-part">
                                  <div className="video-play-button">
                                    {checkTym(value.id)} &ensp;

                                  </div>
                                </div>
                              </div>
                              <div className="course-content">
                                <h4>
                                  <a onClick={() => chuyentrang(value)}>
                                    Name: {value.courseName}
                                  </a>
                                </h4>
                                <p className="margin-top-20">
                                  Description: {value.description}
                                </p>
                                <div className="signle-progressbar margin-top-20">
                                  <div className="row align-items-center">


                                  </div>
                                </div>
                                <div className="cotent-bottom margin-top-20">
                                  <div className="content-left">
                                    <h5>{value.rate ? ("Rating: " + value.rate) : ("Chưa có đánh giá")}</h5>
                                  </div>
                                  <div className="content-right">
                                    <span>
                                      {value.rate ?
                                        <ReactStars
                                          edit={false}
                                          value={value.rate}
                                          size={24}
                                          isHalf={true}
                                          emptyIcon={<i className="far fa-star"></i>}
                                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                                          fullIcon={<i className="fa fa-star"></i>}
                                          activeColor="#ffd700" /> :
                                        ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {<nav aria-label="Page navigation example">
                        <button type="button" class="btn btn-outline-primary" disabled={page == 0} onClick={backPage} >Previous</button>
                        <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount / pagesize)} onClick={nextPage} >Next</button>
                      </nav>}
                    </div>

                </div>
              </div></div></div></div>
      </section>
    </div>


  );
}