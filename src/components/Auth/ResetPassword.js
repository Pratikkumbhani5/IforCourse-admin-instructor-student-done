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
    text: "Password Updated successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

export default function ResetPassword() {
  const nav = useNavigate();
  const [error, setError] = useState(null);

  const passwordInputRef = useRef();

  const { token } = useParams();

  // axios.defaults.withCredentials = true;

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/auth/new-password`, {
        password: enteredPassword,
        token: token,
      })
      .then((resData) => {
        // console.log(resData);

        // setToken(resData.data.token);
        // setUserId(resData.data.userId);
        // setIsAuth(true);
        alertContent();
        nav("/login");
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
          <h1 className="text-dark mb-3">Enter New Password</h1>
          <div className="text-gray-400 fw-bold fs-4">
            Enter your New Password to reset your password.
          </div>
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
            placeholder="enter a new password"
            className={clsx("form-control form-control-lg form-control-solid")}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            id="kt_sign_in_submit"
            className="btn btn-lg btn-primary w-100 mb-5"
          >
            <span className="indicator-label">Reset Password</span>
          </button>
        </div>
      </form>
      {error && <h5 className="text-center error-web pt-3">{error}</h5>}
    </div>
  );
}
