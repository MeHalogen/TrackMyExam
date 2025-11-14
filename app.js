// Exam Data with Enhanced Information
const examData = [
    { name: "JEE Mains Session 1", type: "G", open: "Friday, October 31, 2025", close: "Thursday, November 27, 2025", exam: "Jan 21 - 30, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "3 hours" },
    { name: "JEE Mains Session 2", type: "G", open: "Late Jan 2026", close: "Feb 2026", exam: "Apr 1 - 10, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "3 hours" },
    { name: "BITSAT Session 1", type: "P", open: "Jan 2026", close: "Apr 2026", exam: "May 26 - 30, 2026", result: "Date TBA", conductingBody: "BITS", examMode: "Online", duration: "3 hours" },
    { name: "BITSAT Session 2", type: "P", open: "Tuesday, May 26, 2026", close: "Wednesday, June 10, 2026", exam: "Jun 22 - 26, 2026", result: "Date TBA", conductingBody: "BITS", examMode: "Online", duration: "3 hours" },
    { name: "COMEDK UGET", type: "P", open: "Tuesday, February 3, 2026", close: "Friday, March 20, 2026", exam: "Sunday, May 10, 2026", result: "Date TBA", conductingBody: "COMEDK", examMode: "Online", duration: "3 hours" },
    { name: "CUET", type: "G", open: "Sunday, March 1, 2026", close: "Sunday, March 22, 2026", exam: "May 13 - Jun 3, 2026", result: "Date TBA", conductingBody: "NTA", examMode: "Online", duration: "2 hours" },
    { name: "MHT CET", type: "S", open: "Tuesday, December 30, 2025", close: "Sunday, February 15, 2026", exam: "Apr 9 - 27, 2026", result: "Date TBA", conductingBody: "Maharashtra Board", examMode: "Online", duration: "3 hours" },
    { name: "WBJEE", type: "S", open: "Dec 2025", close: "Jan 2026", exam: "April 2026", result: "Date TBA", conductingBody: "West Bengal Board", examMode: "Online", duration: "3 hours" },
    { name: "VITEEE", type: "P", open: "Friday, October 24, 2025", close: "Tuesday, March 31, 2026", exam: "Apr 28 - May 3, 2026", result: "Date TBA", conductingBody: "VIT", examMode: "Online", duration: "2.5 hours" },
    { name: "MET 2026 (Phase 1)", type: "P", open: "Tuesday, September 30, 2025", close: "Sunday, March 15, 2026", exam: "Apr 18 - 19, 2026", result: "Date TBA", conductingBody: "Manipal", examMode: "Online", duration: "3 hours" },
    { name: "LPUNEST 2026 (Phase 1)", type: "P", open: "Tuesday, October 14, 2025", close: "Thursday, January 15, 2026", exam: "Jan 10 – Feb 5, 2026", result: "Date TBA", conductingBody: "LPU", examMode: "Online", duration: "3 hours" },
    { name: "SRMJEEE 2026 - Phase 1", type: "P", open: "Thursday, October 30, 2025", close: "Thursday, April 16, 2026", exam: "Apr 23 - 28, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" },
    { name: "KIITEE 2026 - Phase 1", type: "P", open: "Tuesday, November 11, 2025", close: "Apr-26", exam: "Apr-26", result: "Date TBA", conductingBody: "KIIT", examMode: "Online", duration: "3 hours" },
    { name: "GUJCET", type: "S", open: "Dec 2025 - Jan 2026", close: "Jan-26", exam: "Sunday, March 29, 2026", result: "Date TBA", conductingBody: "Gujarat Board", examMode: "Online", duration: "3 hours" },
    { name: "AEEE 2026 - Phase 1", type: "P", open: "Wednesday, October 29, 2025", close: "Thursday, January 15, 2026", exam: "Jan 29 – Feb 1, 2026", result: "Date TBA", conductingBody: "Amrita", examMode: "Online", duration: "3 hours" },
    { name: "KCET 2026", type: "S", open: "Friday, January 23, 2026", close: "Tuesday, February 24, 2026", exam: "Apr 16 - 17, 2026", result: "Date TBA", conductingBody: "Karnataka Board", examMode: "Online", duration: "3 hours" },
    { name: "KEAM 2026", type: "S", open: "Feb-26", close: "Mar-26", exam: "Apr 15 - 21, 2026", result: "Date TBA", conductingBody: "Kerala Board", examMode: "Online", duration: "3 hours" },
    { name: "TS EAMCET 2026", type: "S", open: "Wednesday, February 25, 2026", close: "Saturday, April 4, 2026", exam: "May 2 - 5, 2026", result: "Date TBA", conductingBody: "Telangana Board", examMode: "Online", duration: "3 hours" },
    { name: "JEE Advanced 2026", type: "G", open: "Apr-26", close: "May-26", exam: "May-26", result: "Date TBA", conductingBody: "IIT", examMode: "Online", duration: "3 hours each" },
    { name: "SRMJEEE 2026 - Phase 2", type: "P", open: "TBA", close: "TBA", exam: "Jun 10 - 15, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" },
    { name: "SRMJEEE 2026 - Phase 3", type: "P", open: "TBA", close: "TBA", exam: "Jul 4 - 5, 2026", result: "Date TBA", conductingBody: "SRM", examMode: "Online", duration: "3 hours" }
];

// Month mapping for timeline
const monthToNumeric = {
    "SEP 2025": 0.5, "OCT 2025": 1, "NOV 2025": 2, "DEC 2025": 3,
    "JAN 2026": 4, "FEB 2026": 5, "MAR 2026": 6,
    "APR 2026": 7, "MAY 2026": 8, "JUN 2026": 9, "JUL 2026": 10
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
    const parts = upperStr.split(' ');
    
    if (parts.length >= 4 && parts[parts.length - 1].length === 4 && !isNaN(parseInt(parts[parts.length - 1]))) {
        if (parts.length > 3 && parts[1].length >= 3) {
            const month = parts[1].replace(',', '');
            const year = parts[parts.length - 1];
            return `${month.substring(0, 3)} ${year}`.toUpperCase();
        }
    }
    
    if (dateStr.includes('-') || dateStr.includes('–')) {
        const startPart = dateStr.split(/[-–]/)[0].trim();
        return extractMonthYear(startPart);
    }
    
    if (parts.length >= 1) {
        const lastPart = parts[parts.length - 1];
        const secondLastPart = parts.length > 1 ? parts[parts.length - 2] : '';
        
        if (lastPart.includes('-') && lastPart.split('-').length === 2) {
            const [month, yearDigits] = lastPart.split('-');
            return `${month.substring(0, 3)} 20${yearDigits}`.toUpperCase();
        }
        
        if (lastPart.length === 4 && !isNaN(parseInt(lastPart)) && parseInt(lastPart) >= 2025) {
            if (secondLastPart.length >= 3 && isNaN(parseInt(secondLastPart))) {
                return `${secondLastPart.substring(0, 3)} ${lastPart}`.toUpperCase();
            }
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
    const today = new Date('2025-11-14');
    const openDate = new Date(exam.open);
    const closeDate = new Date(exam.close);
    
    if (isNaN(openDate.getTime()) || isNaN(closeDate.getTime())) {
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
    const today = new Date('2025-11-14');
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
            const openA = monthToNumeric[extractMonthYear(a.open)] || 100;
            const openB = monthToNumeric[extractMonthYear(b.open)] || 100;
            return openA - openB;
        }
    });
}

// Render Functions
function renderExamCards() {
    const grid = document.getElementById('exam-cards-grid');
    const filtered = filterExams();
    
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
                <div class="flex items-start justify-between mb-3">
                    <h4 class="text-lg font-bold font-montserrat flex-1">${exam.name}</h4>
                    <span class="${getTypeBadgeClass(exam.type)} ml-2">${getTypeLabel(exam.type)}</span>
                </div>
                
                <div class="flex items-center gap-2 mb-4">
                    <span class="${getStatusBadgeClass(status)}">${getStatusLabel(status)}</span>
                    ${daysLeft ? `<span class="text-xs text-gray-600">${daysLeft} days left</span>` : ''}
                </div>
                
                <div class="space-y-2 mb-4 text-sm">
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
                
                <div class="flex gap-2 pt-4 border-t border-gray-200">
                    <button onclick="toggleTracking('${exam.name}')" class="track-btn ${isTracked ? 'tracked' : ''}">
                        <svg class="w-4 h-4" fill="${isTracked ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        ${isTracked ? 'Tracked' : 'Track'}
                    </button>
                    <button onclick="showExamDetails('${exam.name}')" class="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold text-sm transition-all">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    updateResultsCount(filtered.length);
}

function renderUrgentDeadlines() {
    const container = document.getElementById('urgent-deadlines');
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
    
    filtered.forEach(exam => {
        const appRange = parseDateRange(exam.open, exam.close);
        const examRange = parseExamDate(exam.exam);
        
        if (appRange || examRange) {
            chartLabels.push(exam.name);
            appData.push(appRange ? { x: appRange, y: exam.name, fullDate: `${exam.open} - ${exam.close}` } : undefined);
            examDateData.push(examRange ? { x: examRange, y: exam.name, fullDate: `${exam.exam}` } : undefined);
        }
    });
    
    if (timelineChart) {
        timelineChart.data.labels = chartLabels;
        timelineChart.data.datasets[0].data = appData;
        timelineChart.data.datasets[1].data = examDateData;
        timelineChart.canvas.parentNode.style.height = `${Math.max(chartLabels.length * 45, 300)}px`;
        timelineChart.update();
    }
}

function updateSidebar() {
    // Quick Stats
    document.getElementById('sidebar-tracked').textContent = trackedExams.size;
    document.getElementById('tracked-count').textContent = trackedExams.size;
    
    const openExams = examData.filter(e => getExamStatus(e) === 'open' || getExamStatus(e) === 'closing-soon').length;
    document.getElementById('sidebar-open').textContent = openExams;
    
    // Next Deadline
    const nextExam = examData
        .map(e => ({ ...e, days: getDaysUntilDeadline(e.close) }))
        .filter(e => e.days)
        .sort((a, b) => a.days - b.days)[0];
    document.getElementById('sidebar-next').textContent = nextExam ? `${nextExam.days}d` : '--';
    
    // Busiest Month
    const monthCounts = {};
    examData.forEach(exam => {
        const month = extractMonthYear(exam.exam);
        if (month) {
            monthCounts[month] = (monthCounts[month] || 0) + 1;
        }
    });
    const busiest = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('sidebar-busiest').textContent = busiest ? busiest[0].split(' ')[0] : '--';
    
    // Type Breakdown
    const national = examData.filter(e => e.type === 'G').length;
    const private_ = examData.filter(e => e.type === 'P').length;
    const state = examData.filter(e => e.type === 'S').length;
    const total = examData.length;
    
    document.getElementById('breakdown-national').textContent = national;
    document.getElementById('bar-national').style.width = `${(national / total) * 100}%`;
    
    document.getElementById('breakdown-private').textContent = private_;
    document.getElementById('bar-private').style.width = `${(private_ / total) * 100}%`;
    
    document.getElementById('breakdown-state').textContent = state;
    document.getElementById('bar-state').style.width = `${(state / total) * 100}%`;
}

function updateResultsCount(count) {
    document.getElementById('results-count').textContent = `Showing ${count} of ${examData.length} exams`;
}

function updateDaysUntilFirst() {
    const firstDeadline = examData
        .map(e => ({ ...e, days: getDaysUntilDeadline(e.close) }))
        .filter(e => e.days && e.days > 0)
        .sort((a, b) => a.days - b.days)[0];
    
    document.getElementById('days-until-first').textContent = firstDeadline ? firstDeadline.days : '0';
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
                <button onclick="toggleTracking('${exam.name}'); showExamDetails('${exam.name}')" class="btn-primary px-6 py-3 rounded-lg font-semibold">
                    ${isTracked ? 'Remove from Tracking' : 'Track This Exam'}
                </button>
                <button class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all">
                    Download Syllabus
                </button>
                <button class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all">
                    Visit Official Website
                </button>
                <button class="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-all">
                    Set Reminder
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('exam-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('exam-modal').classList.add('hidden');
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

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    document.getElementById('moon-icon').classList.toggle('hidden', darkMode);
    document.getElementById('sun-icon').classList.toggle('hidden', !darkMode);
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
    const ctx = document.getElementById('timelineChart').getContext('2d');
    timelineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Application Window',
                    data: [],
                    backgroundColor: 'rgba(26, 115, 232, 0.6)',
                    borderColor: 'rgba(26, 115, 232, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Exam Window',
                    data: [],
                    backgroundColor: 'rgba(234, 67, 53, 0.6)',
                    borderColor: 'rgba(234, 67, 53, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
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
                    ticks: {
                        callback: function(value) {
                            return numericToMonth[value] || '';
                        },
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: true }
                },
                y: {
                    grid: { display: false }
                }
            }
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
    
    // Quick Filters (Hero)
    document.querySelectorAll('.quick-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.quick-filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter.type = e.target.dataset.filter;
            currentFilter.status = 'all';
            currentFilter.tracked = false;
            renderExamCards();
            renderTimeline();
        });
    });
    
    // Type Filters
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter.type = e.target.dataset.typeFilter;
            renderExamCards();
            renderTimeline();
        });
    });
    
    // Status Filters
    document.querySelectorAll('.status-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter.status = e.target.dataset.statusFilter;
            renderExamCards();
            renderTimeline();
        });
    });
    
    // Show Tracked
    document.getElementById('show-tracked').addEventListener('click', () => {
        currentFilter.tracked = !currentFilter.tracked;
        document.getElementById('show-tracked').classList.toggle('bg-blue-600');
        document.getElementById('show-tracked').classList.toggle('text-white');
        renderExamCards();
        renderTimeline();
    });
    
    // Clear Filters
    document.getElementById('clear-filters').addEventListener('click', () => {
        currentFilter = { type: 'all', status: 'all', tracked: false };
        document.querySelectorAll('.type-filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-type-filter="all"]').classList.add('active');
        document.querySelectorAll('.status-filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('[data-status-filter="all"]').classList.add('active');
        document.getElementById('show-tracked').classList.remove('bg-blue-600', 'text-white');
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
    
    // Autocomplete
    setupAutocomplete();
    
    // Initialize
    initializeChart();
    renderExamCards();
    renderUrgentDeadlines();
    renderTimeline();
    updateSidebar();
    updateDaysUntilFirst();
});