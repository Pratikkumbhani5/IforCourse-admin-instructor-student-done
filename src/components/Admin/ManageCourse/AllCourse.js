import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Course Deleted successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const Hold = () => {
  const [courses, setCourses] = useState();

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
      .get(`${process.env.REACT_APP_API_URL}/api/admin/course`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCourses(res.data.course);
      });
  };

  const handleDelete = (_id) => {
    // const formData = new FormData();
    // formData.append("userId", userId);

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/admin/course/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        alertContent();
        getCourse();
      });
  };

  return (
    <div className="card container " style={{ marginBottom: 150 }}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">Hold</span>
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
                <th className="min-w-100px">Status</th>
                <th className="min-w-100px text-center rounded-end">Action</th>
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
                  {course.status == "approved" ? (
                    <td className="text-start">
                      <span className="badge badge-light-success fs-7 fw-bold">
                        approved
                      </span>
                    </td>
                  ) : (
                    ""
                  )}
                  {course.status == "hold" ? (
                    <td className="text-start">
                      <span className="badge badge-light-warning fs-7 fw-bold">
                        Hold
                      </span>
                    </td>
                  ) : (
                    ""
                  )}
                  {course.status == "pending" ? (
                    <td className="text-start">
                      <span className="badge badge-light-danger fs-7 fw-bold">
                        pending
                      </span>
                    </td>
                  ) : (
                    ""
                  )}
                  <td className="text-center">
                    <a
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-sm btn-primary"
                    >
                      <i className="bi bi-trash3-fill"></i>
                      Delete
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

export default Hold;
