// ========================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate all cards and sections on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.performance-card, .tech-card, .design-showcase, .anticipation-content');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animateOnScroll.observe(el);
    });
});

// ========================================
// PARALLAX EFFECT ON HERO IMAGE
// ========================================

const heroImage = document.querySelector('.hero-image-wrapper');
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick, { passive: true });

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// ANIMATED COUNTER FOR SPECS
// ========================================

function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Trigger counter animations when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const specValues = document.querySelectorAll('.spec-value');
            specValues.forEach((spec, index) => {
                const text = spec.textContent;
                const hasPlus = text.includes('+');
                const value = parseInt(text.replace(/\D/g, ''));

                setTimeout(() => {
                    animateValue(spec, 0, value, 1500, hasPlus ? '+' : '');
                }, index * 200);
            });
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ========================================
// MOUSE MOVE PARALLAX ON CARDS
// ========================================

const performanceCards = document.querySelectorAll('.performance-card');

performanceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// DESIGN CALLOUT PULSE ANIMATION
// ========================================

const calloutDots = document.querySelectorAll('.callout-dot');

calloutDots.forEach((dot, index) => {
    setTimeout(() => {
        dot.style.animation = `pulse 2s ease ${index * 0.3}s infinite`;
    }, index * 500);
});

// ========================================
// TECH CARD STAGGER ANIMATION
// ========================================

const techCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.tech-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, index * 150);
            });
            techCardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const techGrid = document.querySelector('.tech-grid');
if (techGrid) {
    const techCards = techGrid.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    techCardObserver.observe(techGrid);
}

// ========================================
// TIMELINE ANIMATION
// ========================================

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.timeline-item');
            const connectors = entry.target.querySelectorAll('.timeline-connector');

            items.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 300);
            });

            connectors.forEach((connector, index) => {
                setTimeout(() => {
                    connector.style.opacity = '1';
                    connector.style.transform = 'scaleX(1)';
                }, index * 300 + 150);
            });

            timelineObserver.disconnect();
        }
    });
}, observerOptions);

const timeline = document.querySelector('.anticipation-timeline');
if (timeline) {
    const items = timeline.querySelectorAll('.timeline-item');
    const connectors = timeline.querySelectorAll('.timeline-connector');

    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    connectors.forEach(connector => {
        connector.style.opacity = '0';
        connector.style.transformOrigin = 'left center';
        connector.style.transform = 'scaleX(0)';
        connector.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });

    timelineObserver.observe(timeline);
}

// ========================================
// RACING STRIPES ANIMATION
// ========================================

const racingStripes = document.querySelector('.racing-stripes');
let stripeRotation = 45;

function animateStripes() {
    stripeRotation += 0.05;
    if (racingStripes) {
        racingStripes.style.backgroundImage = `
            repeating-linear-gradient(
                ${stripeRotation}deg,
                transparent,
                transparent 50px,
                rgba(0, 102, 255, 0.03) 50px,
                rgba(0, 102, 255, 0.03) 52px
            )
        `;
    }
    requestAnimationFrame(animateStripes);
}

// Only animate on desktop to preserve performance
if (window.innerWidth > 768) {
    animateStripes();
}

// ========================================
// IMAGE LAZY LOADING WITH FADE-IN
// ========================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.8s ease';

            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
            }

            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for resize events
function debounce(func, wait) {
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

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate any responsive elements if needed
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ========================================
// EASTER EGG: KONAMI CODE
// ========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('%c🏍️ BMW R1300RT 2026 - Engineered for Excellence', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cTry the Konami Code for a surprise! ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #666;');
