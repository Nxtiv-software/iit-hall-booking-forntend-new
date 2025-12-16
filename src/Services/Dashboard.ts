import axios from "axios";

const BASE_URL = "http://localhost:3000/admins";

// 1. Fetch admin profile
export const fetchAdminProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    throw error;
  }
};

// 2. Create admin profile
export const createAdminProfile = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/me`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating admin profile:", error);
    throw error;
  }
};

// 3. Update admin profile
export const updateAdminProfile = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/me`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating admin profile:", error);
    throw error;
  }
};

// 4. Delete admin profile
export const deleteAdminProfile = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/me`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin profile:", error);
    throw error;
  }
};

// 5. Fetch all bookings for an admin
export const fetchAdminBookings = async (adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin bookings:", error);
    throw error;
  }
};

// 6. Fetch pending requests for admin
export const fetchPendingRequests = async (adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/pending-requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error;
  }
};

// 7. Fetch rejected requests for admin
export const fetchRejectedRequests = async (adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/rejected-requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rejected requests:", error);
    throw error;
  }
};

// 8. Approve a request
export const approveRequest = async (adminId, requestId, comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/${adminId}/requests/${requestId}/approve`, { comment });
    return response.data;
  } catch (error) {
    console.error("Error approving request:", error);
    throw error;
  }
};

// 9. Reject a request
export const rejectRequest = async (adminId, requestId, comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/${adminId}/requests/${requestId}/reject`, { comment });
    return response.data;
  } catch (error) {
    console.error("Error rejecting request:", error);
    throw error;
  }
};

// 10. Update approval comment
export const updateApprovalComment = async (adminId, requestId, adminLevel, comment) => {
  try {
    const response = await axios.put(`${BASE_URL}/${adminId}/requests/${requestId}/approval`, { adminLevel, comment });
    return response.data;
  } catch (error) {
    console.error("Error updating approval comment:", error);
    throw error;
  }
};

// 11. Fetch count of pending requests for admin
export const fetchPendingRequestCount = async (adminId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${adminId}/pending-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending request count:", error);
    throw error;
  }
};
