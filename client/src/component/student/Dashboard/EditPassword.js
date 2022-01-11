import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { DEFAULT_API } from '../../../conf/env';
export default function EditPassword() {
const object = {
  password:String = "",
  newPassword:String = "",
  re_newPassword:String = ""
}
const [inputs, setInputs] = useState(object);
const userid = localStorage.getItem("userid")

const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs(values => ({...values, [name]: value}))
  setInputs(values => ({...values, id: userid}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  if (inputs.newPassword === "" || inputs.re_newPassword === "" || inputs.password === "") {
    swal("Thất Bại", "Mật khẩu không được để trống", "error")
  } else if (inputs.newPassword.normalize() === inputs.re_newPassword.normalize()) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(inputs);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`user/updatepassword?newPassword=` + inputs.newPassword, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        if(result === "true")
          swal("Thành Công", "Đổi mật khẩu thành công", "success")
        else
          swal("Thất Bại", "Mật khẩu cũ không đúng", "error")
        })
      .catch(error => console.log('error', error));
  }
  else{
    swal("Thất Bại", "Mật khẩu mới và nhập lại mật khẩu phải khớp nhau", "error")
  }
}

  return (
    <div>
      
            <div className="col-md-9">
              <form onSubmit={handleSubmit}  className="form-horizontal" >
              <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Mật Khẩu Cũ</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} type="password" className="form-control" name="password" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Mật Khẩu Mới</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} defaultValue="" type="password" className="form-control" name="newPassword" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Nhập Lại Mật Khẩu Mới</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} defaultValue="" type="password" className="form-control" name="re_newPassword" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-6">
                    <button type="submit" className="btn btn-default btn-success" name="form1">Cập Nhật</button>
                  </div>
                </div>
              </form>
            </div>
           
          </div>
        
     
  )
}