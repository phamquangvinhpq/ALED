import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import {
  BrowserRouter,
  Switch,
  NavLink,
} from "react-router-dom";
export default function HeaderGV() {

  const [DScategory, setDScategory] = useState([])

  useEffect(() => {

    loadCategory();

  }, [])

  const loadCategory = async () => {


    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${DEFAULT_API}`+"category/", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result) 
      setDScategory(result)})
      .catch(error => console.log('error', error));
  }
  console.log("cc");

  return (
    <div>
      {/* Preloader Starts */}
      <div className="preloader" id="preloader">
        <div className="preloader-inner">
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
        </div>
      </div>
      {/* Main Menu */}
      <div className="main-menu">
        <div className="menu-logo">
          <a href="index-2.html"><img src="assets/images/logo-both-color.png" alt="logo" /></a>
        </div>
        <ul>
          <li className="have-submenu"><a href="   ">home</a>
            <ul className="sub-menu">
              <li><a href="index-2.html">home 01</a></li>
              <li><a href="home-2.html">home 02</a></li>
            </ul>
          </li>
          <li><a href="about.html">about</a></li>
          <li><a href="course-details.html">course details</a></li>
          <li><a href="course-video.html">course video</a></li>
          <li><a href="package.html">package</a></li>
          <li><a href="instructor-details.html">instructor details</a></li>
          <li><a href="cart.html">cart</a></li>
          <li><a href="purchase.html">purchase</a></li>
          <li className="have-submenu"><a href="   ">blog</a>
            <ul className="sub-menu">
              <li><a href="blog.html">blog</a></li>
              <li><a href="blog-details.html">blog details</a></li>
            </ul>
          </li>
          <li><a href="">contact</a></li>
          <li><a href="">log in</a></li>
          <li><a href="">sign up</a></li>
          <li><a href="">404</a></li>
        </ul>
      </div>
      {/* Header Section Starts */}
      <header className="header-section">
        {/* Header Info Starts */}
        <div className="header-info">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="info-left">
                  <div className="phone-part">
                    <i className="fa fa-phone-square" />
                    <span><a href="   ">+012-345 6789</a></span>
                  </div>
                  <div className="email-part">
                    <i className="fa fa-envelope-open" />
                    <span><a href="   ">info@rumbok.com</a></span>
                  </div>
                  <div className="menu-toggle-bar">
                    <div className="custom-bars">
                      <div className="custom-bar bar-1" />
                      <div className="custom-bar bar-2" />
                      <div className="custom-bar bar-3" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="info-right">
                  <ul>
                    <li className="login-button"> <a href="/login">login</a></li>
                    <li><a href="   "><i className="fa fa-twitter" /></a></li>
                    <li><a href="   "><i className="fa fa-facebook" /></a></li>
                    <li><a href="   "><i className="fa fa-linkedin" /></a></li>
                    <li><a href="   "><i className="fa fa-instagram" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main Header Starts */}
        <div className="main-header">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="header-logo">
                  <a href="index-2.html"><img src="assets/images/logo.png" alt="logo" /></a>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="main-header-right">
                  {/* Category Dropdown Starts */}
                  <div className="category-dropdown">
                    <div className="menu-bar">
                      <i className="fa fa-bars" />
                      <span>categories</span>
                    </div>
                    <div className="category-menu">
                      <ul>
                        {DScategory.map((value, index) =>
                          <li><a>{value.name}</a></li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="header-search">
                    <form action="   ">
                      <input type="text" placeholder="Search" />
                      <button type="submit"><i className="fa fa-search" /></button>
                    </form>
                  </div>
                  <div className="header-button">
                    <a href="signup.html" className="template-button-2">become student</a>
                    <a href="instructor-details.html" className="template-button">instructor</a>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    </div>

  )
}
