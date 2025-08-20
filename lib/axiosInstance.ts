import axios from "axios";
import * as cookie from "cookie";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Parse cookies from document.cookie (client-side)
    const cookies = cookie.parse(
      typeof document !== "undefined" ? document.cookie : ""
    );
    const token = cookies.token;

    // Exclude Authorization header for login requests
    if (token && !config.url?.includes("login")) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove cookies on client-side
      if (typeof document !== "undefined") {
        document.cookie = "token=; max-age=0";
        document.cookie = "authUser=; max-age=0";
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
