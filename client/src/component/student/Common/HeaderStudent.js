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
        console.log(result)
        setDScategory(result)
      })
      .catch(error => console.log('error', error));
  }

  const onChangeDanhMuc = (event) => {
    history.push("/Course/"+event.target.value)
    setSelectedDanhMuc(event.target.value);
    findByCategory(event.target.value)
    console.log(event.target.value);
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
        console.log("Select" + select);       
        console.log(result)
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
        console.log(result)
        setIsEnable(isEnable + 1)
        history.push("/Course")
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

    console.log(event.target.value)
  }


  let accessToken = localStorage.getItem("accessToken");


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
          console.log(result)
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
        console.log('error', error)

      });
  }
  const logout = () =>{
      localStorage.clear()
      window.location.reload();

  }

  // đăng kí ----------------------------------------------------------------------------

  const [users, setusers] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    roles: '',

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

    console.log(event.target.value)

  }

  function chuyentranglogin() {
    history.push("/home");
  }
  const signup = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "username": users.username,
      "password": users.password,
      "address": " ",
      "email": users.email,
      "image": " ",
      "name": users.name,
      "phone": " ",
      "isEnable": trangthai,
      "status": 1,
      "roles": [
        {
          "id": quyen
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
      .then(response => response.text())
      .then(result => {
        console.log(result)
        chuyentrang();
      })
      .catch(error => console.log('error', error));
  }

  const quyenstudent = () => {
    setquyen(3)
    settrangthai(1)
  }

  const quyenhuongdan = () => {
    setquyen(2)
    settrangthai(0)
  }

    const qlgiangvien = () =>{
  history.replace("/giangvien/Dashboard")
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

  return (
    <div>
      <div className="top">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <div className="top-left">
                <ul>
                  <li><a href="mailto:contact@yourwebsite.com"><i className="fa fa-envelope-o" />
                    contact@yourwebsite.com</a></li>
                  <li><a href="tel:contact@yourwebsite.com"><i className="fa fa-phone" /> 123-456-3257</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-7 col-sm-7">
              <div className="top-right">
                <ul>{accessToken == null ?
                  <li><a href="#" data-toggle="modal" data-target="#login_modal"><i className="fa fa-sign-in" />
                    Login</a></li> : <li><a href="#" onClick={qlstudent} ><i className="fa fa-user-circle" /> quanlystudent
                    </a></li>}
                  {role === "ROLE_ADMIN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qlgiangvien}  > giang vien</a></li> : ""}
                  {role == null ? <li><a href="#" data-toggle="modal" data-target="#join_modal"><i className="fa fa-user-circle" /> Sign Up</a></li>:<li><a href="#" onClick={logout}><i className="fa fa-sign-in"  /> đăng xuất</a></li>}
                  <li className="lang-right-top">
                    <i className="fa fa-language" />
                    <select onchange="javascript:window.location.href='https://phpscriptpoint.com/cc/courseplus/LanguageSwitcher/switchLang/'+this.value;">
                      <option value="english">English</option>
                      <option value="bangla">Bangla</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </li>
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
                          <div className="login-tab">
                            <div className="tab">
                              <ul>
                                <li class="tab-second">
                                  <a data-toggle="modal" data-target="#dangky" onClick={quyenhuongdan} >instructor</a>
                                </li>
                                <li class="tab-three">
                                  <a onClick={quyenstudent}>student</a>
                                </li>
                              </ul>
                            </div>
                          </div>
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
                          <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control"  name="password" onChange={onInputChangedangki}  placeholder="password" required />
                          </div>
                          </div>
                          
                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signup}>Sign Up</a>
                        </form>
                        <p className="mt_30">
                          Already have an account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">Login</a>
                        </p>
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
                        <form action="" className method="post" acceptCharset="utf-8">
                          <div className="form-group">
                            <label >Email Address</label>
                            <input type="email" className="form-control" name="user_email" placeholder="Email Address" required />
                          </div>
                          <button type="submit" className="btn btn-primary btn-success" name="form_forget_password">Submit</button>
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
                <a href="index.html"><img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/logo.png" alt="logo" /></a>
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
                  
                    <button className="btn btn-success"type="button" name="form_search_header" onClick={findByName}><i className="fa fa-search" /></button>
                 
                 
                  
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
              <li><a href="https://phpscriptpoint.com/cc/courseplus/about">About</a></li>
              <li className="static"><a href="javascript:void;">All Courses <i className="fa fa-angle-down" /></a>
                <div className="mega-menu mega-full">
                  <ul>
                    <li className="mega-title"><a href="javascript:void;">Ecommerce</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/magento">Magento</a>
                    </li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/shopify">Shopify</a>
                    </li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/woocommerce">WooCommerce</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="mega-title"><a href="javascript:void;">Software Testing</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/api-testing">API
                        Testing</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/automation-testing">Automation
                        Testing</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/selenium-testing">Selenium
                        Testing</a></li>
                  </ul>
                  <ul>
                    <li className="mega-title"><a href="javascript:void;">Web Design</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/css">CSS</a>
                    </li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/html5">HTML
                        5</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/photoshop">Photoshop</a>
                    </li>
                  </ul>
                  <ul>
                    <li className="mega-title"><a href="javascript:void;">Web Development</a></li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/django">Django</a>
                    </li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/php">PHP</a>
                    </li>
                    <li><a href="https://phpscriptpoint.com/cc/courseplus/category/wordpress">WordPress</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li><a href="https://phpscriptpoint.com/cc/courseplus/faq">FAQ</a></li>
              <li><a href="https://phpscriptpoint.com/cc/courseplus/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="col-md-3 cart-menu">
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a onClick={chuyentrangcart}  role="button" aria-expanded="false"> <span className="fa fa-gift bigicon" />
              Items in Cart: {totalCart} <span className="caret" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

    </div>

  )
}
