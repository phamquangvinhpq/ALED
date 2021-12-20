import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Footer from "../../student/Common/FooterStudent";
import HeaderStudent from "../../student/Common/HeaderStudent";
import AddKH from "./AddKH";
import AllKH from "./AllKH";
import Dashboard from "./Dashboard";
import Leson from "./Leson";
import MenuGV from "./MenuGV";
import Section from "./Section";
import UpdateKH from "./UpdateKH";
import WithdrawHistory from "./WithdrawHistory";
import WithdrawMoney from "./WithdrawMoney";

export default function IndexGV() {
  const [title, setTitle] = useState("Instructor Setting");
  const changleTitle = (text) => {
    setTitle(text);
  };
  return (
    <div>
      <BrowserRouter History={History}>
        <HeaderStudent />
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
            <MenuGV changleTitle={changleTitle} />
            <Switch>
              <Route path="/giangvien/database"></Route>

              <Route path="/giangvien/menu">
                <MenuGV />
              </Route>

              <Route path="/giangvien/AddCourse">
                <AddKH />
              </Route>
              
              <Route path="/giangvien/WithdrawHistory">
                <WithdrawHistory />
              </Route>

              <Route path="/giangvien/WithdrawMoney">
                <WithdrawMoney />
              </Route>

              <Route path="/giangvien/AllCourses">
                <AllKH />
              </Route>

              <Route path="/giangvien/Section/:id">
                <Section />
              </Route>

              <Route path="/giangvien/dashboard/">
                <Dashboard />
              </Route>

              <Route path="/giangvien/Lesson/:id">
                <Leson />
              </Route>

              <Route path="/giangvien/updateKH/:id">
                <UpdateKH />
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
