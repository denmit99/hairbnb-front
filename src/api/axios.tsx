import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../context/AuthContext";
import { getCookie, setCookie } from "../utils/cookieUtils";
import { COOKIE_NAMES } from "../constants/cookies";

const LOGIN_URL = "/auth/login";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

const refreshAxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

function AxiosInterceptor({ children }: any) {
  const [isSet, setIsSet] = useState(false);
  const { user, setUser, removeUser } = useContext(
    AuthContext
  ) as AuthContextType;

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        console.log("Request interceptor start");
        //If the header is manually set, we don't need to overwrite it
        if (!request.headers["Content-Type"]) {
          request.headers["Content-Type"] = "application/json";
        }

        const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
        console.log(`Value of access token is ${token}`);
        if (token) {
          request.headers["Authorization"] = "Bearer " + token;
        }
        console.log(`Request: ${JSON.stringify(request)}`);
        console.log("Request interceptor finish");
        return request;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      //On Success
      (response: AxiosResponse) => {
        console.log(`Response: ${JSON.stringify(response)}`);
        return response;
      },
      //On Fail
      async (error: AxiosError) => {
        console.log(`Request failed with status ${error.response?.status}`);
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("Attempt to refresh token");
            const refreshResponse = await refreshAxiosInstance.post(
              "/auth/refresh",
              {},
              { withCredentials: true }
            );
            const newAccessToken = refreshResponse.data.accessToken;
            setCookie(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken);
            originalRequest.headers["Authorization"] =
              "Bearer " + newAccessToken;
            console.log("Attempt to refresh token: SUCCESSFUL");
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            console.log("Attempt to refresh token: FAILED. Log out user");
            removeUser();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    setIsSet(true);
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  return isSet && children;
}

export default axiosInstance;
export { AxiosInterceptor };
