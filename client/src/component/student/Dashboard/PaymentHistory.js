import React, { useEffect, useState } from 'react'
export default function PaymentHistory() {
    return (
        <div>
          <div className="col-md-9">
            <div className="table-responsive">
    
              <table className="table table-bordered t3">
                <thead>
                  <tr>
                  <th>STT</th>
                    <th>Content</th>
                    <th>money</th>
                    <th>bank</th>
                    <th>Create Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
}