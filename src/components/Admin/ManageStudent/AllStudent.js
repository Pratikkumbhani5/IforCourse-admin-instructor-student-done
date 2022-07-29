import axios from "axios";
import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const AllStudent = () => {
  const [students, setStudents] = useState();
  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getstudents();
  }, []);

  const getstudents = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/students`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.student);
        setStudents(res.data.student);
      });
  };

  return (
    <div className="card container">
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">All Student</span>
        </h3>
      </div>

      <div className="card-body py-3">
        {/* begin::Table container */}
        <div className="table-responsive">
          {/* begin::Table */}
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
              {students?.map((student) => (
                <tr key={student._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5"></div>
                      <div className="d-flex justify-content-start flex-column">
                        <p className="text-dark fw-bolder  mb-1 fs-6">
                          {student.firstname} {student.lastname}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center  flex-column">
                      <p className="text-dark fw-bolder  mb-1 fs-6">
                        {student.email}
                      </p>
                    </div>
                  </td>

                  <td className="text-start">
                    <span className="badge badge-light-success fs-7 fw-bold">
                      approved
                    </span>
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

export default AllStudent;
