import React, { useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';

export default function PostAssignmentModal({ isOpen, onOpenChange, teacherToken, onAssignmentPosted }) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    deadline: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/assignments', formData, {
        headers: { Authorization: `Bearer ${teacherToken}` }
      });
      setLoading(false);
      onOpenChange(false);
      setFormData({ title: '', subject: '', deadline: '', description: '' });
      if (onAssignmentPosted) onAssignmentPosted();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to post assignment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full p-6 rounded-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Post Assignment</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-red-600">{error}</p>}
          <input
            name="title"
            placeholder="Assignment Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
