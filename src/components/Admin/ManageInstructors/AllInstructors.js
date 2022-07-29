import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const AllInstructors = () => {
  const [instructors, setInstructors] = useState();
  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getInstructors();
  }, []);

  const getInstructors = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/instructor/All-list`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setInstructors(res.data.Instructor);
      });
  };

  return (
    <div className="card container">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">
            All Instructors
          </span>
        </h3>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted bg-light">
                <th className="ps-4  rounded-start">Name</th>
                <th className="ps-4  justify-content-center  rounded-center">
                  Email
                </th>
                <th className="ps-4 justify-content-center  rounded-center">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {instructors?.map((instructor) => (
                <tr key={instructor._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5"></div>
                      <div className="d-flex justify-content-start flex-column">
                        <p className="text-dark fw-bolder  mb-1 fs-6">
                          {instructor.firstname} {instructor.lastname}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center  flex-column">
                      <p className="text-dark fw-bolder  mb-1 fs-6">
                        {instructor.email}
                      </p>
                    </div>
                  </td>
                  {instructor.status == "approved" ? (
                    <td className="text-start">
                      <span className="badge badge-light-success fs-7 fw-bold">
                        approved
                      </span>
                    </td>
                  ) : (
                    <td className="text-start">
                      <span className="badge badge-light-warning fs-7 fw-bold">
                        Pending
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllInstructors;
