import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";

export default function Cart() {

    const [Author,setAuthor] = useState([])
    const [Cart, SetCart] = useState([])
    const [isEnable, setIsEnable] = useState(0);


    useEffect(() => {
        loadCart();
    }, [
        isEnable
    ])

    let user_id = localStorage.getItem("userid")
    let history = useHistory();

    function chuyentrangShopping() {
        history.push("/home");
      }

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
                SetCart(result)
            })
            .catch(error => console.log('error', error));
    }

    function total(){
        let sum = 0;
        Cart.map(function(value){
            sum += value.price;
        })
        return sum
    }

    const deletecart = (value) => {
        swal({
          title: "Are you sure?",
          text: `Bạn có chắc muốn xóa`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
    
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
    
              fetch(`${DEFAULT_API}` + `cart/delete/${value.id}`, requestOptions)
                .then(response => response.text())
                .then(result => {
                  console.log(result)
                  setIsEnable(isEnable + 1)
                })
                .catch(error => console.log('error', error));
              swal("đã xóa", {
                icon: "success",
              });
            }
          });
    
      };


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
                                Cart              </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table table-bordered cart-table">
                                    <thead>
                                        <tr>
                                            <th>Serial</th>
                                            <th>Thumbnail</th>
                                            <th>Course Title</th>
                                            <th>Price</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Cart.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{value.id}</td>
                                                    <td>
                                                        <img src={value.image} className="w-200" />
                                                    </td>
                                                    <td>{value.course_id}</td>
                                                    <td>{value.price}</td>
                                                    <td>
                                                        <a className="btn btn-xs btn-danger" onClick={() => deletecart(value)}><i className="fa fa-trash" /></a>
                                                    </td>
                                                </tr>
                                            )
                                        })}



                                        <tr>
                                            <td colSpan={3} className="tot tar">Total: </td>
                                            <td colSpan={2} className="tot">${total()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-right">
                                <a onClick={chuyentrangShopping} className="btn btn-success">Continue Shopping</a>
                                <a href="#" data-toggle="modal" data-target="#login_modal" className="btn btn-success">Proceed to
                                    Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}