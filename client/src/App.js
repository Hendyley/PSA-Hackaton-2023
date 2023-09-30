import React from 'react';
import './css/styles.css';
import './css/pagenav.css';
import './css/basics.css';
import "./css/components.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './js/Home';
import Application from './js/Application';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/app' element={<Application />} />
      </Routes>
    </Router>
  );
}

export default App;
