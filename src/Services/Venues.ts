import axios from "axios";

const BASE_URL = "http://localhost:3000/venues"; 

// Get all venues
export const fetchAllVenues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
