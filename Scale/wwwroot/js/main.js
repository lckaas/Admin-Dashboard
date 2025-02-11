/* --------------------------------------
           1. SHOW/HIDE SECTIONS (Dashboard/Settings)
        -------------------------------------- */
const dashboardPage = document.getElementById('dashboard-page');
const settingsPage = document.getElementById('settings-page');
const dashboardLink = document.getElementById('dashboard-link');
const settingsLink = document.getElementById('settings-link');

function showDashboard() {
    dashboardPage.style.display = 'block';
    settingsPage.style.display = 'none';
    dashboardLink.classList.add('active');
    settingsLink.classList.remove('active');
}

function showSettings() {
    dashboardPage.style.display = 'none';
    settingsPage.style.display = 'block';
    settingsLink.classList.add('active');
    dashboardLink.classList.remove('active');
}

/* --------------------------------------
   2. SETTINGS & LOCALSTORAGE
-------------------------------------- */
// We'll store all user settings in localStorage under a single object "userSettings"
let userSettings = {
    darkMode: false,
    emailNotifications: false,
    pushNotifications: false,
    autoUpdates: false,
    betaFeatures: false,
    locationAccess: false,
    allowCookies: false,
    rememberMe: false,
    privacy: 'public',  // or 'friends', 'private'
    language: 'en'
};

// Load settings from localStorage if available
function loadSettings() {
    const stored = localStorage.getItem('userSettings');
    if (stored) {
        userSettings = JSON.parse(stored);
    }
}

// Save current userSettings object to localStorage
function saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Apply loaded settings to the UI
function applySettings() {
    // Dark Mode
    document.getElementById('darkModeToggle').checked = userSettings.darkMode;
    setDarkMode(userSettings.darkMode);

    // Checkboxes
    document.getElementById('emailNotifications').checked = userSettings.emailNotifications;
    document.getElementById('pushNotifications').checked = userSettings.pushNotifications;
    document.getElementById('autoUpdates').checked = userSettings.autoUpdates;
    document.getElementById('betaFeatures').checked = userSettings.betaFeatures;
    document.getElementById('locationAccess').checked = userSettings.locationAccess;
    document.getElementById('allowCookies').checked = userSettings.allowCookies;
    document.getElementById('rememberMe').checked = userSettings.rememberMe;

    // Radio (Privacy)
    const privacyRadios = document.getElementsByName('privacy');
    privacyRadios.forEach(radio => {
        radio.checked = (radio.value === userSettings.privacy);
    });

    // Language (Select)
    document.getElementById('languageSelect').value = userSettings.language;
}

// Helper to toggle body classes for dark/light mode
function setDarkMode(isDark) {
    const body = document.body;
    if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
    }
}

/* --------------------------------------
   3. EVENT LISTENERS FOR SETTINGS
-------------------------------------- */
// Dark Mode
document.getElementById('darkModeToggle').addEventListener('change', function () {
    userSettings.darkMode = this.checked;
    setDarkMode(this.checked);
    saveSettings();
});

// Email Notifications
document.getElementById('emailNotifications').addEventListener('change', function () {
    userSettings.emailNotifications = this.checked;
    saveSettings();
});

// Push Notifications
document.getElementById('pushNotifications').addEventListener('change', function () {
    userSettings.pushNotifications = this.checked;
    saveSettings();
});

// Auto Updates
document.getElementById('autoUpdates').addEventListener('change', function () {
    userSettings.autoUpdates = this.checked;
    saveSettings();
});

// Beta Features
document.getElementById('betaFeatures').addEventListener('change', function () {
    userSettings.betaFeatures = this.checked;
    saveSettings();
});

// Location Access
document.getElementById('locationAccess').addEventListener('change', function () {
    userSettings.locationAccess = this.checked;
    saveSettings();
});

// Allow Cookies
document.getElementById('allowCookies').addEventListener('change', function () {
    userSettings.allowCookies = this.checked;
    saveSettings();
});

// Remember Me
document.getElementById('rememberMe').addEventListener('change', function () {
    userSettings.rememberMe = this.checked;
    saveSettings();
});

// Privacy Radio
const privacyRadios = document.getElementsByName('privacy');
privacyRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        userSettings.privacy = this.value;
        saveSettings();
    });
});

// Language Select
document.getElementById('languageSelect').addEventListener('change', function () {
    userSettings.language = this.value;
    saveSettings();
});

/* --------------------------------------
   4. INIT ON PAGE LOAD
-------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    applySettings();
    showDashboard(); // Show the dashboard by default
});