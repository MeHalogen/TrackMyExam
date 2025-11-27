// ============================================
// GOOGLE SHEETS INTEGRATION
// ============================================
// Configuration is loaded from config.js
// Replace SHEET_API_URL in config.js with your Google Apps Script Web App URL
// See GOOGLE_SHEETS_SETUP.md for instructions

const SHEET_API_URL = window.TRACKMYEXAM_CONFIG?.SHEET_API_URL || 'YOUR_APPS_SCRIPT_URL_HERE';
const USE_GOOGLE_SHEETS = window.TRACKMYEXAM_CONFIG?.USE_GOOGLE_SHEETS !== false;
const DEBUG_MODE = window.TRACKMYEXAM_CONFIG?.DEBUG_MODE || false;

// Fallback data in case Sheet API fails or during development
const fallbackExamData = [
    { name: "JEE Mains Session 1", fullName: "Joint Entrance Examination Main", type: "G", open: "Friday, October 31, 2025", close: "Thursday, November 27, 2025", exam: "Jan 21 - 30, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "3 hours" },
    { name: "JEE Mains Session 2", fullName: "Joint Entrance Examination Main", type: "G", open: "Late Jan 2026", close: "Feb 2026", exam: "Apr 1 - 10, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "3 hours" },
    { name: "BITSAT Session 1", fullName: "Birla Institute of Technology and Science Admission Test", type: "P", open: "Jan 2026", close: "Apr 2026", exam: "May 26 - 30, 2026", result: "Date TBA", conductingBody: "BITS", examMode: "Online", duration: "3 hours" },
    { name: "BITSAT Session 2", fullName: "Birla Institute of Technology and Science Admission Test", type: "P", open: "Tuesday, May 26, 2026", close: "Wednesday, June 10, 2026", exam: "Jun 22 - 26, 2026", result: "Date TBA", conductingBody: "BITS", examMode: "Online", duration: "3 hours" },
    { name: "COMEDK UGET", fullName: "Consortium of Medical, Engineering and Dental Colleges of Karnataka Undergraduate Entrance Test", type: "P", open: "Tuesday, February 3, 2026", close: "Friday, March 20, 2026", exam: "Sunday, May 10, 2026", result: "Date TBA", conductingBody: "COMEDK", examMode: "Online", duration: "3 hours" },
    { name: "CUET", fullName: "Common University Entrance Test", type: "G", open: "Sunday, March 1, 2026", close: "Sunday, March 22, 2026", exam: "May 13 - Jun 3, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "2 hours" },
    { name: "MHT CET", fullName: "Maharashtra Common Entrance Test", type: "S", open: "Tuesday, December 30, 2025", close: "Sunday, February 15, 2026", exam: "Apr 9 - 27, 2026", result: "Date TBA", conductingBody: "Maharashtra Board", examMode: "Online", duration: "3 hours" },
    { name: "WBJEE", fullName: "West Bengal Joint Entrance Examination", type: "S", open: "Dec 2025", close: "Jan 2026", exam: "April 2026", result: "Date TBA", conductingBody: "West Bengal Board", examMode: "Online", duration: "3 hours" },
    { name: "VITEEE", fullName: "VIT Engineering Entrance Examination", type: "P", open: "Friday, October 24, 2025", close: "Tuesday, March 31, 2026", exam: "Apr 28 - May 3, 2026", result: "Date TBA", conductingBody: "VIT", examMode: "Online", duration: "2.5 hours" },
    { name: "MET 2026 (Phase 1)", fullName: "Manipal Entrance Test", type: "P", open: "Tuesday, September 30, 2025", close: "Sunday, March 15, 2026", exam: "Apr 18 - 19, 2026", result: "Date TBA", conductingBody: "Manipal", examMode: "Online", duration: "3 hours" },
    { name: "LPUNEST 2026 (Phase 1)", fullName: "Lovely Professional University National Entrance and Scholarship Test", type: "P", open: "Tuesday, October 14, 2025", close: "Thursday, January 15, 2026", exam: "Jan 10 – Feb 5, 2026", result: "Date TBA", conductingBody: "LPU", examMode: "Online", duration: "3 hours" },
    { name: "SRMJEEE 2026 - Phase 1", fullName: "SRM Joint Engineering Entrance Examination", type: "P", open: "Thursday, October 30, 2025", close: "Thursday, April 16, 2026", exam: "Apr 23 - 28, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" },
    { name: "KIITEE 2026 - Phase 1", fullName: "Kalinga Institute of Industrial Technology Entrance Examination", type: "P", open: "Tuesday, November 11, 2025", close: "Apr-26", exam: "Apr-26", result: "Date TBA", conductingBody: "KIIT", examMode: "Online", duration: "3 hours" },
    { name: "GUJCET", fullName: "Gujarat Common Entrance Test", type: "S", open: "Dec 2025 - Jan 2026", close: "Jan-26", exam: "Sunday, March 29, 2026", result: "Date TBA", conductingBody: "Gujarat Board", examMode: "Online", duration: "3 hours" },
    { name: "AEEE 2026 - Phase 1", fullName: "Amrita Engineering Entrance Examination", type: "P", open: "Wednesday, October 29, 2025", close: "Thursday, January 15, 2026", exam: "Jan 29 – Feb 1, 2026", result: "Date TBA", conductingBody: "Amrita", examMode: "Online", duration: "3 hours" },
    { name: "KCET 2026", fullName: "Karnataka Common Entrance Test", type: "S", open: "Friday, January 23, 2026", close: "Tuesday, February 24, 2026", exam: "Apr 16 - 17, 2026", result: "Date TBA", conductingBody: "Karnataka Board", examMode: "Online", duration: "3 hours" },
    { name: "KEAM 2026", fullName: "Kerala Engineering Architecture Medical Examination", type: "S", open: "Feb-26", close: "Mar-26", exam: "Apr 15 - 21, 2026", result: "Date TBA", conductingBody: "Kerala Board", examMode: "Online", duration: "3 hours" },
    { name: "TS EAMCET 2026", fullName: "Telangana State Engineering, Agriculture and Medical Common Entrance Test", type: "S", open: "Wednesday, February 25, 2026", close: "Saturday, April 4, 2026", exam: "May 2 - 5, 2026", result: "Date TBA", conductingBody: "Telangana Board", examMode: "Online", duration: "3 hours" },
    { name: "JEE Advanced 2026", fullName: "Joint Entrance Examination Advanced", type: "G", open: "Apr-26", close: "May-26", exam: "May-26", result: "Date TBA", conductingBody: "IIT", examMode: "Online", duration: "3 hours each" },
    { name: "SRMJEEE 2026 - Phase 2", fullName: "SRM Joint Engineering Entrance Examination", type: "P", open: "TBA", close: "TBA", exam: "Jun 10 - 15, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" },
    { name: "SRMJEEE 2026 - Phase 3", fullName: "SRM Joint Engineering Entrance Examination", type: "P", open: "TBA", close: "TBA", exam: "Jul 4 - 5, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" }
];

// Exam Data - will be loaded from Google Sheets or fallback
let examData = [...fallbackExamData]; // Start with fallback data immediately
let isDataFromSheet = false;
let lastDataFetch = null;

// Fetch exam data from Google Sheets
async function fetchExamDataFromSheet() {
    // Check if Google Sheets integration is enabled
    if (!USE_GOOGLE_SHEETS) {
        if (DEBUG_MODE) console.log('Google Sheets integration is disabled. Using fallback data.');
        examData = [...fallbackExamData];
        isDataFromSheet = false;
        return false;
    }
    
    // Check if URL is configured
    if (!SHEET_API_URL || SHEET_API_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
        if (DEBUG_MODE) {
            console.warn('Google Sheets API URL not configured. Using fallback data.');
            console.warn('See GOOGLE_SHEETS_SETUP.md for setup instructions.');
        }
        examData = [...fallbackExamData];
        isDataFromSheet = false;
        return false;
    }

    try {
        if (DEBUG_MODE) console.log('Fetching exam data from Google Sheets...');
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(SHEET_API_URL, {
            signal: controller.signal,
            cache: 'no-cache' // Force fresh data
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.exams && Array.isArray(data.exams) && data.exams.length > 0) {
            examData = data.exams;
            isDataFromSheet = true;
            lastDataFetch = new Date();
            if (DEBUG_MODE) console.log(`✅ Loaded ${examData.length} exams from Google Sheets`);
            if (DEBUG_MODE) console.log(`Last updated: ${data.lastUpdated}`);
            return true;
        } else {
            throw new Error('No exam data found in response');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.warn('Request timeout - using fallback data');
        } else {
            console.error('Error fetching exam data from Google Sheets:', error);
            console.warn('Using fallback data instead.');
        }
        examData = [...fallbackExamData];
        isDataFromSheet = false;
        return false;
    }
}

// Show data source indicator - DISABLED
function showDataSourceIndicator() {
    // Indicator disabled - data loads silently
    return;
}

// Month mapping for timeline 
const monthToNumeric = {
    "SEP 2025": 0.5, "OCT 2025": 1, "NOV 2025": 2, "DEC 2025": 3,
    "JAN 2026": 4, "FEB 2026": 5, "MAR 2026": 6,
    "APR 2026": 7, "MAY 2026": 8, "JUN 2026": 9, "JUL 2026": 10,
    "AUG 2026": 10.5, "SEP 2026": 11, "OCT 2026": 11.5, "NOV 2026": 12, "DEC 2026": 12.5
};

const numericToMonth = {
    1: "Oct 25", 2: "Nov 25", 3: "Dec 25", 4: "Jan 26",
    5: "Feb 26", 6: "Mar 26", 7: "Apr 26", 8: "May 26",
    9: "Jun 26", 10: "Jul 26"
};

// State Management (In-Memory)
let trackedExams = new Set();
let currentFilter = { type: 'all', status: 'all', tracked: false };
let currentSort = 'deadline';
let darkMode = false;
let timelineChart;

// Helper Functions
function extractMonthYear(dateStr) {
    if (!dateStr || dateStr.toUpperCase() === 'TBA') return null;
    const upperStr = dateStr.toUpperCase();
    
    // Handle "Month-YYYY" or "DD-Month-YYYY" format FIRST (e.g., "Dec-2025", "29-Jan-2026")
    if (upperStr.includes('-')) {
        const hyphenParts = upperStr.split('-');
        
        // Format: "Month-YYYY" (e.g., "Dec-2025")
        if (hyphenParts.length === 2) {
            const [month, year] = hyphenParts;
            if (month.length >= 3 && year.length === 4 && !isNaN(parseInt(year))) {
                return `${month.substring(0, 3)} ${year}`;
            }
            // Format: "Month-YY" (e.g., "Apr-26")
            if (month.length >= 3 && year.length === 2 && !isNaN(parseInt(year))) {
                return `${month.substring(0, 3)} 20${year}`;
            }
        }
        
        // Format: "DD-Month-YYYY" (e.g., "29-Jan-2026")
        if (hyphenParts.length === 3) {
            const [day, month, year] = hyphenParts;
            if (month.length >= 3 && year.length === 4 && !isNaN(parseInt(year))) {
                return `${month.substring(0, 3)} ${year}`;
            }
        }
    }
    
    const parts = upperStr.split(/[\s,]+/).filter(p => p); // Split by space OR comma, filter empty strings
    
    // Define valid month names
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
                        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
                        'JAN', 'FEB', 'MAR', 'APR', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    // Find the year
    const year = parts.find(p => p.length === 4 && !isNaN(parseInt(p)));
    if (!year) return null;
    
    // Define days of week to filter them out
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    
    // Find the first part that is a valid month name
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        // Skip if it's a day of week
        if (daysOfWeek.includes(part)) continue;
        // Skip if it's a number (day of month or year)
        if (!isNaN(parseInt(part))) continue;
        // Check if it's a valid month name
        if (monthNames.includes(part) || monthNames.includes(part.substring(0, 3))) {
            return `${part.substring(0, 3)} ${year}`;
        }
    }
    
    return null;
}

function parseDateRange(startStr, endStr) {
    const startMonth = extractMonthYear(startStr);
    const endMonth = extractMonthYear(endStr);
    if (!startMonth || !endMonth) return null;
    let start = monthToNumeric[startMonth];
    let end = monthToNumeric[endMonth];
    if (start === undefined || end === undefined) return null;
    return [start, end + 0.5];
}

function parseExamDate(examStr) {
    if (!examStr || examStr.toUpperCase() === 'TBA') return null;
    const extracted = extractMonthYear(examStr);
    if (!extracted) return null;
    const [startMonth] = extracted.split(' ');
    const normalizedMonthYear = extracted;
    let start = monthToNumeric[normalizedMonthYear];
    if (start === undefined) return null;
    return [start, start + 0.5];
}

function getExamStatus(exam) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate comparison
    
    // Helper function to parse dates more intelligently
    const parseDate = (dateStr) => {
        if (!dateStr || dateStr === 'TBA') return null;
        
        // Handle "Month-YY" format (e.g., "Apr-26", "Jan-26")
        const shortFormat = dateStr.match(/^([A-Za-z]{3})-(\d{2})$/);
        if (shortFormat) {
            const [, month, year] = shortFormat;
            // Assume 20XX for 2-digit years
            return new Date(`${month} 1, 20${year}`);
        }
        
        // Handle "Month YYYY" or other formats
        const parsed = new Date(dateStr);
        return isNaN(parsed.getTime()) ? null : parsed;
    };
    
    const openDate = parseDate(exam.open);
    const closeDate = parseDate(exam.close);
    
    // If we can't parse the dates, mark as upcoming
    if (!openDate || !closeDate) {
        return 'upcoming';
    }
    
    if (today > closeDate) return 'closed';
    if (today >= openDate && today <= closeDate) {
        const daysLeft = Math.ceil((closeDate - today) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 3) return 'closing-soon';
        return 'open';
    }
    return 'upcoming';
}

function getDaysUntilDeadline(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset to start of day for accurate calculation
    const deadline = new Date(dateStr);
    if (isNaN(deadline.getTime())) return null;
    const days = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : null;
}

function getTypeLabel(type) {
    return { 'G': 'National', 'P': 'Private', 'S': 'State' }[type] || 'Unknown';
}

function getTypeBadgeClass(type) {
    return { 'G': 'badge-national', 'P': 'badge-private', 'S': 'badge-state' }[type] || '';
}

function getStatusBadgeClass(status) {
    return `status-${status}`;
}

function getStatusLabel(status) {
    const labels = {
        'open': 'Application Open',
        'upcoming': 'Upcoming',
        'closed': 'Applications Closed',
        'closing-soon': 'Closing Soon!'
    };
    return labels[status] || 'Unknown';
}

// Filter and Sort Functions
function filterExams() {
    let filtered = examData.filter(exam => {
        // Type filter
        if (currentFilter.type !== 'all' && exam.type !== currentFilter.type) return false;
        
        // Status filter
        if (currentFilter.status !== 'all') {
            const status = getExamStatus(exam);
            if (status === 'closing-soon' && currentFilter.status !== 'open') return false;
            if (status !== 'closing-soon' && status !== currentFilter.status) return false;
        }
        
        // Tracked filter
        if (currentFilter.tracked && !trackedExams.has(exam.name)) return false;
        
        return true;
    });
    
    return sortExams(filtered);
}

function sortExams(exams) {
    return exams.sort((a, b) => {
        if (currentSort === 'name') {
            return a.name.localeCompare(b.name);
        } else if (currentSort === 'type') {
            return a.type.localeCompare(b.type);
        } else {
            // Sort by deadline (close date) - use actual date comparison
            const closeA = new Date(a.close);
            const closeB = new Date(b.close);
            
            // Handle invalid dates by pushing them to the end
            if (isNaN(closeA.getTime()) && isNaN(closeB.getTime())) return 0;
            if (isNaN(closeA.getTime())) return 1;
            if (isNaN(closeB.getTime())) return -1;
            
            return closeA - closeB;
        }
    });
}

// Render Functions
function renderExamCards() {
    const grid = document.getElementById('exam-cards-grid');
    const filtered = filterExams();
    
    // Always update the count, even when no exams match
    updateResultsCount(filtered.length);
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12 text-gray-500"><p class="text-lg">No exams match your criteria.</p><p class="text-sm mt-2">Try adjusting your filters.</p></div>';
        return;
    }
    
    grid.innerHTML = filtered.map(exam => {
        const status = getExamStatus(exam);
        const isTracked = trackedExams.has(exam.name);
        const daysLeft = getDaysUntilDeadline(exam.close);
        
        return `
            <div class="exam-card ${isTracked ? 'tracked' : ''}">
                <div class="exam-card-content">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <h4 class="text-lg font-bold font-montserrat mb-2">${exam.name}</h4>
                            <span class="${getStatusBadgeClass(status)}">${getStatusLabel(status)}</span>
                        </div>
                        <div class="flex flex-col items-end gap-1 ml-2">
                            <span class="${getTypeBadgeClass(exam.type)}">${getTypeLabel(exam.type)}</span>
                            ${daysLeft ? `<span class="days-left-text">${daysLeft} days left</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="space-y-2 mb-4 text-sm mt-4">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Form Start:</span>
                            <span class="font-semibold">${exam.open}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Form End:</span>
                            <span class="font-semibold ${status === 'closing-soon' ? 'text-red-600' : ''}">${exam.close}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Exam Date:</span>
                            <span class="font-semibold">${exam.exam}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Conducting Body:</span>
                            <span class="font-semibold">${exam.conductingBody}</span>
                        </div>
                    </div>
                </div>
                
                <div class="exam-card-footer">
                    <!-- HIDDEN FEATURE: Track button - preserved for future use -->
                    <!-- <button onclick="toggleTracking('${exam.name}')" class="track-btn ${isTracked ? 'tracked' : ''}">
                        <svg class="w-4 h-4" fill="${isTracked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${isTracked ? 'Tracked' : 'Track'}
                    </button> -->
                    <button onclick="showExamDetails('${exam.name}')" class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Render Exam Calendar Table
function renderExamTable() {
    const tableBody = document.getElementById('exam-table-body');
    if (!tableBody) return;
    
    // Sort exams by application opening date
    const sortedExams = [...examData].sort((a, b) => {
        const dateA = new Date(a.open);
        const dateB = new Date(b.open);
        return dateA - dateB;
    });
    
    tableBody.innerHTML = sortedExams.map(exam => {
        const status = getExamStatus(exam);
        const statusClass = getStatusBadgeClass(status);
        const typeClass = getTypeBadgeClass(exam.type);
        
        return `
            <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td class="p-3">
                    <div class="font-semibold">${exam.name}</div>
                    <div class="text-xs text-gray-500 italic">${exam.fullName}</div>
                </td>
                <td class="p-3">
                    <span class="${typeClass}">${getTypeLabel(exam.type)}</span>
                </td>
                <td class="p-3">${exam.open}</td>
                <td class="p-3">
                    <div class="font-semibold ${status === 'closing-soon' ? 'text-red-600' : ''}">${exam.close}</div>
                    ${status === 'closing-soon' ? '<div class="text-xs text-red-600">Closing Soon!</div>' : ''}
                </td>
                <td class="p-3">${exam.exam}</td>
                <td class="p-3">${exam.result}</td>
                <td class="p-3">${exam.conductingBody}</td>
            </tr>
        `;
    }).join('');
}

// HIDDEN FEATURE: Urgent Deadlines
function renderUrgentDeadlines() {
    // Function commented out as urgent deadlines section is hidden
    // const container = document.getElementById('urgent-deadlines');
    // if (!container) return; // Guard against missing element
    const container = document.getElementById('urgent-deadlines');
    if (!container) return; // Guard against missing element
    
    const urgent = examData
        .map(exam => ({ ...exam, status: getExamStatus(exam), days: getDaysUntilDeadline(exam.close) }))
        .filter(exam => exam.status === 'closing-soon' || (exam.status === 'open' && exam.days && exam.days <= 7))
        .sort((a, b) => (a.days || 100) - (b.days || 100))
        .slice(0, 3);
    
    if (urgent.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center py-8 text-gray-600"><p>No urgent deadlines at the moment. Check back later!</p></div>';
        return;
    }
    
    container.innerHTML = urgent.map(exam => `
        <div class="urgent-card">
            <div class="flex items-start justify-between mb-2">
                <h4 class="font-bold font-montserrat">${exam.name}</h4>
                <span class="${getTypeBadgeClass(exam.type)}">${getTypeLabel(exam.type)}</span>
            </div>
            <div class="text-2xl font-bold text-red-600 mb-1">${exam.days || '?'} Days Left</div>
            <div class="text-sm text-gray-600 mb-3">Closes: ${exam.close}</div>
            <button onclick="toggleTracking('${exam.name}')" class="track-btn ${trackedExams.has(exam.name) ? 'tracked' : ''} w-full justify-center">
                ${trackedExams.has(exam.name) ? 'Tracked' : 'Track This Exam'}
            </button>
        </div>
    `).join('');
}

function renderTimeline() {
    const filtered = filterExams();
    const chartLabels = [];
    const appData = [];
    const examDateData = [];
    
    console.log('=== Timeline Debug ===');
    console.log('Filtered exams:', filtered.length);
    
    // Include ALL exams in the chart, even if they have missing data
    filtered.forEach(exam => {
        chartLabels.push(exam.name);
    });
    
    // Collect data for bars - only add data objects for exams with valid dates
    filtered.forEach(exam => {
        const appRange = parseDateRange(exam.open, exam.close);
        const examRange = parseExamDate(exam.exam);
        
        console.log(`${exam.name}:`);
        console.log(`  open: "${exam.open}" -> ${extractMonthYear(exam.open)}`);
        console.log(`  close: "${exam.close}" -> ${extractMonthYear(exam.close)}`);
        console.log(`  exam: "${exam.exam}" -> ${extractMonthYear(exam.exam)}`);
        console.log(`  appRange: ${appRange}`);
        console.log(`  examRange: ${examRange}`);
        
        // Only add to data arrays if the date range is valid
        // Chart.js will only render bars that have matching y-values in labels
        if (appRange) {
            appData.push({ x: appRange, y: exam.name, fullDate: `${exam.open} - ${exam.close}` });
        }
        
        if (examRange) {
            examDateData.push({ x: examRange, y: exam.name, fullDate: `${exam.exam}` });
        }
    });
    
    console.log('appData count:', appData.length);
    console.log('examDateData count:', examDateData.length);
    console.log('===================');
    
    if (timelineChart) {
        timelineChart.data.labels = chartLabels;
        timelineChart.data.datasets[0].data = appData;
        timelineChart.data.datasets[1].data = examDateData;
        timelineChart.canvas.parentNode.style.height = `${Math.max(chartLabels.length * 45, 300)}px`;
        timelineChart.update();
    }
}

function updateSidebar() {
    // Quick Stats - HIDDEN FEATURE: Tracked elements commented out
    // document.getElementById('sidebar-tracked')?.textContent = trackedExams.size;
    const trackedEl = document.getElementById('tracked-count');
    if (trackedEl) trackedEl.textContent = trackedExams.size;
    
    const openExams = examData.filter(e => getExamStatus(e) === 'open' || getExamStatus(e) === 'closing-soon').length;
    const sidebarOpenEl = document.getElementById('sidebar-open');
    if (sidebarOpenEl) sidebarOpenEl.textContent = openExams;
    
    // HIDDEN FEATURE: Next Deadline - removed from UI
    // const nextExam = examData
    //     .map(e => ({ ...e, days: getDaysUntilDeadline(e.close) }))
    //     .filter(e => e.days)
    //     .sort((a, b) => a.days - b.days)[0];
    // const sidebarNextEl = document.getElementById('sidebar-next');
    // if (sidebarNextEl) sidebarNextEl.textContent = nextExam ? `${nextExam.days}d` : '--';
    
    // Busiest Month - Three separate stats
    // 1. Busiest month for application opens
    const openMonthCounts = {};
    examData.forEach(exam => {
        const month = extractMonthYear(exam.open);
        if (month) {
            openMonthCounts[month] = (openMonthCounts[month] || 0) + 1;
        }
    });
    const busiestOpen = Object.entries(openMonthCounts).sort((a, b) => b[1] - a[1])[0];
    const sidebarBusiestOpenEl = document.getElementById('sidebar-busiest-open');
    if (sidebarBusiestOpenEl) sidebarBusiestOpenEl.textContent = busiestOpen ? busiestOpen[0].split(' ')[0] : '--';
    
    // 2. Busiest month for application closes
    const closeMonthCounts = {};
    examData.forEach(exam => {
        const month = extractMonthYear(exam.close);
        if (month) {
            closeMonthCounts[month] = (closeMonthCounts[month] || 0) + 1;
        }
    });
    const busiestClose = Object.entries(closeMonthCounts).sort((a, b) => b[1] - a[1])[0];
    const sidebarBusiestCloseEl = document.getElementById('sidebar-busiest-close');
    if (sidebarBusiestCloseEl) sidebarBusiestCloseEl.textContent = busiestClose ? busiestClose[0].split(' ')[0] : '--';
    
    // 3. Busiest month for exams
    const examMonthCounts = {};
    examData.forEach(exam => {
        const month = extractMonthYear(exam.exam);
        if (month) {
            examMonthCounts[month] = (examMonthCounts[month] || 0) + 1;
        }
    });
    const busiestExam = Object.entries(examMonthCounts).sort((a, b) => b[1] - a[1])[0];
    const sidebarBusiestExamEl = document.getElementById('sidebar-busiest-exam');
    if (sidebarBusiestExamEl) sidebarBusiestExamEl.textContent = busiestExam ? busiestExam[0].split(' ')[0] : '--';
    
    // Type Breakdown
    const national = examData.filter(e => e.type === 'G').length;
    const private_ = examData.filter(e => e.type === 'P').length;
    const state = examData.filter(e => e.type === 'S').length;
    const total = examData.length;
    
    const breakdownNationalEl = document.getElementById('breakdown-national');
    if (breakdownNationalEl) breakdownNationalEl.textContent = national;
    const barNationalEl = document.getElementById('bar-national');
    if (barNationalEl) barNationalEl.style.width = `${(national / total) * 100}%`;
    
    const breakdownPrivateEl = document.getElementById('breakdown-private');
    if (breakdownPrivateEl) breakdownPrivateEl.textContent = private_;
    const barPrivateEl = document.getElementById('bar-private');
    if (barPrivateEl) barPrivateEl.style.width = `${(private_ / total) * 100}%`;
    
    const breakdownStateEl = document.getElementById('breakdown-state');
    if (breakdownStateEl) breakdownStateEl.textContent = state;
    const barStateEl = document.getElementById('bar-state');
    if (barStateEl) barStateEl.style.width = `${(state / total) * 100}%`;
}

function updateResultsCount(count) {
    document.getElementById('results-count').textContent = `Showing ${count} of ${examData.length} exams`;
    
    // Update hero section total count
    const totalExamsElement = document.getElementById('total-exams-count');
    if (totalExamsElement) {
        totalExamsElement.textContent = examData.length;
    }
}

// HIDDEN FEATURE: Days Until First Deadline
function updateDaysUntilFirst() {
    const daysElement = document.getElementById('days-until-first');
    if (!daysElement) return; // Guard against missing element
    
    const firstDeadline = examData
        .map(e => ({ ...e, days: getDaysUntilDeadline(e.close) }))
        .filter(e => e.days && e.days > 0)
        .sort((a, b) => a.days - b.days)[0];
    
    daysElement.textContent = firstDeadline ? firstDeadline.days : '0';
}

// Event Handlers
function toggleTracking(examName) {
    if (trackedExams.has(examName)) {
        trackedExams.delete(examName);
        showNotification(`${examName} removed from tracking`, 'info');
    } else {
        trackedExams.add(examName);
        showNotification(`${examName} is now being tracked!`, 'info');
    }
    renderExamCards();
    renderUrgentDeadlines();
    updateSidebar();
}

function showExamDetails(examName) {
    const exam = examData.find(e => e.name === examName);
    if (!exam) return;
    
    const status = getExamStatus(exam);
    const daysLeft = getDaysUntilDeadline(exam.close);
    const isTracked = trackedExams.has(exam.name);
    
    document.getElementById('modal-exam-name').textContent = exam.name;
    document.getElementById('modal-content').innerHTML = `
        <div class="space-y-6">
            <div class="pb-3 border-b border-gray-200">
                <p class="text-sm text-gray-600 italic">${exam.fullName}</p>
            </div>
            
            <div>
                <h4 class="text-lg font-bold font-montserrat mb-3">Overview</h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-gray-600">Type:</span>
                        <span class="ml-2 ${getTypeBadgeClass(exam.type)}">${getTypeLabel(exam.type)}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Status:</span>
                        <span class="ml-2 ${getStatusBadgeClass(status)}">${getStatusLabel(status)}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Conducting Body:</span>
                        <span class="ml-2 font-semibold">${exam.conductingBody}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Exam Mode:</span>
                        <span class="ml-2 font-semibold">${exam.examMode}</span>
                    </div>
                    <div>
                        <span class="text-gray-600">Duration:</span>
                        <span class="ml-2 font-semibold">${exam.duration}</span>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-bold font-montserrat mb-3">Important Dates</h4>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">Application Start</div>
                            <div class="text-sm text-gray-600">${exam.open}</div>
                        </div>
                        <div class="text-sm ${status === 'upcoming' ? 'text-blue-600' : 'text-green-600'} font-semibold">
                            ${status === 'upcoming' ? 'Upcoming' : 'Open'}
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">Application End</div>
                            <div class="text-sm text-gray-600">${exam.close}</div>
                        </div>
                        ${daysLeft ? `<div class="text-sm font-semibold ${daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'}">${daysLeft} days left</div>` : ''}
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">Exam Date</div>
                            <div class="text-sm text-gray-600">${exam.exam}</div>
                        </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <div class="font-semibold">Result Date</div>
                            <div class="text-sm text-gray-600">${exam.result}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-bold font-montserrat mb-3">Eligibility</h4>
                <p class="text-sm text-gray-600">Candidates must have completed 10+2 with Physics, Chemistry, and Mathematics with minimum 75% marks (65% for reserved categories). Age limit is typically 25 years. Please check the official website for specific requirements.</p>
            </div>
            
            <div>
                <h4 class="text-lg font-bold font-montserrat mb-3">Application Process</h4>
                <ol class="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Visit the official exam website</li>
                    <li>Register with your email and phone number</li>
                    <li>Fill in your personal and academic details</li>
                    <li>Upload required documents (photo, signature, certificates)</li>
                    <li>Pay the application fee online</li>
                    <li>Submit the application and save the confirmation</li>
                </ol>
            </div>
            
            <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <!-- HIDDEN FEATURE: Track button in modal - preserved for future use -->
                <!-- <button onclick="toggleTracking('${exam.name}'); showExamDetails('${exam.name}')" class="btn-primary px-6 py-3 rounded-lg font-semibold">
                    ${isTracked ? 'Remove from Tracking' : 'Track This Exam'}
                </button> -->
                ${exam.syllabusLink ? `<a href="${exam.syllabusLink}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all inline-block">
                    View Syllabus
                </a>` : ''}
                ${exam.officialWebsite ? `<a href="${exam.officialWebsite}" target="_blank" rel="noopener noreferrer" class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all inline-block">
                    Visit Official Website
                </a>` : ''}
                <!-- HIDDEN FEATURE: Set Reminder button - preserved for future use -->
                <!-- <button class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all">
                    Set Reminder
                </button> -->
            </div>
        </div>
    `;
    
    document.getElementById('exam-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('exam-modal').classList.add('hidden');
}

function openContactModal() {
    document.getElementById('contact-modal').classList.remove('hidden');
}

function closeContactModal() {
    document.getElementById('contact-modal').classList.add('hidden');
}

function showNotification(message, type = 'info') {
    const bar = document.getElementById('notification-bar');
    const typeClass = `notification-${type}`;
    
    bar.innerHTML = `
        <div class="notification-bar ${typeClass}">
            <div class="flex items-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span class="font-semibold">${message}</span>
            </div>
            <button onclick="hideNotification()" class="p-2 hover:bg-black/10 rounded-lg transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    bar.classList.remove('translate-y-full');
    bar.classList.add('translate-y-0');
    
    setTimeout(hideNotification, 5000);
}

function hideNotification() {
    const bar = document.getElementById('notification-bar');
    bar.classList.remove('translate-y-0');
    bar.classList.add('translate-y-full');
}

// Update page title and meta description based on current filter
function updateSEOMeta() {
    let title = 'TrackMyExam - Engineering Entrance Exam Tracker 2026';
    let description = 'Track all major engineering entrance exams across India including JEE, BITSAT, MHT CET and more. Never miss an application deadline.';
    
    // Check if a specific filter is active
    if (currentFilter.type && currentFilter.type !== 'all') {
        const filterTitles = {
            'upcoming': 'Upcoming Engineering Entrance Exams 2026',
            'open': 'Open for Registration - Engineering Exams 2026',
            'closed': 'Closed Engineering Exams 2026',
            'G': 'Government Engineering Entrance Exams 2026',
            'P': 'Private University Engineering Entrance Exams 2026',
            'S': 'State-Level Engineering Entrance Exams 2026'
        };
        
        const filterDescriptions = {
            'upcoming': 'View all upcoming engineering entrance exams in India for 2026. Stay updated with exam dates and registration deadlines for JEE, BITSAT, and more.',
            'open': 'Engineering entrance exams currently open for registration in 2026. Apply now for JEE Main, BITSAT, MHT CET, and other major exams.',
            'closed': 'Past engineering entrance exams with closed registration for 2026. Check results and important dates.',
            'G': 'Track all government-conducted engineering entrance exams like JEE Main, JEE Advanced, and CUET for 2026 admissions.',
            'P': 'View dates and deadlines for private university engineering exams including BITSAT, VITEEE, SRMJEEE, and more.',
            'S': 'State-level engineering entrance exams including MHT CET, WBJEE, KCET, TS EAMCET, and other state CETs for 2026.'
        };
        
        if (filterTitles[currentFilter.type]) {
            title = `${filterTitles[currentFilter.type]} | TrackMyExam`;
            description = filterDescriptions[currentFilter.type];
        }
    }
    
    // Update title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute('content', title);
    }
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute('content', description);
    }
    
    // Update Twitter meta tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.setAttribute('content', title);
    }
    
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
        twitterDescription.setAttribute('content', description);
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    document.getElementById('moon-icon').classList.toggle('hidden', darkMode);
    document.getElementById('sun-icon').classList.toggle('hidden', !darkMode);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    // Reinitialize chart with updated colors
    if (timelineChart) {
        timelineChart.destroy();
    }
    initializeChart();
    renderTimeline();
}

function initializeDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        darkMode = true;
        document.body.classList.add('dark-mode');
        document.getElementById('moon-icon').classList.add('hidden');
        document.getElementById('sun-icon').classList.remove('hidden');
    } else {
        darkMode = false;
        document.body.classList.remove('dark-mode');
        document.getElementById('moon-icon').classList.remove('hidden');
        document.getElementById('sun-icon').classList.add('hidden');
    }
}

function scrollToExams() {
    document.getElementById('exam-cards-section').scrollIntoView({ behavior: 'smooth' });
}

function scrollToDashboard() {
    document.getElementById('dashboard-section').scrollIntoView({ behavior: 'smooth' });
}

// Autocomplete
function setupAutocomplete() {
    const input = document.getElementById('hero-search');
    const results = document.getElementById('autocomplete-results');
    
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            results.classList.add('hidden');
            return;
        }
        
        const matches = examData.filter(exam => 
            exam.name.toLowerCase().includes(query) ||
            exam.conductingBody.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (matches.length === 0) {
            results.classList.add('hidden');
            return;
        }
        
        results.innerHTML = matches.map(exam => `
            <div class="autocomplete-item" onclick="selectExam('${exam.name}')">
                <div class="font-semibold">${exam.name}</div>
                <div class="text-xs text-gray-600 mt-1">${exam.conductingBody} • ${getTypeLabel(exam.type)}</div>
            </div>
        `).join('');
        
        results.classList.remove('hidden');
    });
    
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !results.contains(e.target)) {
            results.classList.add('hidden');
        }
    });
}

function selectExam(examName) {
    document.getElementById('autocomplete-results').classList.add('hidden');
    document.getElementById('hero-search').value = '';
    showExamDetails(examName);
}

// Initialize Chart
function initializeChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) {
        console.error('Timeline chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context for timeline chart');
        return;
    }
    
    // Destroy existing chart if it exists
    if (timelineChart) {
        timelineChart.destroy();
        timelineChart = null;
    }
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    const textColor = isDarkMode ? '#ffffff' : '#000000';
    const gridColor = isDarkMode ? '#3a3a3a' : '#e5e7eb';
    
    try {
        timelineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Application Window',
                    data: [],
                    backgroundColor: 'rgba(26, 115, 232, 0.7)',
                    borderColor: 'rgba(26, 115, 232, 1)',
                    borderWidth: 1.5,
                    borderRadius: 4,
                    borderSkipped: false,
                    barThickness: 10, // Slightly thinner bars
                },
                {
                    label: 'Exam Window',
                    data: [],
                    backgroundColor: 'rgba(234, 67, 53, 0.8)',
                    borderColor: 'rgba(234, 67, 53, 1)',
                    borderWidth: 1.5,
                    borderRadius: 4,
                    borderSkipped: false,
                    barThickness: 10, // Slightly thinner bars
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'y',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 13,
                            weight: 'bold'
                        },
                        color: textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.raw && context.raw.fullDate) {
                                return `${label}${context.raw.fullDate}`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: 0.5,
                    max: 10.5,
                    stacked: false, // Disable stacking on x-axis
                    ticks: {
                        callback: function(value) {
                            return numericToMonth[value] || '';
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: textColor
                    },
                    grid: { 
                        display: true,
                        color: gridColor
                    }
                },
                y: {
                    stacked: false, // Disable stacking on y-axis - this is the key!
                    offset: true,
                    grid: { display: false },
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: textColor
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 5,
                    bottom: 5
                }
            }
        }
    });
    } catch (error) {
        console.error('Failed to initialize timeline chart:', error);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize dark mode from localStorage first
    initializeDarkMode();
    
    // Show loading overlay
    const loadingOverlay = document.getElementById('global-loading');
    
    try {
        // Fetch fresh data from Google Sheets first
        const sheetsLoaded = await fetchExamDataFromSheet();
        
        // Initialize chart with data loaded
        initializeChart();
        
        // Render with the loaded data (either from Sheets or fallback)
        renderExamCards();
        renderExamTable();
        renderUrgentDeadlines();
        renderTimeline();
        updateSidebar();
        updateDaysUntilFirst();
        
        // Data source indicator disabled
        // showDataSourceIndicator();
    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        // Hide loading overlay after everything is loaded
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 300); // Small delay for smooth transition
    }
    
    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
    
    // Helper function to sync filter UI state
    function syncFilterUI() {
        // Sync Quick Filters (Hero buttons)
        document.querySelectorAll('.quick-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === currentFilter.type) {
                btn.classList.add('active');
            }
        });
        
        // Sync Advanced Type Filters
        document.querySelectorAll('.type-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.typeFilter === currentFilter.type) {
                btn.classList.add('active');
            }
        });
        
        // Sync Advanced Status Filters
        document.querySelectorAll('.status-filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.statusFilter === currentFilter.status) {
                btn.classList.add('active');
            }
        });
    }
    
    // Quick Filters (Hero) - Now syncs with Advanced Filters and scrolls to exam cards
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter.type = e.target.dataset.filter;
            // Don't reset status - keep whatever the user has selected in Advanced Filters
            // Only reset if user hasn't used Advanced Filters yet (status is 'all')
            syncFilterUI();
            updateSEOMeta(); // Update SEO meta tags
            renderExamCards();
            renderTimeline();
            
            // Scroll to exam cards section smoothly
            const examCardsSection = document.querySelector('#exam-cards-grid');
            if (examCardsSection) {
                examCardsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Type Filters (Advanced) - Now syncs with Quick Filters
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter.type = e.target.dataset.typeFilter;
            syncFilterUI();
            updateSEOMeta(); // Update SEO meta tags
            renderExamCards();
            renderTimeline();
        });
    });
    
    // Status Filters (Advanced)
    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter.status = e.target.dataset.statusFilter;
            syncFilterUI();
            updateSEOMeta(); // Update SEO meta tags
            renderExamCards();
            renderTimeline();
        });
    });
    
    // HIDDEN FEATURE: Show Tracked
    // document.getElementById('show-tracked').addEventListener('click', () => {
    //     currentFilter.tracked = !currentFilter.tracked;
    //     document.getElementById('show-tracked').classList.toggle('bg-blue-600');
    //     document.getElementById('show-tracked').classList.toggle('text-white');
    //     renderExamCards();
    //     renderTimeline();
    // });
    
    // Clear Filters
    document.getElementById('clear-filters').addEventListener('click', () => {
        currentFilter = { type: 'all', status: 'all', tracked: false };
        syncFilterUI();
        renderExamCards();
        renderTimeline();
    });
    
    // Sort
    document.getElementById('sort-select').addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderExamCards();
        renderTimeline();
    });
    
    // Modal Close on Outside Click
    document.getElementById('exam-modal').addEventListener('click', (e) => {
        if (e.target.id === 'exam-modal') closeModal();
    });
    
    // Contact Modal Close on Outside Click
    document.getElementById('contact-modal').addEventListener('click', (e) => {
        if (e.target.id === 'contact-modal') closeContactModal();
    });
    
    // Autocomplete
    setupAutocomplete();
});