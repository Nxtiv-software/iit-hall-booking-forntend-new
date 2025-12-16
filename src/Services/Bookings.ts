import axios from "axios";

const BASE_URL = "http://localhost:3000/bookings"; 

// Get all bookings
export const fetchAllBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
