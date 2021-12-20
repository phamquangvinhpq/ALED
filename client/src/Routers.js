import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter } from "react-router-dom";
import IndexGV from './component/giaovien/page/IndexGV';
import IndexDash from './component/student/Dashboard/IndexDash';
import Indexwath from './component/Watch/Indexwath';
import Indexstudent from './component/student/page/Index';
import IndexAdmin from './component/admin/Dashboard/IndexAdmin';
import Payhanhcong from './component/student/page/Payhanhcong';

import PayThatbai from './component/student/page/PayThatbai';
import Courvideo from './component/student/page/Courvideo';
import Homestd from './component/student/page/Homestd';

export default function Routers() {
    let role =localStorage.getItem("role");

    return (
        <div>
              <BrowserRouter >
                <Switch>       
                        <Route path='/giangvien' render={() =>{
                            return  role === "ROLE_GIANGVIEN"  ?  <IndexGV /> : <Redirect to="/home" />
                        }}  >   
                        </Route>
 
                    <Route path='/student' render={() =>{
                            return  role == null  ? <Redirect to="/home" />   : <IndexDash /> 
                        }}  >   
                        </Route>


                        <Route path='/admin' render={() =>{
                            return  role === "ROLE_ADMIN"  ?  <IndexAdmin /> : <Redirect to="/home" />
                        }}  >   
                        </Route>
                        
                        <Route path='/wath'  render={() =>{
                            return <Indexwath />
                        }}  >   
                        
                    </Route>



                    <Route path='/thanhcong' >
                        <Payhanhcong />
                    </Route>

                    <Route path='/thatbai' >
                        <PayThatbai />
                    </Route>

                    <Route path='/' >
                        <Indexstudent />
                    </Route>

                    
                    
                </Switch>



                </BrowserRouter>
        </div>
    )
}


