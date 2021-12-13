import React from 'react'
import { NavLink } from "react-router-dom";


export default function Pendinginstructer() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Pending Courses</h1>
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
                                        <th>STT</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Build An eCommerce Website With WordPress</td>
                                        <td>
                                            $11.29 <br/>
                                            <del className="c-red">$45.29</del>
                                        </td>
                                        <td>
                                            <img
                                                src="https://phpscriptpoint.com/cc/courseplus/public/uploads/course-30.jpg"
                                                alt="Build An eCommerce Website With WordPress" className="w-100"/>
                                        </td>
                                        <td>
                                            WooCommerce
                                        </td>
                                        <td>
                                            David Beckham
                                        </td>
                                        <td>
                                            <a href="#"
                                               className="btn btn-success btn-block btn-xs" target="_blank">View Skill
                                              </a>

                                            <a href="#"
                                               className="btn btn-danger btn-block btn-xs"
                                               >Accept</a>
            
                                        </td>
                                    </tr>
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