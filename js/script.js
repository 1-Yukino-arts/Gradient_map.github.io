let originalImage = null;
let rotation = 0;
let flip = false;

function loadImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        originalImage = new Image();
        originalImage.src = reader.result;
        originalImage.onload = function() {
            updateImage();
        };
    };
    reader.readAsDataURL(event.target.files[0]);
}

function updateImage() {
    if (!originalImage) return;

    const saturation = document.getElementById("saturation").value;
    const brightness = document.getElementById("brightness").value;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = originalImage.width;
    const height = originalImage.height;
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.filter = `saturate(${saturation}%) brightness(${brightness}%)`;
    ctx.save();
    applyTransformations(ctx, width, height);
    ctx.drawImage(originalImage, 0, 0, width, height);
    ctx.restore();

    const image = document.getElementById("image");
    const thumbnail = document.getElementById("thumbnail");

    image.src = canvas.toDataURL();
    updateThumbnail(canvas);
}

function rotateImage(degrees) {
    rotation = (rotation + degrees) % 360;
    updateImage();
}

function flipImage() {
    flip = !flip;
    updateImage();
}

function applyTransformations(ctx, width, height) {
    if (rotation !== 0) {
        ctx.translate(width / 2, height / 2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-width / 2, -height / 2);
    }
    if (flip) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
    }
}

function updateThumbnail(canvas) {
    const thumbnail = document.getElementById("thumbnail");
    const thumbnailCanvas = document.createElement("canvas");
    const ctx = thumbnailCanvas.getContext("2d");

    thumbnailCanvas.width = 300;
    thumbnailCanvas.height = 300;

    const scale = Math.min(300 / canvas.width, 300 / canvas.height);
    const width = canvas.width * scale;
    const height = canvas.height * scale;
    const offsetX = (300 - width) / 2;
    const offsetY = (300 - height) / 2;

    ctx.drawImage(canvas, offsetX, offsetY, width, height);
    thumbnail.src = thumbnailCanvas.toDataURL();
}
