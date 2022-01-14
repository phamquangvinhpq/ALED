import React from 'react'

export default function Dangky() {
    return (
        <div>
            <div className="container">
                <h1 className="text-center">Cách thiết kế giao diện trang đăng ký bằng Bootstrap</h1>
                <div className="row">
                    <div className="col-xs-70 col-sm-70 col-md-70 well well-sm col-md-offset-70">
                        <legend><a href="http://hocwebgiare.com/"><i className="glyphicon glyphicon-globe" /></a> Đăng ký thành viên!
                        </legend>
                        <form className="form" role="form">
                            <div className="row">
                                <div className="col-xs-6 col-md-6"> <input className="form-control" name="firstname" placeholder="Họ" required autofocus type="text" />
                                </div>
                                <div className="col-xs-6 col-md-6"> <input className="form-control" name="lastname" placeholder="Tên" required type="text" />
                                </div>
                            </div> <input className="form-control" name="youremail" placeholder="Email" type="email" /> 
                            
                            <input className="form-control" name="password" placeholder="Mật khẩu" type="password" /> <input className="form-control" name="retypepassword" placeholder="Nhập lại mật khẩu" type="password" /> <label htmlFor> Ngày sinh</label>
                            <div className="row">
                                <div className="col-xs-4 col-md-4"> <select className="form-control">              <option value="Day">Ngày</option>          </select>
                                </div>
                                <div className="col-xs-4 col-md-4"> <select className="form-control">              <option value="Month">Tháng</option>          </select>
                                </div>
                                <div className="col-xs-4 col-md-4"> <select className="form-control">              <option value="Year">Năm</option>          </select>
                                </div>
                            </div> <label className="radio-inline">          <input name="sex" id="inlineCheckbox1" defaultValue="male" type="radio" />          Nam </label> <label className="radio-inline">          <input name="sex" id="inlineCheckbox2" defaultValue="female" type="radio" />          Nữ </label>
                            <br />
                            <br />
                            <button className="btn btn-lg btn-primary btn-block" type="submit"> Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
