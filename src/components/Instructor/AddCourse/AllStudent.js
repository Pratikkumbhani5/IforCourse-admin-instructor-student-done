import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import "./AllStudent.css";
import CryptoJS from "crypto-js";
import moment from "moment";

const AllStudent = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // console.log(title);

  // console.log(Date.course_Id.title);

  const handleClose = () => setShow(false);
  const handleShow = (key) => {
    setDate(key.createdAt);
    setTitle(key.course_Id.title);
    setFname(key.user_Id.firstname);
    setLname(key.user_Id.lastname);

    setShow(true);
  };

  const [students, setStudents] = useState();

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
    getStudent();
  }, []);

  // `${process.env.REACT_APP_API_URL}/api/instructor/all-enroll/instructorId`,
  const getStudent = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/instructor/all-enroll?userId=${uId}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        setStudents(res.data.courseEnroll);
        // console.log(res.data.courseEnroll);
        // console.log(res.data.courseEnroll);
        // for (let i = 0; i < res.data.courseEnroll.length; i++) {

        // }
      });
  };

  return (
    <div className="card container">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1 align-items-center">
            All Student
          </span>
        </h3>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted">
                <th className="w-25">Student</th>
                <th className="widthstudent">Course Name </th>
                <th className="w-25">Purchase Date</th>
                <th className="min-w-100px text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students?.map((key) => {
                return (
                  <tr key={key[0]._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-dark fw-bolder text-hover-primary fs-6">
                            {key[0].user_Id.firstname} &nbsp;
                            {key[0].user_Id.lastname}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a className="text-dark fw-bolder text-hover-primary d-block fs-6">
                        {key[0].course_Id.title}
                      </a>
                    </td>
                    <td className="text-end">
                      <div className="d-flex flex-column w-100 me-2">
                        <div className="d-flex flex-stack mb-2">
                          <span className=" me-2 text-dark fw-bolder   ">
                            {moment(key[0].createdAt).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-end flex-shrink-0">
                        <Button onClick={() => handleShow(key[0])}>View</Button>
                      </div>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Student Detail</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <ListGroup>
                            <ListGroup.Item>
                              Name: {fname} &nbsp;
                              {lname}
                            </ListGroup.Item>
                            <ListGroup.Item>Course: {title}</ListGroup.Item>

                            <ListGroup.Item>
                              Purchase Date:
                              {moment(date).format("DD/MM/YYYY")}
                            </ListGroup.Item>
                          </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllStudent;
