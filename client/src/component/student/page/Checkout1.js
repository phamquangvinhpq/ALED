import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { DEFAULT_API } from '../../../conf/env'
import { useHistory } from "react-router-dom";
export default function Checkout1() {
    const [khoahoc, setkhoahoc] = useState([])
    const [DSkhoahoc, setDSkhoahoc] = useState({
        courseName:'',
        price_discount:''
    })
  
    let id = useParams();
    let user_id=localStorage.getItem("userid");
    let history = useHistory()

    useEffect(() => {
        if(isNaN(id.id))
    {
      history.push("/404")
      window.location.reload();
    }
        laykhoahoc();

    }, [])

    const laykhoahoc = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` +`course/${id.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
               
                setkhoahoc(result)
               
               {result.map((value,index)=>

                setDSkhoahoc(value)
                
                )}
                
                
            })
            .catch(error => console.log('error', error));
            
    }


    const pay = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "price": DSkhoahoc.price_discount,
            "description": "Thanh Toan Khoa Hoc Tren Aled ",
            "user_id": user_id,
            "course_id": DSkhoahoc.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` +`Thanhtoan/Course`, requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location = result

            })
            .catch(error => console.log('error', error));
    }


    return (
        <div>
            <div className="page-banner" style={{ backgroundImage: 'url(/assets/uploads/banner_course.jpg)' }}>
                <div className="page-banner-bg" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Thanh to??n</h1>
                            <h3>
                                <a >Trang ch???</a>
                                <i className="fa fa-angle-right" />
                                 

                                Thanh to??n            </h3>

                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="table-responsive">
                                <table className="table table-bordered cart-table">
                                    <thead>
                                        <tr>
                                            <th>TT</th>
                                            <th>???nh</th>
                                            <th>T??n kh??a h???c</th>
                                            <th>Gi??</th>
                                        </tr>
                                    </thead>
                                    {khoahoc.map((value,index) =>
                                    <tbody>


                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <img src={value.image} className="w-100" />
                                            </td>
                                            <td>{value.courseName}</td>
                                            <td>{value.price_discount.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={3} className="tot tar">T???ng: </td>
                                            <td colSpan={2} className="tot">{value.price_discount.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</td>
                                        </tr>


                                    </tbody>
                                     )}
                                </table>
                            </div>
                            
                            <div className="text-right">
                                <a className="btn btn-success" onClick={pay}>Mua ngay </a>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className="mt_0">Ch???n ph????ng th???c thanh to??n</h3>
                            <div className="accordion-section mt_20">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading1">
                                            <h3 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#faq1">
                                                    <span>Chuy???n kho???n</span>
                                                </a>
                                            </h3>
                                        </div>
                                        <div id="faq1" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="panel-body px-3 mb-4">
                                               <h2>VNPAY</h2>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}