import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import "./Admin.css";

const openNav = () => {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.getElementById("myClose").style.visibility = "hidden";
};

const closeNav = () => {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("myClose").style.visibility = "visible";
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);

  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <p className="closebtn" onClick={closeNav}>
          ×
        </p>
        <Link to="/admin/dashboard">DashBoard</Link>
        <div className="list-admin">
          <div>
            <p
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              style={{ cursor: "pointer" }}
            >
              Manage Course <i className="bi bi-chevron-down"></i>
            </p>
          </div>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <ul>
                <li>
                  <Link to="/admin/reviewpending">Review Pen.</Link>
                </li>
                <li>
                  <Link to="/admin/hold">Hold</Link>
                </li>
                <li>
                  <Link to="/admin/approved">Approved</Link>
                </li>
                <li>
                  <Link to="/admin/allcourse">All Course</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="list-admin">
          <div>
            <p
              onClick={() => setOpen1(!open1)}
              aria-controls="example-collapse-text"
              aria-expanded={open1}
              style={{ cursor: "pointer" }}
            >
              Course Reference <i className="bi bi-chevron-down"></i>
            </p>
          </div>
          <Collapse in={open1}>
            <div id="example-collapse-text">
              <ul>
                <li>
                  <Link to="/admin/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/admin/subcategories">Subcategories</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="list-admin">
          <div>
            <p
              onClick={() => setOpen2(!open2)}
              aria-controls="example-collapse-text"
              aria-expanded={open2}
              style={{ cursor: "pointer" }}
            >
              Manage Instructor <i className="bi bi-chevron-down"></i>
            </p>
          </div>
          <Collapse in={open2}>
            <div id="example-collapse-text">
              <ul>
                <li>
                  <Link to="/admin/pendinginstructors">Pending Ins.</Link>
                </li>
                <li>
                  <Link to="/admin/approvedinstructors">Approved Ins.</Link>
                </li>
                <li>
                  <Link to="/admin/allinstructors">All Ins.</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="list-admin">
          <div>
            <p
              onClick={() => setOpen3(!open3)}
              aria-controls="example-collapse-text"
              aria-expanded={open3}
              style={{ cursor: "pointer" }}
            >
              Manage Student <i className="bi bi-chevron-down"></i>
            </p>
          </div>
          <Collapse in={open3}>
            <div id="example-collapse-text">
              <ul>
                <li>
                  <Link to="/admin/allstudent">All Student</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
        <div className="list-admin">
          <div>
            <p
              onClick={() => setOpen4(!open4)}
              aria-controls="example-collapse-text"
              aria-expanded={open4}
              style={{ cursor: "pointer" }}
            >
              Manage Blog <i className="bi bi-chevron-down"></i>
            </p>
          </div>
          <Collapse in={open4}>
            <div id="example-collapse-text">
              <ul>
                <li>
                  <Link to="/admin/addblog">Add Blog</Link>
                </li>
                <li>
                  <Link to="/admin/allblog">All Blog</Link>
                </li>
                <li>
                  <Link to="/admin/blogcategories">Blog Categories</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </div>
      </div>
      <div id="main">
        <button id="myClose" className="openbtn" onClick={openNav}>
          ☰
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
