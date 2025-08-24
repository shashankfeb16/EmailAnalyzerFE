import { useState, useEffect, useCallback } from 'react';
import {
  getAllEmails,
  getEmailById,
  getEmailsByEsp,
  getAnalytics
} from './apiService';

export const useEmailData = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllEmails = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllEmails();
      setEmails(response.data);
      setSelectedEmail(null);
      return response.data;
    } catch (error) {
      const errorMessage = 'Failed to fetch emails';
      setError(errorMessage);
      console.error(errorMessage, error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchEmailById = useCallback(async (id) => {
    if (!id?.trim()) {
      setError('Please provide a valid email ID');
      return null;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await getEmailById(id);
      const email = response.data;
      setSelectedEmail(email);
      setEmails([]);
      return email;
    } catch (error) {
      const errorMessage = 'Failed to fetch email by ID';
      setError(errorMessage);
      console.error(errorMessage, error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchEmailsByEsp = useCallback(async (esp) => {
    if (!esp?.trim()) {
      setError('Please provide a valid ESP type');
      return [];
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await getEmailsByEsp(esp);
      const emails = response.data;
      setEmails(emails);
      setSelectedEmail(null);
      return emails;
    } catch (error) {
      const errorMessage = 'Failed to fetch emails by ESP';
      setError(errorMessage);
      console.error(errorMessage, error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAnalytics();
      const analyticsData = response.data;
      setAnalytics(analyticsData);
      return analyticsData;
    } catch (error) {
      const errorMessage = 'Failed to fetch analytics';
      setError(errorMessage);
      console.error(errorMessage, error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  const clearError = useCallback(() => {
    setError('');
  }, []);


  const clearSelectedEmail = useCallback(() => {
    setSelectedEmail(null);
  }, []);


  const clearData = useCallback(() => {
    setEmails([]);
    setSelectedEmail(null);
    setAnalytics(null);
    setError('');
  }, []);


  const refreshAllData = useCallback(async () => {
    try {
      await Promise.all([
        fetchAllEmails(),
        fetchAnalytics()
      ]);
    } catch (error) {
      console.error('Error refreshing all data:', error);
    }
  }, [fetchAllEmails, fetchAnalytics]);


  useEffect(() => {
    fetchAllEmails();
  }, []); 

  return {
    emails,
    selectedEmail,
    analytics,
    loading,
    error,
    
    fetchAllEmails,
    fetchEmailById,
    fetchEmailsByEsp,
    fetchAnalytics,
    clearError,
    clearSelectedEmail,
    clearData,
    refreshAllData,
    
    setEmails,
    setSelectedEmail,
    setAnalytics,
    setError
  };
};
