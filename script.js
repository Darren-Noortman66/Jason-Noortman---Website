// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initSmoothScrolling();
    initNavbarEffects();
    initScrollAnimations();
    initPortfolioInteractions();
    initLoadingAnimations();
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll indicator click
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', function() {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    const offsetTop = aboutSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
    
    // Navbar effects and active link highlighting
    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(44, 62, 80, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(44, 62, 80, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
        
        // Active link highlighting
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Scroll animations for elements
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item, .contact-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Portfolio interactions
    function initPortfolioInteractions() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Click to show details (could be expanded to show modal)
            item.addEventListener('click', function() {
                const title = this.querySelector('.portfolio-overlay h5').textContent;
                const description = this.querySelector('.portfolio-overlay p').textContent;
                
                showNotification(`Selected: ${title}`, 'info');
            });
        });
    }
    
    // Loading animations
    function initLoadingAnimations() {
        // Add loading class to elements
        const loadingElements = document.querySelectorAll('.service-card, .portfolio-item, .skill-item');
        
        loadingElements.forEach((el, index) => {
            el.classList.add('loading');
            
            // Stagger the loading animation
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100);
        });
        
        // Hero content animation
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 500);
        }
    }
    
    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || icons.info;
    }
    
    function getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };
        return colors[type] || colors.info;
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: var(--accent-color) !important;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Typing effect for hero title (optional enhancement)
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1 .text-primary');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Initialize typing effect after a delay
    setTimeout(initTypingEffect, 500);
    
    // Add some interactive drawing elements to portfolio
    function addDrawingInteractions() {
        const drawingLines = document.querySelectorAll('.drawing-lines .line');
        
        drawingLines.forEach(line => {
            line.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform = this.style.transform + ' scale(1.1)';
            });
            
            line.addEventListener('mouseleave', function() {
                this.style.opacity = '0.3';
                this.style.transform = this.style.transform.replace(' scale(1.1)', '');
            });
        });
    }
    
    // Initialize drawing interactions
    setTimeout(addDrawingInteractions, 1000);
    
    // Add scroll progress indicator
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-color);
            z-index: 1001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Initialize scroll progress
    initScrollProgress();
    
    // Add some technical drawing animations
    function addTechnicalAnimations() {
        const technicalFrame = document.querySelector('.technical-drawing-frame');
        
        if (technicalFrame) {
            // Add some animated lines inside the frame
            const animatedLines = document.createElement('div');
            animatedLines.className = 'animated-lines';
            animatedLines.innerHTML = `
                <div class="animated-line line1"></div>
                <div class="animated-line line2"></div>
                <div class="animated-line line3"></div>
            `;
            
            const drawingPaper = technicalFrame.querySelector('.drawing-paper');
            if (drawingPaper) {
                drawingPaper.appendChild(animatedLines);
            }
        }
    }
    
    // Add technical animations
    setTimeout(addTechnicalAnimations, 1500);
    
    // Add CSS for technical animations
    const technicalStyle = document.createElement('style');
    technicalStyle.textContent = `
        .animated-lines {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .animated-line {
            position: absolute;
            background: var(--accent-color);
            opacity: 0.2;
            animation: drawLine 3s ease-in-out infinite;
        }
        
        .animated-line.line1 {
            width: 60%;
            height: 1px;
            top: 30%;
            left: 20%;
            animation-delay: 0s;
        }
        
        .animated-line.line2 {
            width: 1px;
            height: 50%;
            top: 25%;
            left: 40%;
            animation-delay: 1s;
        }
        
        .animated-line.line3 {
            width: 40%;
            height: 1px;
            top: 60%;
            left: 30%;
            animation-delay: 2s;
        }
        
        @keyframes drawLine {
            0% {
                transform: scaleX(0);
                opacity: 0;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                transform: scaleX(1);
                opacity: 0.2;
            }
        }
    `;
    document.head.appendChild(technicalStyle);
    
}); 