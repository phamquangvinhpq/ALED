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
          swal("Th??ng b??o", "Sai t??i kho???n m???t kh???u", "warning")
        }
        else if (result.returnCode == -1) {
          swal("Th??ng b??o", "T??i kho???n ch??a ???????c k??ch ho???t", "warning")
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
        swal("Th??ng b??o", "Sai t??i kho???n ho???c m???t kh???u", "warning")

      });
  }
  const logout = () => {
    localStorage.clear()
    history.push("/home")
    window.location.reload()


  }

  // ????ng k?? ----------------------------------------------------------------------------

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
      swal("Failed", "T??n ch??? ch???a ch??? c??i", "warning")
    } else if (!regexKhoangTrang.test(users.name) || !regexKhoangTrang.test(users.username) || !regexKhoangTrang.test(users.email)) {
      swal("Failed", "T??n kh??ng ???????c ????? tr???ng", "warning")
    }
    else if (regexKitu.test(users.name) || regexKitu.test(users.username)) {
      swal("Failed", "T??n kh??ng ???????c ch???a k?? t???", "warning")
    } else if (!regex.test(users.username)) {
      swal("Failed", "T??n kh??ng ???????c ch???a k?? t???", "warning")
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
              text: "Email kh??ng h???p l??? ho???c ???? t???n t???i",
              icon: "warning",
            });
          }
          else {
            swal("Th??ng b??o", "Ki???m tra email ????? bi???t m???t kh???u", "success")
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
  //     swal("Failed", "T??n ch??? nh???p ch??? ", "warning")
  //   } else if (!regexKhoangTrang.test(users.name) || !regexKhoangTrang.test(users.username) || !regexKhoangTrang.test(users.email) || !regexKhoangTrang.test(users.phone) || !regexKhoangTrang.test(users.skill) || !regexKhoangTrang.test(users.education)) {
  //     swal("Failed", "T??n kh??ng ???????c ????? tr???ng", "warning")
  //   }
  //   else if (regexKitu.test(users.name) || regexKitu.test(users.username)) {
  //     swal("Failed", "T??n kh??ng ch???a k?? t???", "warning")
  //   } else if (!regex.test(users.username)) {
  //     swal("Failed", "T??n kh??ng ch???a k?? t???", "warning")
  //   }
  //   else if (!regexPhone.test(users.phone)) {
  //     swal("Failed", "Nh???p sai ?????nh d???ng s??? ??i???n tho???i", "warning")
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
  //           alert("???? x???y ra l???i, h??y ki???m tra l???i th??ng tin")
  //         }
  //         else {
  //           alert("Ki???m tra email ????? l???y m???t kh???u")
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
        if (result == "th??nh c??ng") {
          swal("Th??ng b??o", result)
          history.push("/home")

        }
        else {
          swal("Th??ng b??o", result)
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
                    ????ng nh???p</a></li> : <li><a href="" onClick={qlstudent} ><i className="fa fa-user-circle" />Sinh vi??n
                    </a></li>}
                  {role === "ROLE_GIANGVIEN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qlgiangvien}  > Gi???ng vi??n</a></li> : ""}
                  {role === "ROLE_ADMIN" ? <li><i className="fa fa-sign-in" /><a href="" onClick={qladmin}  > Admin</a></li> : ""}
                  {accessToken == null ? <li><a href="" data-toggle="modal" data-target="#join_modal"><i className="fa fa-user-circle" /> ????ng k??</a></li> : <li><a href="" onClick={logout}><i className="fa fa-sign-in" />????ng xu???t </a></li>}
                </ul>

                <div className="modal fade" id="join_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">??</button>
                        <h4 className="modal-title">????ng k??</h4>
                      </div>

                      <div className="modal-body">
                        <form acceptCharset="utf-8">
                          <div id="dangky" aria-hidden="true">
                            <div className="form-group">
                              <label >H??? t??n</label>
                              <input type="text" className="form-control" name="name" onChange={onInputChangedangki} placeholder="H??? t??n" required />
                            </div>
                            <div className="form-group">
                              <label >Email</label>
                              <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email" required />
                            </div>
                            <div className="form-group">
                              <label >T??i kho???n</label>
                              <input type="text" className="form-control" name="username" onChange={onInputChangedangki} placeholder="T??i kho???n" required />
                            </div>
                          </div>

                          <a type="submit" className="btn btn-primary btn-success" name="form_registration" onClick={signup}>????ng k??</a>
                        </form>

                        <p className="mt_10">
                          <a href='/register'>????ng k?? gi???ng vi??n</a>
                          <br />
                          Ba??n c?? s???n s??ng ?????? ta??o m????t t??i khoa??n? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal" className="btn btn-warning">????ng nh???p</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ????ng k?? gi???ng vi??n */}


                {/* <div className="modal fade" id="register_introduct" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">??</button>
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



                {/* ?????i m???t kh???u---------------------------------------------- */}
                <div className="modal fade" id="forget_password_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-vit" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">??</button>
                        <h4 className="modal-title">Qu??n m???t kh???u</h4>
                      </div>
                      <div className="modal-body">
                        <form acceptCharset="utf-8">
                          <div className="form-group">
                            <label >Email</label>
                            <input type="email" className="form-control" placeholder="Email" name="gmail" required onChange={onInputChange} />
                          </div>
                          <a onClick={doipassword} className="btn btn-primary btn-success" name="form_forget_password">G???i</a>
                        </form>
                        <p className="mt_30">
                          <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#login_modal">??i t???i ????ng nh???p</a>
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
                    <input className="form-control" type="text" placeholder="T??m ki???m theo t??n kh??a h???c" name="course_name" onChange={onInputCourseNameChange} />
                  </div>


                  <div className="form-group">


                  <select className="form-control" value={selectedDanhMuc} onChange={onChangeDanhMuc}>
                        <option value="" >-- T???t c??? kh??a h???c --</option>
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



      {/* ????ng nh???p */}
      <div className="modal fade in" id="login_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-vit" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">??</button>
              <h4 className="modal-title">????ng nh???p</h4>
            </div>
            <div className="modal-body">
              <form >
                <div className="form-group">
                  <label >T??i kho???n</label>
                  <input type="text" className="form-control" name="username" placeholder="T??i kho???n" onChange={onInputChange} />
                </div>
                <div className="form-group">
                  <label >M???t kh???u</label>
                  <input type="password" className="form-control" name="password" placeholder="M???t kh???u" onChange={onInputChange} />
                </div>
                <a className="btn btn-primary btn-success" name="form_login" onClick={login}>????ng nh???p</a>
              </form>
              <p className="mt_30">
                <a data-dismiss="modal" data-toggle="modal" data-target="#forget_password_modal">Qu??n m???t kh???u?</a><br />
                Kh??ng c?? t??i kho???n? <a href="#" data-dismiss="modal" data-toggle="modal" data-target="#join_modal" className="btn btn-warning">????ng k??</a>
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

                    <li><a onClick={chuyentranglogin} href="">Trang ch???</a></li>
                    <li><a href='/about'>V??? ch??ng t??i</a></li>
                    <li><a href='/faq'>C??u h???i th?????ng g???p</a></li>
                    <li><a href='/contact'>Li??n h???</a></li>
                    {/* <li className="static"><a onClick={chuyentrangAllCourse}>T???t c??? kh??a h???c <i className="fa fa-angle-down" /></a>
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
