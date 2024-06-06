import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../dashboard/AuthContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="">
            <Link
              to="/"
              className="flex items-center text-black font-bold text-4xl"
            >
              {/* <span className="text-black">Conference</span>
              <span className="text-lime-600">Hub</span> */}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-black hover:text-lime-600 px-3 py-2 rounded-md text-m font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-black hover:text-lime-600 px-3 py-2 rounded-md text-m font-medium"
              >
                About
              </Link>
              <Link
                to="/conferences"
                className="text-black hover:text-lime-600 px-3 py-2 rounded-md text-m font-medium"
              >
                Conferences
              </Link>
              <Link
                to="/reports"
                className="text-black hover:text-lime-600 px-3 py-2 rounded-md text-m font-medium"
              >
               Reports
              </Link>
              <Link
                to="/admin"
                className="text-black hover:text-lime-600 px-3 py-2 rounded-md text-m font-medium"
              >
               Dashboard
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              {!Boolean(user) ? (
                <>
                  <Link
                    to="/signup"
                    className="text-white bg-lime-600 hover:bg-lime-700 px-4 py-2 rounded-md text-m font-medium mr-2"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-lime-600 hover:text-lime-700 border border-lime-600 hover:border-lime-700 px-4 py-2 rounded-md text-m font-medium"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button onClick={() => logout()} className="text-lime-600 hover:text-white border border-lime-600 hover:bg-lime-700 px-4 py-2 rounded-md text-m font-medium">
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-red-600 hover:text-black focus:outline-none focus:text-black"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/conferences"
                className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Conferences
              </Link>
              <Link
                to="/reports"
                className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Reports
              </Link>
              <Link
                to="/admin"
                className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Dashboard
              </Link>
              {!Boolean(user) ? (
                <>
                  <Link
                    to="/signup"
                    className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Signup
                  </Link>
                  <Link
                    to="/login"
                    className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <button onClick={() => logout()} className="text-black hover:text-lime-600 block px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
