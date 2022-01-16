import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import swal from 'sweetalert';
import $ from "jquery";


export default function Question() {
    let user_id = localStorage.getItem("userid")
    const [baigiang, setbaigiang] = useState([])
    const [selectedSection, setSelectedSection] = useState(-1);
    const [selectedSection1, setSelectedSection1] = useState(-1);
    const [selectedSection3, setSelectedSection3] = useState(1);


    const [section, setsection] = useState([])
    const [danhsachcauhoi, setdanhsachcauhoi] = useState([])

    const [PartID, SetPartid] = useState([])
    const [trangthai, settrangthai] = useState(1)

    const [Cauhoi, setCauhoi] = useState({
        point: "",
        questionText: "",
        choice_text1: "",
        choice_text2: "",
        choice_text3: "",
        choice_text4: "",
        isCorrected1: '',
        isCorrected2: '',
        isCorrected3: '',
        isCorrected4: '',
    });

    const cancelCourse = (event) => {
        document.getElementById("create-course-form").reset();

    }



    const onInputChange = (event) => {
        const { name, value } = event.target;
        setCauhoi({
            ...Cauhoi,
            [name]: value,
        });
    };


    useEffect(() => {

        loadBaiGiang();
        if (selectedSection1 != "-1") {
            loadcauhoi(selectedSection1)
        }


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

        if (event.target.value != "nodata") {
            setSelectedSection(event.target.value);

            loaddanhmuc(event.target.value);
        }

    };

    const onChangeSection1 = (event) => {
        if (event.target.value != "nodata") {
            setSelectedSection1(event.target.value);

            SetPartid(event.target.value)

            settrangthai(trangthai + 1)
        }


    };

    const onChangeSection3 = (event) => {
        setSelectedSection3(event.target.value)



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

    const taocauhoi = () => {
        var regexPoin = /[1-9][0-9]*/;
        if (!regexPoin.test(Cauhoi.point)) {
            swal("Failed", "Điểm phải là số dương", "warning")
        } else if (Cauhoi.isCorrected1 == 0 && Cauhoi.isCorrected2 == 0 && Cauhoi.isCorrected3 == 0 && Cauhoi.isCorrected4 == 0) {
            swal("Failed", "Vui Lòng chọn đáp án dúng", "warning")
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            if (selectedSection3 == 2) {
                var raw = JSON.stringify({
                    "point": Cauhoi.point,
                    "questionText": Cauhoi.questionText,
                    "choices": [
                        {
                            "choiceText": "Đúng",
                            "isCorrected": Cauhoi.isCorrected1
                        },
                        {
                            "choiceText": "Sai",
                            "isCorrected": Cauhoi.isCorrected2
                        },

                    ]
                });
            }
            else {
                var raw = JSON.stringify({
                    "point": Cauhoi.point,
                    "questionText": Cauhoi.questionText,
                    "choices": [
                        {
                            "choiceText": Cauhoi.choice_text1,
                            "isCorrected": Cauhoi.isCorrected1
                        },
                        {
                            "choiceText": Cauhoi.choice_text2,
                            "isCorrected": Cauhoi.isCorrected2
                        },
                        {
                            "choiceText": Cauhoi.choice_text3,
                            "isCorrected": Cauhoi.isCorrected3
                        },
                        {
                            "choiceText": Cauhoi.choice_text4,
                            "isCorrected": Cauhoi.isCorrected4
                        }
                    ]
                });
            }



            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };


            fetch(`${DEFAULT_API}` + `api/questions?questionType=MC&&partId=` + PartID, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.loicode == "-1") {
                        swal("Failed", result.message, "warning")


                    }
                    else {
                        swal("Thông báo", "Thêm thành công", "success")
                            .then(
                                document.getElementById("dongclick").click()
                            )
                        cancelCourse();
                        settrangthai(trangthai + 1)
                    }


                })
                .catch(error => console.log('error', error));
        }
    }
    const dapandung1 = (even) => {
        Cauhoi.isCorrected1 = 1
        Cauhoi.isCorrected2 = 0
        Cauhoi.isCorrected3 = 0
        Cauhoi.isCorrected4 = 0
    }
    const dapandung2 = (even) => {
        Cauhoi.isCorrected2 = 1
        Cauhoi.isCorrected1 = 0
        Cauhoi.isCorrected3 = 0
        Cauhoi.isCorrected4 = 0
        console.log(Cauhoi);
    }
    const dapandung3 = (even) => {
        Cauhoi.isCorrected3 = 1
        Cauhoi.isCorrected2 = 0
        Cauhoi.isCorrected1 = 0
        Cauhoi.isCorrected4 = 0
        console.log(Cauhoi);
    }
    const dapandung4 = (even) => {
        Cauhoi.isCorrected4 = 1
        Cauhoi.isCorrected2 = 0
        Cauhoi.isCorrected3 = 0
        Cauhoi.isCorrected1 = 0
        console.log(Cauhoi);
    }

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
                console.log(result.status);
                console.log(danhsachcauhoi);
            })
            .catch(error => console.log('error', error));
    }

    const clicksetdiem = (value) => {

        Cauhoi.point = value
        console.log(Cauhoi.point);
    }

    const typecauhoi = () => {
        if (selectedSection3 == 1) {
            return <div>
                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">Câu hỏi *</label>
                    <div className="col-sm-9">
                        <input type="text" name="questionText" className="form-control" onChange={onInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 1</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung1(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text1" aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 2</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung2(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text2" aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 3</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung3(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text3" aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 4</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung4(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text4" aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">Điểm</label>
                    <div className="col-sm-9">
                        &ensp;  <button type="button" class="btn btn-outline-primary" onClick={() => clicksetdiem(5)}>5 Điểm</button>
                        &ensp;  <button type="button" class="btn btn-outline-secondary" onClick={() => clicksetdiem(10)}>10 Điểm</button>
                        &ensp;   <button type="button" class="btn btn-outline-success" onClick={() => clicksetdiem(20)}>20 Điểm</button>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-6">
                        <a className="btn btn-default btn-success" onClick={taocauhoi} name="form1" >Thêm</a>
                    </div>
                </div>
            </div>
        }
        else {
            return <div>
                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">Câu hỏi *</label>
                    <div className="col-sm-9">
                        <input type="text" name="questionText" className="form-control" onChange={onInputChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 1</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung1(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text1" Value="Đúng" disabled aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">đáp án 2</label>
                    <div className="col-sm-9">
                        <div className=" input-group">
                            <span className="input-group-addon">
                                <input type="radio" aria-label="..." name="flexRadioDefault" value="1" onChange={(e) => dapandung2(e)} />
                            </span>
                            <input type="text" className="form-control" name="choice_text2" Value="sai" disabled aria-label="..." onChange={onInputChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">Điểm</label>
                    <div className="col-sm-9">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        &ensp;  <label className="btn btn-secondary active">
                                <input type="radio" name="options" class="btn btn-outline-primary"  id="option1" autoComplete="off" defaultChecked onClick={() => clicksetdiem(5)} /> 5 Điểm
                            </label>
                            &ensp;  <label className="btn btn-secondary">
                                <input type="radio" name="options" class="btn btn-outline-primary"  id="option2" autoComplete="off" onClick={() => clicksetdiem(10)} /> 10 Điểm
                                &ensp;   </label>
                            <label className="btn btn-secondary">
                                <input type="radio" name="options" class="btn btn-outline-primary"  id="option3" autoComplete="off" onClick={() => clicksetdiem(20)}/> 20 Điểm
                            </label>
                        </div>

                         
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-6">
                        <a className="btn btn-default btn-success" onClick={taocauhoi} name="form1" >Thêm</a>
                    </div>
                </div>
            </div>
        }
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
                            <h4 className="modal-title">Thêm câu hỏi</h4>
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
                                                    <select className="form-control w-100-p" value={selectedSection1} onChange={onChangeSection1}>
                                                        <option value="nodata">chọn chương</option>
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
                                                <label htmlFor className="col-sm-3 control-label" >Loại Câu Hỏi</label>
                                                <div className="col-sm-9">
                                                    <select className="form-control w-100-p" onChange={onChangeSection3}>
                                                        <option value="1">Một Lựa Chọn</option>
                                                        <option value="2">Đúng Sai</option>

                                                    </select>
                                                </div>
                                            </div>


                                            {typecauhoi()}



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
                    <h3>Ngân hàng câu hỏi</h3>
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
                                <option value="nodata" >chọn chương</option>
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

                                    <h3 className="sec_title">Danh sách câu hỏi</h3>
                                    <div className="table-responsive">
                                        <table id className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Câu hỏi</th>
                                                    <th>Danh Mục</th>
                                                    <th>Loại câu hỏi</th>
                                                    <th>Điểm</th>
                                                    {/* <th className="w-100">hành động</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {danhsachcauhoi.map((value, index) =>
                                                    <tr key={index} >
                                                        <td>{index + 1}</td>
                                                        <td>{value.questionText}</td>
                                                        <td>
                                                            {value.section.name}
                                                        </td>
                                                        <td>
                                                            {value.questionType.description}
                                                        </td>

                                                        <td>  {value.point} </td>
                                                        {/* <td>
                                                            <a className="btn btn-primary btn-sm btn-block">
                                                                xóa							</a>
                                                            <a onClick={() => cliclupdate(value)} className="btn btn-primary btn-sm btn-block">
                                                                Edit									</a>

                                                        </td> */}
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