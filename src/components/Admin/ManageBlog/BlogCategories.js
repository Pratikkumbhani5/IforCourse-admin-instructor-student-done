import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CryptoJS from "crypto-js";

const BlogCategories = () => {
  const [categories, setCategories] = useState();
  const [editCategories, setEditCategories] = useState();
  const [editCategoriesId, setEditCategoriesId] = useState();
  const [addCategories, setAddCategories] = useState();
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(editCategories);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ashow, setaShow] = useState(false);

  const ahandleClose = () => setaShow(false);
  const ahandleShow = () => setaShow(true);

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
    getCategories();
  }, []);
  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/blog-catagories`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.BlogCategory);
        setCategories(res.data.BlogCategory);
      });
  };

  const getEditCategories = (_id) => {
    handleShow(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/blog-catagories/edit/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.BlogCategory, "for update gate");
        setEditCategories(res.data.BlogCategory.name);
        setEditCategoriesId(res.data.BlogCategory._id);
      });
  };
  const updatecategories = (_id) => {
    // console.log(_id);
    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("name", editCategories);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/admin/blog-catagories/edit/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        handleClose(true);
        getCategories();
      });
  };
  const addcategories = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("name", addCategories);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/admin/blog-catagories`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        ahandleClose(true);
        getCategories();
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };
  const deletecategories = (_id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/admin/blog-catagories/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        getCategories();
      });
  };

  return (
    <div className="card container " style={{ marginBottom: 200 }}>
      <div className="card-header border-0 pt-5">
        <div className="row" style={{ minWidth: 1212 }}>
          <div className="col-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                Blog Categories
              </span>
            </h3>
          </div>
          <div className="col-4">
            <Form.Control
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="card-toolbar col-4  justify-content-end">
            <a onClick={ahandleShow} className="btn btn-sm btn-primary">
              Add Category
            </a>
            <Modal show={ashow} onHide={ahandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add categories</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={addcategories}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Add categories</Form.Label>
                    <Form.Control
                      type="text"
                      as="input"
                      required
                      onChange={(e) => setAddCategories(e.target.value)}
                      placeholder="add categories"
                      autoFocus
                    />
                  </Form.Group>
                  {error && <h2 className="error-web pt-1 pb-5">{error}</h2>}
                  <Modal.Footer>
                    <Button variant="secondary" onClick={ahandleClose}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted bg-light">
                <th className="ps-4 min-w-125px rounded-start">Categories</th>

                <th
                  className="min-w-125px text-end ps-4"
                  style={{ paddingRight: 47 }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories?.map((categorie) => (
                <tr key={categorie._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="symbol symbol-50px me-5"
                        style={{ marginLeft: 30 }}
                      >
                        <img
                          src="https://lmszai.zainikthemes.com/uploads/category/1657095912-ZN7ZPqEkwf.png"
                          className="w-50 h-50"
                        />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                          {categorie.name}
                        </a>
                      </div>
                    </div>
                  </td>

                  <td className="text-end" style={{ paddingRight: 31 }}>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      onClick={() => getEditCategories(categorie._id)}
                      // onClick={() => console.log(categorie._id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </a>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update categories</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Update categories</Form.Label>
                            <Form.Control
                              type="text"
                              value={editCategories ?? ""}
                              onChange={(e) =>
                                setEditCategories(e.target.value)
                              }
                              placeholder="categories"
                              autoFocus
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => updatecategories(editCategoriesId)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      onClick={() => deletecategories(categorie._id)}
                    >
                      <i className="bi bi-trash3-fill"></i>
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

export default BlogCategories;
