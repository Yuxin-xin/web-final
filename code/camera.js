document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('video');
    const flipBtn = document.getElementById('flip-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const errorMsg = document.getElementById('error-msg');
    
    let currentFacingMode = 'user'; // Front camera by default
    let stream = null;

    

    // Initialize camera
    async function initCamera(facingMode = 'user') {
        try {
            // Stop any existing stream
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }

            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            };

            stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = stream;
            errorMsg.style.display = 'none';

            // Mirror only for front camera
            video.style.transform = facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)';
            
        } catch (err) {
            console.error('Camera error:', err);
            errorMsg.textContent = `Camera Error: ${err.message || 'Could not access camera'}`;
            errorMsg.style.display = 'block';
            
            // Fallback background
            document.body.style.background = 'linear-gradient(135deg, #434343 0%, #000000 100%)';
        }
    }

    // Flip camera between front and back
    flipBtn.addEventListener('click', () => {
        currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
        initCamera(currentFacingMode);
    });

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
        // Reinitialize camera on orientation change
        setTimeout(() => initCamera(currentFacingMode), 300);
    });

    // Initialize with front camera
    await initCamera();

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // Hide flip button if only one camera is available
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                if (videoDevices.length < 2) {
                    flipBtn.style.display = 'none';
                }
            });
    } else {
        // Desktop users might not have environment camera
        flipBtn.textContent = 'Switch Camera';
    }
});
