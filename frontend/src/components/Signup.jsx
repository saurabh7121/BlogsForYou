import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --- API Service ---
const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/auth/";
const AuthService = {
  signup: (userData) => {
    return axios.post(API_URL + "signup", userData);
  },
};

// --- Helper Icon Components for the theme ---
const PenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

// --- Themed Signup Component ---
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await AuthService.signup(formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { state: { fromAuth: true } });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An error occurred during signup. Please try again.");
      }
      console.error(err);
    }
  };

  // SVG Data URIs for background elements
  const bookSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'%3E%3C/path%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'%3E%3C/path%3E%3C/svg%3E")`;
  const penSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 24 24' fill='none' stroke='%234a5568' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22l-8.5-8.5c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.5-1 4-2 5.5L12 22z'%3E%3C/path%3E%3Cpath d='M12 10v4'%3E%3C/path%3E%3C/svg%3E")`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&display=swap');
        .font-construction { font-family: 'Chakra Petch', sans-serif; }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideInUp { animation: slideInUp 0.7s ease-out forwards; }
        @keyframes blueprint-scroll { 0% { background-position: 0 0, 10vw 15vh, 85vw 70vh; } 100% { background-position: 50px 50px, 10vw 15vh, 85vw 70vh; } }
        .animated-background {
          background-color: #1a202c;
          background-image: 
            linear-gradient(rgba(55, 65, 81, 0.4) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(55, 65, 81, 0.4) 1px, transparent 1px),
            ${bookSvg},
            ${penSvg};
          background-size: 50px 50px, 50px 50px, 150px, 120px;
          background-repeat: repeat, repeat, no-repeat, no-repeat;
          background-position: 0 0, 0 0, 10vw 15vh, 85vw 70vh;
          animation: blueprint-scroll 2s linear infinite;
        }
      `}</style>
      <div className="flex items-center justify-center min-h-screen p-4 animated-background overflow-hidden">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-dashed border-yellow-500 text-center animate-slideInUp">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-gray-100">
            Blogs
            <span className="text-yellow-400 italic font-normal">ForYou</span>
          </h1>
          <p className="font-construction text-gray-400 -mt-4 uppercase tracking-widest">
            Account Creation
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <p className="text-red-400 text-center bg-red-900/50 border border-red-500/50 py-2 rounded-md">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-yellow-300 font-construction text-left">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                required
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-300 font-construction text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-yellow-300 font-construction text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-all transform hover:scale-105 font-construction tracking-wider"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm text-center text-gray-400 pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-yellow-400 hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
