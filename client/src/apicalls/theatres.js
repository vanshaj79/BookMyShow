import { getAxiosInstance } from ".";

export const GetAllTheatresByOwner = async (userId) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(`api/theatres/getAllTheatresByOwnerId/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const GetAllTheatres = async () => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.get(`api/theatres/getAllTheatres`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const AddTheatre = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/theatres/add",payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const UpdateTheatre = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.put("api/theatres/update", payload)
        return response.data;
    } catch (error) {
        return error;
    }
}

export const DeleteTheatre = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
        const response = await axiosInstance.post("api/theatres/delete", payload)
        return response.data;
    } catch (error) {
        return error;
    }
}

export const GetTheatresByMovie = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/theatres/getTheatresByMovieId",payload );
    return response.data
  } catch (error) {
    return error;
  }
};

export const GetShowById = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/theatres/getShowById",payload );
    return response.data
  } catch (error) {
    return error;
  }
};