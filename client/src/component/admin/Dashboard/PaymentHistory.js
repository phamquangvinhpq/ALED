import React from 'react'

export default function PaymentHistory() {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>View Payment History</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                                <div id="myModal1" className="modal fade" role="dialog">
                                    <div className="modal-dialog w-50-p">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">×</button>
                                                <h4 className="modal-title">Payment Details</h4>
                                            </div>
                                            <div className="modal-body">
                                                <div className="rTable">
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Payment Date</div>
                                                        <div className="rTableCell">2020-04-25</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Transaction ID</div>
                                                        <div className="rTableCell">txn_1Gbqm2BoKopKik6Ak19cMJVw
                                                        </div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Paid Amount</div>
                                                        <div className="rTableCell">13.99</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Fee Amount</div>
                                                        <div className="rTableCell">0.71</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Net Amount</div>
                                                        <div className="rTableCell">13.28</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Payment Method</div>
                                                        <div className="rTableCell">Stripe</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Payment Currency</div>
                                                        <div className="rTableCell">USD</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Invoice No</div>
                                                        <div className="rTableCell">1587831755</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Card Number</div>
                                                        <div className="rTableCell">4242424242424242</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Card CVV</div>
                                                        <div className="rTableCell">124</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Card Expire Month</div>
                                                        <div className="rTableCell">09</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Card Expire year</div>
                                                        <div className="rTableCell">2020</div>
                                                    </div>
                                                    <div className="rTableRow">
                                                        <div className="rTableHead">Course 1</div>
                                                        <div className="rTableCell">
                                                            Title: Learn PHP Fundamentals From Scratch<br />
                                                            Price: $13.99<br />
                                                            Instructor Revenue: $5.98 </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div><table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width={50}>SL</th>
                                            <th>Payment Date</th>
                                            <th>Paid Amount</th>
                                            <th>Fee Amount</th>
                                            <th>Net Amount</th>
                                            <th>Payment Method</th>
                                            <th>Payment Status</th>
                                            <th width={120}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>2020-04-25</td>
                                            <td>$13.99</td>
                                            <td>$0.71</td>
                                            <td>$13.28</td>
                                            <td>Stripe</td>
                                            <td>
                                                Completed </td>
                                            <td>
                                                <button type="button" className="btn btn-xs btn-primary" data-toggle="modal" data-target="#myModal1">Details</button>
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