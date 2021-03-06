import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link,
} from "react-router-dom";
import { event } from 'jquery';
import { useDispatch } from 'react-redux'

export default function HeaderStudent() {
  const dispatch = useDispatch()

  const [DScategory, setDScategory] = useState([])
  const [DScourse, setDScourse] = useState([])
  const [selectedDanhMuc, setSelectedDanhMuc] = useState(-1);
  const [isEnable, setIsEnable] = useState(0);
  const [findCourse, setFindCourse] = useState([])
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
    window.location.reload()
  };



  let pagesize = 6

  const findByCategory = (select) => {
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
        dispatch({ type: "GET_DATA", payload: result })


        setIsEnable(isEnable + 1)
      }
      )
      .catch(error => console.log('error', error));
  }

  const findByName = () => {
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

  const onInputCourseNameChange = (event) => {
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

    if (role == "ROLE_GIANGVIEN") {
      history.push("/giangvien")
      window.location.reload()

    } else if (role == "ROLE_ADMIN") {
      history.push("/admin")
      window.location.reload()
    }
    else {
      history.push("/home")
      window.location.reload()

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
          swal("Thông báo", "Sai tài khoản mật khẩu", "warning")
        }
        else if (result.returnCode == -1) {
          swal("Thông báo", "Tài khoản chưa được kích hoạt", "warning")
        }
        else {

          localStorage.setItem("accessToken", result.data.accessToken)
          localStorage.setItem("userid", result.data.id)
          localStorage.setItem("username", result.data.username)
          localStorage.setItem("fullname", result.data.fullName)
          
          result.data.roles.map((role) => {
            localStorage.setItem("role", role)
          })
          chuyentrang();
        }


      })
      .catch(error => {
        swal("Thông báo", "Sai tài khoản hoặc mật khẩu", "warning")

      });
  }
  const logout = () => {
    localStorage.clear()
    history.push("/home")
    window.location.reload()


  }

  // đăng kí ----------------------------------------------------------------------------

  const [users, setusers] = useState({
    username: '',
    email: '',
    name: '',
    roles: '',
    phone: '',
    address: '',
    skill: '',
    education: ''

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
    var regexKhoangTrang = /\S/;
    var regex = /[A-Za-z0-9]/
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if (!regexName.test(users.name)) {
      swal("Failed", "Tên chỉ chứa chữ cái", "warning")
    } else if (!regexKhoangTrang.test(users.name) || !regexKhoangTrang.test(users.username) || !regexKhoangTrang.test(users.email)) {
      swal("Failed", "Tên không được để trống", "warning")
    }
    else if (regexKitu.test(users.name) || regexKitu.test(users.username)) {
      swal("Failed", "Tên không được chứa ký tự", "warning")
    } else if (!regex.test(users.username)) {
      swal("Failed", "Tên không được chứa ký tự", "warning")
    }
    else {
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
          if (result.loicode == -1) {
            swal("Fill in all the information", {
              text: "Email không hợp lệ hoặc đã tồn tại",
              icon: "warning",
            });
          }
          else {
            swal("Thông báo", "Kiểm tra email để biết mật khẩu", "success")
            chuyentrang();
          }

        })
        .catch(error => console.log('error', error));
    }
  }
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  // const signupintructer = () => {
  //   var regexKhoangTrang = /\S/;
  //   var regex = /[A-Za-z0-9]/
  //   var regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
  //   var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
  //   var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
  //   if (!regexName.test(users.name)) {
  //     swal("Failed", "Tên chỉ nhập chữ ", "warning")
  //   } else if (!regexKhoangTrang.test(users.name) || !regexKhoangTrang.test(users.username) || !regexKhoangTrang.test(users.email) || !regexKhoangTrang.test(users.phone) || !regexKhoangTrang.test(users.skill) || !regexKhoangTrang.test(users.education)) {
  //     swal("Failed", "Tên không được để trống", "warning")
  //   }
  //   else if (regexKitu.test(users.name) || regexKitu.test(users.username)) {
  //     swal("Failed", "Tên không chứa ký tự", "warning")
  //   } else if (!regex.test(users.username)) {
  //     swal("Failed", "Tên không chứa ký tự", "warning")
  //   }
  //   else if (!regexPhone.test(users.phone)) {
  //     swal("Failed", "Nhập sai định dạng số điện thoại", "warning")
  //   }
  //   else {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     var formdata = new FormData();
  //     formdata.append("username", users.username);
  //     formdata.append("address", users.address);
  //     formdata.append("email", users.email);
  //     formdata.append("name", users.name);
  //     formdata.append("phone", users.phone);
  //     formdata.append("isEnable", "0");
  //     formdata.append("status", "1");
  //     formdata.append("education", users.education);
  //     formdata.append("roles", "3");
  //     formdata.append("skill", users.skill);
  //     formdata.append("file", selectedFile);

  //     var requestOptions = {
  //       method: 'POST',
  //       body: formdata,
  //       redirect: 'follow'
  //     };

  //     fetch(`${DEFAULT_API}` + "createauthoer", requestOptions)
  //       .then(response => response.json())
  //       .then(result => {

  //         if (result.loicode == -1) {
  //           alert("Đã xảy ra lỗi, hãy kiểm tra lại thông tin")
  //         }
  //         else {
  //           alert("Kiểm tra email để lấy mật khẩu")
  //           chuyentrang();
  //         }

  //       })
  //       .catch(error => console.log('error', error));
  //   }
  // }


  const qlgiangvien = () => {
    history.push("/giangvien")

  }

  const qladmin = () => {
    history.push("/admin")

  }


  const qlstudent = () => {
    history.push("/student")


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




  const doipassword = async () => {
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

    fetch(`${DEFAULT_API}` + `forgot-password`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result == "thành công") {
          swal("Thông báo", result)
          history.push("/home")

        }
        else {
          swal("Thông báo", result)
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
                    Đăng nhập</a></li> : <li><a href="" onClick={qlstudent} ><i className="fa fa-user-circle" />Sinh viên
                    </a></li>}
                  {role === "ROLE_GIANGVIEN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qlgiangvien}  > Giảng viên</a></li> : ""}
                  {role === "ROLE_ADMIN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qladmin}  > Admin</a></li> : ""}
                  {accessToken == null ? <li><a href="" data-toggle="modal" data-target="#join_modal"><i className="fa fa-user-circle" /> Đăng ký</a></li> : <li><a href="" onClick={logout}><i className="fa fa-sign-in" />Đăng xuất </a></li>}
                </ul>

                <div className="modal fade" id="join_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Đăng ký</h4>
                      </div>

                      <div className="modal-body">
                        <form acceptCharset="utf-8">
                          <div id="dangky" aria-hidden="true">
                            <div className="form-group">
                              <label >Họ tên</label>
                              <input type="text" className="form-control" name="name" onChange={onInputChangedangki} placeholder="Họ tên" required />
                            </div>
                            <div className="form-group">
                              <label >Email</label>
                              <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email" required />
                            </div>
                            <div className="form-group">
                              <label >Tài khoản</label>
                              <input type="text" className="form-control" name="username" onChange={onInputChangedangki} placeholder="Tài khoản" required />
                            </div>
                          </div>

                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signup}>Đăng ký</a>
                        </form>

                        <p className="mt_10">
                          <a href='/register'>Đăng ký giảng viên</a>
                          <br />
                          Bạn có sẵn sàng để tạo một tài khoản? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">Đăng nhập</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* đăng ký giảng viên */}


                {/* <div className="modal fade" id="register_introduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Sign Up</h4>
                      </div>
                      <div className="modal-body">

                        <form acceptCharset="utf-8" >
                          <div id='testscop'>
                            <div id="dangky" aria-hidden="true">
                              <div className="form-group">
                                <label >Full Name</label>
                                <input width="250px" type="text" className="form-control" name="name" onChange={onInputChangedangki} placeholder="Full Name" required />
                              </div>
                              <div className="form-group">
                                <label >Email Address</label>
                                <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email Address" required />
                              </div>
                              <div className="form-group">
                                <label >User Name</label>
                                <input type="text" className="form-control" name="username" onChange={onInputChangedangki} placeholder="Full Name" required />
                              </div>
                              <div className="form-group">
                                <label >Phone</label>
                                <input type="text" className="form-control" name="phone" onChange={onInputChangedangki} placeholder="Phone" required />
                              </div>
                              <div className="form-group">
                                <label >education</label>
                                <input type="text" className="form-control" name="education" onChange={onInputChangedangki} placeholder="education" required />
                              </div>
                              <div className="form-group">
                                <label >Skill</label>
                                <textarea className="form-control" name="skill" onChange={onInputChangedangki} placeholder="Skill" required rows="4" cols="50" />
                              </div>
                              <div className="form-group">
                                <label >Image</label>
                                <input type="file" className="form-control" onChange={changeHandler} required />
                              </div>
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
                              <label >education</label>
                              <input type="text" className="form-control"  name="education" onChange={onInputChangedangki} placeholder="education" required />
                            </div>
                            <div className="form-group">
                              <label >Skill</label>
                              <textarea className="form-control"  name="skill" onChange={onInputChangedangki} placeholder="Skill" required rows="4" cols="50" />
                            </div>
                            <div className="form-group">
                              <label >Image</label>
                              <input type="file" id="fileUpload" className="form-control"  onChange={changeHandler} required />
                            </div>
                          </div>

                          </div>
                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signupintructer}>Sign Up</a>
                        </form>


                        Already have an account? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">Login</a>

                      </div>
                    </div>
                  </div>
                </div> */}



                {/* đổi mật khẩu---------------------------------------------- */}
                <div className="modal fade" id="forget_password_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">×</button>
                        <h4 className="modal-title">Quên mật khẩu</h4>
                      </div>
                      <div className="modal-body">
                        <form acceptCharset="utf-8">
                          <div className="form-group">
                            <label >Email</label>
                            <input type="email" className="form-control" placeholder="Email" name="gmail" required onChange={onInputChange} />
                          </div>
                          <a onClick={doipassword} className="btn btn-primary btn-success" name="form_forget_password">Gửi</a>
                        </form>
                        <p className="mt_30">
                          <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal">Đi tới đăng nhập</a>
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
                <a ><img src="/assets/uploads/logoaled.png" alt="logo" /></a>
              </div>
            </div>
            <div className="col-md-8 col-sm-9">

              <div className="search">
                <form  className="form-inline"  acceptCharset="utf-8">


                  <div className="form-group">
                    <input className="form-control" type="text" placeholder="Tìm kiếm theo tên khóa học" name="course_name" onChange={onInputCourseNameChange} />
                  </div>


                  <div className="form-group">


                  <select className="form-control" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
                        <option value="" >-- Tất cả khóa học --</option>
                        {DScategory.map((value, index) => {
                          return (
                            <option value={value.id} key={index}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>

                  </div>

                  <a className="btn btn-success"  name="form_search_header" onClick={findByName}><i className="fa fa-search" /></a>

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
              <h4 className="modal-title">Đăng nhập</h4>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label >Tài khoản</label>
                  <input type="text" className="form-control" name="username" placeholder="Tài khoản" onChange={onInputChange} />
                </div>
                <div className="form-group">
                  <label >Mật khẩu</label>
                  <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={onInputChange} />
                </div>
                <a className="btn btn-primary btn-success" name="form_login" onClick={login}>Đăng nhập</a>
              </form>
              <p className="mt_30">
                <a data-dismiss="modal" data-toggle="modal" data-target="#forget_password_modal">Quên mật khẩu?</a><br />
                Không có tài khoản? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#join_modal" className="btn btn-warning">Đăng ký</a>
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

                    <li><a onClick={chuyentranglogin} href="">Trang chủ</a></li>
                    <li><a href='/about'>Về chúng tôi</a></li>
                    <li><a href='/faq'>Câu hỏi thường gặp</a></li>
                    <li><a href='/contact'>Liên hệ</a></li>
                    {/* <li className="static"><a onClick={chuyentrangAllCourse}>Tất cả khóa học <i className="fa fa-angle-down" /></a>
               <div className="mega-menu mega-full">
                 <ul>
                   {DScategory.map((category, index) =>
                     <li><a class="dropdown-item" href={category.id}>{category.name}</a></li>
                    )}
                  </ul>
                </div>
              </li>  */}
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
