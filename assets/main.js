// Main JavaScript for GeckoRoo
(function() {
    'use strict';

    // Theme Management
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', theme);
    };

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Header Scroll Effect
    const initHeaderScroll = () => {
        const header = document.querySelector('.site-header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    };

    // Search Filter for Latest Picks
    const initPicksFilter = () => {
        const searchInput = document.getElementById('picks-search');
        const picksGrid = document.getElementById('picks-grid');

        if (!searchInput || !picksGrid) return;

        const pickItems = picksGrid.querySelectorAll('.pick-item');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            pickItems.forEach(item => {
                const title = item.getAttribute('data-title').toLowerCase();

                if (searchTerm === '' || title.includes(searchTerm)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    };

    // Modal Management
    class ModalManager {
        constructor() {
            this.activeModal = null;
            this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            this.init();
        }

        init() {
            // Add event listeners to modal triggers
            document.querySelectorAll('[data-modal]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modalId = trigger.getAttribute('data-modal');
                    this.open(modalId);
                });
            });

            // Add event listeners to close buttons
            document.querySelectorAll('.modal-close').forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    this.close();
                });
            });

            // Add event listeners to backdrops
            document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
                backdrop.addEventListener('click', () => {
                    this.close();
                });
            });

            // ESC key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.activeModal) {
                    this.close();
                }
            });
        }

        open(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            // Store the element that triggered the modal
            this.triggerElement = document.activeElement;

            // Open modal
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            this.activeModal = modal;

            // Trap focus
            this.trapFocus();

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        close() {
            if (!this.activeModal) return;

            // Close modal
            this.activeModal.classList.remove('active');
            this.activeModal.setAttribute('aria-hidden', 'true');

            // Restore body scroll
            document.body.style.overflow = '';

            // Restore focus to trigger
            if (this.triggerElement) {
                this.triggerElement.focus();
            }

            this.activeModal = null;
            this.triggerElement = null;
        }

        trapFocus() {
            const focusableContent = this.activeModal.querySelectorAll(this.focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];

            // Focus first element
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }

            // Trap focus with Tab key
            this.activeModal.addEventListener('keydown', (e) => {
                if (e.key !== 'Tab') return;

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }
    }

    // Email Form Handler
    const initEmailForm = () => {
        const form = document.getElementById('email-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('#email-input');
            const email = emailInput.value;

            // Log to console (in production, this would send to server)
            console.log('Email subscription:', email);

            // Show feedback
            const originalText = form.querySelector('.btn-primary').textContent;
            const btn = form.querySelector('.btn-primary');
            btn.textContent = 'Subscribed!';
            btn.disabled = true;

            // Reset form
            emailInput.value = '';

            // Reset button after delay
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    };

    // Navigation Active State
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.classList.remove('active');

            const linkPath = link.getAttribute('href');

            if (linkPath === currentPath ||
                (currentPath === '/' && linkPath === '/') ||
                (currentPath.includes(linkPath) && linkPath !== '/')) {
                link.classList.add('active');
            }
        });
    };

    // Search Form Handler
    const initSearchForms = () => {
        document.querySelectorAll('.search-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchInput = form.querySelector('.search-input');
                const searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    console.log('Search:', searchTerm);
                    // In production, this would redirect to search results page
                    // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                }
            });
        });
    };

    // Mobile Navigation Toggle (if needed)
    const initMobileNav = () => {
        // Check if we need mobile nav (for future implementation)
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (isMobile) {
            // Add hamburger menu functionality here if needed
            console.log('Mobile navigation ready');
        }
    };

    // Smooth Scroll for Anchor Links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Lazy Load Images (basic implementation)
    const initLazyLoad = () => {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // Image is already loaded by browser's native lazy loading
                        observer.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    };

    // Initialize Everything
    const init = () => {
        // Core functionality
        initTheme();
        initHeaderScroll();
        initPicksFilter();
        initEmailForm();
        initSearchForms();
        initSmoothScroll();
        initLazyLoad();
        setActiveNavLink();
        initMobileNav();

        // Initialize modal manager
        new ModalManager();

        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }

        // Performance monitoring (development only)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('GeckoRoo initialized');

            // Log performance metrics
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                }
            });
        }
    };

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions globally if needed
    window.GeckoRoo = {
        toggleTheme,
        openModal: (modalId) => {
            const modalManager = new ModalManager();
            modalManager.open(modalId);
        }
    };

})();