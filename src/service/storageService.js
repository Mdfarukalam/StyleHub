
const storageService = {

  // Global Local Storage
  set: (key, value) =>
    localStorage.setItem(key, JSON.stringify(value)),

  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove: (key) => localStorage.removeItem(key),

  clear: () => localStorage.clear(),

  // Token Management
  setToken: (token) =>
    localStorage.setItem("token", token),

  getToken: () =>
    localStorage.getItem("token"),

  removeToken: () =>
    localStorage.removeItem("token"),

  // User Data
  setUser: (user) =>
    localStorage.setItem("user", JSON.stringify(user)),

  getUser: () => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  },

  removeUser: () =>
    localStorage.removeItem("user"),

};

export default storageService;
