import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";

export default function AddUser() {
    let history = useHistory()
    const [selectedDanhMuc, setSelectedDanhMuc] = useState(-1);
    const[taikhoan,settaikhoan] = useState({
        username: '',
        email: '',
        name: '',
        roles: '',
    })

    const onChangeDanhMuc = (event) => {
        setSelectedDanhMuc(event.target.value);
        console.log(event.target.value);
      };

    const onInputChangedangki = (event) => {
        const { name, value } = event.target;
        settaikhoan({
          ...taikhoan,
          [name]: value,
    
        });
        console.log(event.target);
    }

    const signup = () => {
        var regexKhoangTrang = /\S/;
        var regex = /[A-Za-z0-9]/
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if (!regexName.test(taikhoan.name)) {
      swal("Failed", "Name can only enter letters", "warning")
    } else if (!regexKhoangTrang.test(taikhoan.name) || !regexKhoangTrang.test(taikhoan.username) || !regexKhoangTrang.test(taikhoan.email) ) {
      swal("Failed", "not be empty", "warning")
    } 
    else if (regexKitu.test(taikhoan.name) || regexKitu.test(taikhoan.username) ) {
      swal("Failed", "Name must not contain the character", "warning")
    }else if (!regex.test(taikhoan.username) ) {
        swal("Failed", "Name must not contain the character", "warning")
      }
     else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "username": taikhoan.username,
            "address": " ",
            "email": taikhoan.email,
            "image": " ",
            "name": taikhoan.name,
            "phone": "",
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
                swal("nh???p ?????y ????? th??ng tin", {
                  text: result.details,
                  icon: "warning",
                });
    
              } else {
                history.push("/admin/users")
                swal("Th??ng b??o", "Th??m th??nh c??ng", "success")
              }  
                
          })
          .catch(error => console.log('error', error));
        }
      }
  
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Th??m ng?????i d??ng</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/users" className="btn btn-primary btn-sm">Xem t???t c???</a>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">T??n ng?????i d??ng
                                            <span>*</span></label>
                                        <div className="col-sm-4">
                                        <input type="text" className="form-control"  name="username" onChange={onInputChangedangki} placeholder="Full Name" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Email </label>
                                        <div className="col-sm-4">
                                        <input type="email" className="form-control" name="email" onChange={onInputChangedangki} placeholder="Email Address" required /></div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">T??n
                                            <span>*</span></label>
                                        <div className="col-sm-4">
                                        <input type="text" className="form-control"  name="name"  onChange={onInputChangedangki} placeholder="Full Name" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label" >Quy???n <span>*</span></label>
                                        <div className="col-sm-4">
                                            <select className="form-control w-100-p" value={selectedDanhMuc} onChange={onChangeDanhMuc} >
                                                <option>-- Ch???n quy???n --</option>
                                                <option value="1">Ng?????i d??ng</option>
                                                <option value="3">Qu???n l??</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label" />
                                        <div className="col-sm-6">
                                            <button type="button" onClick={signup} className="btn btn-success pull-left" name="form1">?????ng ??</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}