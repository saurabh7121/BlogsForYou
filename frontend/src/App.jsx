import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import AuthService from "./api/auth.js";
import Dashboard from "./components/Dashboard.jsx";
import Blogs from "./components/Blogs.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("PrivateRoute: Token found?", !!token); // Log token presence
  return token ? children : <Navigate to="/login" />;
};

// --- Main App Component ---
// This component manages the routing for the entire application.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <PrivateRoute>
              <Blogs />
            </PrivateRoute>
          }
        />
        {/* Default route redirects based on authentication status */}
        <Route
          path="*"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/dashboard" />
            ) : (
              (console.log(
                "Default Route: No token found, redirecting to login."
              ),
              (<Navigate to="/login" />))
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
