import * as pose from'./tfjs-models/pose-detection/src/constants';
import * as pose from'./tfjs-models/pose-detection/src/create_detector';
import * as pose from'./tfjs-models/pose-detection/src/pose_detector';
import * as pose from'./tfjs-models/pose-detection/src/setup_test';
import * as pose from'./tfjs-models/pose-detection/src/types';
import * as pose from'./tfjs-models/pose-detection/src/util';
import * as pose from'./tfjs-models/pose-detection/src/version';
import * as pose from'./tfjs-models/pose-detection/src/index';
document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('video');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const errorMsg = document.getElementById('error-msg');
    const cameraContainer = document.querySelector('.camera-container');
    
    let stream = null;
    const activeApples = new Set();

    // Initialize camera
    async function initCamera() {
        try {
            // Stop any existing stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                clearAllApples();
            }

            const constraints = {
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            };

            errorMsg.style.display = 'none';
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
            
            // Wait for video to be ready
            await new Promise((resolve) => {
                video.onloadedmetadata = resolve;
            });

            // Start apple generation
            startAppleGeneration();
            
        } catch (err) {
            console.error('Camera error:', err);
            errorMsg.textContent = `Camera Error: ${err.message || 'Could not access camera'}`;
            errorMsg.style.display = 'block';
            document.body.style.background = 'linear-gradient(135deg, #434343 0%, #000000 100%)';
        }
    }

    function clearAllApples() {
        activeApples.forEach(apple => {
            clearInterval(apple.interval);
            apple.element.remove();
        });
        activeApples.clear();
    }

    function startAppleGeneration() {
        // Create 3 initial apples
        for (let i = 0; i < 3; i++) {
            setTimeout(createApple, i * 300);
        }
        
        // Keep generating apples periodically
        setInterval(() => {
            if (activeApples.size < 5) { // Limit to 5 apples max
                createApple();
            }
        }, 1000);
    }

    function createApple() {
        const apple = document.createElement('div');
        apple.className = 'apple';
        apple.textContent = '🍎';
        
        // Make sure apples are clickable and visible
        apple.style.pointerEvents = 'auto';
        apple.style.cursor = 'pointer';
        apple.style.position = 'absolute';
        apple.style.zIndex = '10';
        
        cameraContainer.appendChild(apple);
        
        // Initial position at bottom
        let posX = Math.random() * (window.innerWidth - 50);
        let posY = window.innerHeight; // Start at bottom
        
        // Physics variables - corrected values
        let velocityY = -(Math.random() * 5 + 10); // Negative for upward movement
        const velocityX = (Math.random() - 0.5) * 2; // Random horizontal movement
        const gravity = 0.2; // Positive gravity value
        
        apple.style.left = posX + 'px';
        apple.style.bottom = '0px';
        
        const appleData = {
            element: apple,
            interval: setInterval(() => {
                // Apply physics
                velocityY += gravity;
                posX += velocityX;
                posY += velocityY; // Now using positive Y direction
                
                apple.style.left = posX + 'px';
                apple.style.top = posY + 'px'; // Changed to top for easier calculations
                
                // Remove when out of screen (top or sides)
                if (posY < -50 || 
                    posX < -50 || 
                    posX > window.innerWidth + 50) {
                    clearInterval(appleData.interval);
                    apple.remove();
                    activeApples.delete(appleData);
                }
            }, 20)
        };
        
        activeApples.add(appleData);
        
        // Click handler - improved
        apple.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            clearInterval(appleData.interval);
            apple.style.transform = 'scale(0)';
            apple.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                apple.remove();
                activeApples.delete(appleData);
            }, 200);
        });
    }

    // Toggle fullscreen
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Handle fullscreen change
    document.addEventListener('fullscreenchange', () => {
        fullscreenBtn.textContent = document.fullscreenElement ? 
            'Exit Fullscreen' : 'Fullscreen';
    });

    // Handle orientation changes
    window.addEventListener('orientationchange', () => {
        setTimeout(() => initCamera(), 300);
    });

    // Initialize camera
    await initCamera();
});