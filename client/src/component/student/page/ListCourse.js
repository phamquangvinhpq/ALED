import React from 'react'

export default function ListCourse() {
    return (
        <div>
        <section class="breadcrumb-section">
            <div class="breadcrumb-shape">
                <img src="assets/images/round-shape-2.png" alt="shape" class="hero-round-shape-2 item-moveTwo"/>
                <img src="assets/images/plus-sign.png" alt="shape" class="hero-plus-sign item-rotate"/>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h2>web development</h2>
                        <div class="breadcrumb-link margin-top-10">
                            <span><a href="index-2.html">home</a> / <a href="course.html">course page</a> / web development</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="course-category-section padding-top-120 padding-bottom-90">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="course-category-sidebar">
                            <div class="lms-single-widget">
                                <div class="lms-widget-title">
                                    <h4>all categories</h4>
                                </div>
                                <ul>
                                    <li class="active"><a href="web-development.html">web development</a></li>
                                    <li><a href="education.html">education</a></li>
                                    <li><a href="business.html">business</a></li>
                                    <li><a href="banking.html">banking</a></li>
                                    <li><a href="corporate.html">corporate</a></li>
                                    <li><a href="consulting.html">consulting</a></li>
                                    <li><a href="marketing.html">marketing</a></li>
                                    <li><a href="photography.html">photography</a></li>
                                    <li><a href="music.html">music</a></li>
                                </ul>
                            </div>
                            <div class="lms-single-widget">
                                <div class="lms-widget-title">
                                    <h4>level</h4>
                                </div>
                                <ul>
                                    <li class="active"><a href="#">all levels</a></li>
                                    <li><a href="#">beginner</a></li>
                                    <li><a href="#">advance</a></li>
                                </ul>
                            </div>
                            <div class="lms-single-widget">
                                <div class="lms-widget-title">
                                    <h4>language</h4>
                                </div>
                                <select name="language" id="language">
                                    <option value="all language">all language</option>
                                    <option value="english">english</option>
                                    <option value="bengali">bengali</option>
                                    <option value="arabic">arabic</option>
                                  </select>
                            </div>
                            <div class="lms-single-widget">
                                <div class="lms-widget-title">
                                    <h4>instructor</h4>
                                </div>
                                <select name="instructor" id="instructor">
                                    <option value="all instructor">all instructor</option>
                                    <option value="arya stark">arya stark</option>
                                    <option value="john snow">john snow</option>
                                    <option value="devid walter">devid walter</option>
                                  </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="single-course-item">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-1.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>user experience design with adobe XD</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-1.png" alt="instructor"/>
                                                <h6>john doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>25,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 400.00</span>
                                                <span class="span-cross">$ 500.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">user experience design with adobe XD</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 400.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="single-course-item diffrent-bg-color">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-2.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>the complete financial analytic course</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-2.png" alt="instructor"/>
                                                <h6>chris doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>10,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>30 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>1h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 250.00</span>
                                                <span class="span-cross">$ 400.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">the complete financial analytic course</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 250.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="single-course-item diffrent-bg-color">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-4.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>user experience design with adobe XD</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-1.png" alt="instructor"/>
                                                <h6>john doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>25,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 400.00</span>
                                                <span class="span-cross">$ 500.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">user experience design with adobe XD</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 400.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="single-course-item">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-3.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>user experience design with adobe XD</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-1.png" alt="instructor"/>
                                                <h6>john doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>25,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 400.00</span>
                                                <span class="span-cross">$ 500.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">user experience design with adobe XD</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 400.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="single-course-item">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-4.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>learn photography from scratch</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-3.png" alt="instructor"/>
                                                <h6>chris doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>10,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>30 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>1h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 200.00</span>
                                                <span class="span-cross">$ 400.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">learn photography from scratch</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 200.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="single-course-item diffrent-bg-color">
                                    <div class="course-image">
                                        <img src="assets/images/course-image-5.png" alt="image"/>
                                    </div>
                                    <div class="course-content margin-top-30">
                                        <div class="course-title">
                                            <h4>learn about microsoft SQL server</h4>
                                        </div>
                                        <div class="course-instructor-rating margin-top-20">
                                            <div class="course-instructor">
                                                <img src="assets/images/course-instructor-4.png" alt="instructor"/>
                                                <h6>john doe</h6>
                                            </div>
                                            <div class="course-rating">
                                                <ul>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                    <li><i class="fa fa-star"></i></li>
                                                </ul>
                                                <span>4.2(30)</span>
                                            </div>
                                        </div>
                                        <div class="course-info margin-top-20">
                                            <div class="course-view">
                                                <i class="fa fa-eye"></i>
                                                <span>25,000 views</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <div class="course-price-cart margin-top-20">
                                            <div class="course-price">
                                                <span class="span-big">$ 300.00</span>
                                                <span class="span-cross">$ 400.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="hover-state">
                                        <span class="heart-icon"><i class="fa fa-heart-o"></i></span>
                                        <span class="title-tag">by instructor</span>
                                        <div class="course-title margin-top-10">
                                            <h4><a href="#">learn about microsoft SQL server</a></h4>
                                        </div>
                                        <div class="course-price-info margin-top-20">
                                            <span class="best-seller">best seller</span>
                                            <span class="course-category"><a href="#">web design</a></span>
                                            <span class="course-price">$ 300.00</span>
                                        </div>
                                        <div class="course-info margin-top-30">
                                            <div class="course-enroll">
                                                <span>enrolled 0</span>
                                            </div>
                                            <div class="course-video">
                                                <i class="fa fa-play-circle-o"></i>
                                                <span>36 lectures</span>
                                            </div>
                                            <div class="course-time">
                                                <i class="fa fa-clock-o"></i>
                                                <span>2h 40mins</span>
                                            </div>
                                        </div>
                                        <p class="margin-top-20">Learn WordPress like a Professional! Start from the basics and go all the way to creating your own applications and website!</p>
                                        <ul class="margin-top-20">
                                            <li><i class="fa fa-circle-o"></i><span>Lorem ipsum dolor sit amet.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Consectetur adipisicing elit.</span></li>
                                            <li><i class="fa fa-circle-o"></i><span>Placeat dolore quaerat itaque.</span></li>
                                        </ul>
                                        <div class="preview-button margin-top-20">
                                            <a href="#" class="template-button">course preview</a>
                                            <a href="#" class="template-button margin-left-10">add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}