// ============================================
// Basic JavaScript Functions
// ============================================

// DOM Manipulation Functions
function getElementById(id) {
    return document.getElementById(id);
}

function getElementsByName(name) {
    return document.getElementsByName(name);
}

function updateElementText(id, text) {
    const element = getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function updateElementHTML(id, html) {
    const element = getElementById(id);
    if (element) {
        element.innerHTML = html;
    }
}

// Basic Validation Functions
function validateName(name) {
    if (!name || name.trim().length === 0) {
        return { valid: false, message: "Name cannot be empty" };
    }
    if (name.length < 2) {
        return { valid: false, message: "Name must be at least 2 characters" };
    }
    return { valid: true, message: "" };
}

function validateEmail(email) {
    if (!email || email.trim().length === 0) {
        return { valid: false, message: "Email cannot be empty" };
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return { valid: false, message: "Please enter a valid email address" };
    }
    return { valid: true, message: "" };
}

function validateMessage(message) {
    if (!message || message.trim().length === 0) {
        return { valid: false, message: "Message cannot be empty" };
    }
    if (message.length < 10) {
        return { valid: false, message: "Message must be at least 10 characters" };
    }
    return { valid: true, message: "" };
}

// Greeting Based on Time Function
function getTimeBasedGreeting() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
        return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
        return "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 22) {
        return "Good evening";
    } else {
        return "Good evening"; // For late night (22-4)
    }
}

// ============================================
// Time Display and Greeting Functions
// ============================================
function updateTimeDisplay() {
    const timeDisplay = getElementById('timeDisplay');
    const dateDisplay = getElementById('dateDisplay');
    const timezoneDisplay = getElementById('timezoneDisplay');
    const greetingText = getElementById('greetingText');
    
    const now = new Date();
    
    // Get timezone information
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = -now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
    const offsetMinutes = Math.abs(timeZoneOffset) % 60;
    const offsetSign = timeZoneOffset >= 0 ? '+' : '-';
    const timeZoneAbbr = now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop();
    
    // Format date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    
    // Format time in 12-hour format with AM/PM
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
    };
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    
    // Also get 24-hour format for display
    const hours24 = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const time24 = `${hours24}:${minutes}:${seconds}`;
    
    // Update date display
    if (dateDisplay) {
        dateDisplay.textContent = formattedDate;
    }
    
    // Update time display (show both 12-hour and 24-hour)
    if (timeDisplay) {
        timeDisplay.textContent = `${formattedTime} (${time24})`;
    }
    
    // Update timezone display
    if (timezoneDisplay) {
        timezoneDisplay.textContent = `${timeZone} (UTC${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}) ${timeZoneAbbr}`;
    }
    
    // Display greeting
    if (greetingText) {
        const greeting = getTimeBasedGreeting();
        greetingText.textContent = `${greeting}! Welcome to my profile.`;
    }
}

function displayGreeting() {
    // Update time and greeting at the top
    updateTimeDisplay();
    
    // Update every second
    setInterval(updateTimeDisplay, 1000);
}

// Dynamic Content Update Functions
function updateFooter() {
    const footer = document.querySelector('footer strong');
    if (footer) {
        const currentDate = new Date().toLocaleDateString();
        footer.textContent = `WebProg - Web Programming 2025 | Last updated: ${currentDate}`;
    }
    // Also display today's date
    displayTodayDate();
}

function updateSkillsCount() {
    const skillsList = document.querySelectorAll('.left-column dt');
    const skillsCount = skillsList.length;
    const skillsHeading = document.querySelector('.left-column h3');
    if (skillsHeading && skillsHeading.textContent === 'Skills') {
        skillsHeading.textContent = `Skills (${skillsCount})`;
    }
}

