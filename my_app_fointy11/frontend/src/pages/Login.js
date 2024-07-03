import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                username: username,
                password: password
            });

            // Başarılı giriş mesajını ekranda göster
            setMessage(response.data.message);
            // Başarılı giriş durumunda ana sayfaya yönlendir
            setIsLoggedIn(true); // isLoggedIn durumunu güncelle
            localStorage.setItem('isLoggedIn', 'true'); // localStorage'a isLoggedIn durumunu kaydet
        } catch (error) {
            console.error('Error:', error);

            // Hata mesajını ekranda göster
            if (error.response && error.response.data && error.response.data.error) {
                setErrors({ server: error.response.data.error });
            } else {
                setErrors({ server: 'An error occurred. Please try again later.' });
            }
        }
    }

    const handleLogout = () => {
        // Logout işlemi için isLoggedIn durumunu güncelle
        setIsLoggedIn(false);
        // localStorage'dan isLoggedIn durumunu kaldır
        localStorage.removeItem('isLoggedIn');
        // Ana sayfaya yönlendir
        navigate('/');
    }

    useEffect(() => {
        // localStorage'daki isLoggedIn durumunu kontrol et ve güncelle
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    }, []);

    // Sayfa yenilendiğinde kontrol edilsin
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <div className="py-5">
                <h2>Login</h2>
                <p className="lead">Sign in to your account</p>
            </div>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="d-flex gap-3">
                            <button type="submit" className="btn btn-primary btn-lg">Login</button>
                            <div style={{ marginLeft: '20px' }}>
                                <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
                            </div>
                        </div>

                        {isLoggedIn && (
                            <div className="mb-3">
                                <button onClick={handleLogout} className="btn btn-danger btn-lg">Logout</button>
                            </div>
                        )}

                        {message && <div className="alert alert-success">{message}</div>}
                        {errors.server && <div className="alert alert-danger">{errors.server}</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
