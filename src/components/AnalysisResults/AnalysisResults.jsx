import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Divider } from '@mui/material';
import { Security as SecurityIcon, Email as EmailIcon, Route as RouteIcon } from '@mui/icons-material';
import './AnalysisResults.css';

const AnalysisResults = ({ analysisResult, formatDate, getStatusColor }) => {
  if (!analysisResult) return null;
  console.log('Analysis result:', analysisResult);
  return (
    <Box className="analysis-results-container">
      <Typography variant="h6" className="results-title">
        <SecurityIcon className="results-icon" />
        Analysis Results
      </Typography>

      <Card className="summary-card">
        <CardContent>
          <Typography variant="subtitle2" className="card-section-title">
            EMAIL SUMMARY
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">From:</Typography>
              <Typography variant="body1" className="field-value">
                {analysisResult.data?.from || analysisResult.from}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">To:</Typography>
              <Typography variant="body1" className="field-value">
                {analysisResult.data?.to || analysisResult.to}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="field-label">Subject:</Typography>
              <Typography variant="body1" className="field-value">
                {analysisResult.data?.subject || analysisResult.subject}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">Date:</Typography>
              <Typography variant="body1" className="field-value">
                {formatDate(analysisResult.data?.createdAt || analysisResult.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">Message ID:</Typography>
              <Typography variant="body2" className="field-value">
                {analysisResult.data?.messageId || analysisResult.messageId}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="esp-card">
        <CardContent>
          <Typography variant="subtitle2" className="card-section-title">
            <EmailIcon className="section-icon" />
            EMAIL SERVICE PROVIDER
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">ESP Type:</Typography>
              <Typography variant="body1" className="field-value">
                {analysisResult.data?.espType || analysisResult.espType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">Confidence:</Typography>
              <Typography variant="body1" className="field-value">
                {analysisResult.data?.espConfidence ? 
                  `${(analysisResult.data.espConfidence * 100).toFixed(1)}%` : 
                  analysisResult.espConfidence}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="field-label">Detection Details:</Typography>
              <Box className="detection-details">
                {(analysisResult.data?.espDetectionDetails || analysisResult.espDetectionDetails || []).map((detail, index) => (
                  <Chip
                    key={index}
                    label={detail}
                    size="small"
                    variant="outlined"
                    className="detection-chip"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      <Card className="receiving-card">
        <CardContent>
          <Typography variant="subtitle2" className="card-section-title">
            <RouteIcon className="section-icon" />
            RECEIVING CHAIN
          </Typography>
          <Box className="receiving-chain">
            {(analysisResult.data?.receivingChain || analysisResult.receivingChain || []).map((hop, index) => (
              <Box key={index} className="receiving-hop">
                <Typography variant="body2" className="hop-details">
                  {hop}
                </Typography>
                {index < (analysisResult.data?.receivingChain || analysisResult.receivingChain || []).length - 1 && 
                  <Divider className="hop-divider" />}
              </Box>
            ))}
          </Box>
          <Typography variant="body2" className="field-label" style={{ marginTop: '8px' }}>
            Chain Length: {analysisResult.data?.receivingChain?.length || analysisResult.receivingChain?.length || 0}
          </Typography>
        </CardContent>
      </Card>

      <Card className="headers-card">
        <CardContent>
          <Typography variant="subtitle2" className="card-section-title">
            RAW HEADERS
          </Typography>
          

          {(analysisResult.data?.headers?.spf || analysisResult.data?.headers?.dkim || analysisResult.data?.headers?.dmarc || 
            analysisResult.headers?.spf || analysisResult.headers?.dkim || analysisResult.headers?.dmarc) && (
            <Box className="auth-headers-found" style={{ marginBottom: '16px' }}>
              <Typography variant="body2" className="field-label" style={{ marginBottom: '8px', fontWeight: '600' }}>
                Authentication Headers Found:
              </Typography>
              <Grid container spacing={2}>
                {analysisResult.data?.headers?.spf || analysisResult.headers?.spf ? (
                  <Grid item xs={12} sm={4}>
                    <Box className="auth-header-item">
                      <Typography variant="body2" className="auth-header-label">SPF:</Typography>
                      <Typography variant="body2" className="auth-header-value">
                        {analysisResult.data?.headers?.spf || analysisResult.headers?.spf}
                      </Typography>
                    </Box>
                  </Grid>
                ) : null}
                {analysisResult.data?.headers?.dkim || analysisResult.headers?.dkim ? (
                  <Grid item xs={12} sm={4}>
                    <Box className="auth-header-item">
                      <Typography variant="body2" className="auth-header-label">DKIM:</Typography>
                      <Typography variant="body2" className="auth-header-value">
                        {analysisResult.data?.headers?.dkim || analysisResult.headers?.dkim}
                      </Typography>
                    </Box>
                  </Grid>
                ) : null}
                {analysisResult.data?.headers?.dmarc || analysisResult.headers?.dmarc ? (
                  <Grid item xs={12} sm={4}>
                    <Box className="auth-header-item">
                      <Typography variant="body2" className="auth-header-label">DMARC:</Typography>
                      <Typography variant="body2" className="auth-header-value">
                        {analysisResult.data?.headers?.dmarc || analysisResult.headers?.dmarc}
                      </Typography>
                    </Box>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          )}
          

          {Object.entries(analysisResult.data?.rawHeaders || analysisResult.rawHeaders || {}).map(([key, value]) => (
            <Box key={key} className="header-row">
              <Typography variant="body2" className="header-key">
                {key}:
              </Typography>
              <Typography variant="body2" className="header-value">
                {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>


      <Card className="status-card">
        <CardContent>
          <Typography variant="subtitle2" className="card-section-title">
            PROCESSING STATUS
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">Status:</Typography>
              <Chip
                label={analysisResult.data?.status || analysisResult.status || 'Unknown'}
                color={getStatusColor(analysisResult.data?.status || analysisResult.status || 'Unknown')}
                size="small"
                className="status-chip"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" className="field-label">Processed At:</Typography>
              <Typography variant="body2" className="field-value">
                {formatDate(analysisResult.data?.updatedAt || analysisResult.updatedAt)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalysisResults;
