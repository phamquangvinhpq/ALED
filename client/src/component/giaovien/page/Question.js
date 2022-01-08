export default function Question() {
    return (
        <div>

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
                        <label htmlFor className="col-sm-3 control-label" >Select basic <span>*</span></label>
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
                        <div className="col-sm-offset-4 col-sm-6">
                            <button type="submit" className="btn btn-default btn-success" name="form1">Thêm</button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}