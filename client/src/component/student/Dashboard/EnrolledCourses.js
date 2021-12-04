
import React, { useEffect, useState } from 'react'

import ReactStars from "react-rating-stars-component";
import { DEFAULT_API } from '../../../conf/env';
export default function EnrolledCourses() {
  const [DSkhoahocdamua, setDSkhoahocdamua] = useState([])
  const [rate, setrate] = useState({

    star: "",
    course_id: "",
    comment: ""
  })

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
    loadKhoaHocDaMua();

  }, ([

  ]))


  // lấy danh sách khóa học đã mua ở bảng mycourse
  // lưu đánh giá và sao vào bảng rate 

  const loadKhoaHocDaMua = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `mycourse/2`, requestOptions)
      .then(response => response.json())
      .then(result => { setDSkhoahocdamua(result) })
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

    fetch("http://localhost:8080/addrate", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  function layidkh(value) {
    rate.course_id = value
  }

  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">

          <div id="myModal1" className="modal fade" role="dialog">
            <div className="modal-dialog w-90-p">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">×</button>
                  <h4 className="modal-title">Course Details</h4>
                </div>
                <div className="modal-body">
                  <div className="r-table">
                    <div className="r-row">
                      <div className="r-cell w-200">Photo</div>
                      <div className="r-cell"><img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/course-30.jpg" className="w-200" /></div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Title</div>
                      <div className="r-cell">Build An eCommerce Website With WordPress</div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Content</div>
                      <div className="r-cell"><p>Lorem ipsum dolor sit amet, illum atomorum hendrerit te mea. At has sint vitae volumus, vix ut minimum deserunt, has corpora suavitate ea. Eam ei vidit mollis, mei no suas fugit iusto, vix nihil populo at. Id magna suscipit has, ei vis ancillae molestiae neglegentur, iuvaret numquam rationibus id pri. Saepe offendit pertinax ne ius, doming viderer referrentur nec eu.</p>
                        <p>Sit alii dicam an, iudico elaboraret quaerendum nec at. Deleniti percipit deterruisset usu ea, laoreet debitis cum id, assum mundi audire vis ea. Ad senserit interesset qui. Nec eu amet scaevola oporteat, iudico moderatius pri an. Ad eam mutat appellantur.</p>
                        <p>Copiosae antiopam cum id, eum no vivendo euripidis deseruisse, vix ad ridens inermis sadipscing. Pri eu meis voluptatum, eum case duis dissentiunt ei. Has antiopam intellegam no, sale labitur ex pri. Quo an solum velit, sumo invidunt qui ne, mea fabulas interesset ex. Tractatos molestiae vim no, no iudico fierent est.</p>
                      </div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Type</div>
                      <div className="r-cell">Paid</div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Price</div>
                      <div className="r-cell">11.29</div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Old Price</div>
                      <div className="r-cell">
                        <del>45.29</del>
                      </div>
                    </div>
                    <div className="r-row">
                      <div className="r-cell w-200">Course Category</div>
                      <div className="r-cell">
                        WooCommerce														</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>Close</b></button>
                </div>
              </div>
            </div>
          </div>

          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Thumbnail</th>
                <th>Course Title</th>
                <th className="w-100">My Rating</th>
                <th>Course Content</th>
                <th className="w-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {DSkhoahocdamua.map((value, index) =>
                <tr>
                  <td>{index + 1}</td>
                  <td><img src={value.image} className="w-100" /></td>
                  <td>{value.description}</td>
                  <td>
                    No Rating Given		</td>
                  <td>
                    <a target="_blank" className="btn btn-info btn-sm">Course Content</a>
                  </td>
                  <td>
                    <a href className="btn btn-success btn-sm" data-toggle="modal" data-target="#myModalRating1" onClick={() => layidkh(value.course)}>Give Rating</a>
                    <a href className="btn btn-success btn-sm" data-toggle="modal" data-target="#myModal1">View Detail</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>



          {/* dánh giá và comment khóa học  */}
          <div id="myModalRating1" className="modal fade" role="dialog">
            <div className="modal-dialog w-40-p">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">×</button>
                  <h4 className="modal-title">Rating</h4>
                </div>
                <div className="modal-body">
                  <form acceptCharset="utf-8" />
                  <input type="hidden" name="course_id" defaultValue={30} />
                  <input type="hidden" name="user_id_instructor" defaultValue={9} />
                  <div className="form-group">
                    <label htmlFor>Give Rating</label>
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
                    <label htmlFor>Comment (Optional)</label>
                    <textarea name="comment" className="form-control h-100" cols={30} rows={10} required defaultValue={""} onChange={onInputChange} />
                  </div>
                  <button type="submit" className="btn btn-default btn-success" name="form_rating" onClick={addRate}>Submit</button>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>Close</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}