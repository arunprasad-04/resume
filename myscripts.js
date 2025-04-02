// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const skillBars = document.querySelectorAll('.skill-progress');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const certificateCarousel = document.querySelector('.certificate-carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const downloadResumeBtn = document.getElementById('downloadResume');
const projectFilterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// Typed.js initialization
const typed = new Typed('.typed', {
    strings: ['Web Developer', 'IT Student', 'UI/UX Designer', 'Team Leader'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// ScrollMagic Controller
const controller = new ScrollMagic.Controller();

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
        scrollTopBtn.classList.add('active');
    } else {
        navbar.classList.remove('sticky');
        scrollTopBtn.classList.remove('active');
    }
    
    // Active nav link based on scroll position
    updateActiveNavLink();
});

// Update active nav link based on current section
function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Animate skill bars on scroll
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

window.addEventListener('scroll', () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos && !skillsAnimated) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = 0;
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
        skillsAnimated = true;
    }
});

// Certificate carousel navigation
prevBtn.addEventListener('click', () => {
    certificateCarousel.scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    certificateCarousel.scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// Projects filter
projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset active class
        projectFilterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic form validation
    if (name && email && subject && message) {
        // In a real application, you would send this data to your server
        alert('Thanks for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields');
    }
});

// Resume download
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real application, you would link this to your actual resume file
    alert('Resume download functionality will be implemented when deployed');
});

// Scroll to top button
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ScrollMagic animations
sections.forEach(section => {
    // Create scene for each section
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.85,
        reverse: false
    })
    .setClassToggle(section, 'animate')
    .addTo(controller);
});

// Preloader
window.addEventListener('load', () => {
    // You can add a preloader animation here
    // For now, we'll just make sure all animations start properly
    setTimeout(() => {
        updateActiveNavLink();
    }, 500);
});