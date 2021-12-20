import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import {
  BrowserRouter,
  Switch,
  NavLink,
  Link
} from "react-router-dom";
import { event } from 'jquery';
import { useDispatch } from 'react-redux'

export default function HeaderStudent() {
  const dispatch = useDispatch()

  const [DScategory, setDScategory] = useState([])
  const [DScourse, setDScourse] = useState([])
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(-1);
  const [isEnable, setIsEnable] = useState(0);
  const [findCourse,setFindCourse] = useState([])
  const [totalCart, setTotalCart] = useState(0)

  useEffect(() => {
    loadCategory();
    loadCart()
  }, ([
    isEnable
  ]))


  const loadCategory = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "category/", requestOptions)
      .then(response => response.json())
      .then(result => {
      
        setDScategory(result)
      })
      .catch(error => console.log('error', error));
  }

  const onChangeDanhMuc = (event) => {
    history.push(`/Course/${event.target.value}`)
    setSelectedDanhMuc(event.target.value);
    findByCategory(event.target.value)
  };

  

  let pagesize = 6

  const findByCategory = (select) =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` + `course/get-all-by-category?categoryId=${select}&page=0&size=${pagesize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({type: "GET_DATA", payload: result}) 
       
      
        setIsEnable(isEnable + 1)
      }
      )
      .catch(error => console.log('error', error));
  }

  const findByName = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}` + `course/get-all-by-name?courseName=${courseName.courseName}&page=0&size=${pagesize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        dispatch({type: "GET_DATA", payload: result})        
   
        setIsEnable(isEnable + 1)
        history.push(`/Course`)
      }
      )
      .catch(error => console.log('error', error));
  }

  const [courseName, setCourseName] = useState({
    courseName: ''
  })

  const onInputCourseNameChange = (event) =>
  {
    setCourseName({
      courseName: event.target.value,
    });

   
  }

  


  let accessToken = localStorage.getItem("accessToken");


  const [tk, settk] = useState({
    username: '',
    password: '',

  });

  const [gmail, setgmail] = useState({
    gmail: '',
   
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    settk({
      ...tk,
      [name]: value,

    });

    setgmail({
      ...gmail,
      [name]: value,
    })



  }

  const onInputChangeemail = (event) => {
    const { name, value } = event.target;
    setgmail({
      ...gmail,
      [name]: value,

    });
 

  }


  let history = useHistory();

  function chuyentrang() {
    let role = localStorage.getItem("role");
    if (role == "ROLE_ADMIN") {
      history.replace("/giangvien/Section")
      window.location.reload();
    }
    else {
      history.replace("/home")
      window.location.reload();
    }

  }

  let role = localStorage.getItem("role");


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

    fetch(`${DEFAULT_API}` + "auth/signin", requestOptions)
      .then(response => response.json()
      )
      .then(result => {
        if (result.returnCode == 0) {
          alert("sai tài khoản mật khẩu")
        }
        else if (result.returnCode == -1) {
          alert("tài khoản chưa được kích hoạt")
        }
        else {
     
          localStorage.setItem("accessToken", result.data.accessToken)
          localStorage.setItem("userid", result.data.id)
          result.data.roles.map((role) => {
            localStorage.setItem("role", role)
          })
          chuyentrang();
        }


      })
      .catch(error => {
        alert("sai tk mk")
       

      });
  }
  const logout = () =>{
      localStorage.clear()
      window.location.reload();

  }

  // đăng kí ----------------------------------------------------------------------------

  const [users, setusers] = useState({
    username: '',
    email: '',
    name: '',
    roles: '',
    phone:'',
    address:'',
    skill:''

  });
  const maquyen = 0;
  const [quyen, setquyen] = useState(
    maquyen
  );
  const [trangthai, settrangthai] = useState(0)

  const onInputChangedangki = (event) => {
    const { name, value } = event.target;
    setusers({
      ...users,
      [name]: value,

    });


  }

  function chuyentranglogin() {
    history.push("/home");
  }

  function chuyentrangAllCourse() {
    history.push("/Course/0");
    window.location.reload()
  }
  const signup = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": users.username,
      "address": " ",
      "email": users.email,
      "image": " ",
      "name": users.name,
      "phone": " ",
      "isEnable": 1,
      "status": 1,
      "roles": [
        {
          "id": 2
        }
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "auth/register", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.loicode == -1)
        {
          alert(result.details)
        }
        else{
          alert("kiểm tra email để lấy mật khẩu")
          chuyentrang();
        }
       
      })
      .catch(error => console.log('error', error));
  }
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  const signupintructer = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();
    formdata.append("username", users.username);
    formdata.append("address", users.address);
    formdata.append("email",  users.email);
    formdata.append("name", users.name);
    formdata.append("phone", users.phone);
    formdata.append("isEnable", "0");
    formdata.append("status", "1");
    formdata.append("roles", "3");
    formdata.append("skill", users.skill);
    formdata.append("file", selectedFile);
    
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "createauthoer", requestOptions)
      .then(response => response.json())
      .then(result => {
    
        if(result.loicode == -1)
        {
          alert("có lỗi xẩy ra kiểm tra lại thông tin")
        }
        else{
          alert("kiểm tra email để lấy mật khẩu")
          chuyentrang();
        }
       
      })
      .catch(error => console.log('error', error));
  }


    const qlgiangvien = () =>{
  history.replace("/giangvien/Dashboard")
      window.location.reload();
    }

    const qladmin = () =>{
      history.replace("/admin")
          window.location.reload();
        }
    

    const qlstudent = () =>{
  history.replace("/student/Dashboard")
      window.location.reload();
    }

