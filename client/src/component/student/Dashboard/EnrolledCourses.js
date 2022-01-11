
import React, { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
import { useHistory } from "react-router-dom";


export default function EnrolledCourses() {
  const [DSkhoahocdamua, setDSkhoahocdamua] = useState([])
    const [danhgia, setdanhgia] = useState(false)
    const [page, setPage] = useState(0);
  const [rate, setrate] = useState({

    star: "5",
    course_id: "",
    comment: ""
  })

  let history = useHistory();
  let id = localStorage.getItem("userid")


  const ratingChanged = (newRating) => {
    rate.star = newRating
    console.log(rate);
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    rate.comment = value
    console.log(event.target.value)
  }

  useEffect(() => {
    loadKhoaHocDaMua(0);

  }, ([

  ]))

  function chuyentrang(value) {
    history.push(`/wath/video/${value.course}`)
    window.location.reload()
  }

  function chuyentrangdetail(value) {
    history.push(`/detail/${value.course}`)
    
  }

  const chuyenTrang = (page) => {
    setPage(page);
    loadKhoaHocDaMua(page);
  };

  


  // lấy danh sách khóa học đã mua ở bảng mycourse
  // lưu đánh giá và sao vào bảng rate 

  const loadKhoaHocDaMua = async (page) => {
    const size = 5
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}mycourse/${id}?page=${page}&size=${size}`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        setDSkhoahocdamua(result) })
      .catch(error => console.log('error', error));
  }

  const addRate = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "comment": rate.comment,
      "rate": rate.star,
      "course": rate.course_id,
      "user": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`addrate`, requestOptions)
      .then(response => response.json())
      .then(result => swal("Thành Công", "Đánh giá thành công", "success"))
      .catch(error => console.log('error', error));
  }

  function layidkh(value) {
    rate.course_id = value
    checkdanhgia();
  }

  const checkdanhgia = async () =>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` +`findrate/${id}/${rate.course_id}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if(result == "yes")
        {
          setdanhgia(true)
        
        } else{
          setdanhgia(false)
        }
      })
      .catch(error => console.log('error', error));
  }
 
  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">

        

          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên Khóa Học</th>
                <th>Nội Dung</th>
                <th className="w-200">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {DSkhoahocdamua.map((value, index) =>
                <tr>
                  <td>{index + 1}</td>
                  <td><img src={value.image} className="w-100" /></td>
                  <td>{value.description}</td>
                
                  <td>
                    <a target="_blank" className="btn btn-info btn-sm" onClick={()=> chuyentrang(value)} >Học Ngay</a>
                  </td>
                  <td>
                    <a href className="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalRating1" onClick={() => layidkh(value.course)}>Đánh Giá</a>
                    &ensp;
                    <a href="" className="btn btn-success btn-sm"  onClick={()=> chuyentrangdetail(value)} >Xem Chi Tiết</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <button className="btn btn-info btn-sm"
          disabled={page == 0 ? true : false}
          class="btn btn-primary"
          onClick={() => chuyenTrang(page - 1)}
          >
            Trước
          </button>
          <p class="btn btn-primary">{page+1}</p>
          <button className="btn btn-info btn-sm"
          class="btn btn-primary"
          onClick={() => chuyenTrang(page + 1)}
          >
            Sau
          </button>


          {/* dánh giá và comment khóa học  */}
          <div id="myModalRating1" className="modal fade" role="dialog">
            <div className="modal-dialog w-40-p">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">×</button>
                  <h4 className="modal-title">Đánh Giá</h4>
                </div>
                {danhgia == false ? 
                <div className="modal-body">
                  <form acceptCharset="utf-8" />
                  <input type="hidden" name="course_id" defaultValue={30} />
                  <input type="hidden" name="user_id_instructor" defaultValue={9} />
                  <div className="form-group">
                    <label htmlFor>Sao Đánh Giá</label>
                    <ReactStars
                      edit={true}
                      value={5}
                      onChange={ratingChanged}
                      size={24}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor>Bình Luận (Tùy Chọn)</label>
                    <textarea name="comment" className="form-control h-100" cols={30} rows={10} required defaultValue={""} onChange={onInputChange} />
                  </div>
                  <button type="submit" className="btn btn-default btn-success" name="form_rating" onClick={addRate}>Đánh Giá</button>
                </div> : "Bạn đã đánh giá khóa học này rồi." }
               
                <div className="modal-footer">
                  <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>Đóng</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}