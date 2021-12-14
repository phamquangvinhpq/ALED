import React, { useState } from "react";
import Dashboard from "./Dashboard";
import FooterStudent from "../Common/FooterStudent";
import HeaderStudent from "../Common/HeaderStudent";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Menusv from "./MenuSV";
import EditPassword from "./EditPassword";
import EnrolledCourses from "./EnrolledCourses";
import ListCourse from "./EditProfile";

import Not404 from "./Not404";
import Favorite from "../page/Favorite";
import PaymentHistory from "./PaymentHistory";

export default function IndexDash() {
  const [title, setTitle] = useState("Student Setting");
  const changleTitle = (text) => {
    setTitle(text);
  };
  return (
    <div>
      <BrowserRouter History={History}>
        <HeaderStudent></HeaderStudent>
        <div
          className="page-banner"
          style={{ backgroundImage: "url(/assets/uploads/banner_course.jpg)" }}
        >
          <div className="page-banner-bg" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1>{title}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content customer">
          <div className="container">
            <Menusv changleTitle={changleTitle} />
            <Switch>
              <Route path="/student/Dashboard">
                <Dashboard />
              </Route>
              <Route path="/student/EditPassword">
                <EditPassword />
              </Route>
              <Route path="/student/EditProfile">
                <ListCourse />
              </Route>
              <Route path="/student/EnrolledCourses">
                <EnrolledCourses />
              </Route>
              <Route path="/student/PaymentHistory">
                <PaymentHistory />
              </Route>
              <Route path="/student/favorite">
                <Favorite />
              </Route>
              <Route path="/">
                <Not404 />
              </Route>
            </Switch>
          </div>
        </div>
        <FooterStudent />
      </BrowserRouter>
    </div>
  );
}
