import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Instructors() {

    const [giangVien, setGiangVien] = useState([])

    useEffect(() => {
            loadGiangVien()
    }, [
    ])

    const loadGiangVien = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `get-gv`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setGiangVien(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    return (

        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Instructors</h1>
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
                                            <th width={50}>SL</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th width={120}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {giangVien.map((value,index) =>
                                             <tr key={index}>
                                             <td>{value.id}</td>
                                             <td>{value.image}</td>
                                             <td>{value.name}</td>
                                             <td>{value.email}</td>
                                             <td>
                                             {value.status == 1 ? "Active" : "No-Active" }  </td>
                                             <td>
                                                 <a href="https://phpscriptpoint.com/cc/courseplus/admin/instructor/show-courses/8" className="btn btn-success btn-xs btn-block" target="_blank">Show
                                                     Courses</a>
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