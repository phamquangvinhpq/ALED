import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env'

export default function Dashboard() {
    const [countCourse,setCountCourse] = useState(0)
    const [countCategory,setCountCategory] = useState(0)
    const [countUs,setCountUser] = useState(0)

    useEffect(() =>{
        countCour()
        countUser()
        countCate()
    },[

    ])

 

    const countCour = async () => {
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`course/count`, requestOptions)
        .then(response => response.json())
        .then(result => {setCountCourse(result)
                    console.log("hihi:" +result);        
        })
        .catch(error => console.log('error', error));
    }

    const countUser = async () => {
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`count`, requestOptions)
        .then(response => response.json())
        .then(result => {setCountUser(result)
                    console.log("hihi:" +result);        
        })
        .catch(error => console.log('error', error));
    }

    const countCate = async () => {
        var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` +`category/count`, requestOptions)
        .then(response => response.json())
        .then(result => {setCountCategory(result)
                    console.log("hihi:" +result);        
        })
        .catch(error => console.log('error', error));
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Bảng điều khiển</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Danh mục khóa học</span>
                                <span className="info-box-number">{countCategory}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Khóa học</span>
                                <span className="info-box-number">{countCourse}</span>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-green"><i className="fa fa-hand-o-right" /></span>
                            <div className="info-box-content">
                                <span className="info-box-text">Tài khoản</span>
                                <span className="info-box-number">{countUs}</span>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </section>
        </div>
    )
}