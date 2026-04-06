import axios from "axios";

const BASE_URL = "http://localhost:8800/admins";

/* =========================
   ADMIN PROFILE
========================= */

export const fetchAdminProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createAdminProfile = async (data: any, token: string) => {
  const response = await axios.post(`${BASE_URL}/me`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateAdminProfile = async (data: any, token: string) => {
  const response = await axios.put(`${BASE_URL}/me`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteAdminProfile = async (token: string) => {
  const response = await axios.delete(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* =========================
   BOOKINGS
========================= */

export const fetchAdminBookings = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* =========================
   ADMIN LEVEL REQUESTS
========================= */

// ADMIN 1

export const fetchAdmin1All = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/admin1/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin1Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin1/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin1Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin1/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ADMIN 2
export const fetchAdmin2Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin2/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin2Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin2/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ADMIN 3
export const fetchAdmin3Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin3/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin3Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin3/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ADMIN 4
export const fetchAdmin4Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin4/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin4Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin4/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ADMIN 5
export const fetchAdmin5Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin5/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin5Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin5/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ADMIN 6
export const fetchAdmin6Pending = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin6/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchAdmin6Rejected = async (adminId: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/admin6/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* =========================
   APPROVAL ACTIONS
========================= */

export const approveRequest = async (
  adminId: string,
  requestId: string,
  comment: string,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/${adminId}/requests/${requestId}/approve`,
    { comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const rejectRequest = async (
  adminId: string,
  requestId: string,
  comment: string,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/${adminId}/requests/${requestId}/reject`,
    { comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateApprovalComment = async (
  adminId: string,
  requestId: string,
  adminLevel: number,
  comment: string,
  token: string
) => {
  const response = await axios.put(
    `${BASE_URL}/${adminId}/requests/${requestId}/approval`,
    { adminLevel, comment },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

/* =========================
   PENDING COUNT
========================= */

export const fetchPendingRequestCount = async (
  adminId: string,
  token: string
) => {
  const response = await axios.get(`${BASE_URL}/${adminId}/pending-count`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

/* =========================
   RESOURCES
========================= */

export const createResource = async (
  adminId: string,
  departmentId: string,
  data: any,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/${adminId}/departments/${departmentId}/resources`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateResource = async (
  adminId: string,
  departmentId: string,
  resourceId: string,
  data: any,
  token: string
) => {
  const response = await axios.put(
    `${BASE_URL}/${adminId}/departments/${departmentId}/resources/${resourceId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteResource = async (
  adminId: string,
  departmentId: string,
  resourceId: string,
  token: string
) => {
  const response = await axios.delete(
    `${BASE_URL}/${adminId}/departments/${departmentId}/resources/${resourceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

/* =========================
   VENUES
========================= */

export const createVenue = async (
  adminId: string,
  buildingId: string,
  data: any,
  token: string
) => {
  const response = await axios.post(
    `${BASE_URL}/${adminId}/buildings/${buildingId}/venues`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateVenue = async (
  adminId: string,
  buildingId: string,
  venueId: string,
  data: any,
  token: string
) => {
  const response = await axios.put(
    `${BASE_URL}/${adminId}/buildings/${buildingId}/venues/${venueId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteVenue = async (
  adminId: string,
  buildingId: string,
  venueId: string,
  token: string
) => {
  const response = await axios.delete(
    `${BASE_URL}/${adminId}/buildings/${buildingId}/venues/${venueId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

/* =========================
   REQUESTS
========================= */

export const fetchRequestById = async (
  adminId: string,
  requestId: string,
  token: string
) => {
  const response = await axios.get(
    `${BASE_URL}/${adminId}/requests/${requestId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
