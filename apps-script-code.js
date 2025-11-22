/**
 * TrackMyExam - Google Sheets API
 * 
 * This Apps Script converts your Google Sheet data into JSON format
 * that your website can fetch and display.
 * 
 * HOW TO USE:
 * 1. Copy this entire code
 * 2. In your Google Sheet, go to Extensions → Apps Script
 * 3. Paste this code (replace any existing code)
 * 4. Click Save (💾 icon)
 * 5. Click Deploy → New deployment
 * 6. Choose "Web app"
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy
 * 9. Copy the Web App URL
 * 10. Paste it in config.js on your website
 */

function doGet(e) {
  // Get the active sheet (the one currently open/first sheet)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // First row contains the column headers
  const headers = data[0];
  
  // All other rows contain exam data
  const rows = data.slice(1);
  
  // Convert rows to array of objects
  // Each row becomes an object with keys from headers
  const exams = rows.map(row => {
    const exam = {};
    headers.forEach((header, index) => {
      exam[header] = row[index];
    });
    return exam;
  });
  
  // Create the response object
  const response = {
    exams: exams,
    lastUpdated: new Date().toISOString(),
    totalExams: exams.length
  };
  
  // Return as JSON
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * EXPECTED SHEET FORMAT:
 * 
 * Row 1 (Headers):
 * name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
 * 
 * Row 2+ (Data):
 * JEE Main | Joint Entrance... | G | Oct 31, 2025 | Nov 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours
 * BITSAT | BITS Admission... | P | Jan 2026 | Apr 2026 | May 26-30, 2026 | Date TBA | BITS | Online | 3 hours
 * ...
 * 
 * IMPORTANT:
 * - First row MUST be headers
 * - Column names must match exactly (case-sensitive)
 * - Empty cells will be returned as empty strings
 * 
 * OUTPUT EXAMPLE:
 * {
 *   "exams": [
 *     {
 *       "name": "JEE Main",
 *       "fullName": "Joint Entrance Examination Main",
 *       "type": "G",
 *       "open": "Oct 31, 2025",
 *       "close": "Nov 27, 2025",
 *       "exam": "Jan 21-30, 2026",
 *       "result": "Date TBA",
 *       "conductingBody": "NTA",
 *       "examMode": "Online",
 *       "duration": "3 hours"
 *     },
 *     ...
 *   ],
 *   "lastUpdated": "2025-11-18T12:34:56.789Z",
 *   "totalExams": 21
 * }
 */

/**
 * TEST FUNCTION (Optional)
 * You can run this function in Apps Script to test if your sheet structure is correct
 * Just click the Run button with this function selected
 */
function testSheetStructure() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  Logger.log("Testing sheet structure...");
  Logger.log("Headers found: " + headers.join(", "));
  Logger.log("Number of data rows: " + (data.length - 1));
  
  // Check required headers
  const requiredHeaders = ['name', 'fullName', 'type', 'open', 'close', 'exam', 'result', 'conductingBody', 'examMode', 'duration'];
  const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
  
  if (missingHeaders.length > 0) {
    Logger.log("⚠️ WARNING: Missing required headers: " + missingHeaders.join(", "));
  } else {
    Logger.log("✅ All required headers are present!");
  }
  
  // Show first exam as example
  if (data.length > 1) {
    const firstExam = {};
    headers.forEach((header, index) => {
      firstExam[header] = data[1][index];
    });
    Logger.log("First exam data:");
    Logger.log(JSON.stringify(firstExam, null, 2));
  }
}
