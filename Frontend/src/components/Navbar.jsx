import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-red-600">
      <div className="container mx-auto flex items-center justify-between p-4">
       
        <h1 className="text-white text-lg font-bold">Boardify</h1>

        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <nav className="hidden md:flex space-x-10">
          <Link to="/guestadminlogin" className="text-white hover:underline">
            Guest Admin
          </Link>
          <Link to="/mainadminlogin" className="text-white hover:underline">
            Main Admin
          </Link>
          <Link to="/" className="text-white hover:underline">
            Guest Login
          </Link>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-red-700">
          <Link
            to="/guestadminlogin"
            className="text-white py-2 hover:underline"
            onClick={() => setIsMenuOpen(false)} 
          >
            Guest Admin
          </Link>
          <Link
            to="//mainadminlogin"
            className="text-white py-2 hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Main Admin
          </Link>
          <Link
            to="/"
            className="text-white py-2 hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Guest Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
