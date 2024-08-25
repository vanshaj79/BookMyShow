import { getAxiosInstance } from ".";

export const GetAllMovies = async () => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get("/api/movies/getAllMovies");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetMovieById = async (movieId) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(`/api/movies/getMovieById/${movieId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AddMovie = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/movies/add",payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UpdateMovie = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.put("api/movies/updateMovie", payload)
        return response.data;
    } catch (error) {
        return error;
    }
}

export const DeleteMovie = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.post("api/movies/deleteMovie", payload)
        return response.data;
    } catch (error) {
        return error;
    }
}