function showMessage(message, isError = false) {
    const messageForm = document.querySelector('.message-form');
    if (messageForm) {
        let messageDiv = document.getElementById('validation-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.id = 'validation-message';
            messageDiv.style.padding = '10px';
            messageDiv.style.margin = '10px 0';
            messageDiv.style.borderRadius = '4px';
            messageForm.insertBefore(messageDiv, messageForm.firstChild);
        }
        messageDiv.textContent = message;
        messageDiv.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
        messageDiv.style.color = isError ? '#c62828' : '#2e7d32';
        messageDiv.style.border = `1px solid ${isError ? '#c62828' : '#2e7d32'}`;
    }
}

// Event Handler Functions
function handleNameKeyup(event) {
    const name = event.target.value;
    const validation = validateName(name);
    if (!validation.valid && name.length > 0) {
        showMessage(validation.message, true);
    } else if (validation.valid) {
        showMessage("Name looks good!", false);
    }
}

function handleEmailKeyup(event) {
    const email = event.target.value;
    const validation = validateEmail(email);
    if (!validation.valid && email.length > 0) {
        showMessage(validation.message, true);
    } else if (validation.valid) {
        showMessage("Email looks good!", false);
    }
}

function handleMessageKeyup(event) {
    const message = event.target.value;
    const validation = validateMessage(message);
    if (!validation.valid && message.length > 0) {
        showMessage(validation.message, true);
    } else if (validation.valid) {
        showMessage("Message looks good!", false);
    }
    // Update character counter
    updateCharacterCounter();
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Use validateForm() for basic validation
    if (!validateForm()) {
        return false;
    }
    
    const nameInput = document.querySelector('input[name="name"]') || getElementById('nameField');
    const emailInput = document.querySelector('input[name="email"]') || getElementById('emailField');
    const messageInput = document.querySelector('textarea[name="w3review"]') || getElementById('msgBox');
    
    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const message = messageInput ? messageInput.value : '';
    
    // Additional validation for message
    const messageValidation = validateMessage(message);
    
    if (!messageValidation.valid) {
        showMessage(messageValidation.message, true);
        return false;
    }
    
    // All validations passed
    showMessage("Form submitted successfully! Thank you for your message.", false);
    
    // Clear form
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
    
    // Reset character counter
    updateCharacterCounter();
    
    return false;
}

function handleNavClick(event) {
    const href = event.target.getAttribute('href');
    // Only prevent default for anchor links (starting with #)
    if (href && href.startsWith('#')) {
        event.preventDefault();
        const targetId = href.substring(1);
        const targetElement = getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // For regular page links, let the browser handle navigation normally
}

// ============================================
// Feature A: Dark Mode Toggle
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = getElementById('themeBtn');
    if (themeBtn) {
        if (document.body.classList.contains('dark-mode')) {
            themeBtn.textContent = 'Toggle Light Mode';
        } else {
            themeBtn.textContent = 'Toggle Dark Mode';
        }
    }
    
    // Re-apply slideshow theme if slideshow is active
    if (slideshowImages.length > 0) {
        updateThemeFromSlide(currentSlideIndex);
    }
}

// ============================================
// Feature B: Edit Job Title
// ============================================
function editJobTitle() {
    const jobTitleElement = getElementById('jobTitle');
    if (jobTitleElement) {
        const currentTitle = jobTitleElement.textContent;
        const newTitle = prompt('Enter new job title:', currentTitle);
        if (newTitle !== null && newTitle.trim() !== '') {
            jobTitleElement.textContent = newTitle.trim();
        }
    }
}

// ============================================
// Feature C: Show/Hide Skills
// ============================================
function toggleSkills() {
    const skillsSection = getElementById('skillsSection');
    const toggleBtn = getElementById('toggleSkillsBtn');
    const skillsList = skillsSection ? skillsSection.querySelector('dl') : null;
    
    if (skillsSection && toggleBtn && skillsList) {
        const isVisible = skillsList.style.display !== 'none';
        
        if (isVisible) {
            skillsList.style.display = 'none';
            toggleBtn.textContent = 'Show Skills';
        } else {
            skillsList.style.display = 'block';
            toggleBtn.textContent = 'Hide Skills';
        }
    }
}

