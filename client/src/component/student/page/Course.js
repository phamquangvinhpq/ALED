import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useDispatch, useSelector } from 'react-redux'
import swal from "sweetalert";

export default function Course() {
  const dispatch = useDispatch()
  const BaiGiang = useSelector(state => state)
  const [isEnable, setIsEnable] = useState(0);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  let param = useParams();
  let pagesize = 6

  useEffect(() => {

    loadBaiGiang();

  }, [
    dispatch,useSelector
  ])
  let history = useHistory();
  const loadBaiGiang = async (pg = page, pgsize = pagesize) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };
    if(param.id == 0){
      fetch(`${DEFAULT_API}` + `course/get-all-by-page?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({ type: "GET_DATA", payload: result })
        setTotalCount(result.length) 
      })
    }
    else {
    fetch(`${DEFAULT_API}` + `course/get-all-by-category?categoryId=${param.id}&page=0&size=${pagesize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({type: "GET_DATA", payload: result})   
        console.log(result)
        setIsEnable(isEnable + 1)
      }
      )
      .catch(error => console.log('error', error));
  }}

  const nextPage = async () => {
    const pg = page < Math.ceil(totalCount / pagesize) ? page + 1 : page
    loadBaiGiang(pg)
    setPage(pg)
    console.log(page);
  }

  const backPage = async () => {
    const pg = page === 0 ? 0 : page - 1
    loadBaiGiang(pg)
    setPage(pg)
    console.log(page);
  }

  function chuyentrang(value) {
    history.replace(`/Detail/${value.id}`)
    window.location.reload();
  }
    return (
        <div>
            <div className="course-page-content padding-120">
  <div className="container">
    <div className="page-content-top margin-bottom-40">
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="course-tab">
            <ul>
              <li className="active" data-filter="*"><h3>All courses</h3></li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
    <div className="row grid" >
      {BaiGiang.map((value,index) =>
       <div className="col-lg-4 col-sm-6 grid-item collection" key={index}>
            <div className="course-single-item" >
            <div className="course-image">
              <img src={value.image} style={ {height: 250 , maxWidth: 350} } alt="image"  />
              <div className="course-video-part">
                <div className="video-play-button">
                  <a href="https://www.youtube.com/watch?v=8AGgbIQyqR8" className="button-video">
                    <i className="fa fa-play" />
                  </a>
                </div>
              </div>
            </div>
            <div className="course-content">
              <h4><a onClick={() => chuyentrang(value)} >{value.courseName}</a></h4>
              <p className="margin-top-20">{value.description}</p>
              <div className="signle-progressbar margin-top-20">
                <div className="row align-items-center">
                  <div className="col-2">
                    <div className="progressbar-text">
                      <h6>80%</h6>
                    </div>
                  </div>
                  <div className="col-10">
                    <div id="bar1" className="barfiller">
                      <span className="fill" data-percentage={80} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cotent-bottom margin-top-20">
                <div className="content-left">
                  <h6>leave a rating</h6>
                </div>
                <div className="content-right">
                  <ul>
                    <li><a href="#"><i className="fa fa-star" /></a></li>
                    <li><a href="#"><i className="fa fa-star" /></a></li>
                    <li><a href="#"><i className="fa fa-star" /></a></li>
                    <li><a href="#"><i className="fa fa-star" /></a></li>
                    <li><a href="#"><i className="fa fa-star" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </div>
   
            )}
             </div>
    
    <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item"><a class="page-link" onClick={backPage} >Previous</a></li>
                  <li class="page-item"><a class="page-link" onClick={nextPage} >Next</a></li>
                </ul>
              </nav>
  </div>
</div>

        </div>
    )
}
