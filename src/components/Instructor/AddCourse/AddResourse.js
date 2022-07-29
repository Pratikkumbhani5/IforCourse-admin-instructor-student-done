import { Button } from "react-bootstrap";

import React, { useState } from "react";
import "./AddResourse.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

const AddResourse = () => {
  const [file, setFiles] = useState(null);
  const [error, setError] = useState(null);

  const { _id } = useParams();
  const nav = useNavigate();

  const fileHandler = (e) => {
    setFiles(e.target.files);
  };

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseId", _id);
    for (let i = 0; i < file.length; i++) {
      formData.append(`resourses`, file[i]);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/instructor/resource/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        nav(`/instructor/allresourse/${_id}`);
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <form className="container mt-20" onSubmit={submitHandler}>
      <h2 className="mb-8 text-center">Add Resourse</h2>

      <div className="create-assignment-upload-files">
        <div>
          <input
            onChange={fileHandler}
            type="file"
            name="file"
            accept="application/pdf"
            className="form-control"
            title="Upload Your Files"
            multiple
          />
          {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}
        </div>
        <p className="font-14 color-heading text-center mt-2 color-gray">
          Accepted files: PDF
        </p>
      </div>
      <div>
        <Button type="submit" variant="primary" className="btn1">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddResourse;
