import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://techcare.live",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    // Ensure the 'Origin' header is set correctly
    config.headers = {
      ...config.headers,
      'Origin': window.location.origin
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;


