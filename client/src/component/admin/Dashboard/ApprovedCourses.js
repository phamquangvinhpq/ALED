import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";


export default function ApprovedCourses() {

    const [khoahoc, setKhoaHoc] = useState([])
    useEffect(() => {
        loadkhoahoc()
    }, [

    ])

    const loadkhoahoc = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `course/cour-act`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setKhoaHoc(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));

    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Approved Courses</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Title</th>
                                            <th>Price</th>
                                            <th>Photo</th>
                                            <th>Category</th>
                                            <th>Instructor</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {khoahoc.map((value, index) =>
                                            <tr key={index}>
                                                <td>{value.id}</td>
                                                <td>{value.courseName}</td>
                                                <td>
                                                    {value.price}
                                                </td>
                                                <td>
                                                    <img
                                                        src={value.image}
                                                        className="w-100" />
                                                </td>
                                                <td>
                                             {value.categoryName}
                                         </td>
                                         <td>
                                             {value.authorName}
                                         </td>
                                                <td>
                                                    <a href={`/detail/${value.id}`} className="btn btn-success btn-block btn-xs" >See Course
                                                        Details</a>

                                                    <NavLink to={`/admin/Section/${value.id}`} className="btn btn-info btn-block btn-xs" >See Course
                                                        Content Details</NavLink>
                                                    
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}