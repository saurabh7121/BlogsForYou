import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// --- Placeholder for ProfileUpdate Component (Themed) ---
const ProfileUpdate = ({ userData, onUpdateSuccess, onCancel }) => {
  const [username, setUsername] = useState(userData.username || "");
  const [email, setEmail] = useState(userData.email || "");

  const handleUpdate = () => {
    // This is a dummy update. In a real scenario, you would make an API call.
    const updatedUser = { ...userData, username: username, email: email };
    onUpdateSuccess(updatedUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-2xl border-4 border-dashed border-yellow-500 text-center animate-slideInUp">
        <h2 className="text-2xl font-construction uppercase tracking-widest text-yellow-400">
          Update Profile
        </h2>
        <div className="text-left">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-yellow-300 font-construction"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-yellow-500/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div className="text-left">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-yellow-300 font-construction"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full bg-gray-700 border border-yellow-500/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
          />
        </div>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 font-semibold text-gray-200 bg-gray-600 rounded-md hover:bg-gray-500 transition-all font-construction"
          >
            CANCEL
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 transition-all font-construction"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

// --- API Service ---
const API_URL = "https://blogsforyou-1.onrender.com/api";

const AuthService = {
  getUserData: (token) => {
    return axios.get(`${API_URL}/protected/user`, {
      headers: { "x-auth-token": token },
    });
  },
  deleteAccount: (token) => {
    return axios.delete(`${API_URL}/auth/delete-account`, {
      headers: { "x-auth-token": token },
    });
  },
};

// --- Helper Icon Components ---
const LoadingIcon = () => (
  <svg
    className="animate-spin h-10 w-10 text-yellow-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400 mb-4"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// --- Dashboard Component ---
const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await AuthService.getUserData(token);
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("SESSION EXPIRED. Please log in again.");
        if (!localStorage.getItem("token")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (state && state.fromAuth) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate(location.pathname, { replace: true, state: {} });
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
    }
  }, [state, navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is permanent."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        await AuthService.deleteAccount(token);
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  const handleUpdateProfile = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleProfileUpdateSuccess = (updatedUser) => {
    setUserData(updatedUser);
    setShowUpdateModal(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 animated-background">
        <LoadingIcon />
        <p className="text-yellow-400 font-construction text-2xl mt-4">
          LOADING SITE DATA...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 animated-background">
        <div className="w-full max-w-md p-8 space-y-4 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-dashed border-yellow-500 text-center animate-slideInUp">
          <ErrorIcon />
          <h2 className="text-2xl font-construction text-yellow-400">
            SYSTEM ALERT
          </h2>
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&display=swap');
        .font-construction { font-family: 'Chakra Petch', sans-serif; }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideInUp { animation: slideInUp 0.7s ease-out forwards; }
        @keyframes blueprint-scroll { 0% { background-position: 0 0; } 100% { background-position: 50px 50px; } }
        .animated-background {
          background-color: #1a202c;
          background-image: linear-gradient(rgba(55, 65, 81, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(55, 65, 81, 0.4) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: blueprint-scroll 2s linear infinite;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
      `}</style>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 p-4 pt-20 overflow-hidden animated-background">
        {showSuccess && (
          <div className="absolute top-5 bg-yellow-900/50 border border-yellow-600/50 text-yellow-300 py-3 px-6 rounded-lg shadow-lg text-center animate-slideInUp">
            <p className="font-bold text-lg font-construction">
              ACCESS GRANTED
            </p>
            <p>You have successfully signed in.</p>
          </div>
        )}

        <div className="absolute top-4 right-4 animate-fadeIn">
          <button
            onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            className="text-yellow-400 hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 rounded-md p-2 transition-colors duration-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          {showHamburgerMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-yellow-500 animate-fadeIn">
              {["Update Profile", "Delete Account", "Logout"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Update Profile") handleUpdateProfile();
                    if (item === "Delete Account") handleDeleteAccount();
                    if (item === "Logout") handleLogout();
                    setShowHamburgerMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-yellow-300 hover:bg-yellow-900/50 hover:text-yellow-100 font-construction tracking-wider"
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-dashed border-yellow-500 text-center animate-slideInUp">
          <h1 className="text-4xl font-bold font-serif tracking-tight text-gray-100">
            Blogs
            <span className="text-yellow-400 italic font-normal">ForYou</span>
          </h1>

          <div className="h-4 bg-repeat-x bg-size-[40px_40px] bg-linear-to-r from-yellow-400 from-50% to-gray-800 to-50% my-8! -rotate-3 scale-110"></div>

          {userData && (
            <div className="text-left bg-gray-800/50 p-6 rounded-lg space-y-4 shadow-inner border border-yellow-500/50 animate-fadeIn">
              <p className="text-lg">
                <span className="font-semibold text-yellow-400 font-construction">
                  ID:
                </span>{" "}
                {userData?.userId || "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-yellow-400 font-construction">
                  USER:
                </span>{" "}
                {userData?.username || "N/A"}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-yellow-400 font-construction">
                  EMAIL:
                </span>{" "}
                {userData?.email || "N/A"}
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/blogs")}
            className="mt-6 inline-block px-8 py-3 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg font-construction tracking-wider"
          >
            ACCESS BLOGS SITE
          </button>
        </div>

        {showUpdateModal && userData && (
          <ProfileUpdate
            userData={userData}
            onUpdateSuccess={handleProfileUpdateSuccess}
            onCancel={handleCloseUpdateModal}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
