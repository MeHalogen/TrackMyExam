# 🎯 TrackMyExam - Google Sheets Quick Start

## Your Google Sheet
🔗 **Direct Link**: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0

---

## ⚡ 3-Step Setup (5 minutes)

### Step 1: Open Apps Script
1. Click the link above to open your sheet
2. In the menu, click **Extensions** → **Apps Script**
3. You'll see a code editor

### Step 2: Add the Code
1. **Delete** any existing code in the editor
2. **Copy** this code:

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

3. **Paste** it into the Apps Script editor
4. Click **💾 Save** (or Ctrl+S / Cmd+S)
5. Name the project: "TrackMyExam API"

### Step 3: Deploy as Web App
1. Click **Deploy** button (top right)
2. Select **New deployment**
3. Click the ⚙️ gear icon next to "Select type"
4. Choose **Web app**
5. Fill in:
   - **Description**: TrackMyExam Data API
   - **Execute as**: Me (your email)
   - **Who has access**: **Anyone** ⚠️ IMPORTANT!
6. Click **Deploy**
7. You may need to authorize:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** (if shown)
   - Click **Go to TrackMyExam API (unsafe)** (it's safe, Google just warns you)
   - Click **Allow**
8. **COPY THE WEB APP URL** 📋
   - It looks like: `https://script.google.com/macros/s/AKfycbx.../exec`
   - Keep this URL safe!

---

## 🔧 Update Your Website

### Open `config.js` in your project:
```javascript
window.TRACKMYEXAM_CONFIG = {
    // Paste your Web App URL here (inside the quotes):
    SHEET_API_URL: 'https://script.google.com/macros/s/YOUR_ID_HERE/exec',
    
    USE_GOOGLE_SHEETS: true,
    CACHE_DURATION: 5 * 60 * 1000,
    SHOW_DATA_SOURCE: true,
    DEBUG_MODE: true
};
```

**Replace** the `SHEET_API_URL` value with your actual URL from Step 3!

---

## ✅ Test It

### 1. Test the URL directly:
- Open the Web App URL in your browser
- You should see JSON data like:
```json
{
  "exams": [...],
  "lastUpdated": "2025-11-18T..."
}
```

### 2. Test your website:
- Open your website
- Press **F12** to open Developer Console
- Look for:
  ```
  ✅ Loaded 21 exams from Google Sheets
  ```
- You should see a green badge: **🌐 Live from Google Sheets (21 exams)**

---

## 📊 Your Sheet Format

Make sure your first row has these column names (exactly):

```
name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
```

### Example Row:
```
JEE Main | Joint Entrance Examination Main | G | Oct 31, 2025 | Nov 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours
```

### Type Values:
- **G** = National/Government exams
- **P** = Private college exams  
- **S** = State-level exams

---

## 🐛 Troubleshooting

### ❌ "Using cached data" message
**Problem**: Website not loading from Google Sheets  
**Solution**: 
- Check `config.js` has the correct URL
- URL must end with `/exec`
- Try opening the URL in browser to verify it works

### ❌ 403 Forbidden Error
**Problem**: Permission denied  
**Solution**: 
- Go back to Apps Script
- Click **Deploy** → **Manage deployments**
- Edit the deployment
- Make sure "Who has access" is set to **Anyone**
- Click **Deploy**

### ❌ No exams showing
**Problem**: Sheet data not loading  
**Solution**: 
- Check first row has the correct column names
- Column names are case-sensitive!
- Make sure you have data rows below the header
- Check browser console (F12) for error messages

### ❌ Authorization issues
**Problem**: Can't authorize the script  
**Solution**: 
- Click "Advanced" on the warning screen
- Click "Go to [project name] (unsafe)"
- This is your own script, so it's safe
- Click "Allow" to grant permissions

---

## 🎉 Success Checklist

Once you're done, you should have:
- ✅ Apps Script deployed as Web App
- ✅ Web App URL copied
- ✅ URL pasted in `config.js`
- ✅ Website showing green badge
- ✅ Console showing "✅ Loaded XX exams"
- ✅ Exams displaying on website

---

## 🔄 How to Update Exam Data

### The Easy Way (New):
1. Open your Google Sheet
2. Edit any exam information
3. Press Ctrl+S / Cmd+S (auto-saves)
4. Refresh your website
5. ✨ Changes appear instantly!

### Click to Refresh:
- Click the green "🌐 Live from Google Sheets" badge
- Data reloads without refreshing the entire page

---

## 📞 Need More Help?

Check these files in order:
1. **QUICK_SETUP.md** - Detailed setup instructions
2. **SETUP_CHECKLIST.md** - Track your progress
3. **GOOGLE_SHEETS_SETUP.md** - Full documentation
4. **VISUAL_GUIDE.md** - Diagrams and explanations

---

## 🚀 You're Ready!

Your Google Sheet is at:
https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0

Just follow the 3 steps above and you'll be live in 5 minutes! 🎯
