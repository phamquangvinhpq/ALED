import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env';
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function EditCategory() {

  const [DanhMuc, setDanhMuc] = useState({
    name: ''
  })
  const [isEnable, setIsEnable] = useState(0);

  useEffect(() => {
    if(isNaN(id.id))
    {
      history.push("/404")
      window.location.reload();
    }
    loadcate();

  }, [
    isEnable
  ])

  let id = useParams()

  let history = useHistory();


  const loadcate = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `category/${id.id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("đã dến");
        console.log(result);
        setDanhMuc(result)


      })
      .catch(error => console.log('error', error));
  }

  const updateCate = () => {
    var regexKhoangTrang = /\S/;
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if (!regexName.test(DanhMuc.name)) {
      swal("Failed", "Tên Chỉ có thể nhập văn bản và không được để trống", "warning")
    } else if (!regexKhoangTrang.test(DanhMuc.name)) {
      swal("Failed", "Tên không được để trống", "warning")

    } else if (regexKitu.test(DanhMuc.name)) {
      swal("Failed", "Tên không được chứa ký tự", "warning")

    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": id.id,
        "name": DanhMuc.name,
      });

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${DEFAULT_API}` + "category/edit", requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.loicode == -1) {
            swal("nhập đầy đủ thông tin", {
              text: `yêu cầu name ` + " " + result.details,
              icon: "warning",
            });

          } else {
            history.push("/admin/CourseCategory")
            swal("Thông báo", "Sửa thành công", "success") 
            setIsEnable(isEnable + 1)
          }
        })
        .catch(error => console.log('error', error));
    }
    return true;
  }

  const onInputChange = (event) => {
    setDanhMuc({
      name: event.target.value,
    });
    console.log(event.target.value);
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="content-header-left">
          <h1>Sửa Danh mục</h1>
        </div>
        <div className="content-header-right">
          <a href="/admin/CourseCategory" className="btn btn-primary btn-sm">Xem tất cả</a>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <form className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
              <div className="box box-info">
                <div className="box-body">
                  <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label">Tên danh mục
                      <span>*</span></label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" name="name" onChange={onInputChange} defaultValue={DanhMuc.name} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-3 control-label" />
                    <div className="col-sm-6">
                      <a onClick={
                        (event) => {
                          updateCate(event)
                        }} className="btn btn-success pull-left" name="form1">Cập nhập</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>

  )
}