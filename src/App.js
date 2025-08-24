import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TimeSelector from './components/TimeSelector';
import Timer from './components/Timer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TimeSelector />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </div>
  );
}

export default App;
