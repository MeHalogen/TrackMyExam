# Google Sheets Integration Setup

## Step 1: Create Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0
2. Click on **Extensions** > **Apps Script**
3. Delete any existing code
4. Copy and paste the following code:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // First row contains headers
  const headers = data[0];
  const rows = data.slice(1);
  
  // Convert to array of objects
  const exams = rows.map(row => {
    const exam = {};
    headers.forEach((header, index) => {
      exam[header] = row[index];
    });
    return exam;
  });
  
  // Return as JSON
  return ContentService
    .createTextOutput(JSON.stringify({ exams: exams, lastUpdated: new Date() }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Click **Save** (💾 icon) and name it "TrackMyExam API"
6. Click **Deploy** > **New deployment**
7. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
8. Configure:
   - **Description**: TrackMyExam Data API
   - **Execute as**: Me
   - **Who has access**: Anyone
9. Click **Deploy**
10. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...../exec`)
11. **IMPORTANT**: Save this URL - you'll need it in the next step!

## Step 2: Expected Sheet Format

Your Google Sheet should have the following columns (first row as headers):

| Column Name | Example Value | Description |
|-------------|---------------|-------------|
| name | JEE Mains Session 1 | Short exam name |
| fullName | Joint Entrance Examination Main | Full exam name |
| type | G | G=National, P=Private, S=State |
| open | Friday, October 31, 2025 | Application opening date |
| close | Thursday, November 27, 2025 | Application closing date |
| exam | Jan 21 - 30, 2026 | Exam date(s) |
| result | Date TBA | Result date |
| conductingBody | NTA | Conducting organization |
| examMode | Online | Online/Offline/Hybrid |
| duration | 3 hours | Exam duration |

## Step 3: Update Your Website

After deploying the Apps Script, you'll receive a Web App URL. Update the `SHEET_API_URL` constant in the code files with your URL.

## Troubleshooting

- **403 Error**: Make sure "Who has access" is set to "Anyone"
- **No data**: Check that your sheet has data and the first row contains headers
- **CORS Issues**: Apps Script automatically handles CORS, so this shouldn't be an issue

## Updating Data

Whenever you update the Google Sheet, the changes will be reflected on your website automatically (you may need to refresh the page or wait for the cache to clear).
