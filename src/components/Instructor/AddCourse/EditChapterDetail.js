import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const EditChapterDetail = () => {
  const [title, setTitle] = useState();
  // console.log(title);
  const [description, setDescription] = useState();
  const [courseId, setCourseId] = useState();
  const { _id } = useParams();

  const nav = useNavigate();

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/instructor/chapter/edit/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.chapter);
        setTitle(res.data.chapter.name);
        setDescription(res.data.chapter.description);
        setCourseId(res.data.chapter.course_Id);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseId", _id);
    formData.append("chapters", title);
    formData.append("description", description);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/instructor/chapter/edit/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        nav(`/instructor/allchapter/${courseId}`);
      });
  };

  return (
    <form className="card" onSubmit={submitHandler}>
      <div className="card-body" style={{ padding: "2rem 43.25rem" }}>
        <div
          className="stepper stepper-links d-flex flex-column pt-15"
          id="kt_create_account_stepper"
        >
          <div className="w-100 mt-20">
            <div className="pb-10 pb-lg-12">
              <h2 className="fw-bolder text-dark">Chapter Details</h2>
            </div>

            <div className="fv-row mb-10">
              <label className="form-label required">Title</label>

              <input
                required
                value={title ?? ""}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="businessName"
                className="form-control form-control-lg form-control-solid"
              />
            </div>

            <div className="fv-row mb-10">
              <label className="form-label required">Description</label>

              <textarea
                required
                value={description ?? ""}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                name="businessDescription"
                className="form-control form-control-lg form-control-solid"
                rows="5"
              ></textarea>
            </div>

            <Button
              type="submit"
              style={{ marginBottom: "10rem" }}
              className="mt-10"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditChapterDetail;
