import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function PaymentHistory() {

    const [payment,setPayment] = useState([])
  useEffect(() => {
    loadpayment()
  }, [
  ])

  const loadpayment = () => {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `orders`, requestOptions)
      .then(response => response.json())
      .then(result => { 
        setPayment(result) 
      console.log(result);})
      .catch(error => console.log('error', error));
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
                                            <th width={50}>STT</th>
                                            <th>Ngày thanh toán</th>
                                            <th>Số tiền thanh toán</th>
                                            <th>Phương thức thanh toán</th>
                                            <th>Trạng thái thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payment.map((value,index)=>
                                            <tr key={index}>
                                            <td>{value.id}</td>
                                            <td>{value.createDate}</td>
                                            <td>{value.monny}</td>
                                            <td>{value.bank}</td>
                                            <td>
                                                {value.status == 0 ? "Thành công" : "Thất bại" } </td>
                                          
                                        </tr>
                                        )}
                                        
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