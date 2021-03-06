import React, { useEffect, useState } from 'react'
import { DEFAULT_API } from '../../../conf/env';

export default function Students() {

  const [giangVien, setGiangVien] = useState([])
  const [KhoaHoc, setKhoaHoc] = useState([])
  const [payment, setPayment] = useState([])
  const [layID, setLayID] = useState({
    id: ""
  })
  const [isEnable, setIsEnable] = useState(0);

  useEffect(() => {
    loadGiangVien()
  }, [
    isEnable
  ])
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  let size = 10;

  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  const [pageCr, setPageCr] = useState(0);
  const [totalCountCr, setTotalCountCr] = useState(0)
  const [searchemai, setSearchEmail] = useState('')

    const onInputEmailChange = (event) => {
        setSearchEmail(event.target.value);
    }
  const layid = (value) => {
    layID.id = value.id
    console.log(value.id);
    loadpayment(value.id)
    loadBaiGiang(value.id)
  }

  const loadBaiGiang = (value, pg = pageCr, pgsize = size) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `mycourse/${value}?page=${pg}&size=${size}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(layID);
        setTotalCountCr(result.length)
        setKhoaHoc(result)
      })
      .catch(error => console.log('error', error));
  }

  const nextPagePay = async () => {
    const pg = page + 1
    loadpayment(layID.id, pg)
    setPage(pg)
  }

  const backPageSt = async () => {
    const pg = pageSt - 1
    loadGiangVien(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loadGiangVien(pg)
    setPageSt(pg)
  }

  const backPagePay = async () => {
    const pg = page - 1
    loadpayment(layID.id, pg)
    setPage(pg)
  }

  const backPageCr = async () => {
    const pg = pageCr - 1
    loadBaiGiang(layID.id, pg)
    setPageCr(pg)
  }

  const nextPageCr = async () => {
    const pg = pageCr + 1
    loadBaiGiang(layID.id, pg)
    setPageCr(pg)
  }

  const loadpayment = (value, pg = page, pgsize = size) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `orders/user/${value}?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCount(result.length)
        setPayment(result)
          ;
      })
      .catch(error => console.log('error', error));
  }


  const loadGiangVien = (pg = pageSt, pgsize = size) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
   
    fetch(`${DEFAULT_API}` + `get-hs?pageno=${pg}&pagesize=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setTotalCountSt(result.length)
        setGiangVien(result)
        console.log(result)
      })
      .catch(error => console.log('error', error));
    
  }
  return (
    <div className="content-wrapper">
  <section className="content-header">
    <div className="content-header-left">
      <h1>T???t c??? Sinh vi??n</h1>
    </div>
  </section>
  <section className="content">
    <div className="row">
      <div className="col-md-12">
        <div className="box box-info">
          <div className="box-body table-responsive">
            <div id="enrolledCourses1" className="modal fade" role="dialog">
              <div className="modal-dialog w-50-p">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">??</button>
                    <h4 className="modal-title">C??c kh??a h???c ???? ????ng k??</h4>
                  </div>
                  <div className="modal-body">
                  <table className="table table-bordered t3">
            <thead>
              <tr>
                <th>STT</th>
                <th>???nh</th>
                <th>Ti??u ????? kh??a h???c</th>
                <th>Chi ti???t kh??a h???c</th>
             
              </tr>
            </thead>
            <tbody>
              {KhoaHoc.map((value,index)=>
                <tr key={index}>
                <td>{value.id}</td>
                <td><img src={value.image} className="w-100" /></td>
                <td>{value.name}</td>
              
                <td>
                  <a href={`/Detail/${value.course}`} target="_blank" className="btn btn-info btn-sm"  >Chi ti???t kh??a h???c</a>
                </td>
               
              </tr>
              )}
                 <nav aria-label="Page navigation example">
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr == 0} onClick={backPageCr} >Tr?????c</button>
                              <button type="button" class="btn btn-outline-primary" disabled={pageCr >= Math.ceil(totalCountCr / size)} onClick={nextPageCr} >Sau</button>
                            </nav>
              
            </tbody>
          </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">????ng</button>
                  </div>
                </div>
              </div>
            </div>

            <div id="enrolledCourses2" className="modal fade" role="dialog">
              <div className="modal-dialog w-50-p">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">??</button>
                    <h4 className="modal-title">Chi ti???t thanh to??n</h4>
                  </div>
                  <div className="modal-body">
                  <table className="table table-bordered t3">
                <thead>
                  <tr>
                  <th>STT</th>
                    <th>N???i dung</th>
                    <th>Ti???n</th>
                    <th>Ng??n h??ng</th>
                    <th>Ng??y t???o</th>
                    <th>Tr???ng th??i</th>
                  </tr>
                </thead>
                <tbody>
                  {payment.map((value,index)=>
                    <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.mota}</td>
                    <td>{value.monny}</td>
                    <td>{value.bank}</td>
                    <td>{value.createDate}</td>
                    <td> {value.status == 0 ? "Completed" : "Uncompleted" }</td>
                </tr>
                  )}
                  <nav aria-label="Page navigation example">
                              <button type="button" class="btn btn-outline-primary" disabled={page == 0} onClick={backPagePay} >Tr?????c</button>
                              <button type="button" class="btn btn-outline-primary" disabled={page >= Math.ceil(totalCount / size)} onClick={nextPagePay} >Sau</button>
                            </nav>
                </tbody>
              </table>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">????ng</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group col-sm-3">
                                    <input type="text" class="form-control" placeholder="T??m ki???m theo email" name='email' onChange={onInputEmailChange} /> 
                                </div>
            <table id="example1" className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th width={50}>SL</th>
                  <th>???nh</th>
                  <th>T??n</th>
                  <th>Email</th>
                  <th>Tr???ng th??i</th>
                  <th width={120}>H??nh ?????ng</th>
                </tr>
              </thead>
              <tbody>
              {giangVien.filter((value)=>{
                                            if(searchemai == ""){
                                                return value
                                            }else if(value.email.toLowerCase().includes(searchemai.toLowerCase())){
                                                return value
                                            }
                                        }).map((value, index) =>
                      <tr key={index}>
                        <td>{value.id}</td>
                        <td><img src={value.image} alt="" className="w-150" /></td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>
                        {value.status == 1 ? "Active" : "No-Active" }  </td>
                        <td>
                        <a href className="btn btn-primary btn-xs btn-block" data-toggle="modal" data-target="#enrolledCourses1" onClick={() => layid(value)}>C??c kh??a h???c ???? ??ang k??</a>
                    <a data-toggle="modal" data-target="#enrolledCourses2" className="btn btn-success btn-xs btn-block" onClick={() => layid(value)} target="_blank">L???ch s??? thanh to??n</a>
                        </td>
                      </tr>
                    )}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt == 0} onClick={backPageSt} >Previous</button>
                  <button type="button" class="btn btn-outline-primary" disabled={pageSt >= Math.ceil(totalCountSt / size)} onClick={nextPageSt} >Next</button>
                </nav>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  )
}