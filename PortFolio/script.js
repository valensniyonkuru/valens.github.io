// Smooth Scroll and Active Link Highlight
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust for sticky header height
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
            // Store the active section in localStorage
            localStorage.setItem('activeSection', currentSection);
        }
    });
});

// Fix scroll position when clicking nav link
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerOffset = 70; // Adjust based on the sticky header height
        const elementPosition = targetSection.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Store the active section in localStorage
        localStorage.setItem('activeSection', targetId.substring(1)); // Save section ID without '#'
    });
});

// Highlight active link on page load
window.addEventListener('load', function() {
    const activeSection = localStorage.getItem('activeSection');
    if (activeSection) {
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
    }
});

// Form Validation
document.getElementById('contact-form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = document.getElementById('subject').value.trim();

    // Clear previous error messages
    clearErrors();

    // Basic validation checks
    let isValid = true;

    if (!name) {
        showError('name', 'Please enter your full name.');
        isValid = false;
    }

    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!subject) {
        showError('subject', 'Please enter a subject.');
        isValid = false;
    }

    if (!message) {
        showError('message', 'Please enter a message.');
        isValid = false;
    }

    // If form is invalid, prevent submission
    if (!isValid) {
        event.preventDefault();
    } else {
        alert("Your message has been sent successfully!");
    }
});

// Function to show error messages
function showError(field, message) {
    const input = document.getElementById(field);
    input.classList.add('error');
    const errorElement = document.createElement('small');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    input.parentNode.appendChild(errorElement);
}

// Function to clear error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
