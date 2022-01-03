import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function PaymentHistory() {
  const user_id = localStorage.getItem("userid")
  const [orderData, setOrderData] = useState([])
  const loadData = (user_id) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `orders/${user_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setOrderData(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    loadData(user_id);
  }, [])
  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>STT</th>
                <th>Content</th>
                <th>Purchase Amount</th>
                <th>Bank</th>
                <th>Purchase Date</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.mota}</td>
                  <td>{data.bank}</td>
                  <td>{data.monny.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  })}</td>
                  <td>{data.createDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}