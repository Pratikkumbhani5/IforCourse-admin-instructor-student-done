import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const Approved = () => {
  const [courses, setCourses] = useState();

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
    getCourse();
  }, []);

  const getCourse = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/course/review-approved`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.course);
        setCourses(res.data.course);
      });
  };

  const handleHold = (_id) => {
    const formData = new FormData();
    formData.append("userId", uId);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/admin/course/review-approved/edit/${_id}`,
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
    <div className="card container " style={{ marginBottom: 150 }}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">Approved</span>
        </h3>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted bg-light">
                <th className="ps-4 min-w-450px rounded-start">Product</th>
                <th className="min-w-125px">Instructor</th>
                <th className="min-w-125px">Category</th>
                <th className="min-w-100px">Price</th>
                <th className="min-w-200px text-center rounded-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {courses?.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${course.image}`}
                          alt=""
                        />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                          {course.title}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                      {course.instructor_Id.firstname}
                      &nbsp;
                      {course.instructor_Id.lastname}
                    </a>
                  </td>
                  <td>
                    <a className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                      {course.category.name}
                    </a>
                  </td>
                  <td>
                    <a className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                      ${course.price}
                    </a>
                  </td>

                  <td className="text-center">
                    <a
                      onClick={() => handleHold(course._id)}
                      className="btn btn-sm btn-warning"
                    >
                      Hold
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Approved;
