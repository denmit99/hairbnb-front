import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

// axiosInstance.interceptors.request.use((config) => {
//   const [cookies, setCookie] = useCookies(["jwt-auth"]);
//   const token = cookies["jwt-auth"];
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

//TODO add request interceptor = add jwt token to request
//TODO add response interceptor = handle error
