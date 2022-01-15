import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import React, { useEffect, useState } from "react";



export default function Taobaithi() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        bieudo();
       }, []);
     

     
     const bieudo = ()=>{
         var requestOptions = {
             method: 'GET',
             redirect: 'follow'
           };
           
           fetch("http://localhost:8080/api/getallbycourse?userid=112&courseid=29", requestOptions)
             .then(response => response.json())
             .then(result => setdata(result))
             .catch(error => console.log('error', error));
     }
     var options = {
        scales: {
            yAxes: [{
                display: true,
                stacked: true,
                ticks: {
                    min: 0, // minimum value
                    max: 10 // maximum value
                }
            }]
        }
    };
    return (
        <div>
              <div className="container" >
        <BarChart
            width={500}
            height={300}
            data={data}
          
            barSize={25}
        >
            <XAxis dataKey="name"  padding={{ left: 30, right: 20 }} />
            <YAxis  type="number" domain={[0, 100]}  />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="diem" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        </div>
        </div>
    )
}





