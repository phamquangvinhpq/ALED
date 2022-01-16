import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import swal from 'sweetalert';

export default function Dsbaithi() {
    var arr = []
    let user_id = localStorage.getItem("userid")
    var username = localStorage.getItem("username")

    const [baigiang, setbaigiang] = useState([])
    const [selectedSection, setSelectedSection] = useState([]);
    const [section, setsection] = useState([])
    const [danhsachcauhoi, setdanhsachcauhoi] = useState([])
    const [idkhoahoc, setidkhoahoc] = useState([])
    const [PartID, SetPartid] = useState([])
    const [trangthai, settrangthai] = useState(1)
    const [diem, setdiem] = useState(0)

    const [cauhoidachon, setcauhoidachon] = useState(arr)


    const [baithi, setbaithi] = useState({
        title: ''
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
       baithi.title=event.target.value
    };

    const cancelCourse = () => {
        document.getElementById("create-course-form").reset();
    }


    useEffect(() => {
        loadBaiGiang();


    }, [
        trangthai
    ])

    const loadBaiGiang = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'GET',
            headers: myHeaders,

            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `course/user/${user_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setbaigiang(result)
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }

    const onChangeSection = (event) => {
        setSelectedSection(event.target.value);
        setidkhoahoc(event.target.value)
        console.log(event.target.value);
        console.log(selectedSection);
        if (event.target.value != "nodata") {
            loaddanhmuc(event.target.value);
        }

    };

    


    const loaddanhmuc = async (value) => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/` + value, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setsection(result);
            })
            .catch((error) => console.log("error", error));
    };


    const loadcauhoi = (value) => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/parts/` + value + `/questions`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setdanhsachcauhoi(result.data)

            })
            .catch(error => console.log('error', error));
    }



    const laydulieu = (value, id) => {

        var checkchecked = document.getElementById(`check` + id).checked
        console.log(checkchecked);

        if (checkchecked == true) {

            arr.push({
                "questionId": value.id,
                "point": value.point
            })

        }
        else {
            console.log("ok11");
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].questionId === value.id) {
                    console.log("ok");
                    console.log(arr[i].questionId);
                    arr.splice(i, 1);
                }
                else {

                }
            }

        }



        var uniqueArray = arr
            .map(v => v['questionId'])
            .map((v, i, array) => array.indexOf(v) === i && i)
            .filter(v => arr[v])
            .map(v => arr[v]);
        var json = JSON.stringify(uniqueArray)

        console.log(json);


    }


    const thembaithi = () => {

        var uniqueArray = arr
            .map(v => v['questionId'])
            .map((v, i, array) => array.indexOf(v) === i && i)
            .filter(v => arr[v])
            .map(v => arr[v]);
        
        var tong = 0;
        {
            uniqueArray.map((value, index) =>
                tong += value.point
            )
        }
       
        document.getElementById("diem").value=tong+"/100"

        if (tong != 100) {
            swal("Failed", "Tổng Điểm bài thi bằng 100", "warning")
         
        } else if(baithi.title == ''){
            swal("Failed", "không được để trống name", "warning")
        }
         else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw1 = JSON.stringify(uniqueArray)

            var raw = JSON.stringify({
                "title": baithi.title,
                "questionData": raw1
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(`${DEFAULT_API}` + `api/exams/?partId=`+PartID+`&isShuffle=true&username=` + username+`&courseid=`+idkhoahoc, requestOptions)
                .then(response => response.json())
                .then(result => {console.log(result)
                   
                    if (result.loicode == "-1") {        
                        swal("Failed", result.message, "warning")
                       

                    }
                    else {
                        swal("Thông báo", "Thêm thành công", "success")
                        .then(
                            document.getElementById("dongclick").click()
                    )
                    cancelCourse();
                   
                    }
                
                })
                .catch(error => console.log('error', error));
        }
    }



    const onChangeSection1 = (event) => {

        SetPartid(event.target.value)
        loadcauhoi(event.target.value)
        loadbaithi(event.target.value)


    };



    const [danhsachbaithi, setdanhsachbaithi] = useState([])

    const [selectedSectionbaithi, setSelectedSectionbaithi] = useState(-1);



    // -----------------------------------------------------------
    const loadbaithi = (value) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/getexambyid/` + value, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setdanhsachbaithi(result)
            }
            )
            .catch(error => console.log('error', error));
    }

    return (
        <div>

            <div className="modal" id='add_question' tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog w-60-p">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                            <h4 className="modal-title">Thêm Bài Thi</h4>
                        </div>


                        <div className="modal-body">
                            <form className="form-horizontal"
                                encType="multipart/form-data"
                                acceptCharset="utf-8"

                            >
                                <div className="form-group mb_5 ovh">
                                    <div className="col-md-11">
                                        <form className="form-horizontal" id='create-course-form' >
                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label" >Khóa học  <span>*</span></label>
                                                <div className="col-sm-9">
                                                    <select className="form-control w-100-p" value={selectedSection}
                                                        onChange={onChangeSection} >
                                                        <option value="nodata" >chọn khóa học</option>
                                                        {baigiang.map((value, index) => {
                                                            return (
                                                                <option value={value.id} key={index}>
                                                                    {value.courseName}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label" >Chương <span>*</span></label>
                                                <div className="col-sm-9">
                                                    <select className="form-control w-100-p" onChange={onChangeSection1}>
                                                        <option >chọn chương</option>
                                                        {section.map((value, index) => {
                                                            return (
                                                                <option value={value.id} key={index}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">Tên Bài Thi *</label>
                                                <div className="col-sm-9">
                                                    <input type="text" name="title" className="form-control" onChange={onInputChange} />
                                                </div>
                                            </div>
                                            <h4 className="modal-title">Danh Sách Câu Hỏi</h4>
                                            <input id='diem' disabled></input>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th>Id</th>
                                                        <th>Câu hỏi</th>
                                                        <th>Loại câu hỏi</th>
                                                        <th>Điểm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {danhsachcauhoi.map((value, index) =>

                                                        <tr key={index} >
                                                            <td> <input type="checkbox" id={`check` + index} onClick={() => laydulieu(value, index)} /></td>
                                                            <td>{index + 1}</td>
                                                            <td>{value.questionText}</td>
                                                            <td>
                                                                {value.questionType.description}
                                                            </td>
                                                            <td>   {value.point} </td>
                                                        </tr>
                                                    )}

                                                </tbody>
                                            </table>

                                            <div className="form-group">
                                                <div className="col-sm-offset-0 col-sm-6">
                                                    <a className="btn btn-default btn-success" onClick={thembaithi} name="form1" >Thêm</a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </form>

                        </div>


                        <div className="modal-footer">
                            <button
                                id='dongclick'
                                type="button"
                                onClick={cancelCourse}
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="col-md-9">
                <form className="form-horizontal" >
                    <h3>Dang Sách Đề Thi</h3>
                    <a data-target="#add_question" data-toggle="modal">Thêm Mới</a>
                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label" >Khóa học  <span>*</span></label>
                        <div className="col-sm-9">
                            <select className="form-control w-100-p" value={selectedSection}
                                onChange={onChangeSection} >
                                <option value="nodata" >chọn khóa học</option>
                                {baigiang.map((value, index) => {
                                    return (
                                        <option value={value.id} key={index}>
                                            {value.courseName}
                                        </option>
                                    );
                                })}

                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label" >Chương <span>*</span></label>
                        <div className="col-sm-9">
                            <select className="form-control w-100-p" onChange={onChangeSection1}>
                                <option >chọn chương</option>
                                {section.map((value, index) => {
                                    return (
                                        <option value={value.id} key={index}>
                                            {value.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>


                    <div className="tab-content">
                        <div className="tab-pane active" id="tab_chapter">
                            <div className="box box-info pt_0">
                                <div className="box-body">


                                    <div className="table-responsive">
                                        <table id className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Tên Bài Thi</th>
                                                    <th>Danh Mục</th>

                                                    <th>Điểm</th>
                                                    {/* <th className="w-100">hành động</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {danhsachbaithi.map((value, index) =>
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td> {value.title}</td>
                                                        <td>
                                                            {value.section.name}
                                                        </td>
                                                        <td>  100  </td>
                                                    </tr>
                                                )}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
