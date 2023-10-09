import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="bg-gray-800 text-white p-6  flex justify-between w-screen items-center md:w-[100vw] ">
        <div className="container mx-auto">
          <h1 className="text-3xl">
            <Link to="/" className="hover:text-gray-400">
              Elliptical Curve Calculator
            </Link>
          </h1>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400 text-lg">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400 text-lg">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400 text-lg">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
