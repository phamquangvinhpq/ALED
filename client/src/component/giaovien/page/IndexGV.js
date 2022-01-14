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
import Answered from "./Answered";
import Dashboard from "./Dashboard";
import Dsbaithi from "./Dsbaithi";
import Exam from "./exam";
import Leson from "./Leson";
import MenuGV from "./MenuGV";
import NotAnswered from "./NotAnswered";
import Question from "./Question";
import Section from "./Section";
import UpdateKH from "./UpdateKH";

export default function IndexGV() {
  const [title, setTitle] = useState("Cài đặt của giảng viên");
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
              

              <Route path="/giangvien/AddCourse">
                <AddKH />
              </Route>

              <Route path="/giangvien/AllCourses">
                <AllKH />
              </Route>

              <Route path="/giangvien/Answered">
                <Answered />
              </Route>

              <Route path="/giangvien/NoteAnswered">
                <NotAnswered />
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
              <Route path="/giangvien/question">
                <Question />
              </Route>

              <Route path="/giangvien/dethi">
                <Dsbaithi />
              </Route>

              <Route path="/giangvien/exam">
                <Exam />
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
