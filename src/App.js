import React from "react";
import {Routes, Route  } from 'react-router-dom';
import MainApp from "./MainApp";
import PrivacyPolicy from "./PrivacyPolicy";
import NavBar from "./components/NavBar";
import "./App.css";
import "./styles/Global.css";
import "rsuite/dist/styles/rsuite-default.css";

function App() {
  return (
    <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<div> 404 </div>} />
          </Routes>
      {/* <NavBar></NavBar>
      <div id="content">
        <Intro></Intro>
        <About></About>
        <Experience></Experience>
        <Projects></Projects>
        <Credits></Credits>
      </div> */}
    </div>
  );
}

export default App;
