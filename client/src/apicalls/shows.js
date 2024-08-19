import { getAxiosInstance } from ".";

export const GetAllShowsByTheatre = async (theatreId) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(`api/shows/getAllShowByTheatreId/${theatreId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AddShow = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
      const response = await axiosInstance.post("api/shows/add",payload);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const DeleteShow = async (showId) => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.post("api/shows/delete", showId)
        return response.data;
    } catch (error) {
        return error;
    }
}