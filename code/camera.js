document.addEventListener('DOMContentLoaded', async () => {
    // Load pose detection from local path
    const posedetection = await loadPoseDetection();
    
    const videoElement = document.getElementById('video');
    const errorMsg = document.getElementById('error-msg');
    const cameraContainer = document.querySelector('.camera-container');
    const canvas = document.createElement('canvas');
    cameraContainer.appendChild(canvas);
    
    const activeGeese = new Set();
    let detector = null;
    let renderer = null;
    let camera = null;
    let animationFrameId = null;

    // Score display

    // Load pose detection from local files
    async function loadPoseDetection() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'tfjs-models/pose-detection.js';
            script.onload = () => {
                resolve(posedetection); // Make sure the global variable matches
            };
            document.head.appendChild(script);
        });
    }

    // Initialize camera
    async function initCamera() {
        try {
            // Stop existing streams
            if (camera?.video?.srcObject) {
                camera.video.srcObject.getTracks().forEach(track => track.stop());
            }
            cancelAnimationFrame(animationFrameId);
            clearAllGeese();

            errorMsg.style.display = 'none';
            
            // Initialize camera (modified Camera class to work without modules)
            camera = await setupCamera();
            
            // Set up canvas
            canvas.width = camera.video.videoWidth;
            canvas.height = camera.video.videoHeight;
            renderer = new RendererCanvas2d(canvas); // Modified to work without imports
            
            // Initialize detector
            const model = posedetection.SupportedModels.MoveNet;
            detector = await posedetection.createDetector(model, {
                modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER
            });
            
            startGooseGeneration();
            detectPoses();
            
        } catch (err) {
            console.error('Error:', err);
            errorMsg.textContent = `Error: ${err.message || 'Initialization failed'}`;
            errorMsg.style.display = 'block';
        }
    }

    // Rest of your existing functions (detectPoses, checkAppleCollisions, etc.)
    // ... keep all the game logic functions from previous implementation ...

    // Initialize
    await initCamera();
});
