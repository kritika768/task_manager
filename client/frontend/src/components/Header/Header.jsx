import { Navbar, Nav, Container } from "react-bootstrap";
import style from "./Header.module.css";
import routes from "../../routes/routes.json";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand>
            <NavLink to={routes.HOME} className={style.linkStyle}>
              Task Manager
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <NavLink to={routes.TASK} className={style.linkStyle}>
                  Task
                </NavLink>
              </Nav.Link>
            </Nav>
            <Nav>
              {userName ? (
                <>
                  <Nav.Link className={style.linkStyle}>
                    Welcome, {userName}
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className={style.linkStyle}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <NavLink to={routes.LOGIN} className={style.linkStyle}>
                      Login
                    </NavLink>
                  </Nav.Link>
                  <Nav.Link>
                    <NavLink to={routes.SIGNUP} className={style.linkStyle}>
                      Sign Up
                    </NavLink>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
