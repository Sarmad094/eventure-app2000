import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/organizations';

export const orgLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password
    });
    
    return response.data; // OrganizationDTO
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password");
    }
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Login failed. Please try again.");
  }
};

export const orgRegister = async (orgId, orgName, email, password, o_field) => {
  try {
    // ✅ FIKSET: Sender o_field i stedet for oField
    const response = await axios.post(`${API_BASE_URL}/register`, {
      orgId,
      orgName,
      email,
      password,
      o_field // ✅ FIKSET: Endret fra oField til o_field
    });
    
    return response.data; // OrganizationDTO
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Organization ID or Email is already in use");
    }
    throw new Error("Registration failed. Please try again.");
  }
};

export const getOrgById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Organization not found");
  }
};

export const deleteOrg = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateOrg = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getAllOrganizations = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch organizations");
  }
};