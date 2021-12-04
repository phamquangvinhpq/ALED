import React from 'react'

export default function Instructors() {
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
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/user-8.jpg" alt="" className="w-150" />
                                            </td>
                                            <td>Brent Grundy</td>
                                            <td>instructor@gmail.com</td>
                                            <td>
                                                Active </td>
                                            <td>
                                                <a href="https://phpscriptpoint.com/cc/courseplus/admin/instructor/show-courses/8" className="btn btn-success btn-xs btn-block" target="_blank">Show
                                                    Courses</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/user-9.jpg" alt="" className="w-150" />
                                            </td>
                                            <td>David Beckham</td>
                                            <td>instructor2@gmail.com</td>
                                            <td>
                                                Active </td>
                                            <td>
                                                <a href="https://phpscriptpoint.com/cc/courseplus/admin/instructor/show-courses/9" className="btn btn-success btn-xs btn-block" target="_blank">Show
                                                    Courses</a>
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