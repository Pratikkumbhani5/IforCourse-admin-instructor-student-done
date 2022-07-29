import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

import CryptoJS from "crypto-js";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Home = () => {
  const [category, setCategory] = useState();
  const [courses, setCourses] = useState();
  // console.log(courses);
  const [blogs, setBlogs] = useState();
  const [key, setKey] = useState();

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getCategory();
    getBlog();
  }, []);

  const getCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/category`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // setFirstCat(res.data.category[0].id);
        setKey(res.data.category[0].id);
        setCategory(res.data.category);
        // console.log(res.data.category);
      });
  };

  const getBlog = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/blogs`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.Blog);
        // console.log(res.data);
      });
  };

  const getCatCourse = async (key) => {
    // console.log(key);

    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/category/${key}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCourses(res.data.Course);
      });
  };

  useEffect(() => {
    // console.log(firstCat);
    if (!(key === undefined)) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/student/category/${key}`, {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setCourses(res.data.Course);
        });
    }
  }, [key]);

  return (
    <div className="container ptb-100">
      <div>
        <div className="col-12">
          <div className="section-left-title-with-btn d-flex justify-content-between align-items-end">
            <div className="section-title section-title-left d-flex align-items-start">
              <div>
                <h3 className="section-heading">All Course</h3>
              </div>
            </div>

            <div className="course-tab-nav-wrap d-flex justify-content-between">
              <Tabs
                className="mb-3 nav-temm"
                defaultActiveKey="development-tab"
                id="controlled-tab-example"
                activeKey={key}
                onClick={() => getCatCourse(key)}
                onSelect={(k) => setKey(k)}
              >
                {category?.map((cat) => (
                  <Tab
                    key={cat.id}
                    eventKey={cat.id}
                    className="nav-temm"
                    // onClick={() => getCatCourse(cat.id)}
                    title={cat.name}
                  ></Tab>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
        <div className="blog-area ptb-100">
          <div className="container">
            <div className="row justify-content-start">
              {courses?.map((course) => (
                <div key={course._id} className="col-lg-3 col-md-6">
                  <div className="single-blog-item">
                    <div className="blog-image">
                      <Link to={`/coursedetails/${course._id}`}>
                        <span>
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${course.image}`}
                            alt="image"
                            className="m-11"
                          />
                        </span>
                      </Link>
                    </div>

                    <div className="blog-post-content">
                      <h3>
                        <Link to={`/coursedetails/${course._id}`}>
                          <p>{course.title}</p>
                        </Link>
                      </h3>
                      <span className="date">
                        {course.instructor_Id.firstname} &nbsp;
                        {course.instructor_Id.lastname}
                      </span>
                      <p className="course-desc">{course.description}</p>

                      <h4>Price: {course.price}$</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="col-12">
          <div className="section-left-title-with-btn d-flex justify-content-between align-items-end">
            <div className="section-title section-title-left d-flex align-items-start">
              <div>
                <h3 className="section-heading">Our Top Categories</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-area ptb-100">
          <div className="row justify-content-start">
            {category?.map((cat) => (
              <div key={cat.id} className="col-lg-3 m-5 col-md-6 card-course">
                <div className="single-feature-item top-cat-item align-items-center">
                  <div className="flex-shrink-0 feature-img-wrap">
                    <img
                      src="https://lmszai.zainikthemes.com/uploads/category/1657095912-ZN7ZPqEkwf.png"
                      alt="categories"
                    />
                  </div>
                  <div className="flex-grow-1 mt-3 feature-content">
                    <h6>{cat.name}</h6>
                    <p>{cat.course} Course</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12">
          <div className="section-left-title-with-btn d-flex justify-content-between align-items-end">
            <div className="section-title section-title-left d-flex align-items-start">
              <div>
                <h3 className="section-heading">Blogs</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-area ptb-100">
          <div className="row justify-content-start">
            {blogs?.map((blog) => (
              <div key={blog._id} className="col-lg-3 col-md-6">
                <div className="single-blog-item">
                  <div className="blog-image">
                    <Link to="/home">
                      <span>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${blog.image}`}
                          alt="image"
                          className="m-11"
                        />
                      </span>
                    </Link>
                  </div>

                  <div className="blog-post-content">
                    <span className="date">{blog.category.name}</span>

                    <h3>{blog.title}</h3>

                    <p>{blog.details}</p>

                    {/* <h4>Price: {blog.price}$</h4> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
