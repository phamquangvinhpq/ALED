import React from 'react'

export default function AddUser() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Add User</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/users" className="btn btn-primary btn-sm">View All</a>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <form action="https://phpscriptpoint.com/cc/courseplus/admin/category/add" className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">User Name
                                            <span>*</span></label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Email </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="email" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Password </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="email" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Role <span>*</span></label>
                                        <div className="col-sm-4">
                                            <select className="form-control select2 w-100-p" >
                                                <option>-- Chọn danh mục --</option>
                                                <option value="1">User</option>
                                                <option value="2">Introduct</option>
                                                <option value="3">Admin</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label" />
                                        <div className="col-sm-6">
                                            <button type="submit" className="btn btn-success pull-left" name="form1">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}