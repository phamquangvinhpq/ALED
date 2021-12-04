import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Footer from '../../student/Common/FooterStudent';
import HeaderStudent from '../../student/Common/HeaderStudent';

import AddKH from './AddKH';
import AllKH from './AllKH';
import Leson from './Leson';
import MenuGV from './MenuGV';
import Section from './Section';
import UpdateKH from './UpdateKH';

export default function IndexGV() {
    return (
        <div>
            <BrowserRouter History={History}>
            <HeaderStudent />
            <div className="page-content customer">
                    <div className="container">
  
                <MenuGV />
                <Switch>
                
                    <Route  path="/giangvien/database">
                    </Route>
                  
                    <Route  path="/giangvien/menu">
                        <MenuGV />
                    </Route>
                        
                        <Route  path="/giangvien/AddCourse">
                        <AddKH />
                        </Route>

                        <Route  path="/giangvien/AllCourses">
                        <AllKH />
                        </Route>

                        <Route  path="/giangvien/Section/:id">
                        <Section />
                        </Route>
                        <Route  path="/giangvien/Lesson/:id">
                        <Leson />
                        </Route>

                        <Route  path="/giangvien/updateKH/:id">
                        <UpdateKH />
                        </Route>
                </Switch>
                
                </div>
                </div>
                <Footer />
                
            </BrowserRouter>
        </div>
    )
}
