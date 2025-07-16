// Particle animation configuration
const particleConfig = {
    count: 22,
    minSize: 10,
    maxSize: 38,
    opacity: 0.22,
    color: 'rgba(66, 153, 225, {opacity})',
    animationDuration: 1500,
    staggerDelay: 30
};

// Create and animate particles
function initParticles() {
    // Check if anime.js is available
    if (typeof anime === 'undefined') {
        console.error('anime.js is not loaded. Please ensure the library is loaded before initializing particles.');
        return;
    }

    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    // Create particles
    const particles = [];
    for (let i = 0; i < particleConfig.count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between min and max
        const size = particleConfig.minSize + Math.random() * (particleConfig.maxSize - particleConfig.minSize);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Set background color
        particle.style.background = particleConfig.color.replace('{opacity}', particleConfig.opacity);
        
        particlesContainer.appendChild(particle);
        particles.push(particle);
    }

    try {
        // Animate particles
        window.particleAnimation = anime({
            targets: particles,
            translateY: [-30, 0],
            opacity: [0, 1, 0],
            duration: particleConfig.animationDuration,
            delay: anime.stagger(particleConfig.staggerDelay),
            loop: true,
            easing: 'easeInOutSine',
            update: function(anim) {
                particles.forEach((particle, index) => {
                    const progress = anim.progress / 100;
                    const delay = index * (particleConfig.staggerDelay / particleConfig.animationDuration);
                    const particleProgress = (progress + delay) % 1;
                    
                    // Apply smooth floating effect
                    const yOffset = -30 * Math.sin(particleProgress * Math.PI);
                    particle.style.transform = `translateY(${yOffset}px)`;
                });
            }
        });
    } catch (error) {
        console.error('Error initializing particle animation:', error);
    }
}

// Initialize particles when DOM is ready and ensure anime.js is loaded
function ensureAnimeAndInit() {
    if (typeof anime !== 'undefined') {
        initParticles();
    } else {
        // If anime.js isn't loaded yet, wait a bit and try again
        setTimeout(ensureAnimeAndInit, 100);
    }
}

document.addEventListener('DOMContentLoaded', ensureAnimeAndInit); 