import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const MyLearning = () => {
  const [course, setCourse] = useState();

  // console.log(course);

  const userId = localStorage.getItem("sapisid");

  if (!(userId === null)) {
    var bytes = CryptoJS.AES.decrypt(userId, "my-secret-key@123");
    var uId = bytes.toString(CryptoJS.enc.Utf8);
  }

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
      .get(`${process.env.REACT_APP_API_URL}/api/student/mycourses/${uId}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        setCourse(res.data.course);
        // console.log(res.data);
      });
  };

  return (
    <div className="mt-10 container" style={{ marginBottom: 200 }}>
      <h1 className="d-grid mb-10 justify-content-center">Courses</h1>
      {course?.map((curElem) => {
        return (
          <div key={curElem.id} className="courses-container">
            <div className="course">
              <div className="course-preview">
                <img
                  src={`${process.env.REACT_APP_API_URL}/${curElem.image}`}
                  alt="ds"
                  // width="90"
                  className="course-img"
                />
              </div>
              <div className="course-info">
                <h2 className="course-title-text">{curElem.title}</h2>
                <h6>
                  {curElem.firstname} {curElem.lastname}
                </h6>
                <Link to={`/student/coursevideo/${curElem.id}`}>
                  <Button className="btn1">View Course</Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyLearning;
