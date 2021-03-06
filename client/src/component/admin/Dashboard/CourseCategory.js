import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom'
import swal from "sweetalert";

export default function CourseCategory() {
    const [Categories, setCategory] = useState([])
    const history = useHistory()
    const [isEnable, setIsEnable] = useState(0);
    const [pageSt, setPageSt] = useState(0);
    const [totalCountSt, setTotalCountSt] = useState(0)
    let size = 10;
    const chuyentrangAdd = function (event) {
        history.push("/admin/addCategory")
    }
    const [searchTitle, setSearchTitle] = useState('')

    const onInputTitleChange = (event) => {
        setSearchTitle(event.target.value);
    }
    const chuyentrangupdate = function (event, value, index) {
        history.push(`/admin/editCategory/${value.id}`)
    }

    useEffect(() => {
        countCate();
    }, [
        isEnable
    ])

    const deleteCate = (value) => {
        swal({
          title: "Bạn chắc chứ ?",
          text: `Bạn có chắc là muốn xóa ?`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
    
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
              };
              
              fetch(`${DEFAULT_API}` + `category/${value.id}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if(result.loicode==-1)
                    {
                        swal("Không thể xóa danh mục này vì đang chứa khóa học", {
                            icon: "warning",
                          });
                    }
                    else{

                        setIsEnable(isEnable + 1)
                    }
                
                
                })
                .catch(error => console.log('error', error));
              
            }
          });
        };

        const backPageSt = async () => {
            const pg = pageSt - 1
            countCate(pg)
            setPageSt(pg)
          }
        
          const nextPageSt = async () => {
            const pg = pageSt + 1
            countCate(pg)
            setPageSt(pg)
          }

    const countCate = async (pg = pageSt, pgsize = size) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${DEFAULT_API}` + `category?page=${pg}&size=${pgsize}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setTotalCountSt(result.length)
                setCategory(result)
                console.log(result)
            })
            .catch(error => console.log('error', error));
        
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Xem tất cả Danh mục </h1>
                </div>
                <div className="content-header-right">
                    <a onClick={
                        (event) => {
                            chuyentrangAdd(event)
                        }} className="btn btn-primary btn-sm">Thêm mới</a>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="Tìm kiếm theo tên danh mục" name='name' onChange={onInputTitleChange} /> 
                                </div>
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>SL</th>
                                            <th>Tên danh mục</th>
                                            {/* <th>Category Slug</th>
                                             <th>Show on home?</th> */}
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Categories.filter((value)=>{
                                            if(searchTitle == ""){
                                                return value
                                            }else if(value.name.toLowerCase().includes(searchTitle.toLowerCase())){
                                                return value
                                            }
                                        }).map((value, index) =>
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{value.name}</td>
                                                {/* <td>web-design</td>
                                                  <td>No</td> */}
                                                <td>
                                                    <a onClick={
                                                        (event) => {
                                                            chuyentrangupdate(event, value, index)
                                                        }} className="btn btn-primary btn-xs">Sửa</a>
                                                    <a className="btn btn-danger btn-xs" onClick={() => deleteCate(value)}>Xóa</a>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Trước</button>
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Sau</button>
                </nav>
                            </div>
                        </div>
                    </div></div></section>
        </div>


    )
}