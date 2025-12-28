export const API = {
  async register(username, email, password) {
    await new Promise(r => setTimeout(r, 300));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username || u.email === email)) {
      throw new Error("Username or email already exists");
    }
    const user = { id: Date.now(), username, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    return user;
  },

  async login(email, password) {
    await new Promise(r => setTimeout(r, 300));
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    return user;
  },

  async uploadImage(userId, imageData, title, description) {
    await new Promise(r => setTimeout(r, 300));
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    const image = {
      id: Date.now(),
      userId,
      imageData,
      title,
      description,
      uploadedAt: new Date().toISOString()
    };
    images.push(image);
    localStorage.setItem("images", JSON.stringify(images));
    return image;
  },

  async getImages(userId = null) {
    await new Promise(r => setTimeout(r, 200));
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    return userId ? images.filter(i => i.userId === userId) : images;
  },

  async getUserByUsername(username) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(u => u.username === username);
  }
};

