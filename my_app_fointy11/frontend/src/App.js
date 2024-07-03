import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Services from './pages/Services';
import Header from './components/Header';
import Footer from './components/Footer';
import Client from './pages/Client';
import WhatWeDo from './pages/WhatWeDo';
import Login from './pages/Login';
import AdminPanel from './pages/admin/Admin';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    useEffect(() => {
        // localStorage'daki oturum durumu bilgisini kontrol et ve güncelle
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/whatwedo"
                    element={isLoggedIn ? <WhatWeDo /> : <Navigate to="/login" />}
                />
                <Route
                    path="/about"
                    element={isLoggedIn ? <About /> : <Navigate to="/login" />}
                />
                <Route
                    path="/services"
                    element={isLoggedIn ? <Services /> : <Navigate to="/login" />}
                />
                <Route
                    path="/contact"
                    element={isLoggedIn ? <Contact /> : <Navigate to="/login" />}
                />
                <Route
                    path="/client"
                    element={isLoggedIn ? <Client /> : <Navigate to="/login" />}
                />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/admin"
                    element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />}
                />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
