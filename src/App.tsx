import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddCourse from './pages/admin/AddCourse';
import AddProject from './pages/admin/AddProject';
import AddBlog from './pages/admin/AddBlog';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Dashboard from './pages/admin/Dashboard';
import CourseLesson from './pages/CourseLesson';
import Courses from './pages/Courses';
import ViewProject from './pages/ViewProject';
import NotFound from './pages/NotFound';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminLoggedIn && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="course/:id" element={<CourseLesson />} />
          <Route path="project/:id" element={<ViewProject />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Dashboard isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/login" element={<Login setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
          <Route path="/admin/new-course" element={<AddCourse isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/admin/new-project" element={<AddProject isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />} />
          <Route path="/admin/new-blog" element={<AddBlog isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
