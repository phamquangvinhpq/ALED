import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Taocauhoi() {
    let user_id = localStorage.getItem("userid")
    const [baigiang, setbaigiang] = useState([])
    const [selectedSection, setSelectedSection] = useState(-1);
    const [section, setsection] = useState([])
    const [danhsachcauhoi, setdanhsachcauhoi] = useState([])

    const [PartID, SetPartid] = useState([])

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

    const cancelCourse = () => {
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

    }, [

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
        console.log(event.target.value);
        console.log(selectedSection);
        if (event.target.value != "nodata") {
            loaddanhmuc(event.target.value);
        }

    };

    const onChangeSection1 = (event) => {

        SetPartid(event.target.value)
        loadcauhoi(event.target.value)


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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


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

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(`${DEFAULT_API}` + `api/questions?questionType=MC&&partId=` + PartID, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

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

    const cliclupdate = (value) => {

        setCauhoi(Cauhoi.questionText = value.questionText)
    }

    return (
        <div>
            <form className="form-horizontal" id='create-course-form'>
                <fieldset>
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
                                    <input type="text" name="courseName" name="point" className="form-control" onChange={onInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-3 col-sm-6">
                                    <a className="btn btn-default btn-success" onClick={cancelCourse} name="form1">xóa</a>

                                    <a type="submit" className="btn btn-default btn-success" onClick={taocauhoi} name="form1">Thêm</a>
                                </div>
                            </div>
                        
                </fieldset>
            </form>


            <form className="form-horizontal"
                encType="multipart/form-data"
                acceptCharset="utf-8"
                id='create-course-form'
            >
                <div className="form-group mb_5 ovh">
                    <div className="col-md-9">
                        <form className="form-horizontal" >
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
                                    <input type="text" name="courseName" name="point" className="form-control" onChange={onInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-3 col-sm-6">
                                    <a className="btn btn-default btn-success" onClick={cancelCourse} name="form1">xóa</a>

                                    <a type="submit" className="btn btn-default btn-success" onClick={taocauhoi} name="form1">Thêm</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </form>



            <div className="table-responsive">
                <table className="table table-bordered t3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Câu hỏi</th>
                            <th>Danh Mục</th>
                            <th>Loại câu hỏi</th>
                            <th>Điểm</th>
                            <th className="w-100">hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {danhsachcauhoi.map((value, index) =>
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{value.questionText}</td>
                                <td>
                                    {value.questionText}
                                </td>
                                <td>
                                    ok
                                </td>

                                <td>ok</td>
                                <td>
                                    <a className="btn btn-primary btn-sm btn-block">
                                        xóa							</a>
                                    <a onClick={() => cliclupdate(value)} className="btn btn-primary btn-sm btn-block">
                                        Edit									</a>

                                </td>
                            </tr>

                        )}

                    </tbody>
                </table>
            </div>

        </div>
    )
}
