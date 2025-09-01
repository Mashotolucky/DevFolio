// DevFolio - Portfolio JavaScript

class DevFolio {
    constructor() {
        this.init();
    }

    init() {
        this.initLucideIcons();
        this.initNavigation();
        this.initScrollToTop();
        this.initContactForm();
        this.initAnimations();
        this.bindEvents();
    }

    // Initialize Lucide Icons
    initLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Navigation functionality
    initNavigation() {
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = mobileMenuBtn.querySelector('.close-icon');

        // Handle scroll effect on navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        let isMobileMenuOpen = false;
        
        mobileMenuBtn.addEventListener('click', () => {
            isMobileMenuOpen = !isMobileMenuOpen;
            
            if (isMobileMenuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-fade-in');
                menuIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('animate-fade-in');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });

        // Navigation link clicks (both desktop and mobile)
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item, [data-target]');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = item.getAttribute('data-target');
                if (target) {
                    e.preventDefault();
                    this.scrollToSection(target);
                    
                    // Close mobile menu if open
                    if (isMobileMenuOpen) {
                        isMobileMenuOpen = false;
                        mobileMenu.classList.add('hidden');
                        menuIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                }
            });
        });
    }

    // Smooth scroll to section
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Scroll to top button
    initScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('hidden');
                scrollToTopBtn.classList.add('animate-fade-in');
            } else {
                scrollToTopBtn.classList.add('hidden');
                scrollToTopBtn.classList.remove('animate-fade-in');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form functionality
    initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const submitText = submitBtn.querySelector('.submit-text');
        const loadingSpinner = submitBtn.querySelector('.loading-spinner');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Validate form
            if (!data.name || !data.email || !data.message) {
                this.showToast('Please fill in all fields', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitText.classList.add('hidden');
            loadingSpinner.classList.remove('hidden');

            try {
                // Simulate form submission (replace with actual API call)
                await this.simulateFormSubmission(data);
                
                // Show success message
                this.showToast('Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                
            } catch (error) {
                this.showToast('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitText.classList.remove('hidden');
                    loadingSpinner.classList.add('hidden');
                }, 1000);
            }
        });
    }

    // Simulate form submission (replace with actual API call)
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            // Log form data for demonstration
            console.log('Form submission:', data);
            
            // Simulate network delay
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    // Show toast notification
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastTitle = toast.querySelector('.toast-title');
        const toastDescription = toast.querySelector('.toast-description');
        const toastIcon = toast.querySelector('.toast-icon i');

        // Update toast content
        if (type === 'success') {
            toastTitle.textContent = 'Success!';
            toastIcon.setAttribute('data-lucide', 'check-circle');
            toast.style.background = 'var(--glass)';
            toast.style.border = '1px solid var(--primary)';
        } else {
            toastTitle.textContent = 'Error!';
            toastIcon.setAttribute('data-lucide', 'x-circle');
            toast.style.background = 'var(--glass)';
            toast.style.border = '1px solid var(--destructive)';
        }
        
        toastDescription.textContent = message;

        // Show toast
        toast.classList.remove('hidden');
        toast.classList.add('animate-scale-in');

        // Re-initialize Lucide icons for the toast
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('animate-scale-in');
        }, 4000);
    }

    // Initialize scroll-triggered animations
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in-view');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.animate-fade-in, .animate-slide-up, .animate-scale-in'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // Bind additional events
    bindEvents() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (!mobileMenu.classList.contains('hidden')) {
                    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
                    mobileMenuBtn.click();
                }
            }
        });

        // Smooth hover effects for interactive elements
        const interactiveElements = document.querySelectorAll(
            '.btn, .nav-item, .mobile-nav-item, .contact-link, .project-card, .tech-card'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRipple);
        });
    }

    // Handle window resize
    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuIcon = document.querySelector('.menu-icon');
            const closeIcon = document.querySelector('.close-icon');
            
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    // Create ripple effect for buttons
    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);

        // Add ripple styles
        const style = document.createElement('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: rgba(255, 255, 255, 0.6);
                pointer-events: none;
            }
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('#ripple-styles')) {
            style.id = 'ripple-styles';
            document.head.appendChild(style);
        }
    }

    // Utility method to throttle function calls
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Utility method to debounce function calls
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Performance optimization: Load animations only when needed
const loadAnimations = () => {
    // Add CSS animation classes when page loads
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('[style*="animation-delay"]');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
};

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new DevFolio();
    loadAnimations();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Preload critical images and assets
const preloadAssets = () => {
    const criticalAssets = [
        // Add any critical images or assets here
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = asset.includes('.css') ? 'style' : 'image';
        link.href = asset;
        document.head.appendChild(link);
    });
};

// Initialize asset preloading
preloadAssets();

// Service worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
