import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect,
    Link,
} from "react-router-dom";
import IndexGV from './component/giaovien/page/IndexGV';
import IndexDash from './component/student/Dashboard/IndexDash';
import Indexwath from './component/Watch/Indexwath';
import Indexstudent from './component/student/page/Index';
import IndexAdmin from './component/admin/Dashboard/IndexAdmin';
export default function Routers() {
    let role =localStorage.getItem("role");

    return (
        <div>
            <Router>
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

                        <Route path='/wath' >
                        <Indexwath />
                    </Route>

                    <Route path='/' >
                        <Indexstudent />
                    </Route>
                    


                </Switch>



            </Router>
        </div>
    )
}


