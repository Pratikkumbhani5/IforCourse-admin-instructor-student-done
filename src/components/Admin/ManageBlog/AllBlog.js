import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const alertContent = () => {
  MySwal.fire({
    title: "Success!",
    text: "Your Blog Deleted successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

const Allblog = () => {
  const [blogs, setBlogs] = useState();

  const token = localStorage.getItem("token");

  if (!(token === null)) {
    var bytes = CryptoJS.AES.decrypt(token, "my-secret-key@123");
    var uToken = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    getAllBlog();
  }, []);

  const getAllBlog = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/blogs`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data.blogs);
        setBlogs(res.data.blogs);
      });
  };

  const deleteCourse = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/admin/blog/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${uToken}`,
        },
      })
      .then(() => {
        alertContent();
        getAllBlog();
      });
  };

  return (
    <div className="card container">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder fs-3 mb-1">All Blog</span>
        </h3>
        <div className="card-toolbar">
          <Link to="/admin/addblog" className="btn btn-sm btn-primary">
            Add Blog
          </Link>
        </div>
      </div>

      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bolder text-muted bg-light">
                <th className="ps-4 min-w-450px rounded-start">Product</th>
                {/* <th className="min-w-125px">Category</th> */}
                <th className="min-w-125px">Category</th>
                <th className="min-w-100px">Name</th>
                <th className="min-w-200px text-center rounded-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs?.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${blog.image}`}
                          alt=""
                        />
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                          {blog.title}
                        </a>
                      </div>
                    </div>
                  </td>

                  <td>
                    <a className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                      {blog.category.name}
                    </a>
                  </td>

                  <td>
                    <a className="text-dark fw-bolder text-hover-primary d-block mb-1 fs-6">
                      Administration
                    </a>
                  </td>
                  <td className="text-center">
                    <Link
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      to={`/admin/editblog/${blog._id}`}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                    <a
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      onClick={() => deleteCourse(blog._id)}
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

export default Allblog;
