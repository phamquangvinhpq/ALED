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


        fetch(`http://localhost:8080/api/questions?questionType=MC&&partId=` + PartID, requestOptions)
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

        fetch(`http://localhost:8080/api/parts/` + value + `/questions`, requestOptions)
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
                    {/* Form Name */}
                    <legend>Form Name</legend>
                    {/* Select Basic */}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="selectbasic">khóa học</label>
                        <div className="col-md-4">
                            <select id="selectbasic" name="selectbasic" className="form-control" value={selectedSection}
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
                    {/* Select Basic */}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="selectbasic1">Select Basic</label>
                        <div className="col-md-4">
                            <select id="selectbasic" name="selectbasic" className="form-control" onChange={onChangeSection1}>
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
                    {/* Text input*/}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">câu hỏi</label>
                        <div className="col-md-4">
                            <input id="textinput" name="questionText" type="text" placeholder="placeholder" value={Cauhoi.questionText} className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"></span>
                        </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">đáp án 1</label>
                        <div className="col-md-4">
                            <input id="textinput" name="choice_text1" type="text" placeholder="placeholder" className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"><div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" onChange={(e) => dapandung1(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1"  >
                                    Đáp án đúng
                                </label>
                            </div>
                            </span>
                        </div>
                    </div>

                    {/* Text input*/}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">đáp án 2</label>
                        <div className="col-md-4">
                            <input id="textinput" name="choice_text2" type="text" placeholder="placeholder" className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"><div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" onChange={(e) => dapandung2(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Đáp án đúng
                                </label>
                            </div>
                            </span>
                        </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">đáp án 3</label>
                        <div className="col-md-4">
                            <input id="textinput" name="choice_text3" type="text" placeholder="placeholder" className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"><div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" onChange={(e) => dapandung3(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Đáp án đúng
                                </label>
                            </div></span>
                        </div>
                    </div>
                    {/* Text input*/}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">đáp án 4</label>
                        <div className="col-md-4">
                            <input id="textinput" name="choice_text4" type="text" placeholder="placeholder" className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"><div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1" onChange={(e) => dapandung4(e)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Đáp án đúng
                                </label>
                            </div></span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="textinput">điểm</label>
                        <div className="col-md-4">
                            <input id="textinput" name="point" type="text" placeholder="placeholder" className="form-control input-md" onChange={onInputChange} />
                        </div>
                    </div>
                    {/* Button */}
                    <div className="form-group">
                        <label className="col-md-4 control-label" htmlFor="singlebutton">Single Button</label>
                        <div className="col-md-4">
                            <a id="singlebutton" onClick={taocauhoi} name="singlebutton" className="btn btn-primary">Button</a>
                        </div>
                    </div>
                </fieldset>
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
