import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
export default function ListCourse() {
  const [inputs, setInputs] = useState({});
  const [infoUser, setInfoUser] =  useState({});
  const userid = localStorage.getItem("userid")
  const load = () =>{
    setInputs(prevState => ({
      ...prevState,
      id: localStorage.getItem("userid")
   }));
  }
  const loadinfoUser = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:8080/user/${userid}`, requestOptions)
      .then(response => response.json())
      .then(result => setInfoUser(result))
      .catch(error => console.log('error', error));
  }

 useEffect(() => {
  load();
  loadinfoUser();
 }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInfoUser(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(infoUser);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/user", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        swal("Thành công", "Sửa thành công", "success")
      })
      .catch(error => console.log('error', error));
  }
  

    return (
      <div>
              <div className="col-md-9">
                <form onSubmit={handleSubmit} className="form-horizontal" acceptCharset="utf-8">
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} defaultValue={infoUser.name} type="text" className="form-control" name="name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} defaultValue={infoUser.address} type="text" className="form-control" name="address"  />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Phone</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} defaultValue={infoUser.phone} type="text" className="form-control" name="phone"  />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button type="submit" className="btn btn-default btn-success" name="form1">Update</button>
                    </div>
                  </div>
                </form>
              </div>
              
      </div>

)
}