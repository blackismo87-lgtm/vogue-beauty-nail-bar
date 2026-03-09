import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import PromotionPage from './pages/PromotionPage';
import ShopPage from './pages/ShopPage';
import { ThemeProvider } from './components/ThemeContext';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/promotions" element={<PromotionPage />} />
              <Route path="/shop" element={<ShopPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
