// Import exam data (you'll need to include this from your main app.js or make it a separate module)
// For now, we'll fetch data dynamically

let allTrackedExams = [];
let currentFilter = 'all';
let examDetails = {}; // Will store full exam details

// Check authentication on page load
function checkAuthentication() {
    const authToken = localStorage.getItem('authToken');
    const userDataStr = localStorage.getItem('userData');
    
    if (!authToken || !userDataStr) {
        // Not authenticated, redirect to home
        window.location.href = '/';
        return { isAuthenticated: false, currentUser: null };
        // return postMessage
    }
    
    try {
        const currentUser = JSON.parse(userDataStr);
        return { isAuthenticated: true, currentUser };
    } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = '/';
        return { isAuthenticated: false, currentUser: null };
    }
}

// Load tracked exams from backend
async function loadTrackedExams() {
    const authToken = localStorage.getItem('authToken');
    
    try {
        const response = await fetch('/.netlify/functions/track', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.status === 401) {
            // Token is invalid or expired - logout and redirect
            console.error('Authentication failed - invalid or expired token');
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            showNotification('Session expired. Please sign in again.', 'error');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
            return;
        }
        
        if (!response.ok) {
            throw new Error('Failed to load tracked exams');
        }
        
        const data = await response.json();
        allTrackedExams = data.exams || [];
        
        console.log('Loaded tracked exams:', allTrackedExams); // Debug log
        
        // Load exam details (we'll need to integrate with your exam data)
        await loadExamDetails();
        
        // Render the exams
        renderTrackedExams();
        
    } catch (error) {
        console.error('Error loading tracked exams:', error);
        showNotification('Failed to load tracked exams', 'error');
        
        // Show empty state
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('empty-state').classList.remove('hidden');
    }
}

// Load exam details from your exam data
async function loadExamDetails() {
    // This should load from your examsData or make an API call
    // For now, we'll create a mock structure
    // In production, you'd fetch this from your main exam data source
    
    const examsData = {
        'JEE Main': {
            name: 'JEE Main',
            fullName: 'Joint Entrance Examination Main',
            examDate: '2025-01-24',
            applicationStart: '2024-11-01',
            applicationEnd: '2024-11-30',
            category: 'Engineering'
        },
        // Add more exams as needed
    };
    
    examDetails = examsData;
}

// Render tracked exams
function renderTrackedExams() {
    document.getElementById('loading-state').classList.add('hidden');
    
    if (allTrackedExams.length === 0) {
        document.getElementById('empty-state').classList.remove('hidden');
        document.getElementById('exams-grid').classList.add('hidden');
        updateCounts();
        return;
    }
    
    document.getElementById('empty-state').classList.add('hidden');
    document.getElementById('exams-grid').classList.remove('hidden');
    
    // Filter exams based on current filter
    let filteredExams = allTrackedExams;
    // Note: We'd need to add status tracking in the DB for this to work properly
    // For now, show all exams
    
    const grid = document.getElementById('exams-grid');
    grid.innerHTML = filteredExams.map(exam => createExamCard(exam)).join('');
    
    updateCounts();
}

// Create exam card HTML
function createExamCard(trackedExam) {
    const examName = trackedExam.exam_name;
    const details = examDetails[examName] || {
        name: examName,
        fullName: examName,
        examDate: 'TBA',
        applicationStart: 'TBA',
        applicationEnd: 'TBA'
    };
    
    const trackedDate = new Date(trackedExam.tracked_at).toLocaleDateString();
    
    return `
        <div class="exam-card bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-start justify-between mb-3">
                <div>
                    <h3 class="text-lg font-bold text-gray-900 mb-1">${details.name}</h3>
                    <p class="text-sm text-gray-600">${details.fullName || ''}</p>
                </div>
                <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Tracking
                </span>
            </div>
            
            <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span class="text-gray-700"><strong>Exam Date:</strong> ${details.examDate}</span>
                </div>
                <div class="flex items-center text-sm">
                    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-700"><strong>Tracked since:</strong> ${trackedDate}</span>
                </div>
            </div>
            
            <div class="flex gap-2">
                <button onclick="untrackExam('${examName}')" class="flex-1 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-semibold text-sm transition-colors">
                    Untrack
                </button>
                <a href="/#exam-${examName.replace(/\s+/g, '-').toLowerCase()}" class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-colors text-center" style="color: white !important;">
                    View Details
                </a>
            </div>
        </div>
    `;
}

// Untrack an exam
async function untrackExam(examName) {
    const authToken = localStorage.getItem('authToken');
    
    try {
        const response = await fetch('/.netlify/functions/track', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ examName })
        });
        
        if (!response.ok) {
            throw new Error('Failed to untrack exam');
        }
        
        showNotification(`Removed ${examName} from tracking`, 'success');
        
        // Remove from local array and re-render
        allTrackedExams = allTrackedExams.filter(exam => exam.exam_name !== examName);
        renderTrackedExams();
        
    } catch (error) {
        console.error('Error untracking exam:', error);
        showNotification('Failed to untrack exam', 'error');
    }
}

// Set filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button styles
    ['all', 'applied', 'will-apply', 'not-applied'].forEach(f => {
        const btn = document.getElementById(`filter-${f}`);
        if (f === filter) {
            btn.className = 'px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm';
        } else {
            btn.className = 'px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-300';
        }
    });
    
    renderTrackedExams();
}

// Update counts
function updateCounts() {
    document.getElementById('count-all').textContent = allTrackedExams.length;
    document.getElementById('count-applied').textContent = 0; // Would need status tracking
    document.getElementById('count-will-apply').textContent = 0;
    document.getElementById('count-not-applied').textContent = allTrackedExams.length;
}

// Show notification
function showNotification(message, type = 'info') {
    const notificationBar = document.getElementById('notification-bar');
    
    const bgColor = type === 'success' ? 'bg-green-600' : 
                   type === 'error' ? 'bg-red-600' : 'bg-blue-600';
    
    notificationBar.innerHTML = `
        <div class="${bgColor} text-white px-6 py-4 shadow-lg">
            <div class="container mx-auto flex items-center justify-between">
                <span>${message}</span>
                <button onclick="hideNotification()" class="ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    notificationBar.classList.remove('translate-y-full');
    
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notificationBar = document.getElementById('notification-bar');
    notificationBar.classList.add('translate-y-full');
}

// Handle sign out
function handleSignOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    showNotification('Signed out successfully', 'success');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}

// User menu toggle
document.getElementById('user-menu-button')?.addEventListener('click', () => {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    const button = document.getElementById('user-menu-button');
    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// Dark mode toggle
document.getElementById('dark-mode-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Toggle icons
    document.getElementById('moon-icon').classList.toggle('hidden', isDarkMode);
    document.getElementById('sun-icon').classList.toggle('hidden', !isDarkMode);
});

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    const { isAuthenticated, currentUser } = checkAuthentication();
    
    if (!isAuthenticated) {
        return; // Already redirected
    }
    
    // Display user info
    document.getElementById('user-name-display').textContent = currentUser.name;
    document.getElementById('user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
    document.getElementById('dropdown-name').textContent = currentUser.name;
    document.getElementById('dropdown-username').textContent = `@${currentUser.username}`;
    
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('moon-icon').classList.add('hidden');
        document.getElementById('sun-icon').classList.remove('hidden');
    }
    
    // Load tracked exams
    await loadTrackedExams();
});
