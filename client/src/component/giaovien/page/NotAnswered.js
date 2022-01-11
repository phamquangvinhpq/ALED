import React, { useEffect, useState } from "react";
import { DEFAULT_API } from "../../../conf/env";

export default function NotAnswered() {
  const users_id = localStorage.getItem("userid");
  const [listQA, setListQA] = useState([]);
  const [contentMess, setContentMess] = useState([]);
  const [inputMess, setInputMess] = useState({});
  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 5;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputMess((values) => ({ ...values, [name]: value }));
  };

  const tinNhan = (value) => {
    if (value.people === 0) {
      return (
        <li className="clearfix">
          <div className="message-data text-right">
            <span className="message-data-time">{value.user_name} |</span>
            <span className="message-data-time">{value.time}</span>
          </div>
          <div className="message other-message float-right">{value.content}</div>
        </li>
      )
    } else {
      return (
        <li className="clearfix">
          <div className="message-data">
            <span className="message-data-time">{value.author_name} |</span>
            <span className="message-data-time">{value.time}</span>
          </div>
          <div className="message my-message">{value.content}</div>
        </li>
      )
    }
  };

  const loadContentMess = (value) => {
    setInputMess((values) => ({
      ...values,
      user_id: value.users_id,
      course_id: value.course_id,
      people: 1,
    }));
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` +`contentqa/getallcontentauthor?qa_id=${value.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setContentMess(result))
      .catch((error) => console.log("error", error));
  };

  const loadContentMess2 = (value) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${DEFAULT_API}` +`contentqa/getallcontentauthor?qa_id=${value}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setContentMess(result))
      .catch((error) => console.log("error", error));
  };

  const sendMess = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(inputMess);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +"contentqa/author", requestOptions)
      .then((response) => response.json())
      .then((result) => loadContentMess2(result.qa_id))
      .catch((error) => console.log("error", error));
      setInputMess((values) => ({
        ...values,
        content : ""
      }));
  };

  const backPageSt = async () => {
    const pg = pageSt - 1
    loadQA(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loadQA(pg)
    setPageSt(pg)
  }

  const loadQA = (pg = pageSt, pgsize = size) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${DEFAULT_API}` +`qa/getbystatus?status=0&users_id=${users_id}&page=${pg}&size=${pgsize}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {setListQA(result)
        setTotalCountSt(result.length)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadQA();
  }, []);

  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th hidden>ID</th>
                <th>STT</th>
                <th>Người Hỏi</th>
                <th>Tên Khóa Học</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {listQA.map((qa, index) => (
                <tr>
                  <td hidden>{qa.id}</td>
                  <td>{index + 1}</td>
                  <td>{qa.user_name}</td>
                  <td>{qa.course_name}</td>
                  <td>Chưa trả lời</td>
                  <td>
                    <button
                      onClick={() => loadContentMess(qa)}
                      type="button"
                      className="tab-two"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter1"
                    >
                      Trả Lời
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Trước</button>
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Sau</button>
                </nav>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModalCenter1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Câu hỏi
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="tab-three-content tab-content-bg note-content lost">
              <div className="container">
                <div className="row clearfix">
                  <div className="col-lg-6">
                    <div className="chat">
                      <div className="chat-header clearfix">
                        {/* <div className="row">
                          <div className="col-lg-6">
                            <a
                              href="javascript:void(0);"
                              data-toggle="modal"
                              data-target="#view_info"
                            >
                              <img
                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                alt="avatar"
                              />
                            </a>
                            <div className="chat-about">
                              <h6 className="m-b-0">Aiden Chavez</h6>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      <div className="chat-history">
                        {contentMess.map((value, index) => (
                          <ul className="m-b-0">{tinNhan(value)}</ul>
                        ))}
                      </div>
                      <div className="chat-message clearfix">
                        <div className="input-group mb-0">
                          <input
                            onChange={handleChange}
                            value={inputMess.content}
                            type="text"
                            className="form-control"
                            placeholder="Enter text here..."
                            name="content"
                          />
                          <br />
                          <br />
                          <div className="input-group-prepend">
                          <button disabled={inputMess.content ? false : true}
                            type="button"
                            className="tab-two"
                            class="btn btn-success"
                            onClick={sendMess}
                            >
                            Trả Lời
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
