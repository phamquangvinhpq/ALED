import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

export default function ApprovedCourses() {
    const [isEnable, setIsEnable] = useState(0);
    const [khoahoc, setKhoaHoc] = useState([])
    const [pageSt, setPageSt] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    let size = 10;
    useEffect(() => {
        loadkhoahoc()
    }, [
        isEnable
    ])

    const [searchTitle, setSearchTitle] = useState('')

    const onInputTitleChange = (event) => {
        setSearchTitle(event.target.value);
    }


    const backPageSt = async () => {
        const pg = pageSt - 1
        loadkhoahoc(pg)
        setPageSt(pg)
    }

    const nextPageSt = async () => {
        const pg = pageSt + 1
        loadkhoahoc(pg)
        setPageSt(pg)
    }

    const loadkhoahoc = (pg = pageSt, pgsize = size) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
       
        fetch(`${DEFAULT_API}` + `course/cour-act?page=${pg}&size=${pgsize}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTotalCountSt(result.length)
                setKhoaHoc(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
        
    }

    const Accept = async (value) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          "id": value.id,
          "status": 0
        });
    
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
    
        fetch(`${DEFAULT_API}` + "course/accept", requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            console.log("hiha:" +value.id);
            swal("Th??ng b??o", "???? ????a v??? ch??? duy???t", "success")
            setIsEnable(isEnable + 1)
          })
          .catch(error => console.log('error', error));
      }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>C??c kh??a h???c ???????c ph?? duy???t</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="T??m ki???m theo ti??u ?????" name='email' onChange={onInputTitleChange} /> 
                                </div>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Ti??u ?????</th>
                                            <th>Gi??</th>
                                            <th>???nh</th>
                                            <th>Danh m???c</th>
                                            <th>Gi???ng vi??n</th>
                                            <th>H??nh ?????ng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {khoahoc.filter((value)=>{
                                            if(searchTitle == ""){
                                                return value
                                            }else if(value.courseName.toLowerCase().includes(searchTitle.toLowerCase())){
                                                return value
                                            }
                                        }).map((value, index) =>
                                            <tr key={index}>
                                                <td>{value.id}</td>
                                                <td>{value.courseName}</td>
                                                <td>
                                                    {value.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    })}
                                                </td>
                                                <td>
                                                    <img
                                                        src={value.image}
                                                        className="w-100" />
                                                </td>
                                                <td>
                                                    {value.categoryName}
                                                </td>
                                                <td>
                                                    {value.authorName}
                                                </td>
                                                <td>

                                                    <a href={`/Detail/${value.id}`} className="btn btn-success btn-block btn-xs" >Xem chi ti???t kh??a h???c</a>


                                                    <NavLink to={`/admin/Section/${value.id}`} className="btn btn-info btn-block btn-xs" >Xem chi ti???t n???i dung kh??a h???c</NavLink>
                                                    
                                                    <a onClick={() => Accept(value)}
                                                className="btn btn-danger btn-block btn-xs"
                                                >Chuy???n v??? ch??? duy???t</a>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Tr?????c</button>
                                    <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Sau</button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}