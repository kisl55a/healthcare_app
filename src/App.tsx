import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotificationsPage from './pages/NotificationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" Component={NotificationsPage}  />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;
