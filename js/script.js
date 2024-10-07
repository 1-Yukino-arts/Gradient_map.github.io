let mainCanvas = document.getElementById('mainCanvas');
let previewCanvas = document.getElementById('previewCanvas');
let mainCtx = mainCanvas.getContext('2d');
let previewCtx = previewCanvas.getContext('2d');
let image = new Image();
let originalImageData = null;

function loadImage(event) {
    let reader = new FileReader();
    reader.onload = function () {
        image.src = reader.result;
        image.onload = function () {
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;
            mainCtx.drawImage(image, 0, 0);
            originalImageData = mainCtx.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
            updatePreview();
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}

function adjustImage() {
    if (!originalImageData) return;
    let saturation = document.getElementById('saturation').value;
    let brightness = document.getElementById('brightness').value;
    
    mainCtx.putImageData(originalImageData, 0, 0);
    
    let imageData = mainCtx.getImageData(0, 0, mainCanvas.width, mainCanvas.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Adjust saturation and brightness
        let avg = (r + g + b) / 3;
        data[i] = avg + (r - avg) * (saturation / 100);
        data[i + 1] = avg + (g - avg) * (saturation / 100);
        data[i + 2] = avg + (b - avg) * (saturation / 100);
        
        // Brightness adjustment
        data[i] *= (brightness / 100);
        data[i + 1] *= (brightness / 100);
        data[i + 2] *= (brightness / 100);
    }

    mainCtx.putImageData(imageData, 0, 0);
    updatePreview();
}

function updatePreview() {
    previewCtx.clearRect(0, 0, 300, 300);
    previewCtx.drawImage(mainCanvas, 0, 0, 300, 300);
}

function flipImage() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.scale(-1, 1);
    mainCtx.drawImage(image, -mainCanvas.width, 0);
    updatePreview();
}

function rotateImage() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCanvas.width = image.height;
    mainCanvas.height = image.width;
    mainCtx.translate(image.height / 2, image.width / 2);
    mainCtx.rotate(Math.PI / 2);
    mainCtx.drawImage(image, -image.width / 2, -image.height / 2);
    updatePreview();
}

function resetImage() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCanvas.width = image.width;
    mainCanvas.height = image.height;
    mainCtx.drawImage(image, 0, 0);
    updatePreview();
}

function downloadImage(canvasId) {
    let canvas = document.getElementById(canvasId);
    let link = document.createElement('a');
    link.download = canvasId + '.png';
    link.href = canvas.toDataURL();
    link.click();
    }
