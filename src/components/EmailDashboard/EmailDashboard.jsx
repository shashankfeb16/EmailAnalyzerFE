import React, { useEffect } from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { useEmailData } from '../../utils/useEmailData';
import { formatDate, getStatusColor } from '../../utils/emailUtils';
import './EmailDashboard.css';

const EmailDashboard = ({ refreshTrigger = 0 }) => {
  const {
    emails,
    analytics,
    loading,
    error,
    refreshAllData
  } = useEmailData();

 
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData, refreshTrigger]);

  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  useEffect(() => {
    if (refreshTrigger > 0) {
      setIsRefreshing(true);
      const timer = setTimeout(() => setIsRefreshing(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [refreshTrigger]);

  if (loading || isRefreshing) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>
          {isRefreshing ? 'Updating dashboard...' : 'Loading dashboard...'}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className="email-dashboard">
      <Typography variant="h5" gutterBottom>
        Email Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="primary">
                {analytics?.totalEmails || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Emails Analyzed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="secondary">
                {emails.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Emails in Current View
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h4" color="success.main">
                {analytics?.espBreakdown?.length || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ESP Types Detected
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {analytics?.espBreakdown && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ESP Distribution
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {analytics.espBreakdown.map((esp) => (
              <Chip
                key={esp._id}
                label={`${esp._id}: ${esp.count}`}
                color="primary"
                variant="outlined"
                size="medium"
              />
            ))}
          </Box>
        </Paper>
      )}

      {analytics?.recentEmails && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Recent Emails
          </Typography>
          <Grid container spacing={2}>
            {analytics.recentEmails.map((email) => (
              <Grid item xs={12} key={email._id}>
                <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {email.subject || 'No Subject'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    From: {email.from} | Date: {formatDate(email.createdAt)}
                  </Typography>
                  <Chip
                    label={email.espType || 'Unknown ESP'}
                    size="small"
                    color="primary"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default EmailDashboard;
