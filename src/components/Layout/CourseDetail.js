import React, { useEffect, useState } from "react";
import "./CourseDetail.css";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Course added into cart Successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const CourseDetail = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [chapters, setChapters] = useState();
  const [description, setDescription] = useState();
  const [keys, setKeys] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [pTitle, setPTitle] = useState();
  const [bio, setBio] = useState();
  const [students, setStudents] = useState();
  const [courses, setCourses] = useState();

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

  const { _id } = useParams();

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/course/${_id}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        setTitle(res.data.course.title);
        setSubTitle(res.data.course.subtitles);
        setDescription(res.data.course.description);
        setKeys(res.data.course.description_key_point);
        setImage(res.data.course.image);
        setPrice(res.data.course.price);
        setChapters(res.data.chapters);
        setName(res.data.instructor.name);
        setPTitle(res.data.instructor.professional_title);
        setBio(res.data.instructor.bio);
        setStudents(res.data.instructor.students);
        setCourses(res.data.instructor.courses);
      });
  };

  const addToCart = async () => {
    const formData = new FormData();
    formData.append("courseId", _id);
    formData.append("userId", uId);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/student/add-to-cart`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        alertContent();
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div>
      <div className="pt-lg-8 pb-lg-16 pt-8 pb-12 bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-7 col-md-12">
              <div>
                <h1 className="text-white display-4 fw-semi-bold">{title}</h1>
                <p className="text-white mb-6 lead">{subTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-12 mt-n8 mb-4 mb-lg-0">
              <div className="card rounded-3">
                <div className="card-header border-bottom-0 p-0">
                  <div>
                    <Tabs
                      defaultActiveKey="home"
                      id="uncontrolled-tab-example"
                      className="mb-3 tabss"
                    >
                      <Tab
                        eventKey="home"
                        title="Overview"
                        className="course-name"
                      >
                        <div className="card-body">
                          <div className="tab-content" id="tabContent">
                            <div
                              className="tab-pane fade active show"
                              id="table"
                              role="tabpanel"
                              aria-labelledby="table-tab"
                            >
                              <Accordion defaultActiveKey="2">
                                {chapters?.map((chapter) => (
                                  <Accordion.Item
                                    key={chapter.id}
                                    eventKey={chapter.id}
                                  >
                                    <Accordion.Header>
                                      {chapter.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <div>
                                        <div className="pt-3 pb-2">
                                          {chapter.topics?.map((topic) => (
                                            <a
                                              key={topic._id}
                                              className="mb-2 d-flex justify-content-between align-items-center text-inherit text-decoration-none "
                                            >
                                              <div className="text-truncate">
                                                <span className="icon-shape bg-light text-primary icon-sm rounded-circle me-2">
                                                  <i className="mdi mdi-play fs-4"></i>
                                                </span>
                                                <span>{topic.path}</span>
                                              </div>
                                              <div className="text-truncate">
                                                <span>1m 7s</span>
                                              </div>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                ))}
                              </Accordion>
                            </div>
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        eventKey="profile"
                        title="Curriculum "
                        className="course-name"
                      >
                        <div className="card-body">
                          <div className="tab-content" id="tabContent">
                            <div
                              className="tab-pane fade active show"
                              id="table"
                              role="tabpanel"
                              aria-labelledby="table-tab"
                            >
                              <div>
                                <div className="mb-4">
                                  <h3 className="mb-3">Course Descriptions</h3>
                                  {description}
                                </div>
                                <h4 className="mt-7 mb-3">What you’ll learn</h4>
                                <div className="row mb-3">
                                  <div className="col-12 col-md-12">
                                    <ul className="list-unstyled">
                                      {keys?.map((key) => (
                                        <li key={key} className="d-flex mb-2">
                                          <i className="bi bi-check2-circle fs-4 text-success me-1 mt-2"></i>
                                          <span>{key}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-12 mt-lg-n22">
              <div className="card mb-3 mb-4">
                <div className="p-1">
                  <div className="d-flex justify-content-center position-relative rounded py-10 border-white border rounded-3 bg-cover">
                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_API_URL}/${image}`}
                        alt=""
                        className="detail-img"
                      />
                    )}
                    <i className="fe fe-play"></i>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <span className="text-dark fw-bold h2">${price}</span>
                  </div>

                  <div className="d-grid">
                    <Button
                      className="btn btn-primary mb-2"
                      onClick={addToCart}
                    >
                      Add To Cart
                    </Button>
                    {token === null ? (
                      <>
                        {error && (
                          <h2 className="error-web pt-1 pb-5">
                            Please login First <Link to="/login">Login</Link>
                          </h2>
                        )}
                      </>
                    ) : (
                      <>
                        {error && (
                          <h2 className="error-web pt-1 pb-5">{error}</h2>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <img
                        src="../assets/images/avatar/avatar-1.jpg"
                        alt=""
                        className="rounded-circle avatar-xl"
                      />

                      <img
                        src={
                          "https://lmszai.zainikthemes.com/uploads_demo/user/student-avatar.jpg"
                        }
                        alt=""
                        height="70"
                        width="70"
                        style={{ borderRadius: 50 }}
                      />
                    </div>
                    <div className="ms-4">
                      <h4 className="mb-0">{name}</h4>
                      <p className="mb-1 fs-6">{pTitle}</p>
                    </div>
                  </div>
                  <div className="border-top row mt-3 border-bottom mb-3 g-0">
                    <div className="col">
                      <div className="pe-1 ps-2 py-3">
                        <h5 className="mb-0">{students}</h5>
                        <span>Students</span>
                      </div>
                    </div>
                    <div className="col border-start">
                      <div className="pe-1 ps-3 py-3">
                        <h5 className="mb-0">{courses}</h5>
                        <span>Courses</span>
                      </div>
                    </div>
                  </div>
                  <p>{bio}</p>
                  <a
                    href="instructor-profile.html"
                    className="btn btn-outline-white btn-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
