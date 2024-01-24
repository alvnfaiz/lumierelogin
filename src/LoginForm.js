import React, { useState, useRef } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email dan password tidak boleh kosong.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Format email tidak valid.');
      return;
    }

    emailRef.current.setAttribute('readonly', true);
    passwordRef.current.setAttribute('readonly', true);

    setLoading(true);

    // Simulasi submit data ke API POST
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Jika call API berhasil
        alert('Berhasil login');
        // Redirect ke halaman dashboard
        window.location.href = '/dashboard';
      } else {
        // Jika call API gagal
        setErrorMessage('Terdapat kesalahan pada email atau password.');
      }
    } catch (error) {
      setErrorMessage('Terjadi kesalahan pada server.');
    } finally {
      // Setelah submit, hilangkan readonly dan atur loading menjadi false setelah 2 detik
      setTimeout(() => {
        emailRef.current.removeAttribute('readonly');
        passwordRef.current.removeAttribute('readonly');
        setLoading(false);
      }, 2000);
    }
  };

  const validateEmail = (email) => {
    // Sederhana, hanya mengecek keberadaan '@'
    return email.includes('@');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            ref={emailRef}
            readOnly={loading}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            ref={passwordRef}
            readOnly={loading}
          />
          <button type="button" onClick={handleTogglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;