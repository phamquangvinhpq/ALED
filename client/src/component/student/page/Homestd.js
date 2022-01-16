import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { DEFAULT_API } from '../../../conf/env';
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from 'react-redux'


export default function Homestd() {
    const [listCourse, setListCourse] = useState([])
    const [listFavorite, setListFavorite] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [damua, setdamua] = useState(false);
    const user_id = localStorage.getItem("userid")
    const dispatch = useDispatch()
    const [timeString,setTimeString] = useState('')
    let history = useHistory();

    function fomatDate(now) {
        const today = new Date();
        const ngay = today.getDate()+'/'+(today.getMonth()+1)
        const gio = today.getHours()
        const phut = today.getMinutes()
        const giay = today.getSeconds()
        return `${ngay} : ${gio} : ${phut} : ${giay}`
    }

    useEffect(() => {
        if (user_id) {
            loadFavorite();
        }
        loadListCategories();
        loadListCourse();
        loadListCourseCreateDate()
        setInterval(()=>{
            const today = new Date();
            const newTimeString = fomatDate(today);

            setTimeString(newTimeString)
           
        }, 1000);
    }, [
    ]);

    const checkTym = (value) => {
        if (user_id) {
            if (listFavorite.some(favorite => favorite.course_id === value)) {
                return <span onClick={() => deleteFavorite(value)} className="heart-icon"><i className="fa fa-heart" /></span>
            } else {
                return <span onClick={() => addFavorite(value)} className="heart-icon"><i className="fa fa-heart-o" /></span>
            }
        }
    }

    function getcheckout(value) {

        damuakhoahoc(value)

    }

    const deleteFavorite = (value) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}favorite?user_id=${user_id}&course_id=${value}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(swal("Thành Công", "Đã bỏ yêu thích", "success"))
            .then(loadFavorite)
            .catch(error => console.log('error', error));
    };

    const addFavorite = (value) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user_id": user_id,
            "course_id": value,
            "status": 1
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}favorite`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(swal("Thành Công", "Đã thêm yêu thích", "success"))
            .then(loadFavorite)
            .catch(error => console.log('error', error));
    };

    const loadFavorite = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}favorite?user_id=${user_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => setListFavorite(result))
            .catch(error => console.log('error', error));
    };

    const [listCourseCreateDate, setListCourseCreateDate ] = useState([])

    const loadListCourseCreateDate =  () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}course/createdate?sort=DESC`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setListCourseCreateDate(result)
            })
            .catch(error => console.log('error', error));
    }

    const loadListCourse = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}course/buythemost`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setListCourse(result)
            })
            .catch(error => console.log('error', error));
    }

    const loadListCategories = async () => {
        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}category/`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setListCategories(result)
            })
            .catch(error => console.log('error', error));
    }

    const onClickCategory = (select) => {
        history.push(`/Course/${select}`)

    };

    const damuakhoahoc = async (value) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`${DEFAULT_API}` + `giangvien/test/` + `${user_id}` + `/${value.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if (result === "bought") {
                    swal("Thông báo", "Bạn đã mua khóa học này")
                } else {
                    history.push(`/checkout/${value.id}`)
                    
                }

            })
            .catch(error => console.log('error', error));
    }

    
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
                            <a href="https://www.youtube.com/watch?v=eybyQcXUdzM" className="button-video">
                                <i className="fa fa-play item-ripple" />
                            </a>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="hero-content">
                                    <h1 className="home-2"><span>học các kỹ năng mới trực tuyến và tìm các khóa học tốt nhất</span> &amp; trở thành bậc thầy</h1>
                                    <div className="hero-description"><h6>tự tin thuê những chuyên gia đã được chứng minh bằng cách sử dụng nền tảng nhân tài từ xa lớn nhất thế giới.</h6></div>
                                    <div className="hero-button">
                                        <a href="https://www.youtube.com/watch?v=eybyQcXUdzM" className="template-button">bắt đầu khóa học <i className="fa fa-play-circle" /></a>
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
                                    <img src="/assets/images/round-shape-2.png" alt="shape" className="round-shape-2" />
                                    <img src="/assets/images/plus-sign.png" alt="shape" className="plus-sign item-rotate" />
                                    <img src="/assets/images/round-shape-3.png" alt="shape" className="round-shape-3" />
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="countdown-left">
                                            <h2 className="home-2">sắp tới miễn phí của chúng tôi <span>thiết kế web</span> khóa học!</h2>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="countdown-right">
                                            <ul className="countdown">
                                                <li>
                                                 <h2 className="days_ref">ĐỒNG HỒ</h2>
                                                    <span className="days" id='day'>{timeString}</span>
                                                    
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
                                        <h2 className="home-2">Các khóa học phổ biến <span>của chúng tôi</span></h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row grid">
                                {listCourse.map((value, index) =>
                                    <div className="col-lg-4 col-md-6 grid-item marketing">
                                        <div className="single-course-item">
                                            <div className="course-image">
                                                <img src={value.image} style={{ height: 250, maxWidth: 350 }} alt="image" />
                                            </div>
                                            <div className="course-content margin-top-30">
                                                <div className="course-title">
                                                    <h4 className="home-2">Course Name : {value.courseName}</h4>
                                                </div>
                                                <div className="course-instructor-rating margin-top-20">
                                                    <div className="course-instructor">
                                                        <img src={value.imageAuthor} alt="instructor" />
                                                        <h6>{value.authorName}</h6>
                                                    </div>
                                                    <div className="course-rating">
                                                        <span>
                                                            {value.rate ?
                                                                <ReactStars
                                                                    edit={false}
                                                                    value={value.rate}
                                                                    size={24}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#ffd700" /> :
                                                                "There are no reviews yet"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="course-info margin-top-20">
                                                    <div className="course-video">
                                                        <i className="fa fa-play-circle-o" />
                                                        <span> Chapter: {value.countChapter}</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="course-price-cart margin-top-20">
                                                    <div className="course-price">
                                                        <span className="span-big">{value.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</span>
                                                        {/* <span className="span-cross">$ 500.00</span> */}
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="hover-state">

                                                {/* {ListFavorite.includes(value.id) ? <span onClick={() => deleteFavoriteClick(value.id)} className="heart-icon"><i className="fa fa-heart" /></span> : <span onClick={() => addFavoriteClick(value.id)} className="heart-icon"><i className="fa fa-heart-o" /></span>} */}
                                                {checkTym(value.id)}

                                                <span className="title-tag">by {value.authorName}</span>

                                                <div className="course-title margin-top-10">
                                                    <h4 className="home-2"><a >{value.courseName}</a></h4>
                                                </div>
                                                <div className="course-price-info margin-top-20">
                                                    <span className="best-seller">{value.categoryName}</span>
                                                    <span className="course-price">{value.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}</span>
                                                </div>
                                                <div className="course-info margin-top-30">
                                                </div>
                                                <p className="margin-top-20">{value.description}</p>
                                                
                                                <div className="preview-button margin-top-20">

                                                    <a onClick={() =>{
                                                         history.push("detail/"+value.id)
                                                    }} className="template-button">Chi tiết khóa học</a>
                                                    {damua==true ?  <a   disabled="disabled" className="template-button margin-left-10" >mua ngay</a>: <a onClick={() => getcheckout(value)} className="template-button margin-left-10">Mua ngay</a> }
                                                    

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="course-home-2 padding-top-115 padding-bottom-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-title text-center margin-bottom-40">
                                        <h2 className="home-2">Các khóa học đăng gần nhất <span>của chúng tôi</span></h2>
                                    </div>
                                </div>
                            </div>

                            <div className="row grid">
                                {listCourseCreateDate.map((value, index) =>
                                    <div className="col-lg-4 col-md-6 grid-item marketing">
                                        <div className="single-course-item">
                                            <div className="course-image">
                                                <img src={value.image} style={{ height: 250, maxWidth: 350 }} alt="image" />
                                            </div>
                                            <div className="course-content margin-top-30">
                                                <div className="course-title">
                                                    <h4 className="home-2">{value.courseName}</h4>
                                                </div>
                                                <div className="course-instructor-rating margin-top-20">
                                                    <div className="course-instructor">
                                                        <img src={value.imageAuthor} alt="instructor" />
                                                        <h6>{value.authorName}</h6>
                                                    </div>
                                                    <div className="course-rating">
                                                        <span>
                                                            {value.rate ?
                                                                <ReactStars
                                                                    edit={false}
                                                                    value={value.rate}
                                                                    size={24}
                                                                    isHalf={true}
                                                                    emptyIcon={<i className="far fa-star"></i>}
                                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                                    fullIcon={<i className="fa fa-star"></i>}
                                                                    activeColor="#ffd700" /> :
                                                                "Chưa có đánh giá"}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="course-info margin-top-20">
                                                    <div className="course-video">
                                                        <i className="fa fa-play-circle-o" />
                                                        <span>Số chương : {value.countChapter}</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="course-price-cart margin-top-20">
                                                    <div className="course-price">
                                                        <span className="span-big">{value.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</span>
                                                        {/* <span className="span-cross">$ 500.00</span> */}
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="hover-state">

                                                {/* {ListFavorite.includes(value.id) ? <span onClick={() => deleteFavoriteClick(value.id)} className="heart-icon"><i className="fa fa-heart" /></span> : <span onClick={() => addFavoriteClick(value.id)} className="heart-icon"><i className="fa fa-heart-o" /></span>} */}
                                                {checkTym(value.id)}

                                                <span className="title-tag">Giảng viên : {value.authorName}</span>

                                                <div className="course-title margin-top-10">
                                                    <h4 className="home-2"><a >{value.courseName}</a></h4>
                                                </div>
                                                <div className="course-price-info margin-top-20">
                                                    <span className="best-seller">danh mục : {value.categoryName}</span>   
                                                    <span className="course-price">{value.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}</span>
                                                </div>
                                                <div className="course-info margin-top-30">
                                                </div>
                                                <p className="margin-top-20">{value.create_date}</p>
                                                <p className="margin-top-20">{value.description}</p>
                                                
                                                <div className="preview-button margin-top-20">

                                                    <a onClick={() =>{
                                                         history.push("detail/"+value.id)
                                                    }} className="template-button">Chi tiết khóa học</a>
                                                    {damua==true ?  <a   disabled="disabled" className="template-button margin-left-10" >buy now</a>: <a onClick={() => getcheckout(value)} className="template-button margin-left-10">Mua ngay</a> }
                                                    

                                                </div>
                                            </div>

                                            
                                        </div>

                                    </div>
                                )}
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
                                    <h2 className="home-2">Danh mục <span>phổ biến</span></h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {listCategories.map((value, index) =>

                                <div className="col-lg-3 col-md-6" onClick={() => onClickCategory(value.id)}>
                                    <a>
                                        <div className="single-category-item">
                                            <div className="category-image">
                                                <img src="assets/images/category-icon-1-home-2.png" alt="image" />
                                                <img src="assets/images/round-shape-3.png" alt="shape" className="feature-round-shape-3" />
                                            </div>
                                            <div className="category-content">
                                                <div className="category-title">
                                                    <h4 className="home-2">{value.name}</h4>
                                                </div>
                                                <span>{value.countCourse} Khóa Học</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="category-section-link">
                                    <h6>Dont's see wht you're looking for? <a href="/Course/0">See all categories.</a></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>






            </div>



        </div>

    )
}