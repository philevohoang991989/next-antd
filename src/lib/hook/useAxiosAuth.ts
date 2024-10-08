import { signOut, useSession } from "next-auth/react";
// import { ApiAuth } from "../axios";
import axios from "axios";
import { notification } from "antd";

const useApiAuth = () => {
  const { data: session } = useSession();

  const ApiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  ApiAuth.interceptors.request.use(
    (config) => {
      if (session?.token) {
        config.headers["Authorization"] = `Bearer ${session.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  ApiAuth.interceptors.response.use(
    (response) => {
      // Handle successful responses globally if needed
      return response;
    },
    async (error) => {
      // Handle errors globally if needed
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        prevRequest.headers["Authorization"] = `Bearer ${session?.token}`;

        notification.open({
          message: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          duration: null,
        });

        signOut();
        return ApiAuth(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return ApiAuth;
};

export default useApiAuth;
