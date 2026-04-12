import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api",
});

// 🔥 REFRESH TOKEN FUNCTION
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token");

    const res = await fetch(
      "http://localhost:8080/realms/Crises-app/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: "spring-client",
          refresh_token: refreshToken,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error("Refresh failed");

    // ✅ update tokens
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);

    return data.access_token;

  } catch (err) {
    console.error("Refresh error:", err);
    return null;
  }
};

// 🔥 REQUEST INTERCEPTOR (TOKEN ADD)
API.interceptors.request.use((config) => {
  let token = localStorage.getItem("accessToken");

  if (token) {
    token = token.replace(/^Bearer\s+/i, "");
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 RESPONSE INTERCEPTOR (AUTO REFRESH)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/token")
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        if (!newToken) {
          throw new Error("No new token");
        }

        // 🔥 update header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // 🔁 retry request
        return API(originalRequest);

      } catch (err) {
        console.error("Session expired. Logging out...");

        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;