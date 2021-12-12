import React, { useEffect, useState } from 'react'

export default function ListCourse() {
  const [inputs, setInputs] = useState({});

  const load = () =>{
    setInputs(prevState => ({
      ...prevState,
      id: localStorage.getItem("userid")
   }));
  }

 useEffect(() => {
  load();
 }, [])

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(inputs);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/user", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  

    return (
      <div>
              <div className="col-md-9">
                <form onSubmit={handleSubmit} className="form-horizontal" acceptCharset="utf-8">
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Name</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} value={inputs.name} type="text" className="form-control" name="name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" name defaultValue="instructor@gmail.com" disabled /><span className="c-red">Email address can not be changed</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Address</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} type="text" className="form-control" name="address" defaultValue />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor className="col-sm-2 control-label">Phone</label>
                    <div className="col-sm-10">
                      <input onChange={handleChange} type="text" className="form-control" name="phone" defaultValue="Expert Django Developer" />
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