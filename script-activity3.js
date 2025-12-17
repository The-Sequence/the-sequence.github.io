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

function displayGreeting() {
    const greeting = getTimeBasedGreeting();
    const aboutSection = getElementById('about');
    
    if (aboutSection) {
        // Check if greeting element already exists
        let greetingElement = document.getElementById('time-greeting');
        
        if (!greetingElement) {
            // Create greeting element
            greetingElement = document.createElement('p');
            greetingElement.id = 'time-greeting';
            greetingElement.style.marginTop = '0';
            greetingElement.style.marginBottom = '15px';
            greetingElement.style.fontSize = '1.2rem';
            greetingElement.style.color = '#666';
            greetingElement.style.fontStyle = 'italic';
            greetingElement.style.textAlign = 'center';
            
            // Insert at the top of the about section, before the h2
            const aboutHeading = aboutSection.querySelector('h2');
            if (aboutHeading && aboutHeading.parentNode) {
                aboutSection.insertBefore(greetingElement, aboutHeading);
            } else {
                // Fallback: prepend to about section
                aboutSection.insertBefore(greetingElement, aboutSection.firstChild);
            }
        }
        
        greetingElement.textContent = `${greeting}! Welcome to my profile.`;
    }
}

// Dynamic Content Update Functions
function updateFooter() {
    const footer = document.querySelector('footer strong');
    if (footer) {
        const currentDate = new Date().toLocaleDateString();
        footer.textContent = `WebProg - Web Programming 2025 | Last updated: ${currentDate}`;
    }
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
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="w3review"]');
    
    const name = nameInput ? nameInput.value : '';
    const email = emailInput ? emailInput.value : '';
    const message = messageInput ? messageInput.value : '';
    
    // Validate all fields
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const messageValidation = validateMessage(message);
    
    if (!nameValidation.valid) {
        showMessage(nameValidation.message, true);
        return false;
    }
    
    if (!emailValidation.valid) {
        showMessage(emailValidation.message, true);
        return false;
    }
    
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

// Initialize function - runs when page loads
function initialize() {
    // Display time-based greeting
    displayGreeting();
    
    // Update dynamic content
    updateFooter();
    updateSkillsCount();
    
    // Attach event listeners for form validation
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="w3review"]');
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
    
    console.log("JavaScript initialized successfully!");
}

// Run initialization when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

