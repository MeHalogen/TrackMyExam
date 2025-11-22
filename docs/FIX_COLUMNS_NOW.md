# 🎯 Fix Your Google Sheet Columns (5 Minutes)

## 📋 Step-by-Step Instructions

### Step 1: Open Your Google Sheet
🔗 Click here: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0

### Step 2: Update Column Names in Row 1

**Current column names** → **Change to:**

| Current Name | Change To | Notes |
|-------------|-----------|-------|
| EXAM NAME (or similar) | `name` | Short exam name |
| (Add new column) | `fullName` | Full exam name |
| `Private/Govt/State` | `type` | Keep values: G, P, or S |
| `APPLICATION START` | `open` | Application opening date |
| `APPLICATION END` | `close` | Application closing date |
| `EXAM` | `exam` | Exam date |
| (Add new column) | `result` | Result date (use "Date TBA" for now) |
| (Add new column) | `conductingBody` | Who conducts it (NTA, BITS, etc.) |
| (Add new column) | `examMode` | Online/Offline/Hybrid |
| (Add new column) | `duration` | Exam duration (e.g., "3 hours") |

### Step 3: Final Column Order (Row 1)

Your first row should look exactly like this:

```
name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
```

### Step 4: Fill in Missing Data

For each exam row, add data for the new columns:

**Example Row:**
| name | fullName | type | open | close | exam | result | conductingBody | examMode | duration |
|------|----------|------|------|-------|------|--------|----------------|----------|----------|
| JEE Main Session 1 | Joint Entrance Examination Main | G | Friday, October 31, 2025 | Thursday, November 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours |

**Quick Fill Tips:**
- **result**: Use "Date TBA" for all if not known
- **conductingBody**: 
  - JEE = NTA
  - BITSAT = BITS
  - State exams = "[State] Board"
- **examMode**: Most are "Online"
- **duration**: Most are "3 hours"

---

## 📊 Complete Example Sheet Structure

Here's what your first few rows should look like:

### Row 1 (Headers):
```
name | fullName | type | open | close | exam | result | conductingBody | examMode | duration
```

### Row 2 (Example - JEE Main):
```
JEE Main Session 1 | Joint Entrance Examination Main | G | Oct 31, 2025 | Nov 27, 2025 | Jan 21-30, 2026 | Date TBA | NTA | Online | 3 hours
```

### Row 3 (Example - BITSAT):
```
BITSAT Session 1 | Birla Institute of Technology Admission Test | P | Jan 2026 | Apr 2026 | May 26-30, 2026 | Date TBA | BITS | Online | 3 hours
```

---

## ✅ After You're Done

1. **Save your sheet** (Ctrl+S / Cmd+S or it auto-saves)

2. **Test the API** - Open this URL in your browser:
   ```
   https://script.google.com/macros/s/AKfycbx7d5dQxrBDAeL6M0SZIn6giDGT-yyncK5P91Xa8CFIEDoDIpjOPBlV4Jt8nQ0ccuXP4g/exec
   ```
   
   You should see JSON with fields like:
   ```json
   {
     "exams": [
       {
         "name": "JEE Main Session 1",
         "fullName": "Joint Entrance Examination Main",
         "type": "G",
         "open": "Oct 31, 2025",
         ...
       }
     ]
   }
   ```

3. **Refresh your website**
   - Open your TrackMyExam website
   - Press F12 to open console
   - You should see: `✅ Loaded XX exams from Google Sheets`
   - Green badge: `🌐 Live from Google Sheets`
   - Your exams should display!

---

## 🎉 From Now On...

### To Update ANY Exam Data:
1. ✏️ Open Google Sheet
2. 📝 Edit the cell
3. 💾 Save (Ctrl+S)
4. 🔄 Refresh website
5. ✨ Changes appear!

### No Need To:
- ❌ Touch any code
- ❌ Use Git/GitHub
- ❌ Redeploy anything
- ❌ Ask a developer

**You're in full control!** 🚀

---

## 📞 Need Help?

- Column names must match EXACTLY (case-sensitive)
- Each column name is one word (lowercase)
- Type values must be exactly: G, P, or S
- Don't leave any cells completely empty (use "TBA" if unknown)

**You've got this!** Just rename those columns and you're done! 💪
