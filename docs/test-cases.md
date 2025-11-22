# TrackMyExam - Test Cases

## Test Suite Overview
Comprehensive test cases for the TrackMyExam application covering all features and user interactions.

---

## 1. Branding & Page Load Tests

### TC-001: Page Title and Branding
- **Description**: Verify correct page title and branding
- **Steps**:
  1. Open index.html in browser
  2. Check page title
  3. Check header logo text
- **Expected Result**: 
  - Page title: "TrackMyExam - Engineering Entrance Exam Tracker 2026 | Never Miss a Deadline"
  - Header shows: "TrackMyExam"
  - Subtitle: "Engineering Entrance Exams"

### TC-002: Initial Page Load
- **Description**: Verify all components load correctly
- **Steps**:
  1. Open index.html
  2. Check if all sections are visible
- **Expected Result**:
  - Header visible
  - Hero section with search bar visible
  - Stats showing "21 Exams Tracked"
  - Urgent deadlines section visible
  - Exam cards grid visible
  - Timeline chart rendered

---

## 2. Dark Mode Tests

### TC-003: Dark Mode Toggle
- **Description**: Verify dark mode toggle functionality
- **Steps**:
  1. Click on moon icon in header
  2. Observe UI changes
  3. Click sun icon to toggle back
- **Expected Result**:
  - Page background changes to dark (#0f0f0f)
  - All text remains readable
  - Cards background changes to dark (#2a2a2a)
  - Icons switch between moon and sun

### TC-004: Dark Mode Text Visibility
- **Description**: Verify all text is readable in dark mode
- **Steps**:
  1. Enable dark mode
  2. Check text in all sections
- **Expected Result**:
  - All text has sufficient contrast
  - Gray text colors are lighter (#c8c8c8 or better)
  - Card text is white/light gray
  - Input placeholders are visible

### TC-005: Light Mode Text Visibility
- **Description**: Verify all text is readable in light mode
- **Steps**:
  1. Ensure light mode is active
  2. Check text in all sections
- **Expected Result**:
  - All text has sufficient contrast
  - Gray text colors are dark enough (#4b5563 or better)
  - Card text is dark (#111827)
  - All elements are clearly visible

---

## 3. Search & Autocomplete Tests

### TC-006: Search Functionality
- **Description**: Test search/autocomplete feature
- **Steps**:
  1. Click on search bar in hero section
  2. Type "JEE"
  3. Observe autocomplete results
- **Expected Result**:
  - Autocomplete dropdown appears
  - Shows "JEE Mains Session 1" and "JEE Mains Session 2"
  - Shows "JEE Advanced 2026"

### TC-007: Autocomplete Selection
- **Description**: Test selecting from autocomplete
- **Steps**:
  1. Type "BITSAT" in search
  2. Click on "BITSAT Session 1" from results
- **Expected Result**:
  - Modal opens showing BITSAT Session 1 details
  - Search input clears
  - Autocomplete dropdown closes

### TC-008: Search No Results
- **Description**: Test search with no matching exams
- **Steps**:
  1. Type "XYZZZ" in search
  2. Observe results
- **Expected Result**:
  - No autocomplete dropdown appears
  - No error shown

---

## 4. Filter Tests

### TC-009: Quick Filter - National
- **Description**: Test quick filter for National exams
- **Steps**:
  1. Click "National" button in hero section
  2. Observe exam cards
- **Expected Result**:
  - Only National (G) exams displayed
  - Button becomes active/highlighted
  - Timeline updates to show filtered exams
  - Results count updates

### TC-010: Quick Filter - Private
- **Description**: Test quick filter for Private exams
- **Steps**:
  1. Click "Private" button
  2. Count visible cards
- **Expected Result**:
  - Only Private (P) exams displayed
  - Should show exams like BITSAT, VITEEE, MET, etc.

### TC-011: Quick Filter - State
- **Description**: Test quick filter for State exams
- **Steps**:
  1. Click "State" button
  2. Count visible cards
- **Expected Result**:
  - Only State (S) exams displayed
  - Should show MHT CET, WBJEE, KCET, etc.

### TC-012: Quick Filter - All Exams
- **Description**: Test resetting filters to show all exams
- **Steps**:
  1. Apply any filter
  2. Click "All Exams" button
- **Expected Result**:
  - All 21 exams displayed
  - "All Exams" button is active

### TC-013: Advanced Type Filter
- **Description**: Test type filters in advanced section
- **Steps**:
  1. Scroll to Advanced Filters section
  2. Click different type filter buttons
- **Expected Result**:
  - Same behavior as quick filters
  - Both filter sections sync

### TC-014: Status Filter - Open
- **Description**: Test filtering by application status
- **Steps**:
  1. Click "Open" in Status Filter
  2. Observe results
- **Expected Result**:
  - Only shows exams with applications currently open
  - Depends on current date

### TC-015: Status Filter - Upcoming
- **Description**: Test filtering upcoming exams
- **Steps**:
  1. Click "Upcoming" in Status Filter
- **Expected Result**:
  - Shows exams not yet accepting applications

### TC-016: Status Filter - Closed
- **Description**: Test filtering closed exams
- **Steps**:
  1. Click "Closed" in Status Filter
- **Expected Result**:
  - Shows exams past application deadline

### TC-017: Combined Filters
- **Description**: Test multiple filters together
- **Steps**:
  1. Select "National" type
  2. Select "Open" status
- **Expected Result**:
  - Shows only National exams that are open
  - Both filters applied simultaneously

### TC-018: Clear All Filters
- **Description**: Test clearing all filters
- **Steps**:
  1. Apply multiple filters
  2. Click "Clear All Filters"
- **Expected Result**:
  - All filters reset to "All"
  - All 21 exams shown
  - Filter buttons return to default state

---

## 5. Tracking Tests

### TC-019: Track Single Exam
- **Description**: Test tracking an exam
- **Steps**:
  1. Find any exam card
  2. Click "Track" button
- **Expected Result**:
  - Button changes to "Tracked" with checkmark
  - Button turns blue
  - Card gets blue border
  - Tracked count in sidebar increases by 1
  - Notification appears: "[Exam] is now being tracked!"

### TC-020: Untrack Exam
- **Description**: Test removing exam from tracking
- **Steps**:
  1. Find a tracked exam
  2. Click "Tracked" button
- **Expected Result**:
  - Button changes back to "Track"
  - Blue border removed from card
  - Tracked count decreases
  - Notification: "[Exam] removed from tracking"

### TC-021: Show Only Tracked
- **Description**: Test filtering tracked exams
- **Steps**:
  1. Track 2-3 exams
  2. Click "Tracked Exams" button in filters
- **Expected Result**:
  - Only tracked exams displayed
  - Button background changes to blue
  - Results count shows tracked exam count

### TC-022: Track from Modal
- **Description**: Test tracking from exam detail modal
- **Steps**:
  1. Open any exam modal
  2. Click track button in modal
- **Expected Result**:
  - Exam tracked successfully
  - Modal updates to show "Remove from Tracking"
  - Reopening modal shows tracked state

---

## 6. Sorting Tests

### TC-023: Sort by Deadline
- **Description**: Test sorting exams by deadline
- **Steps**:
  1. Select "Sort by Deadline" from dropdown
  2. Check exam order
- **Expected Result**:
  - Exams ordered by application start date
  - Earliest deadline first

### TC-024: Sort by Name
- **Description**: Test alphabetical sorting
- **Steps**:
  1. Select "Sort by Name"
  2. Check exam order
- **Expected Result**:
  - Exams in alphabetical order
  - "AEEE 2026" should be first

### TC-025: Sort by Type
- **Description**: Test sorting by exam type
- **Steps**:
  1. Select "Sort by Type"
  2. Check grouping
- **Expected Result**:
  - Exams grouped by type (G, P, S)
  - National, then Private, then State

---

## 7. Modal Tests

### TC-026: Open Exam Details Modal
- **Description**: Test opening exam detail modal
- **Steps**:
  1. Click "View Details" on any exam card
- **Expected Result**:
  - Modal opens with full screen overlay
  - Modal shows exam name in header
  - All exam details displayed

### TC-027: Modal Content Verification
- **Description**: Verify all modal sections display correctly
- **Steps**:
  1. Open JEE Mains Session 1 modal
  2. Check all sections
- **Expected Result**:
  - Overview section with type, status, conducting body
  - Important Dates section with all dates
  - Eligibility section
  - Application Process section
  - Action buttons at bottom

### TC-028: Close Modal - X Button
- **Description**: Test closing modal with X button
- **Steps**:
  1. Open modal
  2. Click X in top right
- **Expected Result**:
  - Modal closes
  - Returns to main page
  - No background scroll

### TC-029: Close Modal - Outside Click
- **Description**: Test closing modal by clicking backdrop
- **Steps**:
  1. Open modal
  2. Click on dark overlay outside modal
- **Expected Result**:
  - Modal closes

### TC-030: Modal in Dark Mode
- **Description**: Verify modal appearance in dark mode
- **Steps**:
  1. Enable dark mode
  2. Open any exam modal
- **Expected Result**:
  - Modal background is dark (#1a1a1a)
  - Text is readable with good contrast
  - All sections clearly visible

---

## 8. Timeline Chart Tests

### TC-031: Timeline Chart Rendering
- **Description**: Verify timeline chart displays correctly
- **Steps**:
  1. Scroll to timeline chart section
  2. Observe chart
- **Expected Result**:
  - Chart.js canvas renders
  - Shows horizontal bar chart
  - Blue bars for application windows
  - Red bars for exam dates
  - All 21 exams listed on Y-axis

### TC-032: Timeline Chart Hover
- **Description**: Test chart tooltips
- **Steps**:
  1. Hover over any bar in timeline
- **Expected Result**:
  - Tooltip appears
  - Shows exam name and date range
  - Tooltip is readable

### TC-033: Timeline Chart with Filters
- **Description**: Test chart updates with filters
- **Steps**:
  1. Apply "National" filter
  2. Check timeline chart
- **Expected Result**:
  - Chart updates to show only National exams
  - Number of rows reduces
  - Chart height adjusts

---

## 9. Statistics Tests

### TC-034: Hero Statistics
- **Description**: Verify hero section stats
- **Steps**:
  1. Check stats in hero section
- **Expected Result**:
  - "21 Exams Tracked"
  - Timeline: "Oct 25 - Jul 26"
  - "Days Until First Deadline" shows number

### TC-035: Sidebar Quick Stats
- **Description**: Verify sidebar statistics
- **Steps**:
  1. Check sidebar stats (desktop only)
- **Expected Result**:
  - Exams Tracked: Shows count
  - Applications Open: Shows count
  - Next Deadline: Shows days
  - Busiest Month: Shows month name

### TC-036: Exam Type Breakdown
- **Description**: Verify type breakdown bars
- **Steps**:
  1. Check sidebar type breakdown
- **Expected Result**:
  - National count and percentage bar
  - Private count and percentage bar
  - State count and percentage bar
  - All counts sum to 21

### TC-037: Dynamic Stats Update
- **Description**: Test stats update when tracking
- **Steps**:
  1. Note current tracked count
  2. Track an exam
  3. Check stats
- **Expected Result**:
  - Tracked count increases in hero and sidebar
  - Other stats remain consistent

---

## 10. Urgent Deadlines Tests

### TC-038: Urgent Deadlines Display
- **Description**: Verify urgent deadlines section
- **Steps**:
  1. Check urgent deadlines section
- **Expected Result**:
  - Shows up to 3 exams with nearest deadlines
  - Shows days remaining
  - "Closing Soon" status for exams within 3 days

### TC-039: Urgent Deadline Tracking
- **Description**: Test tracking from urgent section
- **Steps**:
  1. Click track button on urgent deadline card
- **Expected Result**:
  - Exam tracked
  - Button updates to "Tracked"
  - Notification shown

---

## 11. Responsive Design Tests

### TC-040: Mobile View
- **Description**: Test mobile responsiveness
- **Steps**:
  1. Resize browser to 375px width
  2. Check layout
- **Expected Result**:
  - Single column layout
  - Sidebar hidden on mobile
  - Cards stack vertically
  - All buttons accessible

### TC-041: Tablet View
- **Description**: Test tablet layout
- **Steps**:
  1. Resize to 768px width
- **Expected Result**:
  - 2-column card grid
  - Proper spacing maintained
  - Timeline readable

### TC-042: Desktop View
- **Description**: Test desktop layout
- **Steps**:
  1. View at 1280px or wider
- **Expected Result**:
  - 3-column main grid
  - Sidebar visible on right
  - Full feature access

---

## 12. Date Calculation Tests

### TC-043: Days Until Deadline
- **Description**: Verify deadline countdown accuracy
- **Steps**:
  1. Check any exam with known deadline
  2. Calculate expected days
  3. Compare with displayed value
- **Expected Result**:
  - Days calculation is accurate
  - Updates based on current date (2025-11-14)

### TC-044: Status Calculation - Open
- **Description**: Verify open status detection
- **Steps**:
  1. Find exam with open dates containing current date
- **Expected Result**:
  - Status shows "Application Open"
  - Green badge displayed

### TC-045: Status Calculation - Closing Soon
- **Description**: Verify closing soon detection
- **Steps**:
  1. Check exams within 3 days of deadline
- **Expected Result**:
  - Status shows "Closing Soon!"
  - Red badge with pulse animation
  - Appears in urgent deadlines

### TC-046: Status Calculation - Upcoming
- **Description**: Verify upcoming status
- **Steps**:
  1. Find exam not yet open
- **Expected Result**:
  - Status shows "Upcoming"
  - Blue badge

### TC-047: Status Calculation - Closed
- **Description**: Verify closed status
- **Steps**:
  1. Find exam past deadline
- **Expected Result**:
  - Status shows "Applications Closed"
  - Gray badge

---

## 13. Notification Tests

### TC-048: Track Notification
- **Description**: Test notification on tracking
- **Steps**:
  1. Track any exam
  2. Observe bottom of screen
- **Expected Result**:
  - Notification bar slides up
  - Shows "[Exam] is now being tracked!"
  - Blue background
  - Auto-dismisses after 5 seconds

### TC-049: Untrack Notification
- **Description**: Test notification on untracking
- **Steps**:
  1. Untrack an exam
- **Expected Result**:
  - Notification: "[Exam] removed from tracking"
  - Info style notification

### TC-050: Notification Dismiss
- **Description**: Test manual notification dismiss
- **Steps**:
  1. Trigger notification
  2. Click X button on notification
- **Expected Result**:
  - Notification closes immediately

---

## 14. Scroll & Navigation Tests

### TC-051: View All Exams Button
- **Description**: Test hero CTA scroll
- **Steps**:
  1. Click "View All Exams" button in hero
- **Expected Result**:
  - Smooth scroll to exam cards section
  - Page doesn't jump

### TC-052: Create Dashboard Button
- **Description**: Test dashboard scroll
- **Steps**:
  1. Click "Create Your Dashboard" button
- **Expected Result**:
  - Smooth scroll to dashboard/filters section

---

## 15. Edge Cases & Error Handling

### TC-053: Empty Filter Results
- **Description**: Test no results scenario
- **Steps**:
  1. Apply filters that match no exams
  2. Example: Track some exams, clear them, then click "Show Tracked"
- **Expected Result**:
  - Message: "No exams match your criteria"
  - Suggestion: "Try adjusting your filters"

### TC-054: Multiple Rapid Filters
- **Description**: Test rapid filter switching
- **Steps**:
  1. Quickly click multiple filter buttons
- **Expected Result**:
  - No errors in console
  - Last clicked filter applies
  - UI remains responsive

### TC-055: Chart with Single Exam
- **Description**: Test timeline with minimal data
- **Steps**:
  1. Filter to show single exam
  2. Check timeline chart
- **Expected Result**:
  - Chart still renders
  - Single row shown
  - No errors

---

## 16. Performance Tests

### TC-056: Initial Load Time
- **Description**: Measure page load performance
- **Steps**:
  1. Open page with DevTools Network tab
  2. Note load time
- **Expected Result**:
  - Page fully interactive in < 3 seconds
  - No console errors

### TC-057: Filter Performance
- **Description**: Test filter responsiveness
- **Steps**:
  1. Apply various filters rapidly
  2. Measure response time
- **Expected Result**:
  - Filters apply instantly (< 100ms)
  - No lag or freeze

---

## 17. Accessibility Tests

### TC-058: Keyboard Navigation
- **Description**: Test keyboard accessibility
- **Steps**:
  1. Use Tab key to navigate
  2. Check focus indicators
- **Expected Result**:
  - All interactive elements focusable
  - Focus outline visible
  - Logical tab order

### TC-059: Screen Reader Labels
- **Description**: Verify ARIA labels and semantic HTML
- **Steps**:
  1. Inspect elements
  2. Check for aria-label attributes
- **Expected Result**:
  - Buttons have descriptive labels
  - Dark mode toggle has aria-label

---

## Test Execution Summary Template

| Test ID | Test Name | Status | Date | Notes |
|---------|-----------|--------|------|-------|
| TC-001  | Page Title | ⬜ | | |
| TC-002  | Initial Load | ⬜ | | |
| ...     | ... | ⬜ | | |

**Legend:**
- ✅ Pass
- ❌ Fail
- ⚠️ Warning
- ⬜ Not Tested

---

## Bug Template

**Bug ID**: BUG-XXX  
**Severity**: Critical / High / Medium / Low  
**Test Case**: TC-XXX  
**Description**:  
**Steps to Reproduce**:  
**Expected Result**:  
**Actual Result**:  
**Screenshots**:  
**Environment**: Browser, OS, Screen Size  

---

## Notes for Testers

1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on different screen sizes
3. Clear cache before each test session
4. Use current date: November 14, 2025 for date-dependent tests
5. Take screenshots of failures
6. Check browser console for JavaScript errors
7. Test with slow network (throttling) for performance tests
