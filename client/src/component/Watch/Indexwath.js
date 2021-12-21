import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Courvideo from '../student/page/Courvideo';
import Not404 from '../student/page/Not404';
import { createBrowserHistory } from 'history';
export default function Indexwath() {
    
    
    const history = createBrowserHistory();

    return (
       
             <BrowserRouter history={history}>
               
                <Switch>
                    <Route path="/wath/video/:id" component={Courvideo}  >   
                  
                    </Route>
                    <Route  path="/">   
                        <Not404 />
                    </Route>
                </Switch>
            </BrowserRouter>
      
    )
}
