import React from 'react'

export default function Users() {
    return (
        
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Users (Students / Instructors)</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/adduser" className="btn btn-primary btn-sm">Add New</a>
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
                                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/user-2.jpg" alt="" className="w-150" />
                                            </td>
                                            <td>Patrick Henderson</td>
                                            <td>student@gmail.com</td>
                                            <td>
                                                Active </td>
                                            <td>
                                                <a href="https://phpscriptpoint.com/cc/courseplus/admin/user/change-status/2" className="btn btn-warning btn-xs btn-block" onclick="return confirm('Are you sure?');">Change Status</a>
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