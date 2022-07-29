import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import CryptoJS from "crypto-js";

const AllResourse = () => {
  const [resources, setResource] = useState();

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  const { _id } = useParams();
  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/instructor/resource/${_id}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.resouses);
        setResource(res.data.resouses);
      });
  };
  const deleteUser = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/resource/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };
  const deleteall = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/resources/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };

  return (
    <div className="container " style={{ maxWidth: 1000, marginBottom: 150 }}>
      <h1 className="mb-5 ">All Resource</h1>
      <div className=" d-flex justify-content-between my-15">
        <Link
          to={`/instructor/addresourse/${_id}`}
          // className="d-grid d-block justify-content-end"
          className=""
        >
          <Button className="mx-3">Add Resource</Button>
        </Link>

        <Button
          variant="danger"
          className="delete-color me-10 "
          onClick={deleteall}
        >
          Delete All
        </Button>
      </div>
      <ListGroup className="mt-9">
        {resources?.map((resource) => (
          <div key={resource._id}>
            <ListGroup.Item className="mx-5 d-flex justify-content-between">
              <h6 className="pt-5">{resource.path}</h6>
              <div className="pt-2">
                <Button
                  variant="danger"
                  className="delete-color"
                  onClick={() => deleteUser(resource._id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
            <br />
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default AllResourse;
