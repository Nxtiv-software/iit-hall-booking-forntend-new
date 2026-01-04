import axios from "axios";

const BASE_URL = "http://localhost:8800/admins";

// 1. Fetch admin profile
export const fetchAdminProfile = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw error;
  }
};

// 2. Create admin profile
export const createAdminProfile = async (data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/me`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating admin profile:", error);
    throw error;
  }
};

// 3. Update admin profile
export const updateAdminProfile = async (data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/me`, data, {
      headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating admin profile:", error);
    throw error;
  }
};

// 4. Delete admin profile
export const deleteAdminProfile = async (token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting admin profile:", error);
    throw error;
  }
};

// 5. Fetch all bookings for an admin
export const fetchAdminBookings = async (adminId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    throw error;
  }
};

// 6. Fetch pending requests for admin
export const fetchPendingRequests = async (adminId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/pending-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

// 7. Fetch rejected requests for admin
export const fetchRejectedRequests = async (adminId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/rejected-requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rejected requests:", error);
    throw error;
  }
};

// 8. Approve a request
export const approveRequest = async (adminId: string, requestId: string, comment: string, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${adminId}/requests/${requestId}/approve`, { comment }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

// 9. Reject a request
export const rejectRequest = async (adminId: string, requestId: string, comment: string, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${adminId}/requests/${requestId}/reject`, { comment }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

// 10. Update approval comment
export const updateApprovalComment = async (adminId: string, requestId: string, adminLevel: string, comment: string, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${adminId}/requests/${requestId}/approval`, { adminLevel, comment }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating approval comment:", error);
    throw error;
  }
};

// 11. Fetch count of pending requests for admin
export const fetchPendingRequestCount = async (adminId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/pending-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching pending request count:", error);
    throw error;
  }
};

// 12. Create a new resource
export const createResource = async (adminId: string, departmentId: string, data: any, token: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/${adminId}/departments/${departmentId}/resources`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};

// 13. Update a resource
export const updateResource = async (adminId: string, departmentId: string, resourceId: string, data: any, token: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/${adminId}/departments/${departmentId}/resources/${resourceId}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
};

// 14. Delete a resource
export const deleteResource = async (adminId: string, departmentId: string, resourceId: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${adminId}/departments/${departmentId}/resources/${resourceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resource:", error);
    throw error;
  }
};