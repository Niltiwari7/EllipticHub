import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import AdditionOfTwoPoint from './AdditionOfTwoPoint';
import KP_of_elliptical_curve from './KP_of_elliptical_curve';
import TorsionPoint from './TorsionPoint';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen w-[100%]">
        <Header />
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar} className="text-3xl focus:outline-none">
            &#9776;
          </button>
        </div>

        <div className="flex flex-grow">
          {/* Sidebar */}
          <div
            className={`fixed inset-0 md:static md:flex md:flex-col md:w-1/4 bg-gray-100 p-4 transition-transform duration-300 z-50 ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0`}
          >
            <Sidebar closeSidebar={closeSidebar} />
          </div>

          <div className="flex-grow md:ml-1/4 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
               
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/AdditionOfTwoPoint" element={<AdditionOfTwoPoint />} />
              <Route path="/KP_of_elliptical_curve" element={<KP_of_elliptical_curve />} />
              <Route path="/TorsionPoint" element={<TorsionPoint />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
