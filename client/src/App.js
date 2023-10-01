import React from 'react';
import './css/styles.css';
import './css/pagenav.css';
import './css/basics.css';
import "./css/components.css";

import socketIO from 'socket.io-client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './js/Home';
import Application from './js/Application';

const socket = socketIO.connect('http://localhost:4000');


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
