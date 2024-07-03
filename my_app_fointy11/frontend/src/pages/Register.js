import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username: username,
        email: email,
        password: password
      });

      console.log(response.data);

      // Başarılı kayıt mesajını ekranda göster
      setMessage(response.data.message);

      // 2-3 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        window.location.href = '/login'; // veya istediğiniz login sayfasının URL'ini buraya yazın
      }, 2000); // 2 saniye
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

  return (
    <div>
      <div className="py-5">
        <h2>Register</h2>
        <p className="lead">Hesap Oluştur</p>
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
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                required
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-lg">Register</button>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {errors.server && <div className="alert alert-danger">{errors.server}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
