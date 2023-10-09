import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'
const Sidebar = () => {
  return (
    <nav className="sidebar bg-gray-200 p-4">
      <ul className="list-none p-0">
        <li className="mb-4">
          <Link to="/" className="text-xl text-black font-serif block hover:text-gray-400 cursor-pointer">
            Solution of Elliptical Curve
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/AdditionOfTwoPoint" className="text-xl text-black font-serif block hover:text-gray-400 cursor-pointer">
            Addition of Two Points on Elliptical Curve
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/KP_of_elliptical_curve" className="text-xl text-black font-serif block hover:text-gray-400 cursor-pointer">
            Find K*P on Elliptical Curve
          </Link>
        </li>
        <li>
          <Link to="/TorsionPoint" className="text-xl text-black font-serif block hover:text-gray-400 cursor-pointer">
            Finding the Torsion Point
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;