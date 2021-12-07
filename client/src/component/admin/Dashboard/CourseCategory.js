import React from 'react'

export default function CourseCategory() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Categories</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/addCategory" className="btn btn-primary btn-sm">Add New</a>
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
                                            <th>Category Name</th>
                                            <th>Category Slug</th>
                                            <th>Category Photo</th>
                                            <th>Show on home?</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Web Design</td>
                                            <td>web-design</td>
                                            <td>
                                                <img src="https://phpscriptpoint.com/cc/courseplus/public/uploads/category-photo-1.jpg" alt="Web Design" className="w-150" />
                                            </td>
                                            <td>No</td>
                                            <td>
                                                <a href="/admin/editCategory" className="btn btn-primary btn-xs">Edit</a>
                                                <a href="https://phpscriptpoint.com/cc/courseplus/admin/category/delete/1" className="btn btn-danger btn-xs" onclick="return confirm('Are you sure?');">Delete</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div></div></section>
        </div>


    )
}