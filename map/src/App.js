import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink as RouterNavLink,
} from "react-router-dom";
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  Image,
} from "react-bootstrap";
import Logo from "./assets/IUPUI_Logo_49.jpg";
import Thing from "./components/Main_Page";

const MainMenu = (props) => {
  return (
    <NavDropdown title="Menu" id="basic-nav-dropdown" alignRight>
      <NavDropdown.Item>
        <NavItem>
          <RouterNavLink
            style={{ color: "black" }}
            to="/"
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
            to="/Documentation"
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
            to="/YouTube"
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

function App() {
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
          {/*  <Navbar.Toggle onClick={this.toggle} /> */}
          <Navbar.Collapse className="justify-content-end">
            <Nav className="justify-content-end">
              <MainMenu />
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route path="/Documentation">
            <Documentation />
          </Route>
          <Route path="/YouTube">
            <YouTube />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <div>{Thing}</div>;
}

function Documentation() {
  return <h2>Documentation</h2>;
}

function YouTube() {
  return <h2>YouTube</h2>;
}

export default App;
