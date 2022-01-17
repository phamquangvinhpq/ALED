import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'

export default function Chungchi() {
    const [chungchi, setchungchi] = useState([])
    useEffect(() => {
        getchungchi();
    }, [

    ])
    const getchungchi = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${DEFAULT_API}` + "getchungchi", requestOptions)
            .then(response => response.json())
            .then(result => setchungchi(result))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="content-header-left">
                        <h1>Danh Sách Chứng Chỉ</h1>
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
                                                <th>UserName</th>
                                                <th>Tên Khóa Học</th>
                                                <th>Mã Chứng Chỉ</th>
                                                <th>Ngày Hoàn Thành</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chungchi.map((value, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{value.username}</td>
                                                    <td>{value.namecourse}</td>
                                                    <td>{value.aledid}</td>
                                                    <td>
                                                        {value.ngay}
                                                        </td>
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
        </div>
    )
}
