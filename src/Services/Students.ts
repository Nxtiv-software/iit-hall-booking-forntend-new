import axios from "axios";

const BASE_URL = "http://localhost:8800/students";


// Get student profile
export const fetchStudentProfile = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw error;
  }
};

// Create student profile
export const createStudentProfile = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating student profile:", error);
    throw error;
  }
};

// Update student profile
export const updateStudentProfile = async (token: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating student profile:", error);
    throw error;
  }
};

// Delete student profile
export const deleteStudentProfile = async (token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting student profile:", error);
    throw error;
  }
};

// Create a request
export const createStudentRequest = async (token: string, data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/requests`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

// Get all requests by student ID
export const fetchStudentRequests = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student requests:", error);
    throw error;
  }
};

// Get total request count
export const fetchStudentRequestCount = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/requests/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching request count:", error);
    throw error;
  }
};

// Get pending request count
export const fetchPendingRequestCount = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/requests/pending/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pending request count:", error);
    throw error;
  }
};

// Get all bookings by student ID
export const fetchStudentBookings = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student bookings:", error);
    throw error;
  }
};

// Get booking count
export const fetchStudentBookingCount = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/bookings/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching booking count:", error);
    throw error;
  }
};

// Get upcoming bookings (next week)
export const fetchUpcomingBookings = async (
  token: string,
  studentId: string
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${studentId}/bookings/upcoming-week`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming bookings:", error);
    throw error;
  }
};

// Get total student count
export const fetchTotalStudentCount = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching total student count:", error);
    throw error;
  }
};

// Get request details by id
export const fetchStudentRequestDetails = async (
  studentId: string,
  requestId: string,
  token: string,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/${studentId}/requests/${requestId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching request by student id:", error);
    throw error;
  }
};