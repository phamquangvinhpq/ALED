import React from 'react'

export default function AddCategory() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Add Category</h1>
                </div>
                <div className="content-header-right">
                    <a href="/admin/CourseCategory" className="btn btn-primary btn-sm">View All</a>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <form action="https://phpscriptpoint.com/cc/courseplus/admin/category/add" className="form-horizontal" encType="multipart/form-data" method="post" acceptCharset="utf-8">
                            <div className="box box-info">
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Category Name
                                            <span>*</span></label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="category_name" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Category Slug </label>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="category_slug" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Select Parent</label>
                                        <div className="col-sm-4">
                                            <select name="category_parent" className="form-control select2" id="parentType">
                                                <option value={0}>None</option>
                                                <option value={25}>API Testing</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor className="col-sm-3 control-label">Photo <span>*</span></label>
                                        <div className="col-sm-9 pt_5">
                                            <input type="file" name="category_photo" />(Only jpg, jpeg, gif and png are
                                            allowed)
                                        </div>
                                    </div>
                                    <div className="form-group" id="showOnHomeDiv">
                                        <label htmlFor className="col-sm-3 control-label">Show on home? </label>
                                        <div className="col-sm-4">
                                            <select name="category_on_home" className="form-control select2 w-100-p">
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
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

    )}