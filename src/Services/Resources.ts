import axios from "axios";

const BASE_URL = "http://localhost:8800/resources"; 

// Get all resources
export const fetchAllResources = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
};
