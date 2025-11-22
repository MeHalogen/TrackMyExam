# ✅ Google Sheets Setup Checklist

Use this checklist to track your progress!

## 📋 Setup Steps

### Phase 1: Prepare Your Google Sheet
- [ ] Open your sheet: https://docs.google.com/spreadsheets/d/1dqyB3iZp3bTpYhxXgcGWhrEmdONioQ9zedogmAXTx7Y/edit?gid=0#gid=0
- [ ] Verify first row has these column names (exactly):
  - [ ] name
  - [ ] fullName
  - [ ] type
  - [ ] open
  - [ ] close
  - [ ] exam
  - [ ] result
  - [ ] conductingBody
  - [ ] examMode
  - [ ] duration
- [ ] Verify you have at least one row of exam data
- [ ] Check that `type` column contains only: G, P, or S

### Phase 2: Create Apps Script
- [ ] In Google Sheet, click **Extensions** → **Apps Script**
- [ ] Delete any existing code
- [ ] Copy code from `QUICK_SETUP.md` (the `doGet` function)
- [ ] Paste code into Apps Script editor
- [ ] Click **Save** (💾 icon)
- [ ] Name it: "TrackMyExam API" or similar

### Phase 3: Deploy Apps Script
- [ ] Click **Deploy** → **New deployment**
- [ ] Click gear icon ⚙️ next to "Select type"
- [ ] Choose **Web app**
- [ ] Set **Execute as**: Me
- [ ] Set **Who has access**: Anyone
- [ ] Click **Deploy**
- [ ] If prompted, click **Authorize access**
- [ ] May need to click "Advanced" → "Go to [project name]"
- [ ] Copy the Web App URL (looks like: `https://script.google.com/macros/s/AKfycbx.../exec`)
- [ ] ⚠️ **SAVE THIS URL** - you'll need it!

### Phase 4: Test Apps Script
- [ ] Paste the Web App URL directly in your browser
- [ ] You should see JSON data like: `{"exams":[...],"lastUpdated":"..."}`
- [ ] Verify exam data is present in the JSON
- [ ] If you see an error, check "Who has access" is set to "Anyone"

### Phase 5: Update Website Config
- [ ] Open `config.js` in your code editor
- [ ] Find this line: `SHEET_API_URL: 'YOUR_APPS_SCRIPT_URL_HERE',`
- [ ] Replace `YOUR_APPS_SCRIPT_URL_HERE` with your actual URL
- [ ] Make sure the URL is in quotes
- [ ] Make sure the URL ends with `/exec`
- [ ] Save `config.js`

### Phase 6: Test Website
- [ ] Open your website in a browser
- [ ] Open Browser Console (F12 or Cmd+Option+I on Mac)
- [ ] Look for: `✅ Loaded XX exams from Google Sheets`
- [ ] Check that exams are displayed on the page
- [ ] Look for green badge: "🌐 Live from Google Sheets"
- [ ] Click the badge to test refresh functionality

### Phase 7: Verify Everything Works
- [ ] All exams are displayed correctly
- [ ] Timeline chart shows exam dates
- [ ] Filters work (National/Private/State)
- [ ] Search functionality works
- [ ] Exam detail modals open correctly
- [ ] No errors in browser console

## 🎉 Completion Checklist

- [ ] Apps Script deployed successfully
- [ ] Website loads data from Google Sheets
- [ ] Green indicator badge appears
- [ ] Console shows "✅ Loaded XX exams"
- [ ] All features work correctly
- [ ] No JavaScript errors

## 🔄 Post-Setup Tests

Test that updates work:
- [ ] Make a small change in your Google Sheet (e.g., change an exam date)
- [ ] Save the sheet (Ctrl+S / Cmd+S)
- [ ] Refresh your website
- [ ] Verify the change appears on the website
- [ ] Click indicator badge to refresh without full page reload

## 🐛 If Something Goes Wrong

### "Using cached data" appears instead of "Live from Sheets"
- [ ] Check `config.js` has correct URL
- [ ] URL must end with `/exec`
- [ ] Open URL in browser to verify it works
- [ ] Check browser console for error messages

### 403 Forbidden Error
- [ ] Go back to Apps Script
- [ ] Check deployment settings
- [ ] "Who has access" must be set to "Anyone"
- [ ] Try creating a new deployment

### Data not loading
- [ ] Verify Google Sheet has data
- [ ] First row must be column names
- [ ] Column names must match exactly (case-sensitive)
- [ ] Check browser console for errors

### No exams showing
- [ ] Fallback data should still work
- [ ] Check if `examData` array has items
- [ ] Verify `renderExamCards()` is being called
- [ ] Check for JavaScript errors in console

## 📞 Need Help?

If you're stuck:
1. ✅ Check the error in browser console
2. ✅ Read `QUICK_SETUP.md` for detailed instructions
3. ✅ Try opening the Apps Script URL directly in browser
4. ✅ Verify your Google Sheet structure matches the example
5. ✅ Check that `USE_GOOGLE_SHEETS: true` in config.js

## 🎯 Success Criteria

You'll know it's working when:
- ✅ Console shows: "✅ Loaded XX exams from Google Sheets"
- ✅ Green badge appears: "🌐 Live from Google Sheets"
- ✅ Exams display on the website
- ✅ Changes in Sheet reflect on website after refresh

---

**Once all boxes are checked, you're done! 🎉**

Your website now loads data from Google Sheets and you can update exam information without touching any code!
