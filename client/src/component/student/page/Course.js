import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";

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
  let id = useParams();
  const onChangeValue = (event) =>
  
  {
    layValue.vlx = event.target.value
    loadBaiGiang(event.target.value)

  }
  useEffect(() => {
    // if(isNaN(id.id))
    // {
    //   history.push("/404")
    //   window.location.reload();
    // }
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
          setTotalCount(result.length)
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
          setTotalCount(result.length)
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
          setTotalCount(result.length)
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
          setTotalCount(result.length)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 5) {
      fetch(`${DEFAULT_API}` + `course/get-price-3-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("result 123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 6) {
      fetch(`${DEFAULT_API}` + `course/get-rate-asc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log(" 321")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
    }else if (param.id && value == 7) {
      fetch(`${DEFAULT_API}` + `course/get-rate-desc-by-category?categoryId=${param.id}&page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
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
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 2) {
      fetch(`${DEFAULT_API}` + `course/price-desc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 3) {
      fetch(`${DEFAULT_API}` + `course/price-1?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 4) {
      fetch(`${DEFAULT_API}` + `course/price-2?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 5) {
      fetch(`${DEFAULT_API}` + `course/price-3?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 6) {
      fetch(`${DEFAULT_API}` + `course/rate-asc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
          dispatch({ type: "GET_DATA", payload: result })
          console.log("hiihi123")
          setIsEnable(isEnable + 1)
        }
        )
        .catch(error => console.log('error', error));
     
    }else if(value == 7) {
      fetch(`${DEFAULT_API}` + `course/rate-desc?page=${pg}&size=${pagesize}`, requestOptions)
        .then(response => response.json())
        .then(result => {setTotalCount(result.length)
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
        .then(result => {setTotalCount(result.length)
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
      .then((response) => response.json())
      .then((response) => setListFavorite(response));
  };

  const deleteFavorite = (value) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}favorite?user_id=${user_id}&course_id=${value}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(swal("Th??nh C??ng", "???? b??? y??u th??ch", "success"))
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
      .then(swal("Th??nh C??ng", "???? th??m y??u th??ch", "success"))
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
    //                     <h5>{value.rate ? ("Rating: " + value.rate) : ("Ch??a c?? ????nh gi??")}</h5>
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
    <section className="course-category-section  padding-right-120 padding-top-10 padding-bottom-90 ">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 padding-80">
            <div className="course-category-sidebar">
              <div className="lms-single-widget">
                <div className="lms-widget-title">
                  <h4>L???c theo gi??</h4>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={1} onChange={onChangeValue} id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                     T??ng d???n
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={2} onChange={onChangeValue} id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                     Gi???m d???n
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={3} onChange={onChangeValue} id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                     D?????i 500.000 VND
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={4} onChange={onChangeValue} id="flexRadioDefault2"  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                     T??? 500.000 - 1.000.000 VND
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={5} onChange={onChangeValue} id="flexRadioDefault2"  />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Tr??n 1.000.000 VND
                  </label>
                </div>
                <div className="lms-widget-title">
                  <h4>L???c theo ????nh gi??</h4>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={6} onChange={onChangeValue} id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                     T??ng d???n
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="flexRadioDefault" value={7} onChange={onChangeValue} id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                     Gi???m d???n
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-6">
                  <div className="container1">
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
                              <img onClick={() => chuyentrang(value)}
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

                            <a href='' onClick={() => chuyentrang(value)}>
                              <h4 className='courseName'>
                                  T??n: {value.courseName}
                                  </h4>
                                </a>
                             
                              <p  class="dxLjPX">
                                M?? t???: {value.description}
                              </p>
                              <div className="course-price-cart margin-top-20">
                                                    <div className="course-price">
                                                        <span className="span-big">{value.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</span>
                                                        {/* <span className="span-cross">$ 500.00</span> */}
                                                    </div>
                                                </div>
                              <div className="cotent-bottom margin-top-20">
                                <div className="content-left">
                                  <h5>{value.rate ? ("????nh Gi??: " + value.rate) : ("Ch??a c?? ????nh gi??")}</h5>
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
                      <button type="button" class="btn btn-outline-primary" disabled={page == 0} onClick={backPage} >Tr?????c</button>
                      <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount / pagesize)} onClick={nextPage} >Sau</button>
                    </nav>}
                  </div>

              </div>
            </div></div></div></div>
    </section>
  </div>


  );
}