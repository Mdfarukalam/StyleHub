
import storageService from "./storageService";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = (endpoint, method, payload = null) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, `${BASE_URL}${endpoint}`);

    const token = storageService.getToken();

    if (!(payload instanceof FormData) && payload !== null) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    xhr.onload = () => {
      let data = {};

      try {
        data = JSON.parse(xhr.responseText || "{}");
      } catch {
        data = {};
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
      } else {
        reject(new Error(data.message || "API request failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network Error"));

    xhr.send(
      payload === null
        ? null
        : payload instanceof FormData
          ? payload
          : JSON.stringify(payload)
    );
  });
};




// POST
export const POST = (endpoint, payload) =>
  request(endpoint, "POST", payload);

// GET
export const GET = (endpoint) =>
  request(endpoint, "GET");

// PUT
export const PUT = (endpoint, payload = {}) => {
  const { id, ...body } = payload;

  const query = new URLSearchParams({ id }).toString();

  return request(`${endpoint}?${query}`, "PUT", body);
};

// DELETE
export const DELETE = (endpoint, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`${endpoint}?${query}`, "DELETE");
};

// Export all
const apiService = { POST, GET, PUT, DELETE };

export default apiService;
