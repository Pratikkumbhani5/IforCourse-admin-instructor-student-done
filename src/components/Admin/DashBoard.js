import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import CryptoJS from "crypto-js";
import { ExportToExcel } from "./ExportToExcel";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [admin, setAdmin] = useState();
  const [instructor, setInstructor] = useState();
  const [student, setStudent] = useState();
  const [course, setCourse] = useState();
  const [approvedCourse, setApprovedCourse] = useState();
  const [pandingCourse, setPandingCourse] = useState();
  const [holdCourse, setHoldCourse] = useState();
  const [pendingInstructor, setPendingInstructor] = useState();
  const [blogs, setBlogs] = useState();
  const [chapter, setChapter] = useState();
  const [topic, setTopic] = useState();

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getCourse();
  }, []);
  const getCourse = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        setAdmin(res.data.admin);
        setInstructor(res.data.instructor);
        setStudent(res.data.student);
        setCourse(res.data.course);
        setApprovedCourse(res.data.approvedCourse);
        setPandingCourse(res.data.pandingCourse);
        setHoldCourse(res.data.holdCourse);
        setPendingInstructor(res.data.pendingInstructor);
        setBlogs(res.data.blogs);
        setChapter(res.data.chapter);
        setTopic(res.data.topic);
        // console.log(res.data);
      });
  };

  const fileName = "myfile";

  useEffect(() => {
    download();
  }, []);

  const download = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/userDetails`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
        // responceType: "blob",
      })
      .then((res) => {
        // fileDownload(res.data, "downloaded");

        // const customHeadings = res.data.Instructor.map((item) => ({
        //   "Article Id": item.firstname,
        //   // "Article Title": item.title,
        // }));

        // setData(customHeadings);

        setData(res.data.Instructor);
        // console.log(res.data.Instructor);
      });
  };

  return (
    <div className="container" style={{ marginBottom: 150 }}>
      <div className="row ">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/principal.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-purple">{admin}</h2>
              <h3>Total Admin</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/laptop.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-purple">{instructor}</h2>
              <h3>Total Instructors</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/study.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{student}</h2>
              <h3>Total Students</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/test.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-green">{course}</h2>
              <h3>Total Courses</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/test-1.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{approvedCourse}</h2>
              <h3>Active Courses</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/download.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{pandingCourse}</h2>
              <h3>Pending Courses</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/withdraw.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{holdCourse}</h2>
              <h3>Hold Course</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/elearning.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{pendingInstructor}</h2>
              <h3>Pending Instructor</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/blogger.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{blogs}</h2>
              <h3>Blogs</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/checklist.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{chapter}</h2>
              <h3>Chapter</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <img
                src="https://lmszai.zainikthemes.com/admin/images/admin-dashboard-icons/website.png"
                alt="icon"
              />
            </div>
            <div className="status__box__text">
              <h2 className="color-blue">{topic}</h2>
              <h3>All Topic</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="status__box status__box__v3 bg-style">
            <div className="status__box__img">
              <i className="bi bi-arrow-down-circle-fill download-icon"></i>
            </div>
            <div className="status__box__text">
              <h3 className="mt-3">
                Download <br /> all Data
              </h3>
              <ExportToExcel
                onClick={download}
                apiData={data}
                fileName={fileName}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
