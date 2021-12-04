import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
export default function Checkout1() {
    const [khoahoc, setkhoahoc] = useState([])
  
    let id = useParams();
    useEffect(() => {
        laykhoahoc();

    }, [])

    const laykhoahoc = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/course/${id.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setkhoahoc(result)
                
            })
            .catch(error => console.log('error', error));
            
    }


    const pay = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "price": khoahoc.price,
            "description": "mua khóa học " + khoahoc.courseName,
            "user_id": "1",
            "course_id": khoahoc.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/Thanhtoan/Course", requestOptions)
            .then(response => response.text())
            .then(result => {
                window.location = result

            })
            .catch(error => console.log('error', error));
    }


    return (
        <div>
            <div className="page-banner" style={{ backgroundImage: 'url(assets/uploads/banner_course.jpg)' }}>
                <div className="page-banner-bg" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Shopping Cart</h1>
                            <h3>
                                <a href="../index.html">Home</a>
                                <i className="fa fa-angle-right" />
                                cart  <i className="fa fa-angle-right" />
                                checkout            </h3>
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
                                            <th>Serial</th>
                                            <th>Thumbnail</th>
                                            <th>Course Title</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <img src={khoahoc.image} className="w-100" />
                                            </td>
                                            <td>{khoahoc.courseName}</td>
                                            <td>{khoahoc.price}</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={3} className="tot tar">Total: </td>
                                            <td colSpan={2} className="tot">{khoahoc.price}</td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                            <div className="text-right">
                                <a href="https://phpscriptpoint.com/cc/courseplus/cart/view" className="btn btn-success">Back to Cart Page</a>
                            </div>
                            <div className="text-right">
                                <a className="btn btn-success" onClick={pay}>thanh toán ngay </a>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h3 className="mt_0">Select a Payment Method</h3>
                            <div className="accordion-section mt_20">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading p-3 mb-3" role="tab" id="heading1">
                                            <h3 className="panel-title">
                                                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#faq1">
                                                    <span>chuyển khoản ngân hàng</span>
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