// ============================================
// Feature D: Live Character Counter
// ============================================
function updateCharacterCounter() {
    const msgBox = getElementById('msgBox');
    const counter = getElementById('counter');
    
    if (msgBox && counter) {
        const maxLength = msgBox.getAttribute('maxlength') || 200;
        const currentLength = msgBox.value.length;
        const remaining = maxLength - currentLength;
        
        counter.textContent = remaining;
        
        // Change color based on remaining characters
        if (remaining < 20) {
            counter.style.color = '#c62828';
        } else if (remaining < 50) {
            counter.style.color = '#f57c00';
        } else {
            counter.style.color = '#666';
        }
    }
}

// ============================================
// Feature E: Form Validation Before Sending
// ============================================
function validateForm() {
    const nameField = getElementById('nameField');
    const emailField = getElementById('emailField');
    
    const name = nameField ? nameField.value.trim() : '';
    const email = emailField ? emailField.value.trim() : '';
    
    if (name === '') {
        alert('Name field cannot be empty!');
        if (nameField) nameField.focus();
        return false;
    }
    
    if (email === '') {
        alert('Email field cannot be empty!');
        if (emailField) emailField.focus();
        return false;
    }
    
    // Additional email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address!');
        if (emailField) emailField.focus();
        return false;
    }
    
    return true;
}

// ============================================
// Feature F: Display Today's Date
// ============================================
function displayTodayDate() {
    const dateDisplay = getElementById('dateDisplay');
    if (dateDisplay) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = `Today's Date: ${today.toLocaleDateString('en-US', options)}`;
    }
}

// ============================================
// Feature G: Profile Picture Zoom (Extra Feature)
// ============================================
function toggleProfileZoom() {
    const profileImg = getElementById('profileImg');
    if (profileImg) {
        profileImg.classList.toggle('zoomed');
    }
}

// ============================================
// Feature 1: Image Switcher / Profile Photo Changer
// ============================================
const profileImages = [
    'src/2x2.jpg',
    'https://via.placeholder.com/180x180/4b5563/ffffff?text=Profile+1',
    'https://via.placeholder.com/180x180/6b7280/ffffff?text=Profile+2',
    'https://via.placeholder.com/180x180/9ca3af/ffffff?text=Profile+3'
];
let currentImageIndex = 0;

function changeProfilePicture() {
    const profileImg = getElementById('profileImg');
    if (profileImg) {
        currentImageIndex = (currentImageIndex + 1) % profileImages.length;
        profileImg.src = profileImages[currentImageIndex];
        profileImg.style.transition = 'opacity 0.3s ease';
        profileImg.style.opacity = '0';
        setTimeout(() => {
            profileImg.style.opacity = '1';
        }, 150);
    }
}

// ============================================
// Feature 2: Random Quote Generator
// ============================================
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't let yesterday take up too much of today. - Will Rogers",
    "You learn more from failure than from success. - Unknown",
    "If you are working on something exciting that you really care about, you don't have to be pushed. The vision pulls you. - Steve Jobs"
];

function getRandomQuote() {
    const quoteDisplay = getElementById('quoteDisplay');
    if (quoteDisplay) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = `"${quotes[randomIndex]}"`;
        quoteDisplay.style.animation = 'fadeIn 0.5s ease';
    }
}

// ============================================
// Feature 4: Color Picker Theme Customization
// ============================================
function setupColorPickers() {
    const bgColorPicker = getElementById('bgColorPicker');
    const textColorPicker = getElementById('textColorPicker');
    
    if (bgColorPicker) {
        bgColorPicker.addEventListener('change', function(e) {
            document.body.style.backgroundColor = e.target.value;
            const pageWrapper = document.querySelector('.page-wrapper');
            if (pageWrapper) {
                pageWrapper.style.backgroundColor = e.target.value;
            }
        });
    }
    
    if (textColorPicker) {
        textColorPicker.addEventListener('change', function(e) {
            document.body.style.color = e.target.value;
            const allText = document.querySelectorAll('p, h1, h2, h3, span, td, dt, label');
            allText.forEach(el => {
                if (!el.closest('.navbar') && !el.closest('button')) {
                    el.style.color = e.target.value;
                }
            });
        });
    }
}

