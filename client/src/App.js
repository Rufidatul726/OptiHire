import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Popup from "./pages/Popup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className='display-block bg-gray-100 min-h-screen w-full'>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<Popup />} /> */}
        </Routes>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
