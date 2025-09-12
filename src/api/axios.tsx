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
      (response: AxiosResponse) => {
        console.log(`Response: ${JSON.stringify(response)}`);
        return response;
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
