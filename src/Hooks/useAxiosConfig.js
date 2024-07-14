import axios from "axios";
import { useMemo } from "react";
import useAuthContext from "./useAuthContext.js";

const useAxiosConfig = () => {
  const { dispatch } = useAuthContext();

  const axiosConfig = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");

        if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          dispatch({ type: "LOGOUT" });
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [dispatch]);

  return axiosConfig;
};

export default useAxiosConfig;

