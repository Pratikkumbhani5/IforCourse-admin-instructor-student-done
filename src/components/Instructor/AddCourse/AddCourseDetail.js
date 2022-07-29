import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Your Course Uploded successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const AddCourseDetail = () => {
  // catagories and SubCatagories
  const [error, setError] = useState(null);
  const [catagories, SetCatagories] = useState();
  const [subCatagories, SetSubCatagories] = useState();
  const [categoryValue, SetCaregoryValue] = useState();
  // console.log(categoryValue);
  const [subCategoryValue, SetSubCaregoryValue] = useState();
  // console.log(subCategoryValue);
  const [catSelected, setCatSelected] = useState(false);

  // Title
  const [title, setTitle] = useState();

  // SubTitle
  const [subTitle, setSubTitle] = useState();

  // Description
  const [description, setDescription] = useState();

  // Key
  // const [key, setKey] = useState();
  const [formValues, setFormValues] = useState([{ name: "" }]);

  // const [newdata, setNewData] = useState("");

  // console.log(formValues);

  // console.log(newdata);

  const newData = [];

  // console.log(newData);

  for (let i = 0; i < formValues.length; i++) {
    newData.push(formValues[i].name);
  }

  // console.log(formValues[0].name);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  // console.log(key);

  // Price
  const [price, setPrice] = useState();

  // Image
  const [image, setImage] = useState();

  // console.log(image);
  const nav = useNavigate();

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
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/instructor/catagories`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        SetCatagories(res.data.category);
      });
  }, []);

  useEffect(() => {
    if (catSelected === true) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/instructor/subcatagories/${categoryValue}`,
          {
            headers: {
              Authorization: `Bearer ${uToken}`,
            },
          }
        )
        .then((res) => {
          SetSubCatagories(res.data.subcategory);
        });
    }
  }, [categoryValue]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("title", title);
    formData.append("subtitles", subTitle);
    formData.append("description", description);
    formData.append("catId", categoryValue);
    formData.append("subcatId", subCategoryValue);

    formData.append("description_key_point", JSON.stringify(newData));
    formData.append("price", price);

    formData.append(`image`, image);

    // formData.append("image", image);
    formData.append("duration", 1);

    // console.log(formData.get("title"));

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/instructor/course`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        alertContent();
        nav("/instructor/allcourse");
      })
      .catch(function (error) {
        if (error.response) {
          setError("Accept only Image File");
        }
      });
  };

  return (
    <>
      <form className="card" onSubmit={submitHandler}>
        <div className="card-body" style={{ padding: "2rem 43.25rem" }}>
          <div
            className="stepper stepper-links d-flex flex-column pt-15"
            id="kt_create_account_stepper"
          >
            <div className="stepper-nav mb-5">
              <div className="stepper-item " data-kt-stepper-element="nav">
                <h3 className="stepper-title">Course Detail</h3>
              </div>
            </div>
            <div></div>
            <div className="w-100 mt-20">
              <div className="pb-10 pb-lg-12">
                <h2 className="fw-bolder text-dark">Course Details</h2>
              </div>
              <div className="row">
                <div className="fv-row mb-10 w-50">
                  <label className="form-label required">Category</label>

                  <select
                    required
                    as="select"
                    title="select value"
                    className="form-select form-select-lg form-select-solid"
                    onChange={(e) => {
                      SetCaregoryValue(e.target.value);
                      setCatSelected(true);
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
                <div className="fv-row mb-10 w-50">
                  <label className="form-label required">SubCategory</label>

                  <select
                    required
                    as="select"
                    className="form-select form-select-lg form-select-solid"
                    onChange={(e) => {
                      SetSubCaregoryValue(e.target.value);
                    }}
                  >
                    <option hidden value="">
                      Select Subcategory
                    </option>
                    {subCatagories?.map((curElem) => {
                      return (
                        <option key={curElem._id} value={curElem._id}>
                          {curElem.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
                <label className="d-flex align-items-center form-label">
                  <span className="required">SubTitle</span>
                </label>
                <input
                  required
                  onChange={(e) => {
                    setSubTitle(e.target.value);
                  }}
                  name="businessDescriptor"
                  className="form-control form-control-lg form-control-solid"
                />
              </div>

              <div className="fv-row mb-10">
                <label className="form-label required">Description</label>

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
              <label className="fs-6 fw-bold form-label required">key</label>
              {formValues.map((element, index) => (
                <div className="fv-row row mb-5" key={index}>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{ maxWidth: 650 }}
                    className="form-control form-control-lg form-control-solid col-8 mx-3"
                    value={element.name || ""}
                    onChange={(e) => handleChange(index, e)}
                  />

                  {index ? (
                    <Button
                      type="button"
                      style={{ maxWidth: 100 }}
                      className="button remove col mx-5"
                      onClick={() => removeFormFields(index)}
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              ))}
              <div className="button-section">
                <Button
                  className="button add mb-10"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  Add
                </Button>
              </div>

              <div className="fv-row mb-10">
                <label className="fs-6 fw-bold form-label required">
                  Price
                </label>

                <input
                  required
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  name="price"
                  type="number"
                  className="form-control form-control-lg form-control-solid"
                />
              </div>
              <div className="fv-row mb-0">
                <label className="fs-6 fw-bold form-label required">
                  Image
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
                style={{ marginBottom: "10rem" }}
                className="mt-10"
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

export default AddCourseDetail;
