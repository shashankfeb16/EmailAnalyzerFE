import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <Paper className="about-section-container">
      <Typography variant="h6" className="about-title">
        <InfoIcon className="about-icon" />
        About Email Headers
      </Typography>
      <Typography variant="body1" className="about-description">
        This tool analyzes email headers according to RFC 822 standards, making them human-readable and providing valuable diagnostic information. Email headers contain crucial data about the email's journey, including routing information, security checks, and delivery details.
      </Typography>
      <Typography variant="body2" className="about-details">
        Headers are present on every email you receive via the Internet and can help identify spam, track delivery issues, and verify email authenticity through SPF, DKIM, and DMARC checks.
      </Typography>
    </Paper>
  );
};

export default AboutSection;
