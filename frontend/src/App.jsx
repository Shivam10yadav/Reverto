import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Allitems from "./pages/Allitems";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/reportLost";
import ReportFound from "./pages/reportFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LostItemDetails from "./pages/lostItemDetail";
import ScrollToTop from "./components/scrollToTop";
import { useAuth } from "./context/authContext";
import ClaimItem from "./pages/ClaimItem";
import FoundItemDetail from "./pages/foundItemDetail";
import NotFound from "./pages/NotFoundPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerificationPage from "./pages/VerificationPage";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/home" element={<Allitems />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-lost"
          element={
            <ProtectedRoute>
              <ReportLost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-found"
          element={
            <ProtectedRoute>
              <ReportFound />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lost/:id"
          element={
            <ProtectedRoute>
              <LostItemDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claim/:id"
          element={
            <ProtectedRoute>
              <ClaimItem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/found/:id"
          element={
            <ProtectedRoute>
              <FoundItemDetail />
            </ProtectedRoute>
          }
        />
        <Route
  path="/verification/:id"
  element={
    <ProtectedRoute>
      <VerificationPage />
    </ProtectedRoute>
  }
/>

        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </Router>
  );
}
