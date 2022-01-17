import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from "../../../conf/env";


export default function Exam() {
    let id = useParams();
    const [dscauhoi, setdscauhoi] = useState([]);
    const arr = [

    ]
    let history = useHistory();
    const [xacnhanlambai, setxacnhanlambai] = useState({});
    const [trangthai, settrangthai] = useState(-1);



    var username = localStorage.getItem("username")

    const [dethi, setdethi] = useState({});
    var courseid = localStorage.getItem("courseid");
    const loadcauhoi = () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/exams/` + id.id + `/questions?username=` + username + `&courseid=` + courseid, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message == "loi") {
                    window.location.reload();
                }

                if (result.message == "not valid due to validation error: ") {

                    thongbaodiem();
                }

                else {
                    setdscauhoi(result.questions)
                }

            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        baithiuser();
        loadcauhoi();



    }, [trangthai])

    const laydulieu = (questionsid, choics, poin, giatriid) => {
        console.log(questionsid);
        var choiss = []
        console.log(choics);
        {
            choics.map((value, index) => {
                if (value.id == giatriid) {
                    value.isCorrected = 1
                }
                else {
                    value.isCorrected = 0
                }
                console.log(value);
            })
        }

        arr.push({
            "questionId": questionsid,
            "choices": choics,
            "point": poin
        })

        var uniqueArray = arr
            .map(v => v['questionId'])
            .map((v, i, array) => array.indexOf(v) === i && i)
            .filter(v => arr[v])
            .map(v => arr[v]);

        var json = JSON.stringify(uniqueArray)
        console.log(json);


    }

    const baithiuser = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/exams/` + id.id, requestOptions)
            .then(response => response.json())
            .then(result => {
                setxacnhanlambai(result)
            })
            .catch(error => console.log('error', error));
    }




    const thongbaodiem = () => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/exams/` + id.id + `/users/` + username + `/result`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.totalPoint >= 80) {
                    swal({
                        title: "Bạn đã hoàn thành bài kiểm tra:" + result.totalPoint,
                        text: "Thời gian hoàn thành:" + result.userTimeFinish,
                        icon: "success",
                        buttons: ["Làm Lại", "Tiếp Tục"],

                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                history.goBack();
                            } else {
                                lamlai();
                            }
                        });

                }
                else {
                    swal({
                        title: "Chưa đạt đủ yêu cầu:" + result.totalPoint,
                        text: "Thời gian hoàn thành:" + result.userTimeFinish,
                        icon: "warning",
                        buttons: ["Làm Lại", "Tiếp Tục"],

                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                history.goBack();
                            } else {
                                lamlai();
                            }
                        });
                }
            })
            .catch(error => console.log('error', error));
    }


    const lamlai = () => {
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `api/lamlai/?id=` + id.id + `&username=` + username, requestOptions)
            .then(response => response.text())
            .then(result => { settrangthai(trangthai + 1) })
            .catch(error => console.log('error', error));
    }

    const sunmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var uniqueArray = arr
            .map(v => v['questionId'])
            .map((v, i, array) => array.indexOf(v) === i && i)
            .filter(v => arr[v])
            .map(v => arr[v]);
        var raw = JSON.stringify(uniqueArray)
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(`${DEFAULT_API}` + `api/exams/` + id.id + `/questions-by-user?isFinish=true&username=` + username, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                thongbaodiem();
            })
            .catch(error => console.log('error', error));
    }
    return (

        <div className="container">
            <div className="problems-wrapper">
                <div>Trắc nghiệm cuối bài</div>
                <p1 style={{ fontSize: 'small' }}>0.0/10.0 points(graged)</p1>
                {dscauhoi.map((value, index1) =>
                    <div>
                        <div>
                            <div className="title">Câu {index1 + 1} :</div>

                            <div className="form-control" type="text" aria-label="Disabled input example">
                                {value.questionText} ?
                            </div>
                        </div>
                        <div>
                            <div className="shop_sidebar_area">
                                <div className="widget brands mb-50">
                                    <div className="widget-desc">
                                        {/* Single Form Check */}
                                        {value.choices.map((giatr1, index) =>
                                            <div className="form-control" id="group-button">
                                                <input className="form-check-input" id="choice1A" name={index1} type="radio" onChange={() => laydulieu(value.id, value.choices, value.point, giatr1.id)} />
                                                <label className="padding-left-10 form-check-label" htmlFor="amado"> {giatr1.choiceText}</label>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <br></br>
            <button onClick={sunmit}>submit</button>

        </div>

    )
}