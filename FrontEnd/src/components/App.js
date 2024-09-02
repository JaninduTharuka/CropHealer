import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Home from './Home';
import Predict from './Predict';
import Result from './Result';
import Instructions from './Instructions';
import Report from './Report';
import ReportList from './ReportList';

import NotFound from './NotFound';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
          <Route path="/:userId/Predict" element={<Predict />} />
          <Route path="/:userId/result/:pType/:disease" element={<Result />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/:userId/:pType/:disease/report" element={<Report />} />
          <Route path="/:userId/reports" element={<ReportList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