let user_id = localStorage.getItem("userid")

const loadCart = async () => {

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


  var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
  };

  fetch(`${DEFAULT_API}` + `cart/${user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
          setTotalCart(result.length)
      })
      .catch(error => console.log('error', error));
}

function chuyentrangcart() {
  history.push("/cart")
}

function chuyentrangcourse() {
  history.push("/Course")
}


const doipassword = async () =>{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": gmail.gmail
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/forgot-password", requestOptions)
  .then(response => response.text())
  .then(result => {
    if(result=="thành công")
    {
      alert(result)
      history.replace("/home")
      window.location.reload();
    }
    else{
      alert(result)
    }
  })
  .catch(error => console.log('error', error));
}

  return (
    <div>
      <div className="top">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <div className="top-left">
                <ul>
                  <li><a href="mailto:aled@yourwebsite.com"><i className="fa fa-envelope-o" />
                     aled@yourwebsite.com</a></li>
                  <li><a href="tel:contact@yourwebsite.com"><i className="fa fa-phone" />  0989999999</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-7 col-sm-7">
              <div className="top-right">
                <ul>{accessToken == null ?
                  <li><a href="#" data-toggle="modal" data-target="#login_modal"><i className="fa fa-sign-in" />
                    Login</a></li> : <li><a href="#" onClick={qlstudent} ><i className="fa fa-user-circle" /> quanlystudent
                    </a></li>}
                  {role === "ROLE_GIANGVIEN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qlgiangvien}  > giang vien</a></li> : ""}
                  {role === "ROLE_ADMIN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qladmin}  > admin</a></li> : ""}
                  {role == null ? <li><a href="#" data-toggle="modal" data-target="#join_modal"><i className="fa fa-user-circle" /> Sign Up</a></li>:<li><a href="#" onClick={logout}><i className="fa fa-sign-in"  /> đăng xuất</a></li>}
                </ul>

                <div className="modal fade" id="join_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Sign Up</h4>
                      </div>

                      <div className="modal-body">
                        <form  acceptCharset="utf-8">
                          <div  id="dangky" aria-hidden="true">
                          <div className="form-group">
                            <label >Full Name</label>
                            <input type="text" className="form-control"  name="name"  onChange={onInputChangedangki} placeholder="Full Name" required />
                          </div>
                          <div className="form-group">
                            <label >Email Address</label>
                            <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email Address" required />
                          </div>
                          <div className="form-group">
                            <label >User Name</label>
                            <input type="text" className="form-control"  name="username" onChange={onInputChangedangki} placeholder="Full Name" required />
                          </div>
                          </div>
                          
                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signup}>Sign Up</a>
                        </form>
        
                        <p className="mt_10">
                        <a data-dismiss="modal" data-toggle="modal" data-target="#register_introduct">Register Instructors</a>
                        <br />
                          Already have an account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">Login</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* đăng ký giảng viên */}
               
               
                <div className="modal fade" id="register_introduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Sign Up</h4>
                      </div>
                      <div className="modal-body">
                  
                        <form  acceptCharset="utf-8" >
                        <div id='testscop'>
                          <div  id="dangky" aria-hidden="true">
                            <div className="form-group">
                              <label >Full Name</label>
                              <input  width="250px" type="text" className="form-control"  name="name"  onChange={onInputChangedangki} placeholder="Full Name" required />
                            </div>
                            <div className="form-group">
                              <label >Email Address</label>
                              <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email Address" required />
                            </div>
                            <div className="form-group">
                              <label >User Name</label>
                              <input type="text" className="form-control"  name="username" onChange={onInputChangedangki} placeholder="Full Name" required />
                            </div>
                            <div className="form-group">
                              <label >Phone</label>
                              <input type="text" className="form-control"  name="phone" onChange={onInputChangedangki} placeholder="Phone" required />
                            </div>
                            <div className="form-group">
                              <label >Skill</label>
                              <textarea className="form-control"  name="skill" onChange={onInputChangedangki} placeholder="Skill" required rows="4" cols="50" />
                            </div>
                            <div className="form-group">
                              <label >Image</label>
                              <input type="file" className="form-control"  onChange={changeHandler} required />
                            </div>
                          </div>
                          </div>
                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signupintructer}>Sign Up</a>
                        </form>
                     
                       
                          Already have an account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">Login</a>
                      
                      </div>
                    </div>
                  </div>
                </div>
            
               

                {/* đổi mật khẩu---------------------------------------------- */}
                <div className="modal fade" id="forget_password_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Forget Password?</h4>
                      </div>
                      <div className="modal-body">
                        <form  acceptCharset="utf-8">
                          <div className="form-group">
                            <label >Email Address</label>
                            <input type="email" className="form-control"  placeholder="Email Address" name="gmail" required  onChange={onInputChange}  />
                          </div>
                          <a onClick={doipassword} className="btn btn-primary btn-success" name="form_forget_password">Submit</a>
                        </form>
                        <p className="mt_30">
                          <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal">Go to Login Page</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="head">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-3">
              <div className="logo">
                <a href="index.html"><img src="http://localhost:3000/logo1.jpg" alt="logo" /></a>
              </div>
            </div>
            <div className="col-md-8 col-sm-9">
              
              <div className="search">
                <form action="" className="form-inline" method="post" acceptCharset="utf-8">
                  
                    
                     <div className="form-group">
                     <input className="form-control" type="text" placeholder="Search By Course Name" name="course_name" onChange={onInputCourseNameChange}   />
                    </div>
                  
                    
                  <div className="form-group">
                  <select className="form-control" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
                        <option value={0} >-- All Category --</option>
                        {DScategory.map((value, index) => {
                          return (
                            <option value={value.id} key={index}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                  </div>
                  
                    <a className="btn btn-success"   type="button" name="form_search_header" onClick={findByName}><i className="fa fa-search" /></a>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* đăng nhập */}
      <div className="modal fade in" id="login_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-vit" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">×</button>
              <h4 className="modal-title">Sign In</h4>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label >User name</label>
                  <input type="text" className="form-control" name="username" placeholder="user name" onChange={onInputChange} />
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Password" onChange={onInputChange} />
                </div>
                <a className="btn btn-primary btn-success" name="form_login" onClick={login}>Sign In</a>
              </form>
              <p className="mt_30">
                <a data-dismiss="modal" data-toggle="modal" data-target="#forget_password_modal">Forget Password?</a><br />
                Don't have an account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#join_modal" className="btn btn-warning">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="menu-area non-mobile-menu">
  <div className="container">
    <div className="row">
      <div className="col-md-9">
        <div className="menu">
          <nav>
            <ul id="menu">
              <li><a  onClick={chuyentranglogin} href="">Home</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/faq'>FAQ</a></li>
              <li><a href='/contact'>Contact</a></li>
              <li className="static"><a onClick={chuyentrangAllCourse}>All Courses <i className="fa fa-angle-down" /></a>
                <div className="mega-menu mega-full">
                  <ul>
                    {DScategory.map((category, index) => 
                      <li><a class="dropdown-item" href={category.id}>{category.name}</a></li>
                    )}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>

  )
}
