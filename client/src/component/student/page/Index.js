import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import FooterStudent from '../Common/FooterStudent';
import HeaderStudent from '../Common/HeaderStudent';
import Courvideo from './Courvideo';
import Homestd from './Homestd';
import ListCourse from './ListCourse';
import Login from './Login';
import MyCourse from './MyCourse';
import Home from './Homestd';
import Detail from './Detail';
import ViewDetail from './ViewDetail';
import Signup from './Signup';
import Course from './Course';
import Checkout1 from './Checkout1';
import About from './About';
import Faq from './Faq';
import Contact from './Contact';

export default function Index() {
    let role =localStorage.getItem("role");

    return (
        <div>
             <BrowserRouter History={History}>
                <HeaderStudent ></HeaderStudent>
                <Switch>
                    <Route  path="/home">
                        <Homestd />
                    </Route>

                    <Route  path="/about">
                        <About />
                    </Route>

                    <Route  path="/faq">
                        <Faq />
                    </Route>

                    <Route  path="/contact">
                        <Contact />
                    </Route>

                    <Route path="/Detail/:id">
                        <Detail />
                    </Route>
                    <Route path="/Viewdetail/:id">
                        <ViewDetail />
                    </Route>

                    
                    <Route path="/Checkout/:id">
                        <Checkout1 />
                    </Route>
               

                    <Route path="/Course/:id">
                        <Course />
                    </Route>

                    <Route path='/Checkout/:id' render={() => {
                        return role == null ? alert("vui lòng đăng nhập")  :  <Checkout1 /> 
                    }}  >
                    </Route>
                    
                </Switch>

                <FooterStudent />
                
            </BrowserRouter>
        </div>
    )
}