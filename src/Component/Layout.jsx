import React from 'react';
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
  return (
    <Router>
      <div className="flex flex-col h-screen md:flex  w-screen">
        <Header />
        <div className="flex flex-grow  md:flex w-screen">
          <Sidebar />
          <div className="flex-grow ">
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