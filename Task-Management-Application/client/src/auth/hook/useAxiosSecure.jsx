import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

const useAxiosSecure = () => {

  const navigate = useNavigate();
  const { logOut } = useAuth();

  // interceptors request
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    // console.log("Access Token:", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // interseptors responce
  axiosSecure.interceptors.response.use(function (responce) {
    return responce;
  }, async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      await logOut();
      navigate('/login');
    }
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;