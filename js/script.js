const patternAssets = {
    flower: 'img/flowers.png',
    bird: 'img/birds.png',
    cat: 'img/cats.png',
    dog: 'img/dogs.png',
    stripe: 'img/stripes.png',
    plaid: 'img/plaid.png',
    dot: 'img/dots.png',
    randomShape: 'img/randomShapes.png'
};

document.getElementById("generatePattern").addEventListener("click", function() {
    const patternType = document.getElementById("patternType").value;
    const canvas = document.getElementById("patternCanvas");
    const ctx = canvas.getContext("2d");

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gerar padrão com base na escolha
    if (patternAssets[patternType]) {
        generatePattern(ctx, patternAssets[patternType]);
    }
});

// Função para gerar padrões a partir de imagens
function generatePattern(ctx, imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.onload = function() {
        const pattern = ctx.createPattern(img, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

// Função para salvar a estampa como arquivo
document.getElementById("savePattern").addEventListener("click", function() {
    const canvas = document.getElementById("patternCanvas");
    const link = document.createElement("a");
    link.download = 'pattern.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Função para trocar a estampa na galeria
document.getElementById("changePattern").addEventListener("click", function() {
    const canvas = document.getElementById("patternCanvas");
    const gallery = document.getElementById("gallery");
    const newCanvas = document.createElement('canvas');
    newCanvas.width = 200;
    newCanvas.height = 200;
    const newCtx = newCanvas.getContext('2d');
    newCtx.drawImage(canvas, 0, 0, 200, 200);
    gallery.appendChild(newCanvas);
});
