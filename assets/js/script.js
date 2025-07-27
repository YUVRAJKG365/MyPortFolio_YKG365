function initParticles() {
    // Remove the desktop-only check and always initialize particles
    particlesJS("particles-js", {
        particles: {
            number: { 
                value: window.innerWidth > 768 ? 80 : 40, // Fewer particles on mobile
                density: { 
                    enable: true, 
                    value_area: window.innerWidth > 768 ? 800 : 400 // Less dense on mobile
                } 
            },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { 
                value: 0.5, 
                random: true,
                anim: { enable: window.innerWidth > 768 } // Only enable animation on desktop
            },
            size: { 
                value: window.innerWidth > 768 ? 3 : 2, // Smaller particles on mobile
                random: true 
            },
            line_linked: {
                enable: true,
                distance: window.innerWidth > 768 ? 150 : 100, // Shorter lines on mobile
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: window.innerWidth > 768 ? 2 : 1, // Slower movement on mobile
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { 
                    enable: window.innerWidth > 768, // Only enable hover on desktop
                    mode: "grab" 
                },
                onclick: { 
                    enable: true, 
                    mode: "push" 
                },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const phrases = [
        "I'm an Data Analyst",
        "I'm an AI/ML Engineer",
        "I'm an Prompt Engineer",
        "I'm an Python Developer",
        "I'm an Full Stack Developer"
    ];

    const typedText = document.getElementById("typed-text");
    const typingSpeed = 100;   // in ms
    const erasingSpeed = 50;   // in ms
    const delayBetweenPhrases = 1500;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedText.textContent = currentPhrase.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(type, erasingSpeed);
            }
        } else {
            typedText.textContent = currentPhrase.substring(0, charIndex++);
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, delayBetweenPhrases);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }

    type(); // start typing
    initParticles(); // Always initialize particles (now works on mobile too)

    // Add ripple effect to all interactive elements
    const interactiveElements = [
        'a', 'button', '.btn', '.project-card', 
        '.skill-card', '.certificate-card', 
        '.timeline-item', '.mobile-timeline-item',
        '.modal-link', '.certificate-link', '.social-link',
        '.form-control', '.video-control-btn', '.cert-track-btn'
    ];

    interactiveElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            // Skip elements that already have ripple or are in modals
            if (element.closest('.project-modal-content, .experience-modal-content, .resume-modal-content')) {
                return;
            }
    
            element.classList.add('ripple');
    
            element.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
        
                // Set ripple size and position
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - rect.left - size/2}px`;
                ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
                // Add ripple to element
                this.appendChild(ripple);
        
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });

    // Optimize performance by disabling animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('tab-inactive');
        } else {
            document.body.classList.remove('tab-inactive');
        }
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', closeMobileMenu);

// Header scroll effect
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        closeMobileMenu();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('formStatus');
    
    // Set the reply-to field before submission
    contactForm.addEventListener('submit', function(event) {
        const emailInput = document.getElementById('email');
        document.getElementById('replyTo').value = emailInput.value;
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Disable the submit button to prevent multiple submissions
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get the form data
        const formData = new FormData(contactForm);
        
        // Send the form data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                statusMessage.textContent = 'Thank you for your message I will get back to you soon.';
                statusMessage.className = 'status-message success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error message
            statusMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
            statusMessage.className = 'status-message error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
});

function validateForm() {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }
    return true;
}

// Project modals functionality
function openModal(projectId) {
    closeModal(); // Close any currently open modal

    const modal = document.getElementById(`${projectId}-modal`);
    modal.classList.add('active');
    document.body.classList.add('no-scroll');

    // Force show close button on mobile
    if (window.innerWidth <= 768) {
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.style.display = 'flex';
        closeBtn.style.opacity = '1';
    }
}

function closeModal() {
    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.classList.remove('no-scroll');
}

// For mobile devices, ensure cards are clickable
if (window.innerWidth <= 768) {
    document.querySelectorAll('.project-card, .certificate-card, .mobile-timeline-item').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside the card
            if (!e.target.closest('a')) {
                const modalId = this.getAttribute('data-modal');
                if (modalId) {
                    if (modalId.includes('expModal')) {
                        openExpModal(modalId.replace('expModal-', ''));
                    } else {
                        openModal(modalId);
                    }
                }
            }
        });
    });
}

// Experience modals functionality
function openExpModal(expId) {
    // Close any currently open modal first
    closeExpModal();
    
    const modal = document.getElementById(`${expId}-modal`);
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeExpModal() {
    document.querySelectorAll('.experience-modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.classList.remove('no-scroll');
}

// Resume modal functionality
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function playPauseVideo(modalId) {
    const modal = document.getElementById(modalId);
    const video = modal.querySelector('.modal-video');
    const playBtn = modal.querySelector('.fa-play').parentElement;
    
    if (video.tagName === 'VIDEO') {
        // Handle HTML5 video element
        if (video.paused) {
            video.play();
            playBtn.querySelector('i').classList.remove('fa-play');
            playBtn.querySelector('i').classList.add('fa-pause');
        } else {
            video.pause();
            playBtn.querySelector('i').classList.remove('fa-pause');
            playBtn.querySelector('i').classList.add('fa-play');
        }
    } else if (video.contentWindow.postMessage) {
        // Handle iframes (YouTube/Google Drive)
        const iframeSrc = video.src;
        if (iframeSrc.includes('youtube.com') || iframeSrc.includes('youtu.be')) {
            video.contentWindow.postMessage('{"event":"command","func":"' + (playBtn.querySelector('i').classList.contains('fa-play') ? 'playVideo' : 'pauseVideo') + '","args":""}', '*');
        } else if (iframeSrc.includes('drive.google.com')) {
            // For Google Drive videos, toggle play/pause using a class
            const videoContainer = modal.querySelector('.modal-video-container');
            if (videoContainer.classList.contains('playing')) {
                videoContainer.classList.remove('playing');
                playBtn.querySelector('i').classList.remove('fa-pause');
                playBtn.querySelector('i').classList.add('fa-play');
            } else {
                videoContainer.classList.add('playing');
                playBtn.querySelector('i').classList.remove('fa-play');
                playBtn.querySelector('i').classList.add('fa-pause');
            }
        }
        
        // Toggle play/pause icon
        playBtn.querySelector('i').classList.toggle('fa-play');
        playBtn.querySelector('i').classList.toggle('fa-pause');
    }
}

// Close modal when clicking outside content
document.querySelectorAll('.project-modal, .experience-modal, .resume-modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            if (modal.classList.contains('project-modal')) {
                closeModal();
            } else if (modal.classList.contains('experience-modal')) {
                closeExpModal();
            } else if (modal.classList.contains('resume-modal')) {
                closeResumeModal();
            }
        }
    });
});

// Certificates track scrolling
const certificatesTrack = document.querySelector('.certificates-track');
let currentCertIndex = 0;
const certCardWidth = 300 + 30; // width + gap

function scrollCertificates(direction) {
    const trackWidth = certificatesTrack.scrollWidth;
    const containerWidth = document.querySelector('.certifications-container').offsetWidth;
    const maxScroll = trackWidth - containerWidth;
    
    currentCertIndex += direction;
    const certCount = document.querySelectorAll('.certificate-card').length;
    
    if (currentCertIndex < 0) currentCertIndex = 0;
    if (currentCertIndex > certCount - 1) currentCertIndex = certCount - 1;
    
    const scrollPosition = currentCertIndex * certCardWidth;
    
    certificatesTrack.style.transform = `translateX(-${scrollPosition}px)`;
}

// Touch support for certificates on mobile
if (window.innerWidth <= 768) {
    let startX, moveX;
    let isDragging = false;
    
    certificatesTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    certificatesTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveX = e.touches[0].clientX;
        const diff = moveX - startX;
        
        // Prevent vertical scrolling when horizontally swiping
        if (Math.abs(diff) > 10) {
            e.preventDefault();
        }
    });
    
    certificatesTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = moveX - startX;
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                scrollCertificates(-1); // Swipe right
            } else {
                scrollCertificates(1); // Swipe left
            }
        }
    });
}

// Scroll animations
function animateOnScroll() {
    // Section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        const titlePosition = title.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (titlePosition < screenPosition) {
            title.classList.add('in-view');
        }
    });

    // About section elements
    const aboutText = document.querySelectorAll('.about-text h3, .about-text p');
    aboutText.forEach((el, index) => {
        const elPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elPosition < screenPosition) {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
            }, index * 200);
        }
    });

    // About image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        const imagePosition = aboutImage.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (imagePosition < screenPosition) {
            aboutImage.classList.add('in-view');
        }
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formPosition = contactForm.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (formPosition < screenPosition) {
            contactForm.classList.add('visible');
        }
    }

    // Contact info items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (itemPosition < screenPosition) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        }
    });

    // Skills, timeline, projects
    const elements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .mobile-timeline-item');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
// Initialize on load
animateOnScroll();

// Initialize floating animation for certifications on hover (desktop only)
if (window.innerWidth > 768) {
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('formStatus');
    
    // Set the reply-to field before submission
    contactForm.addEventListener('submit', function(event) {
        const emailInput = document.getElementById('email');
        document.getElementById('replyTo').value = emailInput.value;
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Disable the submit button to prevent multiple submissions
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get the form data
        const formData = new FormData(contactForm);
        
        // Send the form data to Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success message
                statusMessage.textContent = 'Thank you for your message i will get back to you soon.';
                statusMessage.className = 'status-message success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            // Error message
            statusMessage.textContent = 'Oops! There was a problem sending your message. Please try again later.';
            statusMessage.className = 'status-message error';
            console.error('Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
});

function validateForm() {
    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }
    return true;
}


// Touch support for project cards on mobile
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.add('touched');
    });
    
    card.addEventListener('touchend', function() {
        this.classList.remove('touched');
    });
});

// Close modals when pressing Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeExpModal();
        closeResumeModal();
    }
});

// Handle window resize for particles
window.addEventListener('resize', function() {
    // Only reinitialize particles if the device type changes (mobile/desktop)
    if ((window.innerWidth > 768 && !document.getElementById('particles-js').classList.contains('desktop')) || 
        (window.innerWidth <= 768 && document.getElementById('particles-js').classList.contains('desktop'))) {
        pJSDom = document.querySelectorAll('.particles-js-canvas-el');
        if (pJSDom.length) {
            pJSDom.forEach(canvas => canvas.remove());
        }
        initParticles();
    }
});
// iOS detection and comprehensive fixes
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced iOS detection
    const isIOS = () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
               (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    };
    
    if (isIOS()) {
        document.documentElement.classList.add('ios-device');
        
        // 1. Fix for 100vh issue (iOS viewport height bug)
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            document.body.style.height = `${window.innerHeight}px`;
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
        
        // 2. Prevent unwanted page reloads on pull-to-refresh
        let startY = 0;
        let preventPullToRefresh = false;
        
        document.body.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            preventPullToRefresh = window.scrollY <= 0 && startY > 0;
        }, { passive: true });
        
        document.body.addEventListener('touchmove', (e) => {
            const y = e.touches[0].clientY;
            // Check if we're scrolling up or down
            if (preventPullToRefresh && y > startY) {
                e.preventDefault();
            }
            startY = y;
        }, { passive: false });
        
        // 3. Fix for iframe scrolling issues
        const fixIframeScrolling = () => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                iframe.setAttribute('scrolling', 'no');
                iframe.style.overflow = 'hidden';
                iframe.setAttribute('webkitallowfullscreen', '');
                iframe.setAttribute('allowfullscreen', '');
            });
        };
        fixIframeScrolling();
        
        // 4. Prevent zooming on form inputs
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.body.scrollTop = 0;
            });
            
            // Set font-size to 16px on focus to prevent zoom
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
            
            input.addEventListener('blur', function() {
                this.style.fontSize = '';
            });
        });
        
        // 5. Smooth scrolling polyfill for iOS
        const smoothScroll = (target) => {
            const element = document.querySelector(target);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        };
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'));
            });
        });
        
        // 6. Fix for position:fixed elements on iOS
        const fixFixedElements = () => {
            const fixedElements = document.querySelectorAll('header, .mobile-menu');
            fixedElements.forEach(el => {
                el.style.position = 'absolute';
                setTimeout(() => {
                    el.style.position = 'fixed';
                }, 10);
            });
        };
        window.addEventListener('scroll', fixFixedElements);
        fixFixedElements();
        
        // 7. Prevent elastic overscroll
        document.body.style.overscrollBehaviorY = 'contain';
        document.documentElement.style.overscrollBehaviorY = 'contain';
        
        // 8. Fix for click delays on iOS
        document.addEventListener('touchstart', function() {}, { passive: true });
    }
    
    // Apply these fixes to all devices for better consistency
    // 1. Improved smooth scrolling for all browsers
    const smoothScrollAll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollAll(this.getAttribute('href'));
        });
    });
    
    // 2. Prevent form zoom on focus for all mobile devices
    const preventFormZoom = () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
            input.addEventListener('blur', function() {
                this.style.fontSize = '';
            });
        });
    };
    preventFormZoom();
    
    // 3. Initialize particles.js with error handling
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS.load('particles-js', 'assets/particles.json', function() {
                console.log('Particles.js loaded successfully');
            });
        } catch (e) {
            console.error('Particles.js initialization failed:', e);
        }
    }
    
    // 4. Mobile menu functionality
    const toggleMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    const closeMobileMenu = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
    document.getElementById('overlay').addEventListener('click', closeMobileMenu);
    
    // 5. Modal functionality
    const openModal = (modalId) => {
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeModal = () => {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Experience modal functions
    const openExpModal = (modalId) => {
        const modal = document.getElementById(`${modalId}-modal`);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeExpModal = () => {
        const activeModal = document.querySelector('.experience-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Resume modal functions
    const openResumeModal = () => {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeResumeModal = () => {
        const modal = document.getElementById('resume-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Close modals when clicking outside content
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.classList.contains('project-modal')) {
                    closeModal();
                } else if (this.classList.contains('experience-modal')) {
                    closeExpModal();
                } else if (this.classList.contains('resume-modal')) {
                    closeResumeModal();
                }
            }
        });
    });
    
    // Certificate carousel scrolling
    const scrollCertificates = (direction) => {
        const track = document.querySelector('.certificates-track');
        if (track) {
            const scrollAmount = track.clientWidth * 0.8 * direction;
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
});
