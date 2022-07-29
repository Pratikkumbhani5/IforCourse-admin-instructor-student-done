import React, { useEffect, useState } from "react";
import "./CourseVideo.css";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

import CryptoJS from "crypto-js";

const CourseVideo = () => {
  const [chapters, setChapters] = useState();
  const [resources, setResources] = useState();
  const [error, setError] = useState(null);
  const [errorValue, setErrorValue] = useState(false);
  const [title, setTitle] = useState();
  // console.log(title);
  const [subTitle, setSubTitle] = useState();
  const [description, setDescription] = useState();
  const [keys, setKeys] = useState();

  const [videoPath, setVideoPath] = useState();

  // console.log(videoPath);

  const { _id } = useParams();

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
      .get(
        `${process.env.REACT_APP_API_URL}/api/student/details/${_id}?userId=${uId}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setVideoPath(res.data.chapters[0].topics[0].path);
        setChapters(res.data.chapters);
        setResources(res.data.resources);
        setTitle(res.data.course.title);
        setSubTitle(res.data.course.subtitles);
        setDescription(res.data.course.description);
        setKeys(res.data.course.description_key_point);
        setErrorValue(false);
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
          setErrorValue(true);
        }
      });
  };

  // console.log(errorValue);

  return (
    <>
      {!(error === null) ? (
        <h2 className="error-web pt-1 pb-5">{error}</h2>
      ) : (
        <div className="container-fluid course-watch-page-area mt-20 ">
          <div className="row pb-15">
            <div className="col-12 col-sm-12 col-md-12">
              <div className="page-banner-content text-center">
                <h3 className="page-banner-heading color-heading pb-5">
                  {title}
                </h3>

                <ul className="course-watch-banner-items">
                  <li className="font-14 font-medium color-heading">
                    {subTitle}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row pb-15">
            <div className="col-md-7">
              {/* <video className="videoPlayer " controls controlsList="nodownload">
              <source
                className="xdPlayer lectureVideo"
                // src="https://lmszai.zainikthemes.com/uploads/course/1657039399-sample_960x540.mp4"
                src={`${process.env.REACT_APP_API_URL}/${defaultPath}`}
                type="video/mp4"
              />
            </video> */}
              <ReactPlayer
                className="videoPlayer"
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e) => e.preventDefault()}
                // playing={true}
                controls={true}
                url={`${process.env.REACT_APP_API_URL}/${videoPath}`}
              />
            </div>
            <div className="col-md-5 videodetail">
              <div className="course-single-details-right-content course-watch-right-content mt-0">
                <div className="curriculum-content course-watch-right-side">
                  <Accordion defaultActiveKey="2">
                    {chapters?.map((chapter) => (
                      <Accordion.Item key={chapter.id} eventKey={chapter.id}>
                        <Accordion.Header>{chapter.name}</Accordion.Header>
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
                                    <span
                                      className="Videopath"
                                      onClick={() => setVideoPath(topic.path)}
                                    >
                                      {topic.path}
                                    </span>
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
          </div>
          <div className="row mb-20 tabs">
            <Tabs
              defaultActiveKey="overview"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey="overview"
                title="Overview "
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
                          <h3 className="mb-2">Course Descriptions</h3>
                          {description}
                        </div>
                        <h4 className="mb-3">What you’ll learn</h4>
                        <div className="row mb-3">
                          <div className="col-12 col-md-6">
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
              <Tab
                eventKey="resources"
                title="Resources "
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
                        <h4 className="mb-3 ">Resources</h4>
                        <div className="row">
                          {resources?.map((resource) => (
                            <div key={resource._id} className="mt-10 col-2">
                              <a
                                href={`${process.env.REACT_APP_API_URL}/${resource.path}`}
                                download
                                target="_blank"
                              >
                                <i className="bi pdf-icons bi-file-earmark-pdf-fill"></i>
                              </a>
                              <p className="m-4">{resource.path}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseVideo;
