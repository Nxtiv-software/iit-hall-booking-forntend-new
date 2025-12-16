import axios from "axios";

const BASE_URL = "http://localhost:8800/venues"; 

// Get all venues
export const fetchAllVenues = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
