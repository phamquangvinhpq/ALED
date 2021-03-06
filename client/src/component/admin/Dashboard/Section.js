import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { DEFAULT_API } from '../../../conf/env';
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";



export default function Section() {

  const [Section, setSection] = useState({
    namesection: "",
    course_id: ""
  })


  const [giatriID, setgiatriID] = useState([])

  const [DSsection, setDSsection] = useState([])
  const [isEnable, setIsEnable] = useState(0);
  let id = useParams();
  var chek=isNaN(id.id);
  useEffect(() => {
    if(chek==true)
    {
      history.push("/404")
      window.location.reload();
    }
    loadsection();

  }, [
    isEnable
  ])

  const loadsection = async (pg = pageSt, pgsize = size) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + `giangvien/Sectioncour/${id.id}?page=${pg}&size=${pgsize}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDSsection(result)
        setTotalCountSt(result.length)
      })
      .catch(error => console.log('error', error));
  }
  let history = useHistory();

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setSection({
      ...Section,
      [name]: value,

    });
    
  }
  const [pageSt, setPageSt] = useState(0);
  const [totalCountSt, setTotalCountSt] = useState(0)
  let size = 5;

  const backPageSt = async () => {
    const pg = pageSt - 1
    loadsection(pg)
    setPageSt(pg)
  }

  const nextPageSt = async () => {
    const pg = pageSt + 1
    loadsection(pg)
    setPageSt(pg)
  }

  const addsection = () => {
    var regexKhoangTrang = /\S/;
    var regexName = /^[^\d+]*[\d+]{0}[^\d+]*$/;

    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexName.test(Section.namesection)){
      swal("Failed", "T??n kh??ng ???????c ????? tr???ng ho???c ch???a k?? t??? ?????c bi???t", "warning")
    }else if(!regexKhoangTrang.test(Section.namesection)){
      swal("Failed", "T??n kh??ng ???????c ????? tr???ng", "warning")
    
    }else if(regexKitu.test(Section.namesection)){
      swal("Failed", "T??n kh??ng ch???a k?? t??? ?????c bi???t", "warning")
     
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": Section.namesection,
      "course_id": id.id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "giangvien/Section/", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.loicode==-1){
          swal("nh???p ?????y ????? th??ng tin", {
            text: `y??u c???u t??n ` + " " + result.details ,
             icon: "warning",
          });
         
        }else{
          swal("Th??ng b??o", "Th??m th??nh c??ng", "success")
          setIsEnable(isEnable + 1)
        }
       
      })
      .catch(error => console.log('error', error));
    }
  }


  const deletesection = (value) => {
    swal({
      title: "B???n ch???c ch????",
      text: `B???n c?? ch???c l?? mu???n x??a?`,
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

          fetch(`${DEFAULT_API}` + `giangvien/Section/${value.id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              setIsEnable(isEnable + 1)
            })
            .catch(error => console.log('error', error));
          swal("???? x??a", {
            icon: "success",
          });
        }
      });

  };


  const updateSection = () => {
    var regexKhoangTrang = /\S/;
    var regexKitu = /[\@\#\$\%\^\&\*\(\)\_\+\!]/
    if(!regexKhoangTrang.test(Section.namesection)){
      swal("Failed", "T??n kh??ng ???????c ????? tr???ng", "warning")
    
    }else if(regexKitu.test(Section.namesection)){
      swal("Failed", "T??n kh??ng ch???a k?? t??? ?????c bi???t", "warning")
    
    }else{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": giatriID,
      "name": Section.namesection,
      "course_id": id.id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${DEFAULT_API}` + "giangvien/Section/", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        swal("Th??ng b??o", "???? s???a th??nh c??ng", "success")
        setIsEnable(isEnable + 1)
      })
      .catch(error => console.log('error', error));
    }
  }

  const layid = (value) => {
    setgiatriID(value.id)
    Section.namesection = value.name

  }

  return (
    <div>

<div className="content-wrapper">
            <section className="content-header">
                <div className="content-header-left">
                    <h1>Xem ch????ng</h1>
                </div>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-info">
                            <div className="box-body table-responsive">
                            <div className="nav-tabs-custom instructor-content-tab">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#tab_chapter" data-toggle="tab">Ch????ng</a></li>
            <li><NavLink to={`/admin/lession/${id.id}`} href="#tab_lesson" data-toggle="tab">B??i h???c </NavLink></li>
          </ul>

          <div className="tab-content">
            <div className="tab-pane active" id="tab_chapter">
              <div className="box box-info pt_0">
                <div className="box-body">
                 
               

                  <h3 className="sec_title">T???t c??? Ch????ng</h3>
                  <div className="table-responsive">
                    <table id className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Ti??u ????? ch????ng</th>
                         
                     
                        </tr>
                      </thead>
                      <tbody>
                        {DSsection.map((value, index) =>
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.name}</td>
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
          </div>
        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    </div>

  )
}
