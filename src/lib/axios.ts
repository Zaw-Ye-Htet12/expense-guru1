import { BACKEND_API } from "@/constants/route";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

export const axiosPrivateInstance = axios.create({
  baseURL: BACKEND_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default axiosInstance;
