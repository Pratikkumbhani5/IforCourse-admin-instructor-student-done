import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

export default function Login() {
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, {
        email: enteredEmail,
        password: enteredPassword,
      })
      .then((resData) => {
        // console.log(resData);

        // setToken(resData.data.token);
        // setUserId(resData.data.userId);
        // setIsAuth(true);

        var token = CryptoJS.AES.encrypt(
          resData.data.token,
          "my-secret-key@123"
        ).toString();

        var id = CryptoJS.AES.encrypt(
          resData.data.userId,
          "my-secret-key@123"
        ).toString();

        var type = CryptoJS.AES.encrypt(
          resData.data.type,
          "my-secret-key@123"
        ).toString();

        localStorage.setItem("token", token);
        localStorage.setItem("sapisid", id);
        localStorage.setItem("sidcty", type);

        nav("/home");
      })
      .catch(() => setError("Entered Email or Password is Incorrect"));
  };

  return (
    <div
      style={{ margintop: 154, marginBottom: 150 }}
      className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto mt-20"
    >
      <form
        className="form w-100"
        noValidate
        id="kt_login_signin_form"
        onSubmit={submitHandler}
      >
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">Sign In to IForCourse</h1>
          <div className="text-gray-400 fw-bold fs-4">
            New Here?{" "}
            <Link to="/signup" className="link-primary fw-bolder">
              Create an Account
            </Link>
          </div>
        </div>

        {/* <div className="mb-10 bg-light-info p-8 rounded">
          <div className="text-info">
            Use account <strong>admin@demo.com</strong> and password{" "}
            <strong>demo</strong> to continue.
          </div>
        </div> */}

        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">Email</label>
          <input
            placeholder="Email"
            ref={emailInputRef}
            className={clsx("form-control form-control-lg form-control-solid")}
            type="email"
            name="email"
          />
        </div>

        <div className="fv-row mb-10">
          <div className="d-flex justify-content-between mt-n5">
            <div className="d-flex flex-stack mb-2">
              <label className="form-label fw-bolder text-dark fs-6 mb-0">
                Password
              </label>
              <Link
                to="/reset"
                className="link-primary fs-6 fw-bolder"
                style={{ marginLeft: "5px" }}
              >
                Forgot Password ?
              </Link>
            </div>
          </div>
          <input
            type="password"
            ref={passwordInputRef}
            placeholder="password"
            className={clsx("form-control form-control-lg form-control-solid")}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
          >
            <span className="indicator-label">Login</span>
          </button>
        </div>
      </form>
      {error && <h5 className="text-center error-web pt-3">{error}</h5>}
    </div>
  );
}
