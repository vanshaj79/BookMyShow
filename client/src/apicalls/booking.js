import { getAxiosInstance } from ".";

export const MakePayment = async (payload) => {
  const axiosInstance = getAxiosInstance();
  try {
    const response = await axiosInstance.post("api/bookings/makePayment", payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

// book show
export const BookShowTickets = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
      const response = await axiosInstance.post("api/bookings/bookShow", payload);
      return response.data;
    } catch (error) {
      return error;
    }
  };
  
  export const GetBookingOfUser = async (payload) => {
    const axiosInstance = getAxiosInstance();
    try {
      const response = await axiosInstance.post("api/bookings/getBookings",payload);
      return response.data;
    } catch (error) {
      return error;
    }
  };