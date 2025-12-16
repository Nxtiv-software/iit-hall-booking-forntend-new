import axios from "axios";

const BASE_URL = "http://localhost:8800/requests"; 

// 1. Get all requests
export const fetchAllRequests = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

// 2. Get all attachments by request ID
export const fetchAttachmentsByRequest = async (requestId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${requestId}/attachments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attachments:", error);
    throw error;
  }
};

// 3. Upload an attachment for a request
export const uploadAttachment = async (requestId: string, file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${BASE_URL}/${requestId}/attachments`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading attachment:", error);
    throw error;
  }
};

// 4. Get a single attachment by request ID and attachment ID
export const fetchAttachmentById = async (requestId: string, attachmentId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${requestId}/attachments/${attachmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attachment:", error);
    throw error;
  }
};

// 5. Delete an attachment by request ID and attachment ID
export const deleteAttachment = async (requestId: string, attachmentId: string, token: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${requestId}/attachments/${attachmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting attachment:", error);
    throw error;
  }
};

// 6. Get full approval history for a request
export const fetchApprovalsByRequest = async (requestId: string, token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${requestId}/approvals`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching approvals:", error);
    throw error;
  }
};
