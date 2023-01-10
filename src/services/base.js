import axios from "axios";
import httpStatus from "http-status";

export const handleError = (error) => {
  const { response, message } = error;
  if (response) {
    return response;
  }
  return message;
};

export const createInstance = (path) => {
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_KHKT_PUBLISH}${path}`,
  });

  instance.interceptors.request.use((request) => request);

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === httpStatus.UNAUTHORIZED &&
        !originalRequest._retry
      ) {
        // not working well
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