// ============================================
// Feature 5: Font Size Adjuster
// ============================================
let currentFontSize = 16;
const minFontSize = 12;
const maxFontSize = 24;

function adjustFontSize(increase) {
    if (increase) {
        currentFontSize = Math.min(currentFontSize + 2, maxFontSize);
    } else {
        currentFontSize = Math.max(currentFontSize - 2, minFontSize);
    }
    
    document.body.style.fontSize = currentFontSize + 'px';
    const allText = document.querySelectorAll('p, h1, h2, h3, span, td, dt, label, li');
    allText.forEach(el => {
        const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
        const newSize = (currentSize / (currentFontSize - (increase ? 2 : -2))) * currentFontSize;
        el.style.fontSize = newSize + 'px';
    });
}

// ============================================
// Helper Functions for Color Manipulation
// ============================================
function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// Feature 6: Simple Slideshow / Carousel
// ============================================
const slideshowImages = [
    'src/El Capitan.jpg',
    'src/Mavericks.jpg',
    'src/Tsunagu.jpg',
    'src/Ventura.jpg',
    'src/Yosemite.jpg'
];

// Color schemes for each image - matching the aesthetic of each slide
const slideshowColorSchemes = [
    { // El Capitan - Mountain/rock theme - cool grays and blues
        background: '#d1d5db',
        accent: '#6b7280',
        text: '#1f2937'
    },
    { // Mavericks - Ocean/surf theme - blues and teals
        background: '#e0f2fe',
        accent: '#0ea5e9',
        text: '#0c4a6e'
    },
    { // Tsunagu - Connection theme - warm purples and pinks
        background: '#f3e8ff',
        accent: '#a855f7',
        text: '#581c87'
    },
    { // Ventura - Modern theme - cool greens and cyans
        background: '#d1fae5',
        accent: '#10b981',
        text: '#064e3b'
    },
    { // Yosemite - Nature theme - warm earth tones
        background: '#fef3c7',
        accent: '#f59e0b',
        text: '#78350f'
    }
];

let currentSlideIndex = 0;
let autoSlideInterval = null;
let originalBackground = null;
let originalTextColor = null;

function updateThemeFromSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= slideshowColorSchemes.length) return;
    
    const colorScheme = slideshowColorSchemes[slideIndex];
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Store original colors if not already stored
    if (!originalBackground) {
        originalBackground = window.getComputedStyle(document.body).backgroundColor;
    }
    if (!originalTextColor) {
        originalTextColor = window.getComputedStyle(document.body).color;
    }
    
    // Apply smooth transition - only if not in dark mode (dark mode keeps its own colors)
    if (!isDarkMode) {
        document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
        document.body.style.backgroundColor = colorScheme.background;
        document.body.style.color = colorScheme.text;
        
        // Update page wrapper background
        const pageWrapper = document.querySelector('.page-wrapper');
        if (pageWrapper) {
            pageWrapper.style.transition = 'background-color 0.8s ease';
            pageWrapper.style.backgroundColor = colorScheme.background;
        }
        
        // Update navbar background
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transition = 'background-color 0.8s ease';
            navbar.style.backgroundColor = '#ffffff';
        }
    }
    
    // Update accent colors on buttons (works in both light and dark mode)
    const buttons = document.querySelectorAll('button:not(#themeBtn):not(#fontDecreaseBtn):not(#fontIncreaseBtn):not(.slide-nav-btn):not(input[type="submit"])');
    buttons.forEach(btn => {
        btn.style.transition = 'background 0.8s ease, box-shadow 0.8s ease';
        if (!isDarkMode) {
            // Apply theme color to buttons with gradient
            const accentColor = colorScheme.accent;
            btn.style.background = `linear-gradient(180deg, ${accentColor} 0%, ${shadeColor(accentColor, -20)} 100%)`;
            btn.style.color = '#ffffff';
            btn.style.boxShadow = `0 4px 12px ${hexToRgba(accentColor, 0.3)}, 0 2px 4px ${hexToRgba(accentColor, 0.2)}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
        }
    });
    
    // Update primary action buttons (submit, quote, auto-slide)
    const primaryButtons = document.querySelectorAll('input[type="submit"], #quoteBtn, #autoSlideBtn, .auto-slide-btn');
    primaryButtons.forEach(btn => {
        btn.style.transition = 'background 0.8s ease, box-shadow 0.8s ease';
        if (!isDarkMode) {
            const accentColor = colorScheme.accent;
            btn.style.background = `linear-gradient(180deg, ${accentColor} 0%, ${shadeColor(accentColor, -20)} 100%)`;
            btn.style.boxShadow = `0 4px 12px ${hexToRgba(accentColor, 0.3)}, 0 2px 4px ${hexToRgba(accentColor, 0.2)}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
        }
    });
    
    // Update links hover color
    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
        link.style.transition = 'color 0.8s ease, background-color 0.8s ease';
        if (!isDarkMode) {
            link.style.color = colorScheme.text;
        }
    });
    
    // Update quote section accent border
    const quoteSection = document.querySelector('.quote-section');
    if (quoteSection && !isDarkMode) {
        quoteSection.style.transition = 'border-left-color 0.8s ease';
        quoteSection.style.borderLeftColor = colorScheme.accent;
    }
}

