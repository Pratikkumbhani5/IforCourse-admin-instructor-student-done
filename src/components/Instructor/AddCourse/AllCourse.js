import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Allcourse.css";
import CryptoJS from "crypto-js";
import axios from "axios";
import { Link } from "react-router-dom";

const AllCourse = () => {
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
      .get(`${process.env.REACT_APP_API_URL}/api/instructor/courses/${uId}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  };

  const deleteCourse = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/course/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };

  return (
    <div className="mt-10 container" style={{ marginBottom: 200 }}>
      <h1 className="d-grid mb-10 justify-content-center">All Course</h1>
      {course?.map((curElem) => {
        return (
          <div key={curElem._id} className="courses-container">
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
                <h6>{curElem.category.name}</h6>
                <h2 className="course-title-text">{curElem.title}</h2>
                <Link to={`/instructor/editcoursedetail/${curElem._id}`}>
                  <Button className="btn1">Edit</Button>
                </Link>
                <Link to={`/instructor/allchapter/${curElem._id}`}>
                  <Button className="btn1">Chapter</Button>
                </Link>
                <Link to={`/instructor/allresourse/${curElem._id}`}>
                  <Button className="btn1">Resources</Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn1"
                  onClick={() => deleteCourse(curElem._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllCourse;
