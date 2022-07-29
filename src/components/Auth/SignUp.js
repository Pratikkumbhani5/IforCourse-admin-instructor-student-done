import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import axios from "axios";

export default function SignUp() {
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const emailInputRef = useRef();
  const fnameInputRef = useRef();
  const lnameInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFName = fnameInputRef.current.value;
    const enteredLName = lnameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        email: enteredEmail,
        firstname: enteredFName,
        lastname: enteredLName,
        password: enteredPassword,
      })
      .then((res) => {
        nav("/login");
        // console.log("data posting", res);
      })
      .catch(
        (err) => setError("entered data is incorrect")
        // console.log(err)
      );
  };

  return (
    <div
      style={{ margintop: "154px" }}
      className="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto mt-20"
    >
      <form
        className="form w-100"
        id="kt_login_signin_form"
        onSubmit={submitHandler}
      >
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">SignUp to IForCourse</h1>
          <div className="text-gray-400 fw-bold fs-4">
            Alredy Have An Account? &nbsp;
            <Link to="/login" className="link-primary fw-bolder">
              Login
            </Link>
          </div>
        </div>
        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">Email</label>
          <input
            placeholder="Email"
            required
            ref={emailInputRef}
            className={clsx("form-control form-control-lg form-control-solid")}
            type="email"
            name="email"
            autoComplete="off"
          />
        </div>{" "}
        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">
            First Name
          </label>
          <input
            placeholder="First Name"
            ref={fnameInputRef}
            className={clsx("form-control form-control-lg form-control-solid")}
            type="text"
            name="fname"
            required
            autoComplete="off"
          />
        </div>
        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">
            Last Name
          </label>
          <input
            placeholder="Last Name"
            ref={lnameInputRef}
            className={clsx("form-control form-control-lg form-control-solid")}
            type="text"
            name="lname"
            required
            autoComplete="off"
          />
        </div>
        <div className="fv-row mb-10">
          <div className="d-flex justify-content-between mt-n5">
            <div className="d-flex flex-stack mb-2">
              <label className="form-label fw-bolder text-dark fs-6 mb-0">
                Password
              </label>
            </div>
          </div>
          <input
            type="password"
            ref={passwordInputRef}
            autoComplete="off"
            placeholder="password"
            required
            className={clsx("form-control form-control-lg form-control-solid")}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
          >
            <span className="indicator-label">Continue</span>
          </button>
        </div>
      </form>
      {error && <h5 className="text-center error-web pt-3">{error}</h5>}
    </div>
  );
}
