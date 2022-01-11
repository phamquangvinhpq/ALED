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
    if(event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpeg"){
      swal("Thất bại", "Chỉ được chọn file jpeg/png", "warning")
      document.getElementById("uploadFile").value=""
    } else{
      setSelectedFile(event.target.files[0]);
    }
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
      swal("Failed", "Giá giá chỉ được nhập số", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.courseName)){
      swal("Failed", "Tên khóa học không được để trống", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.description)){
      swal("Failed", "Mô tả không được để trống", "warning")
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
              text: `yêu cầu nhập giá  `,
              icon: "warning",
            });
          }else{
            setIsEnable(isEnable +1)
            history.push(`/giangvien/AllCourses/`);
            swal("Thông báo", "Thêm khóa học thành công", "success")
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
            <label htmlFor className="col-sm-3 control-label">Tiêu đề khóa học *</label>
            <div className="col-sm-9">
              <input type="text" name="courseName" className="form-control" onChange={onInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Giá khóa học *</label>
            <div className="col-sm-9">
              <input type="text" name="price" className="form-control" onChange={onInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Mô tả *</label>
            <div className="col-sm-9">
              <textarea className="form-control h-120" name="description" onChange={onInputChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Ảnh *</label>
            <div className="col-sm-6 pt_5">
              <input type="file" name="image" id='uploadFile' onChange={changeHandler} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor className="col-sm-3 control-label">Chọn Danh mục *</label>
            <div className="col-sm-6">
              <select className="form-control w-100-p" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
                <option>-- Chọn Danh mục --</option>

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
                addCourse} name="form1">Thêm khóa học</button>
            </div>
          </div>

        </form>
      </div>
    </div>

  )
}
