
import { Routes, Route, redirect, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./components/routes/home/home.component"
import TeacherRoutes from './components/routes/teacher/teacherroutes.component';
import StudentRoutes from './components/routes/student/studentroutes.component';
import AboutUs from './components/routes/aboutus/aboutus.component';
import NotFound from './components/routes/pagenotfound/notfound.component';
import GoogleLogin from './components/googlelogin/googlelogin.component';


function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="aboutus" element={<AboutUs />} />
      <Route path="teacher/:uid/*" element={<TeacherRoutes />} />
      <Route path='student/:uid/*' element={<StudentRoutes />} />
      <Route path="/:path" element={<NotFound />} />
      <Route path="/*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
