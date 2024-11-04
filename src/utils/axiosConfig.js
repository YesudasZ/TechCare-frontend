import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://techcare.live",
  baseURL: "https://techcare-backend.onrender.com",
  withCredentials: true,
});

export default axiosInstance;


