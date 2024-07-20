import {getAxiosInstance} from ".";
// here require('.') means that search a file index.js in the current directory 

// Register new users
export const RegisterUser = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/users/register", payload);
    return response.data;
  } catch (error) {
    return error;
  }
}

// Login users
export const LoginUser = async (payload) => {
  const axiosInstance = getAxiosInstance();
    try {
      const response = await axiosInstance.post("api/users/login", payload);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  
// Get current user
export const GetCurrentUser = async () => {
  //console.log(localStorage.getItem("token"),"currentusertoken")
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get("api/users/currentUser")
    //console.log(response, "localStorage token");
      return response.data
  } catch (error) {
      return error
  }  
}