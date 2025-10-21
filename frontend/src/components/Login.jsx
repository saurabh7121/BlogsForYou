import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// --- API Service ---
const API_URL = "https://blogsforyou-1.onrender.com/api/auth/";
const AuthService = {
  login: (email, password) => {
    return axios.post(API_URL + "login", { email, password });
  },
};

// --- Helper Icon Components for the theme ---
const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-3"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="google"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 488 512"
  >
    <path
      fill="currentColor"
      d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8S109.8 11.6 244 11.6c70.3 0 129.8 27.8 176.2 72.9l-63.1 61.9c-37-35.7-86.8-57.5-113.1-57.5-99.2 0-179.9 80.7-179.9 179.9s80.7 179.9 179.9 179.9c118.3 0 150.9-97.3 155.6-148.4H244v-79.2h239.2c4.7 26.9 7.8 56.2 7.8 88.1z"
    ></path>
  </svg>
);

// --- Themed Login Component ---
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;
  const backendUrl = "https://blogsforyou-1.onrender.com";

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { state: { fromAuth: true } });
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          "Login failed. Please check your credentials."
      );
    }
  };

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
            Site Access
          </p>

          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <p className="text-red-400 text-center bg-red-900/50 border border-red-500/50 py-2 rounded-md">
                {error}
              </p>
            )}
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
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-yellow-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-all transform hover:scale-105 font-construction tracking-wider"
            >
              Log In
            </button>
          </form>
          <div className="relative flex py-2 items-center">
            <div className="grow border-t border-gray-600"></div>
            <span className="shrink mx-4 text-gray-400 font-construction">
              OR
            </span>
            <div className="grow border-t border-gray-600"></div>
          </div>
          <a
            href={`${backendUrl}/api/google`}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-all transform hover:scale-105 font-construction tracking-wider"
          >
            <GoogleIcon />
            Continue with Google
          </a>
          <p className="text-sm text-center text-gray-400 pt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-yellow-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
