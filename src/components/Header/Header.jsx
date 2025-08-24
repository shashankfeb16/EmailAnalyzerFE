import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import './Header.css';

const Header = () => {
  return (
    <Box className="header">
      <Container maxWidth="lg">
        <Box className="header-content">
          <EmailIcon className="header-icon" />
          <Box className="header-text">
            <Typography variant="h4" component="h1" className="header-title">
              Email Header Analyzer
            </Typography>
            <Typography variant="subtitle1" className="header-subtitle">
              Professional email header analysis and diagnostics
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
