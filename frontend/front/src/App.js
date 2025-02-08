import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './component/pages/home'; // Updated import path
import StudentDashboard from './component/student/studentDashboard';
// import NotFound from './components/pages/NotFound'; // Added a 404 page

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Homepage />} />
        <Route path="StudentDashboard" element={<StudentDashboard />} />
        {/* 404 Page - Catch-all route for invalid paths */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;