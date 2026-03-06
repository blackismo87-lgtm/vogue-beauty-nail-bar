import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import RegistrationPage from './pages/RegistrationPage';
import AppointmentsPage from './pages/AppointmentsPage';
import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
