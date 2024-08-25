import axios from 'axios'

export function getAxiosInstance(){
  const axiosInstance = axios.create({
    baseURL:'http://localhost:8080/',
    headers: {
      credentials: "include",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return axiosInstance;
}
