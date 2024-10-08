import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://techcare.live",
  withCredentials: true,
});

export default axiosInstance;


