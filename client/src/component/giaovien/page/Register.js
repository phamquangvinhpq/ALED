import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";

export default function Register() {

  let history = useHistory();
  const [checked, setChecked] = React.useState(false);
  const [users, setusers] = useState({
    username: '',
    email: '',
    name: '',
    roles: '',
    phone: '',
    address: '',
    skill: '',
    education: '',
  });

  const onInputChangedangki = (event) => {
    const { name, value } = event.target;
    setusers({
      ...users,
      [name]: value,

    });
  }

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const changeHandler = (event) => {
    if(event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpeg"){
      swal("Thất bại", "Chỉ được chọn file jpeg/png", "warning")
      document.getElementById("uploadFile").value=""
    } else{
      setSelectedFile(event.target.files[0]);
    }
  };

  const changeHandler2 = (event) => {
    if(event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpeg" && event.target.files[0].type != "application/pdf" ){
      swal("Thất bại", "Chỉ được chọn file jpeg/png và pdf", "warning")
      document.getElementById("uploadFile2").value=""
    } else{
      setSelectedFile2(event.target.files[0]);
    }
  };

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
      
      // window.location.reload()

    }

  }





  const signupintructer = () => {
    var regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    var regexKhoangTrang = /\S/;
    var regex = /[A-Za-z0-9]/
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if (!regexName.test(users.name) || regexKitu.test(users.name)) {
      swal("Failed", "Tên phải là chữ", "warning")
    } else if (!regexKhoangTrang.test(users.name) || !regexKhoangTrang.test(users.username) || !regexKhoangTrang.test(users.email) ||!regexKhoangTrang.test(users.phone) || !regexKhoangTrang.test(users.skill) || !regexKhoangTrang.test(users.address) || !regexKhoangTrang.test(users.education) ) {
      swal("Failed", "Không được để trống", "warning")
    }
    else if (regexKitu.test(users.username)) {
      swal("Failed", "tài khoản không được chứa kí tự", "warning")
    } else if (!regex.test(users.username)) {
      swal("Failed", "tài khoản không được viết dấu", "warning")
    }
    else if (!regexPhone.test(users.phone)) {
      swal("Failed", "số điện thoại không được chứ kí tự", "warning")
    }
    else {
      var formdata = new FormData();
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
formdata.append("username", users.username);
formdata.append("address", users.address);
formdata.append("email", users.email);
formdata.append("name", users.name);
formdata.append("phone", users.phone);
formdata.append("isEnable", "0");
formdata.append("status", "1");
formdata.append("education", users.education);
formdata.append("roles", "3");
formdata.append("skill", users.skill);
formdata.append("file", selectedFile);
formdata.append("file2", selectedFile2);
formdata.append("description", "Thầy giáo");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch(`${DEFAULT_API}` + "createauthoer", requestOptions)
  .then(response => response.json())
        .then(result => {

          if (result.loicode == -1) {
            swal("Thông báo", "Đã xảy ra lỗi, hãy kiểm tra lại thông tin", "warning")
          }
          else {
            swal("Thông báo", "Kiểm tra email để lấy mật khẩu", "success")
            history.push("/home")
          }

        })
  .catch(error => console.log('error', error));
    }
  }





  return (
    <div>

      <div className="modal fade" id="rules" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-vit w-60-p" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Điều khoản</h2>
              <br/>
              <h4>1. Trách nhiệm của cá nhân sau khi đăng ký làm giảng viên</h4>
              <span>1.1. Các cá nhân đã được duyệt trở thành giảng viên phải chịu trách nhiệm về mọi hoạt động được thực hiện bằng tài khoản của mình.<br/>
              1.2. Chỉ được sử dụng duy nhất một địa chỉ thư điện tử để đăng ký tài khoản trong Hệ thống. Chủ tài khoản tự chịu trách nhiệm bảo mật thư điện tử cá nhân và sử dụng thư điện tử để đăng ký trong Hệ thống.<br/>
              1.3. Người sử dụng tài khoản chịu trách nhiệm giữ bí mật mật khẩu của mình và phải thông báo kịp thời cho Hệ thống nếu mật khẩu bị mất hoặc bị đánh cắp hoặc phát hiện có người sử dụng trái phép mật khẩu để thực hiện các hành vi có thể ảnh hưởng đến Hệ thống.<br/>
              1.4. Tất cả các khóa học sau khi đăng lên Hệ thống đều thuộc quyền quản lý của Hệ thống.<br/>
              1.5 Tuân thủ các quy định về việc đăng khóa học và tiêu chuẩn cộng đồng (VD: Đăng khóa học đúng loại danh mục, nội dung và ngôn từ phù hơp,...)
              </span>
              <h4>2. Mọi sai phạm về điều khoản Giảng viên sẽ hoàn toàn chịu trách nhiệm</h4>
              <span>
                2.1. Nếu khóa học vi phạm tiêu chuẩn cộng đồng. Giảng viên sẽ chịu hoàn toàn trách nhiệm về việc đền bù thiệt hại cho người dùng và Hệ thống.
              </span>
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="signup-form">
        <div className="cotainer">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="card">
                <h3 className="card-header text-center">Đăng ký giảng viên</h3>
                <div className="card-body">

                  <form acceptCharset="utf-8" >
                    <div id='testscop'>
                      <div id="dangky" aria-hidden="true">
                      <div className="form-group">
                                <label >Họ Tên</label>
                                <input width="250px" type="text" className="form-control" name="name" onChange={onInputChangedangki} placeholder="Full Name" required />
                              </div>
                              <div className="form-group">
                                <label >Email</label>
                                <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email Address" required />
                              </div>
                              <div className="form-group">
                                <label >Tài Khoản</label>
                                <input type="text" className="form-control" name="username" onChange={onInputChangedangki} placeholder="Full Name" required />
                              </div>
                              <div className="form-group">
                                <label >Số Điện Thoại</label>
                                <input type="text" className="form-control" name="phone" onChange={onInputChangedangki} placeholder="Phone" required />
                              </div>
                              <div className="form-group">
                                <label >Địa chỉ</label>
                                <textarea className="form-control" name="address" onChange={onInputChangedangki} placeholder="Address" required rows="4" cols="50" />
                              </div>
                              <div className="form-group">
                                <label >Trường học</label>
                                <input type="text" className="form-control" name="education" onChange={onInputChangedangki} placeholder="Education" required />
                              </div>
                              <div className="form-group">
                                <label >Kĩ Năng</label>
                                <textarea className="form-control" name="skill" onChange={onInputChangedangki} placeholder="Skill" required rows="4" cols="50" />
                              </div>
                        <div className="form-group">
                          <label >Ảnh</label>
                          <input type="file" className="form-control" id='uploadFile' onChange={changeHandler} required />
                        </div>
                        <div className="form-group">
                          <label >Ảnh kỹ năng</label>
                          <input type="file" className="form-control" id='uploadFile2' onChange={changeHandler2} required />
                        </div>
                        <div className="form-group mb-3">
                          <div className="checkbox">
                            <label><input type="checkbox" checked={checked}
                              onChange={() => setChecked(!checked)} /> Tôi đã đọc kỹ và đồng ý <a data-dismiss="modal" data-toggle="modal" data-target="#rules">điều khoản</a></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button disabled={!checked} className="btn btn-primary btn-success" name="form_registration" onClick={signupintructer} >Đăng ký</button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}