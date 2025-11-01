import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { serverurl } from "../contants";

// ✅ Define public or auth routes (no refresh needed)
const PUBLIC_ROUTES = [
  "/authentication/login",
  "/authentication/register",
  "/public",
  "/health",
];

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: serverurl,
  withCredentials: true, // crucial for cookie-based auth
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Token refresh function
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${serverurl}/user/refreshtoken`,
      {}, // Empty body, refresh token is sent via cookie
      { withCredentials: true }
    );
    console.log("✅ Access token refreshed successfully");
    return response.data; // optional — cookies updated automatically
  } catch (error) {
    console.error("❌ Token refresh failed:", error);
    throw error;
  }
};

// ✅ Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // No manual token attachment — cookies handle that
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const isPublic = PUBLIC_ROUTES.some((route) =>
      originalRequest.url?.includes(route)
    );

    // Skip refresh for public/auth routes
    if (isPublic) {
      return Promise.reject(error);
    }

    // Handle 401 unauthorized — try refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken(); // 🍪 backend sets new cookie
        return axiosInstance(originalRequest); // 🔁 retry original request
      } catch (refreshError) {
        console.error("Refresh token failed, redirecting to login...");
        window.location.href = "/authentication/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
