import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

export default function Signup({ setActivePage }) {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log("url",process.env.NEXT_PUBLIC_API_BASE_URL)
    try {
      await axiosInstance.post('/auth/register', formData);
      setLoading(false);
      setActivePage('login'); // Switch to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-12">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:outline-none focus:ring"
          required
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}