function showSlide(index) {
    const slideshowImage = getElementById('slideshowImage');
    const slideCounter = getElementById('slideCounter');
    if (slideshowImage) {
        currentSlideIndex = index;
        if (currentSlideIndex < 0) {
            currentSlideIndex = slideshowImages.length - 1;
        }
        if (currentSlideIndex >= slideshowImages.length) {
            currentSlideIndex = 0;
        }
        slideshowImage.src = slideshowImages[currentSlideIndex];
        slideshowImage.style.opacity = '0';
        setTimeout(() => {
            slideshowImage.style.opacity = '1';
        }, 150);
        
        // Update slide counter
        if (slideCounter) {
            slideCounter.textContent = `${currentSlideIndex + 1} / ${slideshowImages.length}`;
        }
        
        // Update theme based on current slide
        updateThemeFromSlide(currentSlideIndex);
    }
}

function nextSlide() {
    showSlide(currentSlideIndex + 1);
}

function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function toggleAutoSlide() {
    const autoSlideBtn = getElementById('autoSlideBtn');
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        if (autoSlideBtn) {
            autoSlideBtn.textContent = 'Start Auto Slideshow';
        }
    } else {
        autoSlideInterval = setInterval(nextSlide, 3000);
        if (autoSlideBtn) {
            autoSlideBtn.textContent = 'Stop Auto Slideshow';
        }
    }
}

// ============================================
// Feature 7: Auto-Update Age Calculator
// ============================================
function calculateAge() {
    const birthYearInput = getElementById('birthYearInput');
    const ageDisplay = getElementById('ageDisplay');
    
    if (birthYearInput && ageDisplay) {
        const birthYear = parseInt(birthYearInput.value);
        const currentYear = new Date().getFullYear();
        
        if (birthYear && birthYear >= 1900 && birthYear <= currentYear) {
            const age = currentYear - birthYear;
            ageDisplay.textContent = `You are ${age} years old (or will be this year).`;
            ageDisplay.style.color = '#2e7d32';
        } else if (birthYearInput.value) {
            ageDisplay.textContent = 'Please enter a valid birth year (1900-' + currentYear + ').';
            ageDisplay.style.color = '#c62828';
        } else {
            ageDisplay.textContent = '';
        }
    }
}

