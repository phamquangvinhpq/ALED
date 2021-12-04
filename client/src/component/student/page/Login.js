import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
export default function Login() {

  
  const [tk, settk] = useState({
    username: '',
    password: '',

  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    settk({
      ...tk,
      [name]: value,

    });

    console.log(event.target.value)

  }
  let history = useHistory();

function chuyentrang() {
  history.push("/MyCourse");
}

const login = () => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "username": tk.username,
      "password": tk.password
  });

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch(`${DEFAULT_API}`+"auth/signin", requestOptions)
      .then(response => response.json()     
      )
      .then(result => {
          console.log(result)
          localStorage.setItem("accessToken",result.data.accessToken)
          
             if(result.returnCode==0)
             {
                 alert("sai tài khoản mật khẩu")
             }
             else if(result.returnCode==-1)
             {
              alert("tài khoản chưa được kích hoạt")
             }
             else{
                 chuyentrang();
             }
          
          
      })
      .catch(error => {
          alert("sai tk mk")
          console.log('error', error)
     
  });
}

  return (
    <div>
  
  <div>

  <div className="text-center">
    {/* Button HTML (to Trigger Modal) */}
    <a href="#myModal" className="trigger-btn" data-toggle="modal">Click to Open Login Modal</a>
  </div>
  {/* Modal HTML */}
  <div id="myModal" className="modal fade">
    <div className="modal-dialog modal-login">
      <div className="modal-content">
        <div className="modal-header">
          <div className="avatar">
            <img src="//images/avatar.png" alt="Avatar" />
          </div>				
          <h4 className="modal-title">Member Login</h4>	
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
        </div>
        <div className="modal-body">
          <form action="/examples/actions/confirmation.php" method="post">
            <div className="form-group">
              <input type="text" className="form-control" name="username" placeholder="Username" required="required" />		
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" placeholder="Password" required="required" />	
            </div>        
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg btn-block login-btn">Login</button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>     
</div>

    </div>

  )
}
