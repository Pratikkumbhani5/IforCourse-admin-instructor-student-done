import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./Header.css";
import CryptoJS from "crypto-js";

function Header() {
  const nav = useNavigate();
  const type = localStorage.getItem("sidcty");
  const isAuthCheckUser = localStorage.getItem("token");

  if (!(type === null)) {
    var bytes = CryptoJS.AES.decrypt(type, "my-secret-key@123");
    var roll = bytes.toString(CryptoJS.enc.Utf8);
  }

  const logoutHandler = (event) => {
    event.preventDefault();

    localStorage.clear();
    nav("/home");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="sticky-top"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/home">
          IForCourse
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {roll === "student" ? (
            <Link to="/student/becomeinstructor">
              <h5 className="type mt-2 mx-5">Become A Instructor </h5>
            </Link>
          ) : (
            ""
          )}
          {type === null ? (
            ""
          ) : (
            <h5 className="type mt-2">{roll.toUpperCase()} PANEL</h5>
          )}
          {roll === "student" ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Hello, user`}
              menuVariant="light"
              className="nav-link"
            >
              <NavDropdown.Item as={Link} to="/student/studentprofile">
                Student Panel
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isAuthCheckUser === null ? (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          ) : (
            ""
          )}
          {roll === "admin" ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Hello, user`}
              menuVariant="light"
              className="nav-link"
            >
              <NavDropdown.Item as={Link} to="/admin/dashboard">
                Admin panel
              </NavDropdown.Item>

              <NavDropdown.Divider />
              {isAuthCheckUser === null ? (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          ) : (
            ""
          )}
          {roll === "instructor" ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Hello, user`}
              menuVariant="light"
              className="nav-link"
            >
              <NavDropdown.Item as={Link} to="/instructor/allcourse">
                instructor Panel
              </NavDropdown.Item>

              <NavDropdown.Divider />
              {isAuthCheckUser === null ? (
                <NavDropdown.Item as={Link} to="/login">
                  Login
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          ) : (
            ""
          )}

          <Nav className="flex-shrink-0 feature-img-wrap header-img">
            {isAuthCheckUser === null ? (
              <Button as={Link} to="/login">
                Login
              </Button>
            ) : (
              <>
                {roll === "student" ? (
                  <NavDropdown
                    title={
                      <div>
                        <img
                          className="header-img rounded-circle"
                          src="https://lmszai.zainikthemes.com/uploads_demo/user/student-avatar.jpg"
                          alt="user pic header-img"
                        />
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <Dropdown.Item as={Link} to="/student/mylearning">
                      MyLearning
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/student/studentprofile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/student/cart">
                      Cart
                    </Dropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}
                {roll === "admin" ? (
                  <NavDropdown
                    title={
                      <div>
                        <img
                          className="header-img rounded-circle"
                          src="https://lmszai.zainikthemes.com/uploads_demo/user/student-avatar.jpg"
                          alt="user pic header-img"
                        />
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <Dropdown.Item as={Link} to="/admin/dashboard">
                      Admin DashBoard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/allstudent">
                      All Student
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/allcourse">
                      All Course
                    </Dropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}
                {roll === "instructor" ? (
                  <NavDropdown
                    title={
                      <div>
                        <img
                          className="header-img rounded-circle"
                          src="https://lmszai.zainikthemes.com/uploads_demo/user/student-avatar.jpg"
                          alt="user pic header-img"
                        />
                      </div>
                    }
                    id="basic-nav-dropdown"
                  >
                    <Dropdown.Item as={Link} to="/instructor/allcourse">
                      All Course
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/instructor/course">
                      Add Course
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/instructor/allstudent">
                      All Student
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/instructor/profile">
                      Profile
                    </Dropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