// ============================================
// Feature 8: Live Search Filter
// ============================================
function filterSkills() {
    const searchInput = getElementById('skillSearchInput');
    const skillItems = document.querySelectorAll('.skill-item');
    
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        
        skillItems.forEach(item => {
            const skillText = item.textContent.toLowerCase();
            if (skillText.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Initialize function - runs when page loads
function initialize() {
    // Display time-based greeting
    displayGreeting();
    
    // Update dynamic content
    updateFooter();
    updateSkillsCount();
    
    // Attach event listeners for form validation
    const nameInput = document.querySelector('input[name="name"]') || getElementById('nameField');
    const emailInput = document.querySelector('input[name="email"]') || getElementById('emailField');
    const messageInput = document.querySelector('textarea[name="w3review"]') || getElementById('msgBox');
    const form = document.querySelector('form');
    const navLinks = document.querySelectorAll('.navbar a');
    
    if (nameInput) {
        nameInput.addEventListener('keyup', handleNameKeyup);
    }
    
    if (emailInput) {
        emailInput.addEventListener('keyup', handleEmailKeyup);
    }
    
    if (messageInput) {
        messageInput.addEventListener('keyup', handleMessageKeyup);
    }
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Attach click events to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Feature A: Dark Mode Toggle
    const themeBtn = getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleDarkMode);
    }
    
    // Feature B: Edit Job Title
    const editJobBtn = getElementById('editJobBtn');
    if (editJobBtn) {
        editJobBtn.addEventListener('click', editJobTitle);
    }
    
    // Feature C: Toggle Skills
    const toggleSkillsBtn = getElementById('toggleSkillsBtn');
    if (toggleSkillsBtn) {
        toggleSkillsBtn.addEventListener('click', toggleSkills);
    }
    
    // Feature D: Initialize Character Counter
    updateCharacterCounter();
    const msgBox = getElementById('msgBox');
    if (msgBox) {
        msgBox.addEventListener('input', updateCharacterCounter);
    }
    
    // Feature G: Profile Picture Zoom
    const profileImg = getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('click', toggleProfileZoom);
        profileImg.title = 'Click to zoom in/out';
    }
    
    // Feature 1: Image Switcher
    const changeProfileBtn = getElementById('changeProfileBtn');
    if (changeProfileBtn) {
        changeProfileBtn.addEventListener('click', changeProfilePicture);
    }
    
    // Feature 2: Random Quote Generator
    const quoteBtn = getElementById('quoteBtn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', getRandomQuote);
        // Show initial quote
        getRandomQuote();
    }
    
    // Feature 4: Color Picker Theme Customization
    setupColorPickers();
    
    // Feature 5: Font Size Adjuster
    const fontDecreaseBtn = getElementById('fontDecreaseBtn');
    const fontIncreaseBtn = getElementById('fontIncreaseBtn');
    if (fontDecreaseBtn) {
        fontDecreaseBtn.addEventListener('click', () => adjustFontSize(false));
    }
    if (fontIncreaseBtn) {
        fontIncreaseBtn.addEventListener('click', () => adjustFontSize(true));
    }
    
    // Feature 6: Slideshow
    const nextSlideBtn = getElementById('nextSlideBtn');
    const prevSlideBtn = getElementById('prevSlideBtn');
    const autoSlideBtn = getElementById('autoSlideBtn');
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', nextSlide);
    }
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', prevSlide);
    }
    if (autoSlideBtn) {
        autoSlideBtn.addEventListener('click', toggleAutoSlide);
    }
    // Initialize slide counter
    const slideCounter = getElementById('slideCounter');
    if (slideCounter) {
        slideCounter.textContent = `1 / ${slideshowImages.length}`;
    }
    // Initialize theme from first slide
    updateThemeFromSlide(0);
    
    // Feature 7: Age Calculator
    const birthYearInput = getElementById('birthYearInput');
    if (birthYearInput) {
        birthYearInput.addEventListener('input', calculateAge);
        birthYearInput.addEventListener('change', calculateAge);
    }
    
    // Feature 8: Live Search Filter
    const skillSearchInput = getElementById('skillSearchInput');
    if (skillSearchInput) {
        skillSearchInput.addEventListener('input', filterSkills);
        skillSearchInput.addEventListener('keyup', filterSkills);
    }
    
    console.log("JavaScript initialized successfully!");
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

