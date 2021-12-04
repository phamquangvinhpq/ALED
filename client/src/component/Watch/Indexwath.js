import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Courvideo from '../student/page/Courvideo';
import Not404 from '../student/page/Not404';

export default function Indexwath() {
    
    
    

    return (
        <div>
             <BrowserRouter History={History}>
               
                <Switch>
                    <Route  path="/wath/video/:id"
                     >   
                        <Courvideo />
                    </Route>
                    <Route  path="/">   
                        <Not404 />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
