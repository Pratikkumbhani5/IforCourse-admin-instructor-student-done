import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Your Blog Created successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const AddBlog = () => {
  const [error, setError] = useState(null);
  const [catagories, SetCatagories] = useState();
  const [categoryValue, SetCaregoryValue] = useState();
  const [title, setTitle] = useState();
  const [slug, setSlug] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  // console.log(categoryValue);

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

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/blog-catagories`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.BlogCategory);
        SetCatagories(res.data.BlogCategory);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("details", description);
    formData.append("blogcatId", categoryValue);
    formData.append(`image`, image);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/blog`, formData, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        alertContent();
        nav("/admin/allblog");
      })
      .catch(function (error) {
        if (error.response) {
          setError("Accept only Image File");
        }
      });
  };

  return (
    <>
      <form onSubmit={submitHandler} className="card">
        <div className="card-body" style={{ padding: "2rem 43.25rem" }}>
          <div
            className="stepper stepper-links d-flex flex-column pt-15"
            id="kt_create_account_stepper"
          >
            <div className="w-100 ">
              <div className="pb-10 pb-lg-12">
                <h2 className="fw-bolder text-dark">Add Blog</h2>
              </div>
              <div className="fv-row mb-10">
                <label className="form-label required">Title</label>

                <input
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  name="businessName"
                  className="form-control form-control-lg form-control-solid"
                />
              </div>
              <div className="fv-row mb-10">
                <label className="form-label required">Slug </label>

                <input
                  required
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  name="businessName"
                  className="form-control form-control-lg form-control-solid"
                />
              </div>
              <div className="fv-row mb-10">
                <label className="form-label required">Blog Category</label>

                <select
                  required
                  as="select"
                  title="select value"
                  className="form-select form-select-lg form-select-solid"
                  onChange={(e) => {
                    SetCaregoryValue(e.target.value);
                  }}
                >
                  <option hidden value="">
                    Select Category
                  </option>
                  {catagories?.map((curElem) => {
                    return (
                      <option
                        key={curElem._id}
                        defaultValue={curElem._id[0]}
                        value={curElem._id}
                      >
                        {curElem.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="fv-row mb-10">
                <label className="form-label required">Details</label>

                <textarea
                  required
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  name="businessDescription"
                  className="form-control form-control-lg form-control-solid"
                  rows="5"
                ></textarea>
              </div>
              <div className="fv-row mb-0">
                <label className="fs-6 fw-bold form-label required">
                  Upload Image
                </label>

                <input
                  required
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  name="file"
                  type="file"
                  accept="image/*"
                  className="form-control form-control-lg form-control-solid"
                />
                {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}
              </div>
              <Button
                type="submit"
                className="mt-10"
                style={{ marginBottom: 150 }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBlog;
