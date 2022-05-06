import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyCourses from "./pages/MyCourses";
import CourseArea from "./pages/CourseArea";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import GlobalState from "./context/GlobalState";
import CreateCourse from "./pages/CreateCourse";

function App() {
  return (
    <GlobalState>
      <Router>
        <Navbar className="nav" />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:id" element={<CourseArea />} />
            <Route path="/createcourse" element={<CreateCourse />} />
          </Routes>
        </div>
        <Footer className="footer" />
      </Router>
    </GlobalState>
  );
}

export default App;
