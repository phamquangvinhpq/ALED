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
    swal("Failed", "Fields cannot be left blank", "error")
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
          swal("Success", "Password has been changed successfully", "success")
        else
          swal("Failed", "Old password is incorrect", "error")
        })
      .catch(error => console.log('error', error));
  }
  else{
    swal("Failed", "New password and re-enter new password do not match", "error")
  }
}

  return (
    <div>
      
            <div className="col-md-9">
              <form onSubmit={handleSubmit}  className="form-horizontal" >
              <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Old Password</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} type="password" className="form-control" name="password" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">New Password</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} defaultValue="" type="password" className="form-control" name="newPassword" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor className="col-sm-4 control-label">Retype New Password</label>
                  <div className="col-sm-6">
                    <input onChange={handleChange} defaultValue="" type="password" className="form-control" name="re_newPassword" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-6">
                    <button type="submit" className="btn btn-default btn-success" name="form1">Update</button>
                  </div>
                </div>
              </form>
            </div>
           
          </div>
        
     
  )
}