// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create animated particles
    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }


    // Create confetti
    function createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        const colors = ['#eb4373', '#f56f95', '#6d62ae', '#a1d9cf', '#007991', '#3e245b'];
        const shapes = ['square', 'circle', 'triangle'];

        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 4) + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';

            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = '5px solid transparent';
                confetti.style.borderRight = '5px solid transparent';
                confetti.style.borderBottom = '10px solid ' + colors[Math.floor(Math.random() * colors.length)];
            }

            const size = Math.random() * 8 + 6;
            if (shape !== 'triangle') {
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
            }

            confettiContainer.appendChild(confetti);
        }
    }

    createConfetti();

    // Intersection Observer for generic visibility (stats/features/announcements)
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');

                    // Animate numbers for stat cards
                    if (entry.target.classList.contains('stat-card')) {
                        animateNumber(entry.target);
                    }
                }, 300);
            }
        });
    }, observerOptions);

    // Observe all animated elements (non-customer)
    document.querySelectorAll('.stat-card, .feature-content, .announcement').forEach(el => {
        observer.observe(el);
    });

    // Intersection Observer specifically for customer sections to start animations on visibility
    const customerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, 300);
                // Unobserve so customer section animations only start once
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -15% 0px' });

    // Observe each customer section
    document.querySelectorAll('section.customer').forEach(section => {
        customerObserver.observe(section);
    });

    // Animate counting numbers
    function animateNumber(card) {
        const target = parseInt(card.dataset.target);
        const numberEl = card.querySelector('.stat-number');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            numberEl.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // Smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
