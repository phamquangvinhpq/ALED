import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';


export default function Signup() {

    return (
        <div>

            <div>
                <section className="hero-home-2">
                    <div className="hero-shape">
                        <img src="assets/images/wing-shape.png" alt="shape" className="wing-shape" />
                    </div>
                    <div className="hero-image">
                        <img src="assets/images/hero-home-2.jpg" alt="image" />
                        <div className="video-play-button">
                            <a href="https://www.youtube.com/watch?v=8AGgbIQyqR8" className="button-video">
                                <i className="fa fa-play item-ripple" />
                            </a>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="hero-content">
                                    <h1 className="home-2"><span>learn new skills online find best courses</span> &amp; become master</h1>
                                    <div className="hero-description"><h6>hire proven pros with confidence using world largest remote talent platform.</h6></div>
                                    <div className="hero-button">
                                        <a href="course.html" className="template-button">start course <i className="fa fa-play-circle" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div>
                    <br /><br />
                    <section className="countdown-section">
                        <div className="container">
                            <div className="common-section">
                                <div className="counter-shape">
                                    <img src="assets/images/round-shape-2.png" alt="shape" className="round-shape-2" />
                                    <img src="assets/images/plus-sign.png" alt="shape" className="plus-sign item-rotate" />
                                    <img src="assets/images/round-shape-3.png" alt="shape" className="round-shape-3" />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="countdown-left">
                                            <h2 className="home-2">upcoming our free <span>web design</span> course!</h2>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="countdown-right">
                                            <ul className="countdown">
                                                <li>
                                                    <span className="days">00</span>
                                                    <p className="days_ref">days</p>
                                                </li>
                                                <li className="separator">:</li>
                                                <li>
                                                    <span className="hours">00</span>
                                                    <p className="hours_ref">hours</p>
                                                </li>
                                                <li className="separator">:</li>
                                                <li>
                                                    <span className="minutes">00</span>
                                                    <p className="minutes_ref">minutes</p>
                                                </li>
                                                <li className="separator">:</li>
                                                <li>
                                                    <span className="seconds">00</span>
                                                    <p className="seconds_ref">seconds</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Course Home 02 Starts */}
                    <section className="course-home-2 padding-top-115 padding-bottom-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center margin-bottom-40">
                                        <h2 className="home-2">see our <span>popular courses</span></h2>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row grid">
                                <div className="col-lg-4 col-md-6 grid-item marketing">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-1.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">user experience design with adobe XD</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-1.png" alt="instructor" />
                                                    <h6>john doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>25,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 400.00</span>
                                                    <span className="span-cross">$ 500.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">user experience design with adobe XD</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 400.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 grid-item ux">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-2.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">the complete financial analytic course</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-2.png" alt="instructor" />
                                                    <h6>chris doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>10,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>30 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>1h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 250.00</span>
                                                    <span className="span-cross">$ 400.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">the complete financial analytic course</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 250.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 grid-item web">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-4.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">user experience design with adobe XD</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-1.png" alt="instructor" />
                                                    <h6>john doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>25,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 400.00</span>
                                                    <span className="span-cross">$ 500.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">user experience design with adobe XD</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 400.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 grid-item music">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-3.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">user experience design with adobe XD</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-1.png" alt="instructor" />
                                                    <h6>john doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>25,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 400.00</span>
                                                    <span className="span-cross">$ 500.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">user experience design with adobe XD</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 400.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 grid-item photography">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-4.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">learn photography from scratch</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-3.png" alt="instructor" />
                                                    <h6>chris doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>10,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>30 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>1h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 200.00</span>
                                                    <span className="span-cross">$ 400.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">learn photography from scratch</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 200.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 grid-item web">
                                    <div className="single-course-item">
                                        <div className="course-image">
                                            <img src="assets/images/course-image-5.png" alt="image" />
                                        </div>
                                        <div className="course-content margin-top-30">
                                            <div className="course-title">
                                                <h4 className="home-2">learn about microsoft SQL server</h4>
                                            </div>
                                            <div className="course-instructor-rating margin-top-20">
                                                <div className="course-instructor">
                                                    <img src="assets/images/course-instructor-4.png" alt="instructor" />
                                                    <h6>john doe</h6>
                                                </div>
                                                <div className="course-rating">
                                                    <ul>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                        <li><i className="fa fa-star" /></li>
                                                    </ul>
                                                    <span>4.2(30)</span>
                                                </div>
                                            </div>
                                            <div className="course-info margin-top-20">
                                                <div className="course-view">
                                                    <i className="fa fa-eye" />
                                                    <span>25,000 views</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <div className="course-price-cart margin-top-20">
                                                <div className="course-price">
                                                    <span className="span-big">$ 300.00</span>
                                                    <span className="span-cross">$ 400.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hover-state">
                                            <span className="heart-icon"><i className="fa fa-heart-o" /></span>
                                            <span className="title-tag">by instructor</span>
                                            <div className="course-title margin-top-10">
                                                <h4 className="home-2"><a href="course-details.html">learn about microsoft SQL server</a></h4>
                                            </div>
                                            <div className="course-price-info margin-top-20">
                                                <span className="best-seller">best seller</span>
                                                <span className="course-category"><a href="#">web design</a></span>
                                                <span className="course-price">$ 300.00</span>
                                            </div>
                                            <div className="course-info margin-top-30">
                                                <div className="course-enroll">
                                                    <span>enrolled 0</span>
                                                </div>
                                                <div className="course-video">
                                                    <i className="fa fa-play-circle-o" />
                                                    <span>36 lectures</span>
                                                </div>
                                                <div className="course-time">
                                                    <i className="fa fa-clock-o" />
                                                    <span>2h 40mins</span>
                                                </div>
                                            </div>
                                            <p className="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                            <ul className="margin-top-20">
                                                <li><i className="fa fa-circle-o" /><span>Lorem ipsum dolor sit amet.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Consectetur adipisicing elit.</span></li>
                                                <li><i className="fa fa-circle-o" /><span>Placeat dolore quaerat itaque.</span></li>
                                            </ul>
                                            <div className="preview-button margin-top-20">
                                                <a href="course-details.html" className="template-button">course preview</a>
                                                <a href="cart.html" className="template-button margin-left-10">add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Categorry Home 02 Starts */}
                <section className="category-home-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title text-center">
                                    <h2 className="home-2">popular <span>categories</span></h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-1-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">photography</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-2-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">web design</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-3-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">blog wrining</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-4-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">after effects</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-5-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">marketing</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-6-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">education</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-7-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">UI UX design</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <a href="web-development.html"><div className="single-category-item">
                                    <div className="category-image">
                                        <img src="assets/images/category-icon-1-home-2.png" alt="image" />
                                        <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                    </div>
                                    <div className="category-content">
                                        <div className="category-title">
                                            <h4 className="home-2">web software</h4>
                                        </div>
                                        <span>03 course(S)</span>
                                    </div>
                                </div></a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="category-section-link">
                                    <h6>Dont's see wht you're looking for? <a href="web-development.html">See all categories.</a></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


              



            </div>



        </div>

    )

}
