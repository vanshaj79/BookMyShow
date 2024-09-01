import { getAxiosInstance } from ".";

export const MakePayment = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/book/makePayment", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

// book show
export const BookShowTickets = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
      const response = await axiosInstance.post("api/book/bookShow", payload);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  