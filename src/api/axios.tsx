import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext, AuthContextType } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

function AxiosInterceptor({ children }: any) {
  const [cookies, setCookie] = useCookies(["jwt-auth"]);
  const [isSet, setIsSet] = useState(false);
  const { user, setUser, removeUser } = useContext(
    AuthContext
  ) as AuthContextType;

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request: InternalAxiosRequestConfig) => {
        //If the header is manually set, we don't need to overwrite it
        if (!request.headers["Content-Type"]) {
          request.headers["Content-Type"] = "application/json";
        }

        const token = cookies["jwt-auth"];
        if (token) {
          request.headers["Authorization"] = "Bearer " + token;
        }
        console.log(`Request: ${JSON.stringify(request)}`);
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
            const refreshResponse = await axios.post(
              "/auth/refresh",
              {},
              { withCredentials: true }
            );
            const newAccessToken = refreshResponse.data.accessToken;
            setCookie("jwt-auth", newAccessToken, { path: "/" });
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
