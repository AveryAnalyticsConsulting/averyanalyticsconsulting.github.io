// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Collect form data
            const formData = new FormData(contactForm);
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            
            // Normally you would send this data to a server
            // For demo purposes, let's log it and show a success message
            console.log('Form data:', formDataObject);
            
            // Send email using mailto (as a basic solution)
            const subject = `New Inquiry from ${formDataObject.fullName} - ${formDataObject.businessName}`;
            let body = `Name: ${formDataObject.fullName}\n`;
            body += `Business: ${formDataObject.businessName}\n`;
            body += `Email: ${formDataObject.email}\n`;
            body += `Phone: ${formDataObject.phone}\n`;
            body += `Website: ${formDataObject.website || 'N/A'}\n\n`;
            body += `Goals: ${formDataObject.goals || 'N/A'}\n\n`;
            body += `Additional Information: ${formDataObject.additional || 'N/A'}`;
            
            // Create a mailto link
            const mailtoLink = `mailto:andrew@averyanalytics.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Display success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your submission!</h3>
                    <p>We'll get back to you shortly. Click below if your email client doesn't open automatically:</p>
                    <a href="${mailtoLink}" class="btn btn-primary">Send Email</a>
                </div>
            `;
            
            // Attempt to open email client
            window.location.href = mailtoLink;
        });
    }
});
