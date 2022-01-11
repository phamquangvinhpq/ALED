export default function Exam() {
    return (
        <div>


            <div className="col-md-9">
                <form className="form-horizontal" >
                    <h3>Bài thi</h3>
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
                        <label htmlFor className="col-sm-3 control-label">Tên bài thi</label>
                        <div className="col-sm-9">
                            <input type="text" name="courseName" className="form-control" />
                        </div>
                    </div>

                    <div className="tab-content">
                        <div className="tab-pane active" id="tab_chapter">
                            <div className="box box-info pt_0">
                                <div className="box-body">

                                    <h3 className="sec_title">All Chapters</h3>
                                    <div className="table-responsive">
                                        <table id className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Câu hỏi</th>
                                                    <th>Loại câu hỏi</th>
                                                    <th>Điểm</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <td><input type="checkbox" aria-label="..." /></td>
                                                    <td>du má</td>
                                                    <td>checkbok</td>
                                                    <td>10</td>
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