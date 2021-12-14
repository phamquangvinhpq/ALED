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
import Cart from './Cart';
import Course from './Course';
import Checkout1 from './Checkout1';

export default function Index() {
    return (
        <div>
             <BrowserRouter History={History}>
                <HeaderStudent ></HeaderStudent>
                <Switch>
                    <Route  path="/home">
                        <Homestd />
                    </Route>

                    <Route path="/ListCourse">
                        <ListCourse />
                    </Route>
                    <Route path="/Detail/:id">
                        <Detail />
                    </Route>
                    <Route path="/Viewdetail/:id">
                        <ViewDetail />
                    </Route>
                    <Route path="/MyCourse">
                        <MyCourse />
                    </Route>
                    <Route path="/Signup">
                        <Signup />
                    </Route>

                    <Route path="/courvideo">
                        <Courvideo />
                    </Route>
                    
                    <Route path="/Cart">
                        <Cart />
                    </Route>
                    <Route path="/Checkout/:id">
                        <Checkout1 />
                    </Route>

                    <Route path="/Course/:id">
                        <Course />
                    </Route>

                    <Route path="/Course">
                        <Course />
                    </Route>
                    
                </Switch>

                <FooterStudent />
                
            </BrowserRouter>
        </div>
    )
}