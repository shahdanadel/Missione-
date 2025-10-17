// Simple test animation - temporary file to test animations
function testAnimation() {
    const container = document.querySelector('.gallery-container');
    if (container) {
        console.log('Testing animation...');

        // Simple opacity change
        container.style.transition = 'all 0.5s ease';
        container.style.opacity = '0.3';

        setTimeout(() => {
            container.style.opacity = '1';
            console.log('Animation should be visible now');
        }, 500);
    }
}

// Call test after page loads
setTimeout(testAnimation, 2000);