import { analyzeEmailHeader as analyzeEmailHeaderAPI } from './apiService.js';

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};


export const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'PASS':
      return 'success';
    case 'FAIL':
      return 'error';
    case 'NEUTRAL':
      return 'warning';
    default:
      return 'default';
  }
};


export const parseEmailHeader = (headerText) => {
  const lines = headerText.split('\n');
  const parsed = {
    subject: '',
    from: '',
    to: '',
    messageId: '',
    headers: {
      received: [],
      'x-gm-message-state': '',
      'x-google-dkim-signature': '',
      'authentication-results': '',
      'spf': '',
      'dkim': '',
      'dmarc': ''
    }
  };

  console.log('Parsing header text with', lines.length, 'lines');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;


    let fullLine = line;
    let j = i + 1;
    while (j < lines.length && (lines[j].startsWith(' ') || lines[j].startsWith('\t'))) {
      fullLine += ' ' + lines[j].trim();
      j++;
    }
    i = j - 1;

    const colonIndex = fullLine.indexOf(':');
    if (colonIndex === -1) continue;

    const key = fullLine.substring(0, colonIndex).toLowerCase();
    const value = fullLine.substring(colonIndex + 1).trim();

    console.log(`Processing header: "${key}" = "${value}"`);

    switch (key) {
      case 'subject':
        parsed.subject = value;
        break;
      case 'from':
        parsed.from = value;
        break;
      case 'to':
        parsed.to = value;
        break;
      case 'message-id':
        parsed.messageId = value;
        break;
      case 'received':
        parsed.headers.received.push(value);
        break;
      case 'x-gm-message-state':
        parsed.headers['x-gm-message-state'] = value;
        break;
      case 'x-google-dkim-signature':
        parsed.headers['x-google-dkim-signature'] = value;
        break;
      case 'authentication-results':
        parsed.headers['authentication-results'] = value;
        break;
      case 'spf':
        parsed.headers['spf'] = value;
        console.log('Found SPF header:', value);
        break;
      case 'dkim':
        parsed.headers['dkim'] = value;
        console.log('Found DKIM header:', value);
        break;
      case 'dmarc':
        parsed.headers['dmarc'] = value;
        console.log('Found DMARC header:', value);
        break;

      case 'x-spf':
        parsed.headers['spf'] = value;
        console.log('Found X-SPF header:', value);
        break;
      case 'x-dkim':
        parsed.headers['dkim'] = value;
        console.log('Found X-DKIM header:', value);
        break;
      case 'x-dmarc':
        parsed.headers['dmarc'] = value;
        console.log('Found X-DMARC header:', value);
        break;
    }
  }

  console.log('Final parsed headers:', parsed.headers);
  return parsed;
};


export const testHeaderParsing = () => {
  const testHeader = `Message ID: <67dd9502f3c5e3a852fb8da2.68aa8e42ce15b478c1b06d9c.615808959fb65b15be4f1831@economictimesonline.com>
Created at: Sun, Aug 24, 2025 at 10:44 AM (Delivered after 108 seconds)
From: ET AI <newsletter@economictimesnews.com>
To: shashankfeb16@gmail.com
Subject: ET AI: Musk says xAI open sources Grok 2.5
SPF: PASS with IP 202.41.30.166 Learn more
DKIM: 'PASS' with domain economictimesnews.com Learn more
DMARC: 'PASS' Learn more`;

  console.log('Testing header parsing with sample data:');
  console.log('Raw header:', testHeader);
  
  const parsed = parseEmailHeader(testHeader);
  console.log('Parsed result:', parsed);
  
  return parsed;
};


export const analyzeEmailHeader = async (headerText) => {
  try {
    if (headerText.length > 10000) {
      throw new Error('Header text is too long. Maximum 10,000 characters allowed.');
    }

    const parsedHeader = parseEmailHeader(headerText);
    console.log('Parsed header:', parsedHeader);
    
    const requiredFields = ['subject', 'from', 'to'];
    const missingFields = requiredFields.filter(field => !parsedHeader[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')} are required`);
    }
    
    const requestData = {
      ...parsedHeader,
      rawHeaderText: headerText
    };
    
    console.log('Sending to API:', requestData);
    console.log('Raw header text length:', headerText.length);
    console.log('Raw header text preview:', headerText.substring(0, 500) + '...');
    console.log('NOTE: Backend API needs to parse rawHeaderText to extract SPF, DKIM, DMARC values');
    
    // Call the API service
    const response = await analyzeEmailHeaderAPI(requestData);
    return response.data;
  } catch (error) {
    console.error('Error analyzing email header:', error);
    throw error; // Re-throw the error to let the calling function handle it
  }
};
