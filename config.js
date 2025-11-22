// ============================================
// TRACKMYEXAM CONFIGURATION
// ============================================

// Google Sheets API Configuration
// After setting up Google Apps Script (see GOOGLE_SHEETS_SETUP.md),
// paste your Web App URL below:

window.TRACKMYEXAM_CONFIG = {
    // Your Google Apps Script Web App URL
    // Example: 'https://script.google.com/macros/s/AKfycbx.../exec'
    SHEET_API_URL: 'https://script.google.com/macros/s/AKfycbx7d5dQxrBDAeL6M0SZIn6giDGT-yyncK5P91Xa8CFIEDoDIpjOPBlV4Jt8nQ0ccuXP4g/exec',
    
    // Enable/disable Google Sheets integration
    USE_GOOGLE_SHEETS: true,
    
    // Cache duration in milliseconds (5 minutes)
    CACHE_DURATION: 5 * 60 * 1000,
    
    // Show data source indicator (disabled for cleaner UI)
    SHOW_DATA_SOURCE: false,
    
    // Debug mode - shows console logs (disable in production)
    DEBUG_MODE: false
};
