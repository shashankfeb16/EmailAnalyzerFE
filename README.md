# Email Header Analyzer

A modern, responsive web application for analyzing email headers with a beautiful Material-UI interface.

## Features

- **Modern UI**: Built with Material-UI (MUI) for a professional, responsive design
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Analysis**: Instant email header parsing and analysis
- **Security Insights**: SPF, DKIM, DMARC, and virus scan results
- **Routing Information**: Detailed email delivery path analysis
- **Professional Layout**: Clean, organized presentation of results

## Screenshots

The application features:
- Clean header with professional branding
- Large text area for pasting email headers
- Organized results display with color-coded security status
- Responsive grid layout that adapts to screen size
- Smooth animations and transitions

## Technology Stack

- **Frontend**: React 19 with Vite
- **UI Framework**: Material-UI (MUI) v7
- **Styling**: Emotion (CSS-in-JS)
- **Icons**: Material Icons
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd email-analyzer-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Paste Email Header**: Copy an email header from your email client and paste it into the text area
2. **Analyze**: Click the "Analyze Header" button to process the header
3. **Review Results**: View the parsed information including:
   - Email summary (from, to, subject, date)
   - Security status (SPF, DKIM, DMARC)
   - Routing path with server details
   - Additional header information

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application-specific styles
├── main.jsx         # Application entry point with MUI theme
└── index.css        # Global styles
```

## Customization

### Theme

The application uses a custom MUI theme defined in `main.jsx`. You can modify colors, typography, and component styles by editing the theme object.

### Styling

- `App.css`: Component-specific styles
- `index.css`: Global styles and resets
- MUI theme: Component styling and theming

## API Integration

The current version includes mock data for demonstration. To integrate with a real backend:

1. Replace the mock API call in `handleAnalyze()` function
2. Update the result structure to match your backend response
3. Add proper error handling for API failures

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface elements
- Optimized spacing for different screen sizes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.
