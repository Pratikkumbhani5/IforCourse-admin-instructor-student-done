import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import CryptoJS from "crypto-js";

const AllChapter = () => {
  const [chapters, setChapters] = useState();

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
      .get(`${process.env.REACT_APP_API_URL}/api/instructor/chapters/${_id}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.chapter);
        setChapters(res.data.chapter);
      });
  };

  const deleteChapter = async (_id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/chapter/delete/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      }
    );
    getCourse();
  };

  const deleteAllChapter = async () => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/instructor/chapters/delete/${_id}`,
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
      <h1 className="mb-5 ">All Chapter</h1>
      <div className="row text-end">
        <div className="col-md-4"></div>
        <div className="col-md-4"></div>
        <div className="col-md-4 ">
          <Link to={`/instructor/addchapter/${_id}`} className="">
            <Button className="mx-3">Add Chaper</Button>
          </Link>

          <Button
            className="me-auto"
            variant="danger"
            onClick={deleteAllChapter}
          >
            Delete All
          </Button>
        </div>
      </div>

      <ListGroup className="mt-9">
        {chapters?.map((chapter) => (
          <div key={chapter._id}>
            <ListGroup.Item className="mx-5 d-flex justify-content-between">
              <h6 className="pt-5">{chapter.name}</h6>
              <div className="pt-2">
                <Link to={`/instructor/video/${chapter._id}`}>
                  <Button className="mx-3" variant="outline-dark">
                    Edit Media
                  </Button>
                </Link>
                <Link to={`/instructor/editchapterdetail/${chapter._id}`}>
                  <Button className="mx-3" variant="outline-dark">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="delete-color"
                  onClick={() => deleteChapter(chapter._id)}
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

export default AllChapter;
