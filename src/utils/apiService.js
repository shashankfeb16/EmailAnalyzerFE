import axios from 'axios';


const API_BASE_URL = import.meta.env.PROD 
  ? "https://emailanalyzerbe.onrender.com" 
  : "http://localhost:3000";

export const analyzeEmailHeader = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/emails/process`, data
    );
    return response;
  } catch (error) {
    console.error("Error analyzing email header:", error);
    throw error;
  }
};

export const getEmailAnalysisHistory = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails/history`
    );
    return response;
  } catch (error) {
    console.error("Error fetching email analysis history:", error);
    throw error;
  }
};

export const getEmailAnalysisById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching email analysis:", error);
    throw error;
  }
};

export const getAllEmails = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails`
    );
    return response;
  } catch (error) {
    console.error("Error fetching all emails:", error);
    throw error;
  }
};

export const getEmailById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching email by ID:", error);
    throw error;
  }
};

export const getEmailsByEsp = async (esp) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails/esp/${esp}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching emails by ESP:", error);
    throw error;
  }
};

export const getAnalytics = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/emails/analytics`
    );
    return response;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
