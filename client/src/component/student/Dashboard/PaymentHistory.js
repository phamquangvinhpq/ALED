import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function PaymentHistory() {
  const user_id = localStorage.getItem("userid")
  const [orderData, setOrderData] = useState([])
  const [page, setPage] = useState(0)
  const loadData = (user_id, page) => {
    const size = 5
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}orders/user/${user_id}?page=${page}&size=${size}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setOrderData(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    loadData(user_id, 0);
  }, [])

  const chuyenTrang = (page) => {
    setPage(page);
    loadData(user_id, page);
  };

  return (
    <div>
      <div className="col-md-9">
        <div className="table-responsive">
          <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>STT</th>
                <th>Nội Dung</th>
                <th>Số Tiền</th>
                <th>Ngân Hàng</th>
                <th>Ngày Thanh Toán</th>
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
          <button className="btn btn-info btn-sm"
          disabled={page == 0 ? true : false}
          class="btn btn-primary"
          onClick={() => chuyenTrang(page - 1)}
          >
            Trước
          </button>
          <p class="btn btn-primary">{page+1}</p>
          <button className="btn btn-info btn-sm"
          class="btn btn-primary"
          onClick={() => chuyenTrang(page + 1)}
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}