import axios from 'axios'

export function getAxiosInstance(){
  const axiosInstance = axios.create({
    headers: {
      credentials: "include",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return axiosInstance;
}
