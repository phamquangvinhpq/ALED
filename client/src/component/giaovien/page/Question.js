export default function Question() {
    return (
        <div>
            <div className="modal" id="add_question" tabIndex={-1} aria-labelledby="demo-default-modal" aria-hidden="true">
                <div className="modal-dialog w-60-p">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                            >
                                ×
                            </button>
                            <h4 className="modal-title">Thêm câu hỏi</h4>
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal"
                                encType="multipart/form-data"

                                acceptCharset="utf-8">
                                <div className="form-group mb_5 ovh">
                                    <div className="col-md-9">
                                        <form className="form-horizontal" >
                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label" >Khóa học  <span>*</span></label>
                                                <div className="col-sm-9">
                                                    <select className="form-control w-100-p"  >
                                                        <option>-- Chọn chương --</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label" >Chương <span>*</span></label>
                                                <div className="col-sm-9">
                                                    <select className="form-control w-100-p"  >
                                                        <option>-- Chọn chương --</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">Câu hỏi *</label>
                                                <div className="col-sm-9">
                                                    <input type="text" name="courseName" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">đáp án 1</label>
                                                <div className="col-sm-9">
                                                    <div className=" input-group">
                                                        <span className="input-group-addon">
                                                            <input type="radio" aria-label="..." />
                                                        </span>
                                                        <input type="text" className="form-control" aria-label="..." />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">đáp án 2</label>
                                                <div className="col-sm-9">
                                                    <div className=" input-group">
                                                        <span className="input-group-addon">
                                                            <input type="radio" aria-label="..." />
                                                        </span>
                                                        <input type="text" className="form-control" aria-label="..." />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">đáp án 3</label>
                                                <div className="col-sm-9">
                                                    <div className=" input-group">
                                                        <span className="input-group-addon">
                                                            <input type="radio" aria-label="..." />
                                                        </span>
                                                        <input type="text" className="form-control" aria-label="..." />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">đáp án 4</label>
                                                <div className="col-sm-9">
                                                    <div className=" input-group">
                                                        <span className="input-group-addon">
                                                            <input type="radio" aria-label="..." />
                                                        </span>
                                                        <input type="text" className="form-control" aria-label="..." />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor className="col-sm-3 control-label">Điểm</label>
                                                <div className="col-sm-9">
                                                    <input type="text" name="courseName" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="col-sm-offset-3 col-sm-6">
                                                    <button type="submit" className="btn btn-default btn-success" name="form1">Thêm</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </form>
                            
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-9">
                <form className="form-horizontal" >
                    <h3>Ngân hàng câu hỏi</h3>
                    <a data-target="#add_question" data-toggle="modal">Thêm Mới</a>
                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label" >Khóa học  <span>*</span></label>
                        <div className="col-sm-9">
                            <select className="form-control w-100-p"  >
                                <option>-- Chọn chương --</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label" >Chương <span>*</span></label>
                        <div className="col-sm-9">
                            <select className="form-control w-100-p"  >
                                <option>-- Chọn chương --</option>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">Câu hỏi *</label>
                        <div className="col-sm-9">
                            <input type="text" name="courseName" className="form-control" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">đáp án 1</label>
                        <div className="col-sm-9">
                            <div className=" input-group">
                                <span className="input-group-addon">
                                    <input type="radio" aria-label="..." />
                                </span>
                                <input type="text" className="form-control" aria-label="..." />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">đáp án 2</label>
                        <div className="col-sm-9">
                            <div className=" input-group">
                                <span className="input-group-addon">
                                    <input type="radio" aria-label="..." />
                                </span>
                                <input type="text" className="form-control" aria-label="..." />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">đáp án 3</label>
                        <div className="col-sm-9">
                            <div className=" input-group">
                                <span className="input-group-addon">
                                    <input type="radio" aria-label="..." />
                                </span>
                                <input type="text" className="form-control" aria-label="..." />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">đáp án 4</label>
                        <div className="col-sm-9">
                            <div className=" input-group">
                                <span className="input-group-addon">
                                    <input type="radio" aria-label="..." />
                                </span>
                                <input type="text" className="form-control" aria-label="..." />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor className="col-sm-3 control-label">Điểm</label>
                        <div className="col-sm-9">
                            <input type="text" name="courseName" className="form-control" />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-4 col-sm-6">
                            <button type="submit" className="btn btn-default btn-success" name="form1">Thêm</button>
                        </div>
                    </div> */}
                    <div className="tab-content">
                        <div className="tab-pane active" id="tab_chapter">
                            <div className="box box-info pt_0">
                                <div className="box-body">

                                    <h3 className="sec_title">All Chapters</h3>
                                    <div className="table-responsive">
                                        <table id className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>TT</th>
                                                    <th>Câu hỏi</th>
                                                    <th>Đáp án</th>
                                                    <th>Điểm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <td>1</td>
                                                    <td>du má</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}