import axios from "axios";

const BASE_URL = "http://localhost:8800/bookings"; 

// Get all bookings
export const fetchAllBookings = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Get total booking count
export const fetchTotalBookingCount = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // { totalBookings: number }
  } catch (error) {
    console.error("Error fetching total booking count:", error);
    throw error;
  }
};

// Get upcoming bookings for the next week
export const fetchUpcomingWeekBookings = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/upcoming-week`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming week bookings:", error);
    throw error;
  }
};