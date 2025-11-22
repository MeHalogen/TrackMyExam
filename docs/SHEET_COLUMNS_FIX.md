# ⚠️ Google Sheet Column Names Need Update

## 🔍 Issue Detected

Your Apps Script is working perfectly! ✅ However, your Google Sheet column names don't match what the website expects.

### ❌ Current Column Names in Your Sheet:
- `EXAM`
- `APPLICATION START`
- `APPLICATION END`
- `Private/Govt/State`

### ✅ Required Column Names for Website:
- `name` - Short exam name (e.g., "JEE Main")
- `fullName` - Full exam name (e.g., "Joint Entrance Examination Main")
- `type` - G/P/S (Government/Private/State)
- `open` - Application opening date
- `close` - Application closing date
- `exam` - Exam date
- `result` - Result date
- `conductingBody` - Who conducts the exam (e.g., "NTA")
- `examMode` - Online/Offline/Hybrid
- `duration` - Exam duration (e.g., "3 hours")

---

## 🔧 Solution: Update Your Sheet (Recommended)

### Quick Fix (5 minutes):

1. **Open your Google Sheet**: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0

2. **Update the first row** to have these exact column names (case-sensitive):

```
name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
```

3. **Example data row**:

| name | fullName | type | open | close | exam | result | conductingBody | examMode | duration |
|------|----------|------|------|-------|------|--------|----------------|----------|----------|
| JEE Main Session 1 | Joint Entrance Examination Main | G | Friday, October 31, 2025 | Thursday, November 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours |
| BITSAT Session 1 | BITS Admission Test | P | Jan 2026 | Apr 2026 | May 26-30, 2026 | Date TBA | BITS | Online | 3 hours |

### Important Notes:
- **Column names** must match exactly (case-sensitive)
- **type** column values: G (National), P (Private), S (State)
- **Date format** can be flexible (e.g., "Oct 31, 2025" or "2025-10-31")

---

## 🔄 Alternative: Modify Apps Script to Map Columns

If you don't want to change your sheet structure, I can modify the Apps Script to map your current column names to the expected format.

### Modified Apps Script (Copy this instead):

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // First row contains headers
  const headers = data[0];
  const rows = data.slice(1);
  
  // Convert to array of objects with mapping
  const exams = rows.map(row => {
    const rawExam = {};
    headers.forEach((header, index) => {
      rawExam[header] = row[index];
    });
    
    // Map your column names to expected names
    return {
      name: rawExam['EXAM NAME'] || rawExam['name'] || 'Unknown Exam',
      fullName: rawExam['FULL NAME'] || rawExam['fullName'] || rawExam['EXAM NAME'] || 'Unknown',
      type: rawExam['Private/Govt/State'] || rawExam['type'] || 'G',
      open: rawExam['APPLICATION START'] || rawExam['open'] || 'TBA',
      close: rawExam['APPLICATION END'] || rawExam['close'] || 'TBA',
      exam: rawExam['EXAM'] || rawExam['exam'] || 'TBA',
      result: rawExam['RESULT'] || rawExam['result'] || 'Date TBA',
      conductingBody: rawExam['CONDUCTING BODY'] || rawExam['conductingBody'] || 'TBA',
      examMode: rawExam['MODE'] || rawExam['examMode'] || 'Online',
      duration: rawExam['DURATION'] || rawExam['duration'] || '3 hours'
    };
  });
  
  // Return as JSON
  return ContentService
    .createTextOutput(JSON.stringify({ 
      exams: exams, 
      lastUpdated: new Date(),
      totalExams: exams.length 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### To use the modified script:
1. Go back to Apps Script in your sheet
2. Replace the entire `doGet` function with the code above
3. Click Save
4. Create a new deployment (or update existing one)

---

## 🎯 Which Option Should You Choose?

### ✅ **Recommended: Update Sheet Column Names**
- **Pros**: Cleaner, matches documentation, easier to understand
- **Cons**: Need to rename columns
- **Time**: 5 minutes

### ⚙️ **Alternative: Use Modified Script**
- **Pros**: Keep your current sheet structure
- **Cons**: Need extra columns for full data (name, fullName, etc.)
- **Time**: 3 minutes

---

## 📋 Full Column Mapping Reference

If you use the modified script, add these columns to your sheet:

| Your Column | Maps To | Required? | Notes |
|-------------|---------|-----------|-------|
| EXAM NAME | name | ✅ | Short name |
| FULL NAME | fullName | ✅ | Full exam name |
| Private/Govt/State | type | ✅ | G/P/S |
| APPLICATION START | open | ✅ | Opening date |
| APPLICATION END | close | ✅ | Closing date |
| EXAM | exam | ✅ | Exam date |
| RESULT | result | ❌ | "Date TBA" if missing |
| CONDUCTING BODY | conductingBody | ✅ | NTA, BITS, etc. |
| MODE | examMode | ❌ | "Online" if missing |
| DURATION | duration | ❌ | "3 hours" if missing |

---

## ✅ After Fixing

Once you've updated your sheet OR modified the Apps Script:

1. **Test the URL** in your browser:
   ```
   https://script.google.com/macros/s/AKfycbx7d5dQxrBDAeL6M0SZIn6giDGT-yyncK5P91Xa8CFIEDoDIpjOPBlV4Jt8nQ0ccuXP4g/exec
   ```
   
2. **Check the JSON** has these fields:
   ```json
   {
     "exams": [
       {
         "name": "...",
         "fullName": "...",
         "type": "...",
         ...
       }
     ]
   }
   ```

3. **Refresh your website** and check:
   - Console: `✅ Loaded XX exams from Google Sheets`
   - Green badge: `🌐 Live from Google Sheets`
   - Exams display correctly

---

**Need help?** Let me know which option you prefer and I'll guide you through it! 🚀
