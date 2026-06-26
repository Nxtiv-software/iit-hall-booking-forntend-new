import axios from "axios";

const BASE_URL = "http://localhost:8800/buildings"; 

// Get all buildings
export const fetchAllBuildings = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error;
  }
};