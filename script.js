let currentScreen = 1;

function nextScreen(screenNum) {
    // Hide current screen
    document.getElementById('screen' + currentScreen).classList.remove('active');
    
    // Update current screen number
    currentScreen = screenNum;
    
    // Show new screen
    document.getElementById('screen' + currentScreen).classList.add('active');
    
    // Update progress bar
    const progress = (screenNum / 4) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function checkEligibility() {
    // Get selected radio button values
    const resident = document.querySelector('input[name="resident"]:checked');
    const lived = document.querySelector('input[name="lived"]:checked');
    const course2025 = document.querySelector('input[name="course2025"]:checked');
    
    // Check if any answer is "no"
    if ((resident && resident.value === 'no') || 
        (lived && lived.value === 'no') || 
        (course2025 && course2025.value === 'no')) {
        // Show ineligibility alert
        document.getElementById('eligibilityAlert').classList.add('show');
    } else {
        // Continue to next screen
        nextScreen(3);
    }
}

function validatePersonalDetails() {
    const errors = [];
    const errorList = document.getElementById('errorList');
    const errorItems = document.getElementById('errorItems');
    
    // Clear previous errors
    errorItems.innerHTML = '';
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    errorList.classList.remove('show');
    
    // Validate first name
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        errors.push('Enter your first name');
        firstName.classList.add('error');
    }
    
    // Validate last name
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        errors.push('Enter your last name');
        lastName.classList.add('error');
    }
    
    // Validate National Insurance number
    const ni = document.getElementById('ni');
    const niPattern = /^[A-Z]{2}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]$/i;
    
    if (!ni.value.trim()) {
        errors.push('Enter your National Insurance number');
        ni.classList.add('error');
    } else if (!niPattern.test(ni.value.trim())) {
        errors.push('National Insurance number must be in the correct format (e.g., QQ 12 34 56 C)');
        ni.classList.add('error');
    }
    
    // Validate date of birth
    const day = document.getElementById('dobDay');
    const month = document.getElementById('dobMonth');
    const year = document.getElementById('dobYear');
    
    if (!day.value || !month.value || !year.value) {
        errors.push('Enter your complete date of birth');
        if (!day.value) day.classList.add('error');
        if (!month.value) month.classList.add('error');
        if (!year.value) year.classList.add('error');
    }
    
    // Show errors or proceed to next screen
    if (errors.length > 0) {
        // Display error messages
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorItems.appendChild(li);
        });
        errorList.classList.add('show');
        
        // Scroll to error list
        errorList.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // No errors - proceed to success screen
        nextScreen(4);
    }
}

// Optional: Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Allow Enter key to submit forms
    if (event.key === 'Enter' && currentScreen === 3) {
        event.preventDefault();
        validatePersonalDetails();
    }
});