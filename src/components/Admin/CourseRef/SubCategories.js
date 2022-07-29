import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import CryptoJS from "crypto-js";

const Subcategories = () => {
  const [catagories, SetCatagories] = useState();

  const [categoryValue, SetCaregoryValue] = useState();

  // console.log(categoryValue);

  const [subCategories, setSubCategories] = useState();
  const [editCategories, setEditCategories] = useState();
  const [editSubCategoriesId, setEditSubCategoriesId] = useState();
  const [editSubCategories, setEditSubCategories] = useState();
  const [addSubCategories, setAddSubCategories] = useState();
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
    getSubCategories();
  }, []);
  const getSubCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/subcatagories`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.subCategory);
        // console.log(res.data.subCategory[0].category_Id.name, "data");
        setSubCategories(res.data.subCategory);
      });
  };

  const getEditCategories = (_id) => {
    handleShow(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/admin/subcatagories/edit/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        setEditSubCategories(res.data.subCategory.name);
        setEditSubCategoriesId(res.data.subCategory._id);
        setEditCategories(res.data.subCategory.category_Id);
      });
  };
  const updateSubCategories = (_id) => {
    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("name", editSubCategories);
    formData.append("catId", editCategories);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/admin/subcatagories/edit/${_id}`,
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
        getSubCategories();
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/catagories`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        SetCatagories(res.data.category);
      });
  }, []);

  const addsubcategories = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", uId);
    formData.append("name", addSubCategories);
    formData.append("catId", categoryValue);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/admin/subcatagories`,
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
        getSubCategories();
      })
      .catch(function (error) {
        if (error.response) {
          setError(error.response.data.message);
        }
      });
  };
  const deletecategories = (_id) => {
    // console.log(_id);

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/admin/subcatagories/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${uToken}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        getSubCategories();
      });
  };

  return (
    <div className="card container" style={{ marginBottom: 150 }}>
      <div className="card-header border-0 pt-5">
        <div className="row" style={{ minWidth: 1212 }}>
          <div className="col-4">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bolder fs-3 mb-1">
                SubCategories
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
              Add SubCategories
            </a>
            <Modal show={ashow} onHide={ahandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add SubCategories</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={addsubcategories}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Category</Form.Label>
                    <select
                      as="select"
                      required
                      title="select value"
                      className="form-select form-select-lg form-select-solid mb-5"
                      onChange={(e) => {
                        SetCaregoryValue(e.target.value);
                      }}
                    >
                      <option hidden value="">
                        Select Category
                      </option>
                      {catagories?.map((curElem) => {
                        return (
                          <option
                            key={curElem._id}
                            defaultValue={curElem._id[0]}
                            value={curElem._id}
                          >
                            {curElem.name}
                          </option>
                        );
                      })}
                    </select>
                    <Form.Label>Add SubCategories</Form.Label>
                    <Form.Control
                      type="text"
                      as="input"
                      required
                      onChange={(e) => setAddSubCategories(e.target.value)}
                      placeholder="add subcategories"
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
                <th className="ps-4 min-w-125px rounded-start">Name</th>
                <th className="min-w-125px text-center">Categories</th>
                <th
                  className="min-w-200px text-end ps-4 rounded-end"
                  style={{ paddingRight: 47 }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {subCategories?.map((subCategorie) => {
                return (
                  <tr key={subCategorie._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5"></div>
                        <div className="d-flex justify-content-start flex-column">
                          <a className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                            {subCategorie.name}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">
                      <a className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                        {subCategorie.category_Id.name}
                      </a>
                    </td>

                    <td className="text-end" style={{ paddingRight: 31 }}>
                      <a
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => getEditCategories(subCategorie._id)}
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
                                value={editSubCategories ?? ""}
                                onChange={(e) =>
                                  setEditSubCategories(e.target.value)
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
                            onClick={() =>
                              updateSubCategories(editSubCategoriesId)
                            }
                          >
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      <a
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => deletecategories(subCategorie._id)}
                      >
                        <i className="bi bi-trash3-fill"></i>
                      </a>
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

export default Subcategories;
