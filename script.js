document.addEventListener('DOMContentLoaded', function() {
    const parallaxContainer = document.querySelector('.parallax-container');
    
    parallaxContainer.addEventListener('scroll', function() {
        const scrollTop = parallaxContainer.scrollTop;
        
        // Parallax effect for sections
        document.querySelectorAll('.parallax-section').forEach(section => {
            const distance = section.getBoundingClientRect().top;
            const speed = 0.5;
            section.style.transform = `translateY(${distance * speed}px)`;
            
            // Add zoom effect on scroll
            const scale = 1 + Math.abs(distance) * 0.0005;
            if (section.classList.contains('hero')) {
                section.querySelector('.content').style.transform = `scale(${Math.min(scale, 1.2)})`;
            }
        });
        
        // Fade in effect for game cards
        document.querySelectorAll('.game-card, .empty-card').forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.85) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
            }
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            parallaxContainer.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Initial animation for game cards
    document.querySelectorAll('.game-card, .empty-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    // Trigger initial scroll event to start animations
    parallaxContainer.dispatchEvent(new Event('scroll'));
});
