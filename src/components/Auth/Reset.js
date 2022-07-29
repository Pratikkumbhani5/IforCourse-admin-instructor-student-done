import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Check Your Email Inbox",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

export default function Reset() {
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const { token } = useParams();
  // console.log(token);

  const emailInputRef = useRef();

  // axios.defaults.withCredentials = true;

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        email: enteredEmail,
      })
      .then((resData) => {
        // console.log(resData);

        // setToken(resData.data.token);
        // setUserId(resData.data.userId);
        // setIsAuth(true);
        alertContent();
        nav("/login");
      })
      .catch(() => setError("Entered Email is Invalid"));
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
          <h1 className="text-dark mb-3">Reset Password</h1>
          <div className="text-gray-400 fw-bold fs-4">
            Enter your email to reset your password.
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

        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
          >
            <span className="indicator-label">Continue</span>
          </button>
          <button
            type="button"
            id="kt_sign_in_submit"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            <Link to="/login" className="indicator-label">
              Cancel
            </Link>
          </button>
        </div>
      </form>
      {error && <h5 className="text-center error-web pt-3">{error}</h5>}
    </div>
  );
}
