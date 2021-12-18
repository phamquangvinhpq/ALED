import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
export default function AddCategory() {
    const [DanhMuc,setDanhMuc] = useState({
        name: ''
    })
    const history = useHistory()
    const [isEnable, setIsEnable] = useState(0);

    useEffect(() => {
    
      }, [
        isEnable
      ])

    const chuyentrangView = function (event) {
        addCategory()
        history.push("/admin/CourseCategory")
    }

    const onInputChange = (event) => {
        setDanhMuc({
          name: event.target.value,
        });
        console.log(event.target.value);
      };

      const addCategory = () => {
        var regexKhoangTrang = /\S/;
        var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;
        var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
        if(!regexName.test(DanhMuc.name)){
          swal("Thất bại", "Name chỉ được nhập chữ và không được bỏ trống", "warning")
        }else if(!regexKhoangTrang.test(DanhMuc.name)){
          swal("Thất bại", "Name không được bỏ trống", "warning")
        
        }else if(regexKitu.test(DanhMuc.name)){
          swal("Thất bại", "Name không được chứa kí tự", "warning")
        
        }else{

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "name": DanhMuc.name
        });
    
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(`${DEFAULT_API}` + "category/add", requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.loicode==-1){
                swal("nhập đầy đủ thông tin", {
                  text: `yêu cầu name ` + " " + result.details ,
                   icon: "warning",
                });
               
              }else{
                setIsEnable(isEnable +1)
               
              }
             
           
          })
          .catch(error => console.log('error', error));
        }
      }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Add Category</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/CourseCategory" className="btn btn-primary btn-sm">View All</a>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <form className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Category Name
                                            <span>*</span></label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="name" onChange={onInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label" />
                                        <div className="col-sm-6">
                                            <button onClick={
                (event) => {
                  chuyentrangView(event)
                }} type="submit" className="btn btn-success pull-left" name="form1">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )}