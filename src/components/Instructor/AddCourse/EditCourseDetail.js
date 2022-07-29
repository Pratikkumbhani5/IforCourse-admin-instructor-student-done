import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const EditCourseDetail = () => {
  // catagories and SubCatagories
  const [catagories, SetCatagories] = useState();

  const [categoryValue, SetCaregoryValue] = useState();
  const [subCatagories, SetSubCatagories] = useState();
  const [subCategoryValue, SetSubCategoryValue] = useState();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [description, setDescription] = useState();
  const [keysValue, setKeysValue] = useState(null);

  const [keys, setKeys] = useState([]);
  // console.log(keys);

  const [price, setPrice] = useState();
  const [image, setImage] = useState();

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
  const nav = useNavigate();

  const addkey = () => {
    if (keysValue === null) {
      return;
    }
    if (!(keysValue === null)) {
      keys.push(keysValue);
      setKeys([...keys]);
      setKeysValue(null);
    }
  };

  const deletekey = (key) => {
    const index = keys.indexOf(key);
    // console.log(index);
    if (index > -1) {
      keys.splice(index, 1);
    }
    // console.log(keys);
    setKeys([...keys]);
  };
  // console.log(keys);

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
    if (subCategoryValue === undefined) {
      return;
    } else {
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

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/instructor/course/edit/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.course);
        setTitle(res.data.course.title);
        setSubTitle(res.data.course.subtitles);
        setDescription(res.data.course.description);
        setPrice(res.data.course.price);
        setImage(res.data.course.image);
        SetCaregoryValue(res.data.course.category);
        SetSubCategoryValue(res.data.course.subcategory);
        setKeys(res.data.course.description_key_point);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("title", title);
    formData.append("subtitles", subTitle);
    formData.append("description", description);
    formData.append("catId", categoryValue);
    formData.append("subcatId", subCategoryValue);

    formData.append("description_key_point", JSON.stringify(keys));
    formData.append("price", price);

    formData.append(`image`, image);

    // formData.append("image", image);
    formData.append("duration", 1);

    // console.log(formData.get("title"));

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/instructor/course/edit/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);

        nav("/instructor/allcourse");
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
                  <label className="form-label ">Category</label>

                  <select
                    as="select"
                    title="select value"
                    value={categoryValue}
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
                          // selected={categoryValue == curElem._id}
                        >
                          {curElem.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="fv-row mb-10 w-50">
                  <label className="form-label ">SubCategory</label>

                  <select
                    as="select"
                    className="form-select form-select-lg form-select-solid"
                    value={subCategoryValue}
                    onChange={(e) => {
                      SetSubCategoryValue(e.target.value);
                    }}
                  >
                    <option hidden value="">
                      Select Subcategory
                    </option>
                    {subCatagories?.map((curElem) => {
                      return (
                        <option
                          key={curElem._id}
                          defaultValue={curElem._id[0]}
                          value={curElem._id}
                          // selected={subCategoryValue == curElem._id}
                        >
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
                  value={title ?? ""}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="form-control form-control-lg form-control-solid"
                />
              </div>
              <div className="fv-row mb-10">
                <label className="d-flex align-items-center form-label">
                  <span className="required">SubTitle</span>
                </label>
                <input
                  required
                  value={subTitle ?? ""}
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
                  value={description ?? ""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  name="businessDescription"
                  className="form-control form-control-lg form-control-solid"
                  rows="5"
                ></textarea>
              </div>
              <label className="fs-6 fw-bold form-label ">key</label>

              <div className="mt-5 mx-7">
                {keys.map((key) => (
                  <div key={key} className="d-flex">
                    <p>{key} &nbsp;</p>
                    <i
                      className="fa fa-times-circle file-close "
                      onClick={() => deletekey(key)}
                    ></i>
                  </div>
                ))}
              </div>

              <input
                type="text"
                name="key"
                style={{ maxWidth: 650 }}
                className="form-control form-control-lg form-control-solid mb-10"
                onChange={(e) => {
                  setKeysValue(e.target.value);
                }}
              />

              <div className="button-section">
                <Button
                  className="button add mb-10"
                  type="button"
                  onClick={addkey}
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
                  value={price ?? ""}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  name="price"
                  type="number"
                  className="form-control form-control-lg form-control-solid"
                />
              </div>
              <div className="fv-row mb-0">
                <label className="fs-6 fw-bold form-label ">Image</label>

                <input
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  name="file"
                  type="file"
                  accept="image/*"
                  className="form-control form-control-lg form-control-solid"
                />
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

export default EditCourseDetail;
