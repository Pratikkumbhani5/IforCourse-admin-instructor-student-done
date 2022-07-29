import { Fragment, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AddCourseDetail from "./components/Instructor/AddCourse/AddCourseDetail";
import AddCourseVideo from "./components/Instructor/AddCourse/AddCourseVideo";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Login from "./components/Auth/Login.js";
import AllCourse from "./components/Instructor/AddCourse/AllCourse";
import AddResourse from "./components/Instructor/AddCourse/AddResourse";
import AllStudent from "./components/Instructor/AddCourse/AllStudent";
import Profile from "./components/Instructor/AddCourse/Profile";
import Admin from "./components/Admin/Admin";
import DashBoard from "./components/Admin/DashBoard";
import Approved from "./components/Admin/ManageCourse/Approved";
import Reviewpending from "./components/Admin/ManageCourse/ReviewPending";
import Hold from "./components/Admin/ManageCourse/Hold";
import Allcourse from "./components/Admin/ManageCourse/AllCourse";
import Categories from "./components/Admin/CourseRef/Categories";
import Subcategories from "./components/Admin/CourseRef/SubCategories";
import AllInstructors from "./components/Admin/ManageInstructors/AllInstructors";
import ApprovedInstructors from "./components/Admin/ManageInstructors/ApprovedIns";
import PendingInstructors from "./components/Admin/ManageInstructors/pendingIns";
import AAllStudent from "./components/Admin/ManageStudent/AllStudent";
import AddBlog from "./components/Admin/ManageBlog/AddBlog";
import Allblog from "./components/Admin/ManageBlog/AllBlog";
import BlogCategories from "./components/Admin/ManageBlog/BlogCategories";
import Home from "./components/Layout/Home";
import StudentProfile from "./components/Student/StudentProfile";
import SignUp from "./components/Auth/SignUp";
import ProtectedRoutes from "./ProtectedRoutes";
import SessionExpire from "./components/Layout/SessionExpire";
import SidebarIns from "./components/Instructor/AddCourse/SidebarIns";
import CourseDetail from "./components/Layout/CourseDetail";
import MyLearning from "./components/Student/MyLearning";
import CourseVideo from "./components/Student/CourseVideo";
import Cart from "./components/Student/Cart";
import AddChapter from "./components/Instructor/AddCourse/AddChapter";
import AllChapter from "./components/Instructor/AddCourse/AllChapter";
import EditCourseDetail from "./components/Instructor/AddCourse/EditCourseDetail";
import EditChapterDetail from "./components/Instructor/AddCourse/EditChapterDetail";
import AllResourse from "./components/Instructor/AddCourse/AllResourse";
import EditBlog from "./components/Admin/ManageBlog/EditBlog";
import BecomeInstructor from "./components/Student/BecomeInstructor";
import Success from "./components/Student/Success";
import Reset from "./components/Auth/Reset";
import ResetPassword from "./components/Auth/ResetPassword";
import CryptoJS from "crypto-js";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const isAuthCheck = localStorage.getItem("token");
  const isStudent = localStorage.getItem("sidcty");
  const isAdmin = localStorage.getItem("sidcty");
  const isInstructor = localStorage.getItem("sidcty");

  // if (!(isAdmin === null)) {
  //   var bytes = CryptoJS.AES.decrypt(isAdmin, "my-secret-key@123");
  //   var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  // }
  if (!(isStudent === null)) {
    var bytes = CryptoJS.AES.decrypt(isStudent, "my-secret-key@123");
    var student = bytes.toString(CryptoJS.enc.Utf8);
  }
  if (!(isAdmin === null)) {
    var bytes = CryptoJS.AES.decrypt(isStudent, "my-secret-key@123");
    var admin = bytes.toString(CryptoJS.enc.Utf8);
  }
  if (!(isInstructor === null)) {
    var bytes = CryptoJS.AES.decrypt(isInstructor, "my-secret-key@123");
    var instructor = bytes.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
    if (isAuthCheck === null) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  });

  return (
    <div>
      <Router>
        <Fragment>
          <Header />
          <Routes>
            <Route path="/home" exact element={<Home />} />
            <Route
              path="/coursedetails/:_id"
              exact
              element={<CourseDetail />}
            />
            <Route path="*" exact element={<SessionExpire />} />
            <Route
              path="/login"
              exact
              element={isAuth ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/reset"
              exact
              element={isAuth ? <Navigate to="/home" /> : <Reset />}
            />
            <Route
              path="/resetpassword/:token"
              exact
              element={isAuth ? <Navigate to="/home" /> : <ResetPassword />}
            />
            <Route
              path="/signup"
              exact
              element={isAuth ? <Navigate to="/home" /> : <SignUp />}
            />
            {student === "student" && (
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/student/studentprofile"
                  exact
                  element={<StudentProfile />}
                />
                <Route
                  path="/student/becomeinstructor"
                  exact
                  element={<BecomeInstructor />}
                />
                <Route
                  path="/student/mylearning"
                  exact
                  element={<MyLearning />}
                />
                <Route path="/success" exact element={<Success />} />
                <Route
                  path="/student/coursevideo/:_id"
                  exact
                  element={<CourseVideo />}
                />
                <Route path="/student/cart" exact element={<Cart />} />
              </Route>
            )}
            {admin === "admin" && (
              <Route
                element={
                  <>
                    <Admin />
                    <ProtectedRoutes />
                  </>
                }
              >
                <Route path="/admin/dashboard" exact element={<DashBoard />} />
                <Route path="/admin/approved" exact element={<Approved />} />
                <Route
                  path="/admin/reviewpending"
                  exact
                  element={<Reviewpending />}
                />
                <Route path="/admin/hold" exact element={<Hold />} />
                <Route path="/admin/allcourse" exact element={<Allcourse />} />
                <Route
                  path="/admin/categories"
                  exact
                  element={<Categories />}
                />
                <Route
                  path="/admin/subcategories"
                  exact
                  element={<Subcategories />}
                />
                <Route
                  path="/admin/allinstructors"
                  exact
                  element={<AllInstructors />}
                />
                <Route
                  path="/admin/approvedinstructors"
                  exact
                  element={<ApprovedInstructors />}
                />
                <Route
                  path="/admin/pendinginstructors"
                  exact
                  element={<PendingInstructors />}
                />
                <Route
                  path="/admin/allstudent"
                  exact
                  element={<AAllStudent />}
                />
                <Route path="/admin/addblog" exact element={<AddBlog />} />
                <Route
                  path="/admin/editblog/:_id"
                  exact
                  element={<EditBlog />}
                />
                <Route path="/admin/allblog" exact element={<Allblog />} />
                <Route
                  path="/admin/blogcategories"
                  exact
                  element={<BlogCategories />}
                />
              </Route>
            )}
            {instructor === "instructor" && (
              <Route
                element={
                  <>
                    <SidebarIns />
                    <ProtectedRoutes />
                  </>
                }
              >
                <Route
                  path="/instructor/course"
                  exact
                  element={<AddCourseDetail />}
                />
                <Route
                  path="/instructor/editcoursedetail/:_id"
                  exact
                  element={<EditCourseDetail />}
                />
                <Route
                  path="/instructor/allchapter/:_id"
                  exact
                  element={<AllChapter />}
                />
                <Route
                  path="/instructor/addchapter/:_id"
                  exact
                  element={<AddChapter />}
                />
                <Route
                  path="/instructor/editchapterdetail/:_id"
                  exact
                  element={<EditChapterDetail />}
                />
                <Route
                  path="/instructor/video/:_id"
                  exact
                  element={<AddCourseVideo />}
                />
                <Route
                  path="/instructor/allcourse"
                  exact
                  element={<AllCourse />}
                />
                <Route
                  path="/instructor/allresourse/:_id"
                  exact
                  element={<AllResourse />}
                />
                <Route
                  path="/instructor/addresourse/:_id"
                  exact
                  element={<AddResourse />}
                />
                <Route
                  path="/instructor/allstudent"
                  exact
                  element={<AllStudent />}
                />
                <Route path="/instructor/profile" exact element={<Profile />} />
              </Route>
            )}
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
