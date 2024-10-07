let mainCanvas = document.getElementById('mainCanvas');
let previewCanvas = document.getElementById('previewCanvas');
let mainCtx = mainCanvas.getContext('2d');
let previewCtx = previewCanvas.getContext('2d');
let image = new Image();

function loadImage(event) {
    let reader = new FileReader();
    reader.onload = function () {
        image.src = reader.result;
        image.onload = function () {
            mainCanvas.width = image.width;
            mainCanvas.height = image.height;
            mainCtx.drawImage(image, 0, 0);

            previewCtx.clearRect(0, 0, 300, 300);
            previewCtx.drawImage(image, 0, 0, 300, 300);
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}

function flipImage() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCtx.scale(-1, 1);
    mainCtx.drawImage(image, -mainCanvas.width, 0);
}

function rotateImage() {
    mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainCanvas.width = image.height;
    mainCanvas.height = image.width;
    mainCtx.translate(image.height / 2, image.width / 2);
    mainCtx.rotate(Math.PI / 2);
    mainCtx.drawImage(image, -image.width / 2, -image.height / 2);
}
