export default function Exam() {
    return (
        <div className="container">
            <div className="problems-wrapper">
                <div>Trắc nghiệm cuối bài</div>
                <p1 style={{ fontSize: 'small' }}>0.0/10.0 points(graged)</p1>
                <div>
                    <div>
                        <div className="title">Câu 1 :</div>
                        <hr style={{ color: 'red' }} />
                        <div className="form-control" type="text" aria-label="Disabled input example">
                            nếu 1 + 1 = 3 thì 3 * 3 = bao nhiêu ?
                        </div>
                    </div>
                    <div>
                        <div className="shop_sidebar_area">
                            <div className="widget brands mb-50">
                                <div className="widget-desc">
                                    {/* Single Form Check */}
                                    <div className="form-control" id="group-button">
                                        <input className="form-check-input" type="checkbox" defaultValue id="amado" />
                                        <label className="padding-left-10 form-check-label" htmlFor="amado"> Amado</label>
                                    </div>
                                    {/* Single Form Check */}
                                    <div className="form-control" id="group-button">
                                        <input className="form-check-input" type="checkbox" defaultValue id="ikea" />
                                        <label className="padding-left-10 form-check-label" htmlFor="ikea"> Ikea</label>
                                    </div>
                                    {/* Single Form Check */}
                                    <div className="form-control" id="group-button">
                                        <input className="form-check-input" type="checkbox" defaultValue id="furniture" />
                                        <label className="padding-left-10 form-check-label" htmlFor="furniture">Furniture Inc</label>
                                    </div>
                                    {/* Single Form Check */}
                                    <div className="form-control" id="group-button">
                                        <input className="form-check-input" type="checkbox" defaultValue id="factory" />
                                        <label className="padding-left-10 form-check-label" htmlFor="factory"> The factory</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}