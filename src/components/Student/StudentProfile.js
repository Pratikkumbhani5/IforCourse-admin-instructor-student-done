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
    text: "Your Profile Updated successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const StudentProfile = () => {
  const [error, setError] = useState(null);
  const [fname, setFname] = useState();
  const [lname, setlname] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pinCode, setPinCode] = useState();
  const [address, setAddress] = useState();
  const [bio, setBio] = useState();
  const [gender, setGender] = useState();
  const [image, setImage] = useState(null);

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
    getProfileDetail();
    // getSecoundDetail();
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
        setEmail(res.data.user.email);
        if (res.data.user.profile.length > 0) {
          setPhone(res.data.user.profile[0].phone_number);
          setCountry(res.data.user.profile[0].country);
          setState(res.data.user.profile[0].state);
          setCity(res.data.user.profile[0].city);
          setPinCode(res.data.user.profile[0].postal_code);
          setAddress(res.data.user.profile[0].address);
          setBio(res.data.user.profile[0].bio);
          setGender(res.data.user.profile[0].gender);
          setImage(res.data.user.profile[0].image);
          // console.log(res.data.user.profile[0]);
        } else {
          return;
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("firstName", fname);
    formData.append("lastName", lname);
    formData.append("phoneNumber", phone);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("postalCode", pinCode);
    formData.append("address", address);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append(`image`, image);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/student/profile`, formData, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        alertContent();
      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response.data);
          setError("Please fill the form properly");
        }
      });
  };

  // const getSecoundDetail = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/student/profile/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data.profile.length);
  //     });
  // };

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
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Profile Photo
              </label>
              <div className="col-lg-8">
                <div
                  className="image-input image-input-outline d-flex"
                  data-kt-image-input="true"
                >
                  {image == null ? (
                    <img
                      style={{ width: 150, borderRadius: 6 }}
                      src="/media/avatars/300-0.jpg"
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ width: 150, borderRadius: 6 }}
                      src={`${process.env.REACT_APP_API_URL}/${image}`}
                      alt=""
                    />
                  )}

                  <input
                    className="profile-image-btn form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    name="file"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

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
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Email
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  value={email ?? ""}
                  type="email"
                  disabled
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Email"
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
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span className="required">Country</span>
              </label>

              <div className="col-lg-8 fv-row">
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-select form-select-solid form-select-lg fw-bold"
                  value={country}
                  required
                >
                  <option value="india">India</option>
                  <option value="afghanistan">Afghanistan</option>
                  <option value="usa">Usa</option>
                  <option value="canada">Canada</option>
                </select>
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                State
              </label>
              <div className="col-lg-8 fv-row">
                <select
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  required
                  className="form-select form-select-solid form-select-lg"
                >
                  <option value="gujrat">Gujrat</option>
                  <option value="goa">Goa</option>
                  <option value="delhi">Delhi</option>
                  <option value="rajasthan">Rajasthan</option>
                </select>
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                City
              </label>

              <div className="col-lg-8 fv-row">
                <select
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  required
                  className="form-select form-select-solid form-select-lg"
                >
                  <option value="surat">Surat</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="baroda">Baroda</option>
                  <option value="pune">Pune</option>
                </select>
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block"></div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Postal code
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  value={pinCode ?? ""}
                  type="text"
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                  placeholder="Postal code"
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

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold required fs-6">
                Gender
              </label>

              <div className="col-lg-8 fv-row">
                <div className="d-flex align-items-center mt-3">
                  <label className="form-check form-check-inline form-check-solid me-5">
                    <input
                      className="form-check-input"
                      name="communication[]"
                      type="radio"
                      value="male"
                      required
                      checked={gender == "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="fw-bold ps-2 fs-6">Male</span>
                  </label>

                  <label className="form-check form-check-inline form-check-solid">
                    <input
                      className="form-check-input"
                      name="communication[]"
                      type="radio"
                      required
                      checked={gender == "female"}
                      value="female"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <span className="fw-bold ps-2 fs-6">Female</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9 mb-20">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
