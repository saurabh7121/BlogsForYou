import React from "react";
import { Link } from "react-router-dom";

// SVG Icon for the construction theme
const ConstructionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400 mx-auto"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="m9.5 9.5 5 5"></path>
    <path d="m14.5 9.5-5 5"></path>
  </svg>
);

const Blogs = () => {
  return (
    <>
      {/* Google Font and CSS for animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700&display=swap');

        .font-construction {
          font-family: 'Chakra Petch', sans-serif;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.7s ease-out forwards;
        }

        @keyframes blueprint-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }

        .animated-background {
          background-color: #1a202c; /* bg-gray-800 */
          background-image:
            linear-gradient(rgba(55, 65, 81, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(55, 65, 81, 0.4) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: blueprint-scroll 2s linear infinite;
        }

        @keyframes blink {
          50% { opacity: 0.5; }
        }
        .animate-blink {
          animation: blink 1.5s infinite step-end;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-300 p-4 overflow-hidden animated-background">
        <div className="w-full max-w-lg p-8 md:p-12 space-y-6 bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-2xl border-4 border-dashed border-yellow-500 text-center animate-slideInUp">
          {/* Header Section */}
          <div className="space-y-4">
            <ConstructionIcon />
            <h1 className="text-4xl md:text-5xl font-construction uppercase tracking-widest text-yellow-400 flex items-center justify-center gap-3">
              Under Construction
              <span className="w-4 h-4 bg-red-500 rounded-full animate-blink"></span>
            </h1>
          </div>

          {/* Logo remains */}
          <h2 className="text-2xl font-bold font-serif tracking-tight text-gray-100">
                Blogs<span className="text-yellow-400 italic font-normal">ForYou</span>
            </h2>

          <p className="text-lg text-gray-400 mt-4">
            check back soon for amazing content!
          </p>

          {/* Yellow and Black Warning Stripes */}
          <div className="h-4 bg-repeat-x bg-size-[40px_40px] bg-linear-to-r from-yellow-400 from-50% to-gray-800 to-50% my-8! -rotate-3 scale-110"></div>

          <Link
            to="/dashboard"
            className="mt-6 inline-block px-8 py-3 font-semibold text-gray-900 bg-yellow-400 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Return to Safety (Dashboard)
          </Link>
        </div>
      </div>
    </>
  );
};

export default Blogs;
