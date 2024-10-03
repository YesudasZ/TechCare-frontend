import axios from "axios";
import { store } from '../store/store';
import { setUser, logout } from '../store/authSlice';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const state = store.getState();
//     const user = state.user?.user;

//     if (user && user.accessToken) {
//       config.headers['Authorization'] = `Bearer ${user.accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axiosInstance.post('/auth/refreshToken');
//         store.dispatch(setUser(data.user));

//         originalRequest.headers['Authorization'] = `Bearer ${data.user.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         store.dispatch(logout());
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;


