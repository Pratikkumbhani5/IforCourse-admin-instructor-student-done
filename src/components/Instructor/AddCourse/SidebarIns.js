import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Collapse from "react-bootstrap/Collapse";

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

const SidebarIns = () => {
  return (
    <div>
      <div id="mySidebar" className="sidebar">
        <p className="closebtn" onClick={closeNav}>
          ×
        </p>
        <Link to="/instructor/course">Add Course</Link>
        {/* <Link to="/instructor/allchapter">All Chapter</Link> */}
        {/* <Link to="/instructor/addchapter">Add Chapter</Link> */}
        {/* <Link to="/instructor/video">Add Course video</Link> */}
        <Link to="/instructor/allcourse">All Course</Link>
        {/* <Link to="/instructor/allresourse">All Resourse</Link> */}
        <Link to="/instructor/allstudent">All Student</Link>
        <Link to="/instructor/profile">Profile</Link>
      </div>
      <div id="main">
        <button id="myClose" className="openbtn" onClick={openNav}>
          ☰
        </button>
      </div>
    </div>
  );
};

export default SidebarIns;
