import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddCourseVideo.css";
import CryptoJS from "crypto-js";
// import Zoom from "react-medium-image-zoom";
// import "react-medium-image-zoom/dist/styles.css";

const AddCourseVideo = () => {
  const [file, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [img, setImg] = useState();
  // console.log(img);
  const { _id } = useParams();
  // console.log(_id);

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  const fileHandler = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/instructor/topics/${_id}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setImg(res.data.topics);
      });
  };

  const updateCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("chapter_Id", _id);
    for (let i = 0; i < file.length; i++) {
      formData.append(`MediaFile`, file[i]);
    }

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/instructor/topic/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        getCourse();
        // console.log(res);
        // nav("/course");
        setFiles(null);
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  const deleteMedia = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/topic/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };
  const deleteAll = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/topics/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };

  return (
    <div className="content">
      <div className="container ">
        <div className="row">
          <div className="col-12">
            <div className="card-box">
              <div className="row mb-5">
                <Link className="col-4" to="/course">
                  <p>cancel</p>
                </Link>
                <h4 className="col-4 header-title m-b-30 text-center">
                  My Files
                </h4>

                <div className="col-4 text-end">
                  <button
                    className=" mb-10 btn btn-primary buttonn "
                    onClick={deleteAll}
                  >
                    Delete All
                  </button>
                </div>
              </div>
              <input
                onChange={fileHandler}
                className="form-control mb-10"
                type="file"
                name="formData"
                accept="video/*"
                //   style={{ display: "none" }}
                multiple
              ></input>
              {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}
              <div className="row">
                {img?.map((curElem) => {
                  return (
                    <div key={curElem._id} className="col-lg-3 col-xl-2">
                      <div className="file-man-box">
                        <i
                          className="fa fa-times-circle file-close"
                          onClick={() => deleteMedia(curElem._id)}
                        ></i>

                        <div className="file-img-box">
                          <video
                            src={`${process.env.REACT_APP_API_URL}/${curElem.path}`}
                            className="video-height"
                            // controls
                          ></video>

                          {/* <Zoom zoomMargin={50}>
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${curElem.path}`}
                              alt={curElem._id}
                              width="90"
                            />
                          </Zoom> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-3">
                <button
                  onClick={updateCourse}
                  type="button"
                  className="btn btn-primary w-md waves-effect waves-light"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseVideo;
