import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// You can import future functional app routes here
// import Dashboard from './pages/Dashboard';
// import ReportItem from './pages/ReportItem';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Set our premium editorial landing page as the root path */}
        <Route path="/" element={<Home />} />
        

      </Routes>
    </Router>
  );
}