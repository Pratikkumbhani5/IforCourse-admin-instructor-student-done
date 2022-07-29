import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CryptoJS from "crypto-js";

const Cart = () => {
  const [carts, setCarts] = useState();
  // console.log(carts);
  const [totalPrice, setTotalPrice] = useState();
  const [cartId, setCartId] = useState();

  const userId = localStorage.getItem("sapisid");
  const tokena = localStorage.getItem("token");

  if (!(userId === null)) {
    var bytes = CryptoJS.AES.decrypt(userId, "my-secret-key@123");
    var uId = bytes.toString(CryptoJS.enc.Utf8);
  }
  if (!(tokena === null)) {
    var bytes = CryptoJS.AES.decrypt(tokena, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  const handleCheckout = () => {
    const formData = new FormData();

    formData.append("cartId", cartId);
    formData.append("userId", uId);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/student/checkout`, formData, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((response) => {
        // console.log(response);
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      });
    // .catch((err) =>
    // console.log(err.message)
    // );
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/student/add-to-cart/${uId}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        setCarts(res.data.cart[0].courses);
        setTotalPrice(res.data.cart[0].totalPrice);
        // console.log(res.data.cart[0].courses);
        setCartId(res.data.cart[0]._id);
      });
  };
  const RemoveCart = async (courseId, _id) => {
    // console.log(courseId);
    // console.log(_id);

    const formData = new FormData();
    formData.append("cartCourseId", _id);
    formData.append("cartId", cartId);
    formData.append("courseId", courseId);

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/student/add-to-cart/delete`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        getCourse();
      });
  };

  return (
    <div className="container px-3 my-20 clearfix cart">
      <div className="card">
        <div className="card-header ">
          <h2>Shopping Cart</h2>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered m-0 ">
              <thead className="mb-10">
                <tr>
                  <th
                    className="text-center py-3 px-4"
                    style={{ minWidth: 400 }}
                  >
                    <h1>Product Name &amp; Details</h1>
                  </th>
                  <th className="text-right py-3 px-4" style={{ width: 100 }}>
                    <h1>Price</h1>
                  </th>

                  <th
                    className="text-center align-middle py-3 px-0"
                    style={{ width: 40 }}
                  >
                    <h1>Remove</h1>
                  </th>
                </tr>
              </thead>
              <tbody className="mt-20">
                {carts?.map((cart) => (
                  <tr className="sec-tr" key={cart.courseId}>
                    <td className="p-4">
                      <div className="media align-items-center">
                        <div className="media-body">
                          {/* <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          className="ui-w-40 ui-bordered mr-4"
                          alt=""
                        /> */}
                          <a className="m-10 text-dark cart-text">
                            {cart.name}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      {cart.price}
                    </td>

                    <td className="text-center align-middle px-0">
                      <a
                        className="shop-tooltip removecart-btn close float-none text-danger"
                        title=""
                        onClick={() => RemoveCart(cart.courseId, cart._id)}
                        data-original-title="Remove"
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-end align-items-center pb-4">
            <div className="d-flex">
              <div className="text-right mt-4">
                <label className="text-muted font-weight-normal m-0">
                  Total price
                </label>
                <div className="text-large mt-1">
                  <strong>
                    <h2>{totalPrice}</h2>
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-end align-items-center pb-4">
            <button
              type="button"
              className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
            >
              Back to shopping
            </button>
            {/* <StripeCheckout
              stripeKey={`${process.env.REACT_APP_PUBLISHABLE_KEY}`}
              token={makePayment}
              name="Buy React"
              shippingAddress
              billingAddress
            ></StripeCheckout> */}
            <Button onClick={() => handleCheckout()}> Check out</Button>
            {/* <button
              type="button"
              onClick={Order}
              className="btn btn-lg btn-primary mt-2"
            >
              Checkout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
