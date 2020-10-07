import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as RouterNavLink,
} from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
import Logo from "./assets/IUPUI_Logo_49.jpg";
import MainPage from "./components/Main_Page";

const MainMenu = () => {
  return (
    <NavDropdown title="Menu" id="basic-nav-dropdown" alignRight>
      <NavDropdown.Item>
        <NavItem>
          <RouterNavLink
            style={{ color: "black" }}
            to="/data-viz-project-1"
            className="nav-link"
            exact
          >
            Home
          </RouterNavLink>
        </NavItem>
      </NavDropdown.Item>

      <NavDropdown.Item>
        <NavItem>
          <RouterNavLink
            style={{ color: "black" }}
            to="/data-viz-project-1/Documentation"
            className="nav-link"
            exact
          >
            Documentation
          </RouterNavLink>
        </NavItem>
      </NavDropdown.Item>

      <NavDropdown.Item>
        <NavItem>
          <RouterNavLink
            style={{ color: "black" }}
            to="/data-viz-project-1/YouTube"
            className="nav-link"
            exact
          >
            YouTube
          </RouterNavLink>
        </NavItem>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar bg="blue" variant="dark">
          <Navbar.Brand className="navbar-brand-center" href="/">
            <img
              alt=""
              src={Logo}
              width="120"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Text className="d-flex align-items-center">
            London's 1894 Cholera Epidemic
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end">
              <MainMenu />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/data-viz-project-1/Documentation">
            <Documentation />
          </Route>
          <Route path="/data-viz-project-1/YouTube">
            <YouTube />
          </Route>
          <Route path="/data-viz-project-1">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const Home = () => {
  return <div>{MainPage}</div>;
};

const Documentation = () => {
  return <h2>Documentation</h2>;
};

const YouTube = () => {
  return <h2>YouTube</h2>;
};

export default App;
