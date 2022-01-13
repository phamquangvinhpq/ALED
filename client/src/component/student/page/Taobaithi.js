import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Taobaithi() {

    var arr = []
    let user_id = localStorage.getItem("userid")
    var username=localStorage.getItem("username")

    const [baigiang, setbaigiang] = useState([])
    const [selectedSection, setSelectedSection] = useState(-1);
    const [section, setsection] = useState([])
    const [danhsachcauhoi, setdanhsachcauhoi] = useState([])

    const [PartID, SetPartid] = useState([])
    const [trangthai, settrangthai] = useState(1)
    const [diem, setdiem] = useState(0)

    const [cauhoidachon, setcauhoidachon] = useState(arr)


    const [baithi, setbaithi] = useState({
        title:''
    });

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setbaithi({
            ...baithi,
            [name]: value,
        });
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


    function dulieumang() {

        var uniqueArray = arr
            .map(v => v['questionId'])
            .map((v, i, array) => array.indexOf(v) === i && i)
            .filter(v => arr[v])
            .map(v => arr[v]);
        var json = JSON.stringify(uniqueArray)
        console.log(json);

        var tong = 0;
        {
            uniqueArray.map((value, index) =>
                tong += value.point
            )
        }
        setdiem(tong)
        console.log(tong);
        console.log(uniqueArray);

    }



    function myFunction(value, index, id) {
        var checkchecked = document.getElementById(`check` + id).checked
        console.log(checkchecked);

        if (checkchecked == true) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(0);
            var cell3 = row.insertCell(0);
            var cell4 = row.insertCell(0);

            cell4.innerHTML = index;
            cell3.innerHTML = value.questionText;
            cell1.innerHTML = value.point;
            cell2.innerHTML = value.questionType.description;
        }
        else {
            document.getElementById("myTable").deleteRow(1);
            alert("ok")
        }

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
       

        if (tong != 100) {
            alert("số điểm bài thi phải 100 điểm")
        } else {
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
            fetch(`http://localhost:8080/api/exams/?partId=28&isShuffle=true&username=`+username, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
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
                        <label className="col-md-4 control-label" htmlFor="textinput">tên bài kiểm tra</label>
                        <div className="col-md-4">
                            <input id="textinput" name="title" type="text" placeholder="placeholder"  className="form-control input-md" onChange={onInputChange} />
                            <span className="help-block"></span>
                        </div>
                    </div>
                    {/* Text input*/}

                </fieldset>
            </form>

            <div className="table-responsive">
                <h4>Danh sách bài thi</h4>
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
                <p>{diem}</p>
                <h4>Danh sách câu hỏi đã chọn</h4>
                <table class="table" id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>


                            <th scope="col">Câu hỏi</th>
                            <th scope="col">Loại câu hỏi</th>
                            <th scope="col">Điểm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cauhoidachon.map((value, index) =>
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{value.questionText}</td>
                                <td>{value.point}</td>
                                <td> {value.questionType.description}</td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
            <div className="form-group">
                <div className="col-md-4">
                    <a id="singlebutton" onClick={thembaithi} name="singlebutton" className="btn btn-primary">tạo bài thi</a>
                </div>
            </div>
        </div>
    )
}
