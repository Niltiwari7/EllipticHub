import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white dark:bg-black text-black dark:text-white">
      <nav className="w-full p-6 flex justify-between items-center">
        <div className="flex-grow flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-3xl whitespace-wrap">
            <Link to="/" className="hover:text-gray-400 ">
              Elliptic  
            </Link>
            <span>Hub</span>
          </h1>
          <ul className="flex gap-5 items-center px-4 sm:p-0">
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
            <li>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 hidden md:block"
              >
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
