import React, { useEffect, useState } from 'react'
import swal from "sweetalert";
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useHistory } from "react-router-dom";

export default function UpdateKH() {

  let history = useHistory();
  const chuyentrang = function (event) {
    if(updateCourse() === true){
      swal("Thành Công", "Sửa khóa học thành công", "success")
      history.push(`/giangvien/AllCourses/`);
    }
  }

  const [selectedFile, setSelectedFile] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    
    BaiGiang.image=URL.createObjectURL(event.target.files[0])

  };



  const [danhmuc, setdanhmuc] = useState([]);

  const [selectedDanhMuc, setSelectedDanhMuc] = useState(-1);
  const [isEnable, setIsEnable] = useState(0);
  const [BaiGiang, setBaiGiang] = useState({
    courseName: "",
    price: "",
    image: "",
    description: "",
    status: "",
    category_id: "",
    author_id: ""
  })



  const [data, setdata] = useState({
    courseName: "",
    price: "",
    image: "",
    description: "",
    status: "",

  })


  useEffect(() => {

    loadCategory();
    dulieusua();
    
  }, [

  ])


  const onInputChange = (event) => {
    const { name, value } = event.target;
    setBaiGiang({
      ...BaiGiang,
      [name]: value,

    });
    console.log(event.target.value)
  }

  let id = useParams();
  let user_id = localStorage.getItem("userid")


  const updateCourse = (e) => {
    const price = Number(BaiGiang.price)
    var regexKhoangTrang = /\S/;
    if(Number.isNaN(price)){
      swal("Thất bại", "Price chỉ được nhập số", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.courseName)){
      swal("Thất bại", "courseName không được bỏ trống", "warning")
    }else if(!regexKhoangTrang.test(BaiGiang.description)){
      swal("Thất bại", "courseName không được bỏ trống", "warning")
    }
    else{
      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append("id", id.id);
      formdata.append("courseName", BaiGiang.courseName);
      formdata.append("price", price);
      formdata.append("file",selectedFile);
      formdata.append("description", BaiGiang.description);
      formdata.append("status", "1");
      formdata.append("category_id", selectedDanhMuc);
      formdata.append("user_id", user_id);
      formdata.append("author_id", "1");
      formdata.append("image", "hello");
      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${DEFAULT_API}` + "course/edit", requestOptions)
        .then(response => response.text())
        .then(result => {
          setIsEnable(isEnable + 1)
        })
        .catch(error => console.log('error', error));
      }
      return true;
  }


  const dulieusua = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `course/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSelectedDanhMuc(result[0].category_id)
        setdata(result);
        {result.map((value,index)=>{
          setBaiGiang(value)
        })}
        
  

      })
      .catch(error => console.log('error', error));
  }


  const onChangeDanhMuc = (event) => {
    setSelectedDanhMuc(event.target.value);
    console.log(event.target.value);
  };



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



  // const layid = (value) => {
  //   setgiatriID(value.id)

  //   dulieusua();
  // }


  return (
    <div>
      <div className="col-md-9">
        <div className="nav-tabs-custom instructor-content-tab">
          <div className="tab-pane active" id="tab_info">
            <div className="box box-info pt_0">
              <div className="box-body">
               
                  <form className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Course Title *</label>
                      <div className="col-sm-9">

                        <input type="text" name="courseName" className="form-control" onChange={onInputChange} value={BaiGiang.courseName} />

                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Course Price</label>
                      <div className="col-sm-9">

                        <input type="text" name="price" className="form-control" onChange={onInputChange} value={BaiGiang.price} />

                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Description
                        *</label>
                      <div className="col-sm-9">

                        <input className="form-control h-120" name="description" value={BaiGiang.description} onChange={onInputChange} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Featured Photo *</label>
                      <div className="col-sm-6 pt_5">
                        <input  type="file" name="image"  onChange={changeHandler} accept="image/*" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">          </label>
                      <div className="col-sm-9">

                      <img src={BaiGiang.image} className="w-100" />
                      </div>
                    </div>

                    
                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Status *</label>
                      <div className="col-sm-9">

                        <input className="form-control editor" name="status" value={BaiGiang.status} onChange={onInputChange} />

                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor className="col-sm-3 control-label">Selece Category *</label>
                      <div className="col-sm-6">
                        <select className="form-control" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
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
                          (event) => {
                            chuyentrang(event)
                          }} name="form1">Update</button>
                      </div>
                    </div>
                  </form>
            
              </div>
            </div>
          </div>
        </div>

      </div></div>
  )
}
