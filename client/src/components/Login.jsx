import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

export default function Login({ setUser, setActivePage }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log("url",process.env.NEXT_PUBLIC_API_BASE_URL)
    try {
      const res = await axiosInstance.post('/auth/login', formData);
      const token = res.data.token;
      // Save token & user info
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1])); // decode JWT payload
      setUser({ token, username: payload.username, role: payload.role, userId: payload.userId });
      setLoading(false);
      setActivePage('assignments'); // redirect on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
