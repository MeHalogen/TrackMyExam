# Quick Setup Guide - Google Sheets Integration

## 📋 Step-by-Step Instructions

### 1️⃣ Open Your Google Sheet
Go to: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0

### 2️⃣ Make Sure Your Sheet Has These Columns (First Row):
```
name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
```

**Important**: The column names must match exactly (case-sensitive)!

### 3️⃣ Create Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

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

4. Click **Save** (💾) - Name it "TrackMyExam API"

### 4️⃣ Deploy the Script
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Set these options:
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize** the app (you may need to click "Advanced" and "Go to [project name]")
7. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

### 5️⃣ Update Your Website Configuration
1. Open `config.js` in your project
2. Find this line:
   ```javascript
   SHEET_API_URL: 'YOUR_APPS_SCRIPT_URL_HERE',
   ```
3. Replace `'YOUR_APPS_SCRIPT_URL_HERE'` with your actual URL:
   ```javascript
   SHEET_API_URL: 'https://script.google.com/macros/s/AKfycbx.../exec',
   ```
4. Save the file

### 6️⃣ Test It!
1. Open your website
2. Open Browser Console (F12 or Cmd+Option+I on Mac)
3. Look for this message:
   ```
   ✅ Loaded XX exams from Google Sheets
   ```
4. You should see a green indicator badge saying "🌐 Live from Google Sheets"

## 🎨 Data Format Example

Your Google Sheet should look like this:

| name | fullName | type | open | close | exam | result | conductingBody | examMode | duration |
|------|----------|------|------|-------|------|--------|----------------|----------|----------|
| JEE Main | Joint Entrance Examination Main | G | Oct 31, 2025 | Nov 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours |
| BITSAT | BITS Admission Test | P | Jan 2026 | Apr 2026 | May 26-30, 2026 | Date TBA | BITS | Online | 3 hours |

**Type Values**:
- `G` = National (Government)
- `P` = Private
- `S` = State

## 🔄 Updating Data

To update exam data:
1. Just edit your Google Sheet
2. Refresh your website (or click the indicator badge)
3. The new data will load automatically!

## 🐛 Troubleshooting

### "Using cached data" message
- ✅ Check that `SHEET_API_URL` in `config.js` is set correctly
- ✅ Make sure the URL ends with `/exec`
- ✅ Verify `USE_GOOGLE_SHEETS: true` in `config.js`

### 403 Error
- ✅ In Apps Script deployment, make sure "Who has access" is set to **Anyone**
- ✅ Try creating a new deployment

### No data loading
- ✅ Check your sheet has data and the first row contains the column names
- ✅ Make sure column names match exactly (case-sensitive)
- ✅ Open the Apps Script URL directly in your browser - it should show JSON data

### CORS Error
- ✅ This shouldn't happen with Apps Script, but if it does, redeploy the script

## 💡 Tips

- **Refresh Data**: Click the green indicator badge to refresh data without reloading the page
- **Debug Mode**: The console will show detailed logs when data is loaded
- **Fallback Data**: If Sheets fails, the website will use the cached data automatically
- **Live Updates**: Changes to your Sheet will be reflected immediately (no rebuild needed!)

## 🎉 You're Done!

Your website now loads exam data from Google Sheets! Update the sheet anytime and your visitors will see the latest data.
