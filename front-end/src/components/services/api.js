const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fetchAPI = async (endpoint, method, body = null, isAuth = false) => {
  const headers = { "Content-Type": "application/json" };

  if (isAuth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}/auth/${endpoint}`, { // 👈 Added "auth"
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");

    return data;
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};

export const signup = (formData) => fetchAPI("signup", "POST", formData);
export const login = (formData) => fetchAPI("login", "POST", formData);
