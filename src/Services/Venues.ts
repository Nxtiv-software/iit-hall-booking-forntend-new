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

// Get a specfic venue
export const fetchVenue = async (venueId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${venueId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching venue:", error);
    throw error;
  }
};