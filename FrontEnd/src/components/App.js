import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          {/* /* <Route path="/Predict" element={<Predict />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
