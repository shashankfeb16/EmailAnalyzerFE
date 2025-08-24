import React, { useState, useCallback, useEffect } from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import {
  analyzeEmailHeader,
  formatDate,
  getStatusColor,
} from "./utils/emailUtils";
import "./App.css";
import Header from "./components/Header/Header";
import HeaderInput from "./components/HeaderInput/HeaderInput";
import AnalysisResults from "./components/AnalysisResults/AnalysisResults";
import EmptyState from "./components/EmptyState/EmptyState";
import AboutSection from "./components/AboutSection/AboutSection";
import EmailList from "./components/EmailList/EmailList";
import EmailDashboard from "./components/EmailDashboard/EmailDashboard";

function App() {
  const [headerText, setHeaderText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAnalyze = async () => {
    if (!headerText.trim()) {
      setError("Please enter an email header to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setSuccessMessage("");
    setAnalysisResult(null);

    try {
      const result = await analyzeEmailHeader(headerText);
      setAnalysisResult(result);
      setSuccessMessage("Email header analyzed successfully! Dashboard and list updated.");
      
      setTimeout(() => {
        triggerRefresh();
      }, 500);
    } catch (error) {
      console.error("Analysis error:", error);

      if (error.response) {
        setError(
          `Server error: ${error.response.status} - ${
            error.response.data?.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        setError(
          "Network error: No response from server. Please check if the backend is running."
        );
      } else {
        setError(
          error.message || "Failed to analyze email header. Please try again."
        );
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setHeaderText("");
    setAnalysisResult(null);
    setError("");
    setSuccessMessage("");
  };

  return (
    <Box className="app-container">
      <Header />

      <Container maxWidth="lg" className="main-container">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Paper elevation={3} className="input-paper">
            <HeaderInput
              headerText={headerText}
              setHeaderText={setHeaderText}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
              error={error}
              successMessage={successMessage}
            />
          </Paper>
          {analysisResult ? (
            <Paper elevation={3} className="results-paper">
              <AnalysisResults
                analysisResult={analysisResult}
                formatDate={formatDate}
                getStatusColor={getStatusColor}
              />
            </Paper>
          ) : (
            <EmptyState />
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <EmailDashboard refreshTrigger={refreshTrigger} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <EmailList refreshTrigger={refreshTrigger} />
        </Box>
        <AboutSection />
      </Container>
    </Box>
  );
}

export default App;
