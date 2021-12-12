import React from 'react'

export default function ApprovedCourses() {
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
                                        <tr>
                                            <td>1</td>
                                            <td>Build An eCommerce Website With WordPress</td>
                                            <td>
                                                $11.29 <br /><del className="c-red">$45.29</del>
                                            </td>
                                            <td>
                                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/course-30.jpg" alt="Build An eCommerce Website With WordPress" className="w-100" />
                                            </td>
                                            <td>
                                                WooCommerce </td>
                                            <td>
                                                David Beckham </td>
                                            <td>
                                                <a href="#" className="btn btn-success btn-block btn-xs" target="_blank">See Course
                                                    Details</a>
                                                <a href="#" className="btn btn-info btn-block btn-xs" target="_blank">See Course
                                                    Content Details</a>
                                                <a href="#s" className="btn btn-danger btn-block btn-xs" onclick="return confirm('Are you sure want to make this course pending?');">Make
                                                    this pending</a>
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