import axios from "axios";

const BASE_URL = "http://localhost:8800/roles"; 

export const fetchAllRoles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};