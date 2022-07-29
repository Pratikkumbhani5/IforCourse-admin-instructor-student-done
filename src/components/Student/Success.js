import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Success.css";
import axios from "axios";
import CryptoJS from "crypto-js";

const Success = () => {
  // const [cartId, setCartId] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    order();
  }, []);

  const order = async () => {
    const formData = new FormData();
    // formData.append("cartId", cartId);
    formData.append("userId", uId);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/student/order`, formData, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(true);
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };

  return (
    <div className="success-wrapper">
      {loading ? (
        <>
          <h1 className="container">Loading...</h1>
          {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}
        </>
      ) : (
        <div className="success">
          <h2>Thank you for Purchase</h2>
          <p className="email-msg">Check your email for the receipt.</p>
          <p className="description">
            If you have any question, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <Link to="/student/mylearning">
            <Button type="button" width="300px" className="btn">
              Continue Lerning
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Success;
