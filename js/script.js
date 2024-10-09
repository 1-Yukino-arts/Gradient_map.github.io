// Função para gerar um valor aleatório entre um mínimo e um máximo
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Função que aplica os efeitos aleatórios de saturação, brilho, contraste, matiz e inverte a imagem
function applyRandomEffects() {
    const img = document.getElementById("gradientImage");
    const thumbnailCanvas = document.getElementById("thumbnailCanvas");
    const ctx = thumbnailCanvas.getContext("2d");

    // Saturação, rotação de matiz, brilho e contraste aleatórios
    const saturation = getRandom(0.5, 2); // 50% a 200%
    const hue = getRandom(0, 360); // 0 a 360 graus
    const brightness = getRandom(0.5, 1.5); // 50% a 150%
    const contrast = getRandom(0.5, 2); // 50% a 200%

    // Inversão aleatória da imagem
    const flipX = Math.random() < 0.5 ? -1 : 1;
    const flipY = Math.random() < 0.5 ? -1 : 1;

    // Aplicar filtros e transformações na imagem original
    img.style.filter = `saturate(${saturation}) hue-rotate(${hue}deg) brightness(${brightness}) contrast(${contrast})`;
    img.style.transform = `scale(${flipX}, ${flipY})`;

    // Aplicar as mesmas transformações na miniatura (canvas)
    ctx.clearRect(0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
    ctx.save();

    // Aplicar transformações no contexto do canvas
    ctx.translate(thumbnailCanvas.width / 2, thumbnailCanvas.height / 2);
    ctx.scale(flipX, flipY); // Escala para inverter a imagem
    ctx.translate(-thumbnailCanvas.width / 2, -thumbnailCanvas.height / 2);

    // Desenhar a imagem no canvas com as mesmas transformações
    ctx.filter = `saturate(${saturation}) hue-rotate(${hue}deg) brightness(${brightness}) contrast(${contrast})`;
    ctx.drawImage(img, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

    ctx.restore();
}

// Função para carregar a imagem do dispositivo do usuário
document.getElementById("imageInput").addEventListener("change", function (event) {
    const img = document.getElementById("gradientImage");
    const thumbnailCanvas = document.getElementById("thumbnailCanvas");
    const randomizeButton = document.getElementById("randomizeButton");
    const saveButton = document.getElementById("saveButton");
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            img.src = e.target.result;
            img.style.display = "block"; // Exibe a imagem após o carregamento
            randomizeButton.style.display = "block"; // Exibe o botão de randomização após o carregamento da imagem
            thumbnailCanvas.style.display = "block"; // Exibe o canvas da miniatura
            saveButton.style.display = "block"; // Exibe o botão de salvar imagens
        };

        reader.readAsDataURL(file); // Converte o arquivo de imagem para uma URL de dados
    }
});

// Função para salvar a imagem original e a miniatura
function saveImages() {
    const img = document.getElementById("gradientImage");
    const thumbnailCanvas = document.getElementById("thumbnailCanvas");

    // Salvar a imagem original com os filtros aplicados
    const originalCanvas = document.createElement('canvas');
    const ctxOriginal = originalCanvas.getContext('2d');
    
    // Definir o tamanho do canvas original para o tamanho da imagem
    originalCanvas.width = img.naturalWidth;
    originalCanvas.height = img.naturalHeight;

    // Aplicar os mesmos filtros no canvas
    ctxOriginal.filter = img.style.filter;

    // Desenhar a imagem original no canvas
    ctxOriginal.drawImage(img, 0, 0, originalCanvas.width, originalCanvas.height);

    // Criar link de download para a imagem original
    const originalLink = document.createElement('a');
    originalLink.href = originalCanvas.toDataURL('image/jpeg');
    originalLink.download = 'modified_image.jpg';
    originalLink.click();

    // Criar link de download para a miniatura
    const thumbnailLink = document.createElement('a');
    thumbnailLink.href = thumbnailCanvas.toDataURL('image/jpeg');
    thumbnailLink.download = 'thumbnail_image.jpg';
    thumbnailLink.click();
}
