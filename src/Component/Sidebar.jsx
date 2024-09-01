import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ closeSidebar }) => {
  return (
    <nav className="flex flex-col ">
      {/* Close Button for Sidebar */}
      <button
        onClick={closeSidebar}
        className="self-end p-2 text-xl focus:outline-none sm:hidden "
      >
        &times;
      </button>
      
      {/* Sidebar Links */}
       <Link
        to="/"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
       Solution of Elliptical curve
      </Link>
      {/*
      <Link
        to="/about"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
        About
      </Link>
      <Link
        to="/contact"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
        Contact
      </Link> */}
      <Link
        to="/AdditionOfTwoPoint"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
        Addition of Two Points
      </Link>
      <Link
        to="/KP_of_elliptical_curve"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
        KP of Elliptical Curve
      </Link>
      <Link
        to="/TorsionPoint"
        className="p-2 hover:bg-gray-300 focus:outline-none"
        onClick={closeSidebar}
      >
        Torsion Point
      </Link>
    </nav>
  );
};

export default Sidebar;
