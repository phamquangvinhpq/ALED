import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function PaymentHistory() {

    const [payment, setPayment] = useState([])
    useEffect(() => {
        loadpayment()
    }, [
    ])


    
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(0)
    let size = 10;

    const loadpayment = (pg = page, pgsize = size) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + `orders/get-all-by-page?page=${pg}&size=${pgsize}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTotalCount(result.length)
                setPayment(result)
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }

    const nextPage = async () => {
        const pg = page + 1
        loadpayment(pg)
        setPage(pg)
    }

    const backPage = async () => {
        const pg = page - 1
        loadpayment(pg)
        setPage(pg)
    }


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
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th width={50}>SL</th>
                                            <th>Payment Date</th>
                                            <th>Paid Amount</th>
                                            <th>Payment Method</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payment.map((value, index) =>
                                            <tr key={index}>
                                                <td>{value.id}</td>
                                                <td>{value.createDate}</td>
                                                <td>{value.monny.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                                <td>{value.bank}</td>
                                                <td>
                                                    {value.status == 0 ? "Completed" : "Uncompleted"} </td>

                                            </tr>
                                        )}
                                        
                                    </tbody>
                                    
                                </table>

                                <nav aria-label="Page navigation example">
                                            <button type="button" class="btn btn-outline-primary" disabled={page == 0} onClick={backPage} >Previous</button>
                                            <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount/size)} onClick={nextPage} >Next</button>
                                        </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}