const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API = {
  async register(username, email, password) {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    localStorage.setItem('token', data.token);
    return data;
  },

  async uploadImage(imageData, title, description = '') {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${API_URL}/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageData, title, description }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getImages() {
    const res = await fetch(`${API_URL}/images`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async getUserByUsername(username) {
    const res = await fetch(`${API_URL}/users/${username}`);
    if (res.status === 404) return null;
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },
};