import React from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { Email as EmailIcon, Security as SecurityIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import './HeaderInput.css';

const HeaderInput = ({ 
  headerText, 
  setHeaderText, 
  onAnalyze, 
  onClear, 
  isAnalyzing, 
  error,
  successMessage
}) => {
  return (
    <Box className="header-input-container">
      <Typography variant="h6" className="input-title">
        <EmailIcon className="input-icon" />
        Paste Email Header
      </Typography>
      
      <TextField
        fullWidth
        multiline
        rows={12}
        variant="outlined"
        placeholder="Paste your email header here...&#10;&#10;Example:&#10;From: sender@example.com&#10;To: recipient@example.com&#10;Subject: Test Email Subject&#10;Message-ID: <123456789@example.com>&#10;Received: from mail.example.com by smtp.gmail.com&#10;X-GM-Message-State: AOAM533abc123&#10;X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed&#10;Authentication-Results: mx.google.com; spf=pass; dkim=pass; dmarc=pass"
        value={headerText}
        onChange={(e) => setHeaderText(e.target.value)}
        className="header-textarea"
      />

      <Box className="button-container">
        <Button
          variant="contained"
          size="large"
          onClick={onAnalyze}
          disabled={isAnalyzing || !headerText.trim()}
          startIcon={isAnalyzing ? <RefreshIcon /> : <SecurityIcon />}
          className="analyze-button"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Header'}
        </Button>
        
        <Button
          variant="outlined"
          onClick={onClear}
          disabled={!headerText && !error}
          className="clear-button"
        >
          Clear
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" className="success-alert">
          {successMessage}
        </Alert>
      )}
    </Box>
  );
};

export default HeaderInput;
