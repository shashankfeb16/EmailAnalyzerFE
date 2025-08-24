import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  TextField,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  getAllEmails,
  getEmailById,
  getEmailsByEsp,
  getAnalytics
} from '../../utils/apiService';
import { formatDate, getStatusColor } from '../../utils/emailUtils';
import './EmailList.css';

const EmailList = ({ refreshTrigger = 0 }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedEsp, setSelectedEsp] = useState('');
  const [searchId, setSearchId] = useState('');

  const espTypes = ['Gmail', 'Outlook', 'Yahoo', 'SendGrid', 'Mailgun', 'Amazon SES'];

  const fetchAllEmails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAllEmails();
      setEmails(response.data);
      setSelectedEmail(null);
    } catch (error) {
      setError('Failed to fetch emails');
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailById = async () => {
    if (!searchId.trim()) {
      setError('Please enter an email ID');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await getEmailById(searchId);
      setSelectedEmail(response.data);
      setEmails([]);
    } catch (error) {
      setError('Failed to fetch email by ID');
      console.error('Error fetching email by ID:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailsByEsp = async () => {
    if (!selectedEsp) {
      setError('Please select an ESP type');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await getEmailsByEsp(selectedEsp);
      setEmails(response.data);
      setSelectedEmail(null);
    } catch (error) {
      setError('Failed to fetch emails by ESP');
      console.error('Error fetching emails by ESP:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      setError('Failed to fetch analytics');
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const refreshData = async () => {
      try {
        const response = await getAllEmails();
        setEmails(response.data);
        setSelectedEmail(null);
        const analyticsResponse = await getAnalytics();
        setAnalytics(analyticsResponse.data);
      } catch (error) {
        setError('Failed to refresh data');
        console.error('Error refreshing data:', error);
      }
    };
    
    refreshData();
  }, [refreshTrigger]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    if (refreshTrigger > 0) {
      setIsRefreshing(true);
      const timer = setTimeout(() => setIsRefreshing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [refreshTrigger]);

  const renderEmailItem = (email) => (
    <ListItem
      key={email._id}
      button
      onClick={() => setSelectedEmail(email)}
      className="email-list-item"
    >
      <ListItemText
        primary={email.subject || 'No Subject'}
        secondary={
          <Box>
            <Typography variant="body2" color="textSecondary">
              From: {email.from || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {formatDate(email.createdAt)}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={email.espType || 'Unknown ESP'}
                size="small"
                color="primary"
                sx={{ mr: 1 }}
              />
              {email.spf && (
                <Chip
                  label={`SPF: ${email.spf}`}
                  size="small"
                  color={getStatusColor(email.spf)}
                  sx={{ mr: 1 }}
                />
              )}
              {email.dkim && (
                <Chip
                  label={`DKIM: ${email.dkim}`}
                  size="small"
                  color={getStatusColor(email.dkim)}
                  sx={{ mr: 1 }}
                />
              )}
              {email.dmarc && (
                <Chip
                  label={`DMARC: ${email.dmarc}`}
                  size="small"
                  color={getStatusColor(email.dmarc)}
                />
              )}
            </Box>
          </Box>
        }
      />
    </ListItem>
  );

  const renderEmailDetails = (email) => (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Email Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Subject
          </Typography>
          <Typography variant="body1" gutterBottom>
            {email.subject || 'No Subject'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="textSecondary">
            From
          </Typography>
          <Typography variant="body1" gutterBottom>
            {email.from || 'Unknown'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="textSecondary">
            To
          </Typography>
          <Typography variant="body1" gutterBottom>
            {email.to || 'Unknown'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="textSecondary">
            ESP Type
          </Typography>
          <Typography variant="body1" gutterBottom>
            {email.espType || 'Unknown'}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Created At
          </Typography>
          <Typography variant="body1" gutterBottom>
            {formatDate(email.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            Security Analysis
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {email.spf && (
              <Chip
                label={`SPF: ${email.spf}`}
                color={getStatusColor(email.spf)}
                variant="outlined"
              />
            )}
            {email.dkim && (
              <Chip
                label={`DKIM: ${email.dkim}`}
                color={getStatusColor(email.dkim)}
                variant="outlined"
              />
            )}
            {email.dmarc && (
              <Chip
                label={`DMARC: ${email.dmarc}`}
                color={getStatusColor(email.dmarc)}
                variant="outlined"
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        onClick={() => setSelectedEmail(null)}
        sx={{ mt: 2 }}
      >
        Back to List
      </Button>
    </Paper>
  );

  const renderAnalytics = () => (
    <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Email Analytics
      </Typography>
      {analytics && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {analytics.totalEmails}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Emails
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle1" gutterBottom>
              ESP Breakdown
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {analytics.espBreakdown?.map((esp) => (
                <Chip
                  key={esp._id}
                  label={`${esp._id}: ${esp.count}`}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Recent Emails
            </Typography>
            <List dense>
              {analytics.recentEmails?.map((email) => (
                <ListItem key={email._id}>
                  <ListItemText
                    primary={email.subject || 'No Subject'}
                    secondary={`${email.from} - ${formatDate(email.createdAt)}`}
                  />
                  <Chip
                    label={email.espType || 'Unknown'}
                    size="small"
                    color="primary"
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      )}
    </Paper>
  );

  return (
    <Box className="email-list-container">
      <Typography variant="h4" gutterBottom>
        Email Management
      </Typography>

      {/* Control Panel */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Controls
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Button
              variant="contained"
              onClick={fetchAllEmails}
              disabled={loading}
              fullWidth
            >
              Load All Emails
            </Button>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Button
              variant="contained"
              onClick={fetchAnalytics}
              disabled={loading}
              fullWidth
            >
              Load Analytics
            </Button>
          </Box>
          <Box sx={{ flex: '2 1 300px', minWidth: '250px' }}>
            <TextField
              select
              label="Filter by ESP"
              value={selectedEsp}
              onChange={(e) => setSelectedEsp(e.target.value)}
              fullWidth
              size="small"
            >
              {espTypes.map((esp) => (
                <MenuItem key={esp} value={esp}>
                  {esp}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Button
              variant="outlined"
              onClick={fetchEmailsByEsp}
              disabled={!selectedEsp || loading}
              fullWidth
            >
              Filter by ESP
            </Button>
          </Box>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {(loading || isRefreshing) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
          {isRefreshing && (
            <Typography sx={{ ml: 2, alignSelf: 'center' }}>
              Updating data...
            </Typography>
          )}
        </Box>
      )}

      {!loading && !error && (
        <>
          {analytics && renderAnalytics()}

          {selectedEmail ? (
            renderEmailDetails(selectedEmail)
          ) : (
            emails.length > 0 && (
              <Paper elevation={3}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    Emails ({emails.length})
                  </Typography>
                </Box>
                <List>
                  {emails.map(renderEmailItem)}
                </List>
              </Paper>
            )
          )}

          {!selectedEmail && emails.length === 0 && !analytics && (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary">
                No emails to display
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Use the controls above to load emails or search for specific ones
              </Typography>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default EmailList;
