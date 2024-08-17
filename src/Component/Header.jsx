import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-black text-white">
      <nav className="p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl">
            <Link to="/" className="hover:text-gray-400">
              Elliptical Curve Calculator
            </Link>
          </h1>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
