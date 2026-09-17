import axios from "axios";
import { refreshToken } from "./AuthService";

const axiosClient = axios.create({
  baseURL: "https://ban-hang-production.up.railway.app",
});

// Dùng để đảm bảo tại một thời điểm
// chỉ có 1 request refresh token
let refreshPromise = null;

// =========================
// REQUEST INTERCEPTOR
// =========================
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Không phải 401
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Request này đã thử refresh rồi
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Lấy refresh token hiện tại
      const refresh = localStorage.getItem("refreshToken");

      if (!refresh) {
        throw new Error("Không có refresh token");
      }

      /*
       * QUAN TRỌNG:
       * Nếu đang có một request refresh chạy,
       * các request khác sẽ dùng chung request đó.
       */
      if (!refreshPromise) {
        refreshPromise = refreshToken(refresh)
          .then((response) => {
            const newAccessToken = response.data.data.accessToken;

            const newRefreshToken = response.data.data.refreshToken;

            // Cập nhật token mới
            localStorage.setItem("token", newAccessToken);

            localStorage.setItem("refreshToken", newRefreshToken);

            return newAccessToken;
          })
          .finally(() => {
            // Refresh xong thì cho phép
            // lần sau refresh tiếp
            refreshPromise = null;
          });
      }

      // Nếu refresh đang chạy thì chờ nó
      const newAccessToken = await refreshPromise;

      // Gắn access token mới vào request cũ
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Gửi lại request cũ
      return axiosClient(originalRequest);
    } catch (refreshError) {
      console.log("Refresh token thất bại:", refreshError);

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      // Lấy đường dẫn trang hiện tại
      const currentPath = window.location.pathname;

      // Nếu đang ở trang quản trị
      if (
        currentPath.startsWith("/listorder") ||
        currentPath.startsWith("/dashboard") ||
        currentPath.startsWith("/users") ||
        currentPath.startsWith("/products") ||
        currentPath.startsWith("/categorys") ||
        currentPath.startsWith("/index") ||
        currentPath.startsWith("/box")
      ) {
        window.location.href = "/login";
      } else {
        // Nếu đang ở trang người dùng
        window.location.href = "/loginWeb";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default axiosClient;
