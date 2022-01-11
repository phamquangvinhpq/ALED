import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'

export default function Not404() {
  let id = useParams();
  const [dscauhoi, setdscauhoi] = useState([]);
  const arr = [

  ]

  var username=localStorage.getItem("username")

  const [dethi, setdethi] = useState({});

  const loadcauhoi = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/exams/`+id.id+`/questions?username=`+username, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setdscauhoi(result.questions)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    loadcauhoi();


  }, [])

  const laydulieu = (questionsid, choics, poin, giatriid) => {
    console.log(questionsid);
    var choiss = []
    console.log(choics);
      {
        choics.map((value,index) =>{
          if (value.id==giatriid) {
            value.isCorrected=1
          }
          else{
            value.isCorrected=0
          }
          console.log(value);
        })
      }

    arr.push({
      "questionId": questionsid,
      "choices": choics,
      "point": poin
    })

    var uniqueArray = arr
      .map(v => v['questionId'])
      .map((v, i, array) => array.indexOf(v) === i && i)
      .filter(v => arr[v])
      .map(v => arr[v]);

    var json = JSON.stringify(uniqueArray)
    console.log(json);
    

  }




  const thongbaodiem = () => {
    var myHeaders = new Headers();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`http://localhost:8080/api/exams/`+id.id+`/users/`+username+`/result`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.totalPoint > 10) {
          alert("bạn đã hoàn thành với số điểm " + result.totalPoint)
        }
        else {
          alert("chưa đạt yêu cầu" + result.totalPoint)
        }
      })
      .catch(error => console.log('error', error));
  }


  const sunmit = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var uniqueArray = arr
      .map(v => v['questionId'])
      .map((v, i, array) => array.indexOf(v) === i && i)
      .filter(v => arr[v])
      .map(v => arr[v]);
    var raw = JSON.stringify(uniqueArray)
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
 

    fetch(`http://localhost:8080/api/exams/`+id.id+`/questions-by-user?isFinish=true&username=`+username, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        thongbaodiem();
      })
      .catch(error => console.log('error', error));
  }

  return (

    <div>

      {dscauhoi.map((value, index1) =>
        <div>
          <span style={{ fontSize: 'large' }}>1.{value.questionText}</span><br />
          {value.choices.map((giatr1, index) =>
            <div>
              <input id="choice1A" name={index1} type="radio" defaultValue="A" onChange={() => laydulieu(value.id, value.choices, value.point, giatr1.id)} /><label >(A) {giatr1.choiceText} </label><br />

            </div>
          )}
        </div>
      )}
      <button onClick={sunmit}>submit</button>

    </div>

  )
}
