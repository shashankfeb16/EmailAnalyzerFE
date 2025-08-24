import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <Paper className="empty-state-container">
      <EmailIcon className="empty-state-icon" />
      <Typography variant="h6" className="empty-state-title">
        Ready to Analyze
      </Typography>
      <Typography variant="body2" className="empty-state-description">
        Paste an email header above and click "Analyze Header" to get started
      </Typography>
    </Paper>
  );
};

export default EmptyState;
