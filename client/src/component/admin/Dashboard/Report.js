import { event } from "jquery";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function Report() {
    const [listReport, setListReport] = useState([]);
    const [pageHienTai, setPageHienTai] = useState(0);
    const [status, setStatus] = useState(2);
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [loiNhan, setLoiNhan] = useState("")

    const changeSelect = (event) => {
        setStatus(event.target.value)
        setPageHienTai(0)
        getAllByStatus(event.target.value , 0);

    };

    const getIdAndEmail = (idValue, emailValue) => {
        setId(idValue)
        setEmail(emailValue)
    }

    console.log(id, email, loiNhan)

    const getAllByStatus = (status , pageFun) => {
        if (status == 2) {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch("http://localhost:8080/report?page=" + pageFun, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setListReport(result)
                })
                .catch((error) => console.log("error", error));
        } else {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            fetch(
                `http://localhost:8080/report/getByStatus?status=${status}&page=${pageFun}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((result) => {
                    setListReport(result)
                })
                .catch((error) => console.log("error", error));
        }
    };

    const guiVaDuyet = () => {
        var requestOptions = {
            method: "POST",
            redirect: "follow",
        };

        fetch(
            `http://localhost:8080/report/guiMail?email=${email}&loiNhan=${loiNhan}&id=${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                swal("Th??nh C??ng","???? g???i email v?? ????n ???? ???????c duy???t", "success")
                getAllByStatus(status, pageHienTai)
            })
            .catch((error) => console.log("error", error));
    }
    

   
    const chuyenTrang = (page) => {
        setPageHienTai(page);
        getAllByStatus(status, page);
        
      };

    useEffect(() => {
        getAllByStatus(2, pageHienTai)
    }, []);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Xem t???t c??? Danh m???c </h1>
                </div>
                <div className="content-header-right"></div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                                <div class="form-group col-sm-3">
                                    L???c theo: &nbsp;
                                    <select onChange={changeSelect}>
                                        <option selected value={2}>
                                            T???t c???
                                        </option>
                                        <option value={0}>Ch??a duy???t</option>
                                        <option value={1}>???? duy???t</option>
                                    </select>
                                </div>
                                <table
                                    id="example1"
                                    className="table table-bordered table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Ng?????i b??o c??o</th>
                                            <th>T??n kh??a h???c</th>
                                            <th>N???i dung b??o c??o</th>
                                            <th>Tr???ng th??i</th>
                                            <th>Ng??y b??o c??o</th>
                                            <th>H??nh ?????ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listReport.map((report, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{report.id}</td>
                                                    <td>{report.user_name}</td>
                                                    <td>{report.course_name}</td>
                                                    <td>
                                                        <textarea className="form-control h-100" cols={20} rows={3} defaultValue={report.content}  />
                                                    </td>
                                                    <td>
                                                        {report.status == 0 ? "Ch??a duy???t" : "???? duy???t"}
                                                    </td>
                                                    <td>{report.create_date}</td>
                                                    <td>
                                                        {report.linkVideo == 0 ? "" :
                                                            <a
                                                                href={report.linkVideo}
                                                                target="_blank"
                                                                className="btn btn-primary btn-xs"
                                                            >Xem T???p</a>}

                                                        <br />
                                                        {report.status == 1 ? "" :
                                                            <a
                                                                data-toggle="modal" data-target="#myModalRating1"
                                                                className="btn btn-primary btn-xs"
                                                                onClick={() => getIdAndEmail(report.id, report.email)}
                                                            >
                                                                Duy???t
                                                            </a>}

                                                    </td>
                                                </tr>
                                            )})}
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <button
                                        type="button"
                                        class="btn btn-outline-primary"
                                        disabled={pageHienTai == 0}
                                        onClick={() => chuyenTrang(pageHienTai - 1)}
                                    >
                                        Tr?????c
                                    </button>
                                    {pageHienTai}
                                    <button
                                        type="button"
                                        class="btn btn-outline-primary"
                                    onClick={() => chuyenTrang(pageHienTai + 1)}
                                    >
                                        Sau
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="myModalRating1" className="modal fade" role="dialog">
            <div className="modal-dialog w-40-p">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">??</button>
                  <h4 className="modal-title">Duy???t</h4>
                </div>

                <div className="modal-body">
                  <form acceptCharset="utf-8" />
                  <div className="form-group">
                    <label htmlFor>G???i t???i: {email}</label>
                    </div>
                  <div className="form-group">
                    <label htmlFor>N???i dung email</label>
                    <textarea name="content" className="form-control h-100" cols={20} rows={10} onChange={(event) => setLoiNhan(event.target.value)} required 
                    defaultValue={"Xin ch??o b???n, th?? n??y ???????c g???i t??? website h???c tr???c tuy???n ALED, ch??ng t??i ???? xem x??t v??? b??o c??o c???a b???n. Quy???t ?????nh c???a ch??ng t??i l?? : "}  />
                  </div>
                  <button type="submit" className="btn btn-default btn-success" name="form_rating" onClick={guiVaDuyet}>G???i v?? duy???t ????n</button>
                </div>
               
                <div className="modal-footer">
                  <button type="button" className="btn btn-default bg-ddd c-000 bd-0" data-dismiss="modal"><b>????ng</b></button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}
