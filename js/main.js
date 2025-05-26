/**
 * Main JavaScript for Avery Analytics website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navElement = document.querySelector('nav');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navElement.classList.toggle('mobile-active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navElement.contains(event.target) && event.target !== mobileMenuToggle) {
        navElement.classList.remove('mobile-active');
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navElement.classList.remove('mobile-active');
      });
    });
  }

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add animation to sections as they come into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
      observer.observe(section);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    document.querySelectorAll('.animate-on-scroll').forEach(section => {
      section.classList.add('fade-in');
    });
  }
  
  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      
      // Show loading state
      const submitButton = contactForm.querySelector('[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      
      // Form submission to Google Scripts or similar service
      fetch("https://script.google.com/macros/s/AKfycbx5cAK8333mUro0NASlAF2z1lrJsWMiG0M0d3SWm8eRCqrvOzQM7oTpALjgiqI8OoLjOw/exec", {
        method: "POST",
        body: formData,
      })
      .then(response => {
        if (response.ok) {
          contactForm.reset();
          showConfirmationMessage("Thank you! We've received your information and will reach out shortly.", "success");
        } else {
          showConfirmationMessage("Something went wrong. Please try again.", "error");
        }
      })
      .catch(error => {
        showConfirmationMessage("Submission failed. Please try again later.", "error");
      })
      .finally(() => {
        // Reset button text
        submitButton.textContent = originalButtonText;
      });
    });
  }
  
  function showConfirmationMessage(message, type) {
    const confirmationMessage = document.getElementById('confirmation-message');
    if (confirmationMessage) {
      confirmationMessage.textContent = message;
      confirmationMessage.style.color = type === 'success' ? 'green' : 'red';
      confirmationMessage.style.display = 'block';
      
      // Scroll to confirmation message
      confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  
  // Current page highlighting in navigation
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the current page matches the nav link
    if (currentLocation === linkPath || 
        (linkPath === '/index.html' && (currentLocation === '/' || currentLocation === '/index.html')) ||
        (currentLocation.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html')) {
      link.classList.add('active');
    }
  });
});
