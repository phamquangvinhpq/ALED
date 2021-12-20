import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
export default function AddKH() {

  const [BaiGiang, setBaiGiang] = useState({
    courseName: "",
    price: "",
    image: "",
    description: "",
    status: "",
    category_id: "",
    author_id: "",
    users_id: "",
  })

  let history = useHistory();

  const [selectedFile, setSelectedFile] = useState();

  const [danhmuc, setdanhmuc] = useState([]);

  const [selectedDanhMuc, setSelectedDanhMuc] = useState(-1);

  const [giangvien, setGiangVien] = useState([]);

  const [selectedGiangVien, setSelectedGiangVien] = useState(-1);

  const [formdata, setformdata] = useState([])

  const [isEnable, setIsEnable] = useState(0);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {

    loadAuthor();
    loadCategory();
  }, [
    isEnable
  ])

  let id = localStorage.getItem("userid")


  const loadAuthor = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "author", requestOptions)
      .then(response => response.json())
      .then(result => {
        setGiangVien(result)
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  const loadCategory = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "category/", requestOptions)
      .then(response => response.json())
      .then(result => {
        setdanhmuc(result)
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setBaiGiang({
      ...BaiGiang,
      [name]: value,
    });
    console.log(event.target.value);
  };

  const onChangeDanhMuc = (event) => {
    setSelectedDanhMuc(event.target.value);
    console.log(event.target.value);
  };

  const addCourse = () => {
    const price = Number(BaiGiang.price)
    var regexKhoangTrang = /\S/;
    if(Number.isNaN(price)){
      swal("Thất bại", "Price chỉ được nhập số", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.courseName)){
      swal("Thất bại", "courseName không được bỏ trống", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.description)){
      swal("Thất bại", "courseName không được bỏ trống", "warning")
    }else{
      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append("courseName", BaiGiang.courseName);
      formdata.append("price", price);
      formdata.append("file", selectedFile);
      formdata.append("description", BaiGiang.description);
      formdata.append("status", "0");
      formdata.append("category_id", selectedDanhMuc);
      formdata.append("user_id", id);
      formdata.append("author_id", id);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      fetch(`${DEFAULT_API}` + "course/save", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if(result.loicode==-1){
            swal("nhập đầy đủ thông tin", {
              text: `yêu cầu ` + " " + result.details ,
              icon: "warning",
            });
          }else{
            setIsEnable(isEnable +1)
            history.push(`/giangvien/AllCourses/`);
          }
        })
        .catch((error) => console.log("error", error));
      }
  };

  return (
    
    <div className="chinhsua">
      <div className="col-md-9">
        <form action="" className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Course Title *</label>
            <div className="col-sm-9">
              <input type="text" name="courseName" className="form-control" onChange={onInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Course Price *</label>
            <div className="col-sm-9">
              <input type="text" name="price" className="form-control" onChange={onInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Description *</label>
            <div className="col-sm-9">
              <textarea className="form-control h-120" name="description" onChange={onInputChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Featured Photo *</label>
            <div className="col-sm-6 pt_5">
              <input type="file" name="image" onChange={changeHandler} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Selece Category *</label>
            <div className="col-sm-6">
              <select className="form-control select2 w-100-p" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
                <option>-- Chọn danh mục --</option>

                {danhmuc.map((value, index) => {
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
            <div className="col-sm-offset-3 col-sm-9">
              <button type="button" className="btn btn-success pull-left c-button" onClick={
                addCourse} name="form1">Add Course</button>
            </div>
          </div>

        </form>
      </div>
    </div>

  )
}
