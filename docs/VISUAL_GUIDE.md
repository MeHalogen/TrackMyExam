# Google Sheets Integration - Visual Guide

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     YOUR GOOGLE SHEET                           │
│  https://docs.google.com/spreadsheets/d/1N2N2n...              │
│                                                                 │
│  ┌─────┬──────────┬──────┬───────────┬──────────┬─────┐      │
│  │name │ fullName │ type │ open      │ close    │ ... │      │
│  ├─────┼──────────┼──────┼───────────┼──────────┼─────┤      │
│  │JEE  │Joint...  │  G   │Oct 31,25  │Nov 27,25 │ ... │      │
│  │BITSAT│BITS...  │  P   │Jan 2026   │Apr 2026  │ ... │      │
│  └─────┴──────────┴──────┴───────────┴──────────┴─────┘      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                            ↓ (Google Apps Script converts to JSON)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                   APPS SCRIPT WEB APP                           │
│  https://script.google.com/macros/s/[YOUR-ID]/exec            │
│                                                                 │
│  Returns JSON:                                                  │
│  {                                                              │
│    "exams": [                                                   │
│      {                                                          │
│        "name": "JEE Main",                                      │
│        "fullName": "Joint Entrance Examination Main",          │
│        "type": "G",                                             │
│        ...                                                      │
│      }                                                          │
│    ],                                                           │
│    "lastUpdated": "2025-11-18T..."                             │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                            ↓ (fetch() from website)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR WEBSITE (app.js)                        │
│                                                                 │
│  1. Page loads                                                  │
│  2. fetchExamDataFromSheet() is called                         │
│  3. Shows loading indicator                                     │
│  4. Fetches from Apps Script URL                                │
│  5. ✅ Success → Use live data                                  │
│     ❌ Failed → Use fallback data (hardcoded in app.js)        │
│  6. renderExamCards(), renderTimeline(), etc.                  │
│  7. Show green/orange indicator badge                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    USER SEES WEBSITE                            │
│                                                                 │
│  • All 21 exams displayed                                       │
│  • Timeline chart rendered                                      │
│  • Filters and search working                                   │
│  • Green badge: "🌐 Live from Google Sheets"                   │
│  • Click badge to refresh data                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Update Process

```
You edit Google Sheet
        ↓
Press Ctrl+S / Cmd+S (auto-saves)
        ↓
User refreshes website OR clicks indicator badge
        ↓
Website fetches latest data from Apps Script
        ↓
New data displayed instantly!
```

## 📁 File Structure

```
TrackMyExam/
├── index.html ..................... Main HTML (includes config.js)
├── app.js ......................... Main logic + Google Sheets integration
├── config.js ...................... Configuration (YOUR APPS SCRIPT URL HERE!)
├── style.css ...................... Styling
├── favicon.svg .................... Browser icon
│
├── SHEETS_INTEGRATION_SUMMARY.md .. 👈 START HERE!
├── QUICK_SETUP.md ................. Step-by-step instructions
└── GOOGLE_SHEETS_SETUP.md ......... Detailed setup guide
```

## 🎯 Your Action Items

### Right Now (5 minutes):
1. ✅ Read `QUICK_SETUP.md`
2. ✅ Open your Google Sheet
3. ✅ Create Apps Script (copy-paste code)
4. ✅ Deploy as Web App
5. ✅ Copy the URL
6. ✅ Paste URL in `config.js`
7. ✅ Test your website!

### Later (optional):
- Update your Google Sheet with more exams
- Adjust the config settings in `config.js`
- Customize the indicator badge appearance

## 🎨 Configuration Options (config.js)

```javascript
window.TRACKMYEXAM_CONFIG = {
    // Your Apps Script URL (REQUIRED)
    SHEET_API_URL: 'https://script.google.com/macros/s/.../exec',
    
    // Turn integration on/off (set false to use only fallback data)
    USE_GOOGLE_SHEETS: true,
    
    // Cache duration in milliseconds (not currently used, but ready for future)
    CACHE_DURATION: 5 * 60 * 1000,
    
    // Show the "Live from Sheets" badge
    SHOW_DATA_SOURCE: true,
    
    // Show detailed console logs
    DEBUG_MODE: true
};
```

## 🎬 Demo Flow

### When URL is Configured:
1. User visits website
2. Shows: "🔄 Loading exam data from Google Sheets..."
3. Fetches data (2-3 seconds)
4. Displays exams
5. Shows: "🌐 Live from Google Sheets (21 exams)"
6. Badge auto-hides after 5 seconds
7. User can click badge to refresh

### When URL is NOT Configured:
1. User visits website
2. Console: "⚠️ Google Sheets API URL not configured"
3. Uses fallback data (21 exams from app.js)
4. Shows: "💾 Using cached data"
5. Everything still works normally!

## 💪 Benefits

| Before | After |
|--------|-------|
| Edit JavaScript code | Edit Google Sheet |
| Risk syntax errors | No code to break |
| Need to commit & push | Just save the sheet |
| Redeploy website | Instant updates |
| Only developers can update | Anyone with Sheet access |

## 🚨 Important Notes

1. **Keep fallback data updated** - In case Sheets fails, the website uses hardcoded data
2. **Column names matter** - They must match exactly (case-sensitive)
3. **Public access required** - Apps Script must be set to "Anyone can access"
4. **No authentication needed** - The data is public anyway (exam schedules)
5. **Instant updates** - No caching issues, data is fetched on every page load

---

Ready? Open `QUICK_SETUP.md` and let's get started! 🚀
