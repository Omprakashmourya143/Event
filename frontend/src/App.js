import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import EventBooking from './pages/EventBooking';
import BookingPage from "./pages/BookingPage";
import UserBookingsPage from './pages/UserBookingsPage';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/events/:eventId" element={<EventBooking />} />
            <Route path="/book/:eventId" element={<BookingPage />} />
            <Route path="/user/bookings" element={<UserBookingsPage />} />
        <Route path="/" element={<EventDetail />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
