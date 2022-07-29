import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Studentprofile.css";
import withReactContent from "sweetalert2-react-content";
import CryptoJS from "crypto-js";

const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Your Request For Become instructor is Sent successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const BecomeInstructor = () => {
  const [error, setError] = useState(null);
  const [fname, setFname] = useState();
  const [lname, setlname] = useState();
  const [pTitle, setPTitle] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [bio, setBio] = useState();
  const [file, setFiles] = useState(null);

  // console.log(file);

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

  const fileHandler = (e) => {
    setFiles(e.target.files[0]);
  };

  useEffect(() => {
    getProfileDetail();
  }, []);

  const getProfileDetail = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/user/${uId}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setFname(res.data.user.firstname);
        setlname(res.data.user.lastname);

        setPhone(res.data.user.profile[0].phone_number);

        setAddress(res.data.user.profile[0].address);
        setBio(res.data.user.profile[0].bio);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("firstName", fname);
    formData.append("lastName", lname);
    formData.append("phoneNumber", phone);
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("professional_title", pTitle);
    formData.append(`cv`, file);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/student/profile/instructor/edit/${uId}`,
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
      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response.data);
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="card  mb-xl-10 container">
      <div
        className="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Profile Details</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={submitHandler} className="form">
          <div className="card-body border-top p-9">
            {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Full Name
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 fv-row">
                    <input
                      value={fname ?? ""}
                      onChange={(e) => setFname(e.target.value)}
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="First name"
                      required
                    ></input>

                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block"></div>
                    </div>
                  </div>

                  <div className="col-lg-6 fv-row">
                    <input
                      required
                      value={lname ?? ""}
                      onChange={(e) => setlname(e.target.value)}
                      type="text"
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Last name"
                    />

                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Professional title
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  value={pTitle ?? ""}
                  onChange={(e) => setPTitle(e.target.value)}
                  type="text"
                  required
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Professional title"
                />

                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span className="required">Phone Number</span>
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  value={phone ?? ""}
                  required
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Phone Number"
                />
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Address
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  value={address ?? ""}
                  type="text"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Address"
                />
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                CV
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  onChange={fileHandler}
                  type="file"
                  name="file"
                  required
                  accept="application/pdf"
                  className="form-control"
                  title="Upload Your Files"
                />
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Bio
              </label>

              <div className="col-lg-8 fv-row">
                <textarea
                  value={bio ?? ""}
                  onChange={(e) => setBio(e.target.value)}
                  required
                  rows="4"
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Bio"
                />
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9 mb-20">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeInstructor;
