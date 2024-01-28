import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
});

//TODO add request interceptor = add jwt token to request
//TODO add response interceptor = handle error
