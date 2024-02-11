import "./App.scss";
import { Link, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Test from "./components/Test";
import Emotions from "./components/Emotions";
import Stars from "./components/Stars";
import Card from "./components/Card";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPass from "./components/ForgotPass";
import Test2 from "./components/Test2";
function App() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <Navbar expand="lg" className="fixed-top bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand text-success fw-semibold">
              Dine Me
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto justify-content-end w-100">
              <Link to="/" className="nav-link active">
                Home
              </Link>
              <Link to="/menu" className="nav-link">
                Menu
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <Link to="/Signup" className="nav-link">
                Sign up
              </Link>
              <Link to="/Login" className="nav-link">
                Login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/test" element={<Test />} />
        <Route path="/emotions" element={<Emotions />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/ForgotPass" element={<ForgotPass />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
      {/* <Route path="/stars" element={<Stars />} />
        <Route path="/card" element={<Card />} /> */}

      {/* <Footer /> */}

      <footer className="bg-body-tertiary">
        <p className="p-3 m-0 text-center">Copyright &copy; {currentYear}</p>
      </footer>
    </div>
  );
}

export default App;
