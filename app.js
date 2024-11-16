document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];
    const engine = document.getElementById("engineSelect").value;
    const language = document.getElementById("languageSelect").value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("engine", engine);
    formData.append("language", language);

    const progressContainer = document.getElementById("progressContainer");
    const uploadProgress = document.getElementById("uploadProgress");
    const translationProgress = document.getElementById("translationProgress");
    const downloadContainer = document.getElementById("downloadContainer");

    progressContainer.style.display = "block";
    uploadProgress.innerText = "Upload: 0%";
    translationProgress.innerText = "Tradução: 0%";
    downloadContainer.style.display = "none";

    const response = await fetch("/api/translate", {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const { translatedFile } = await response.json();

        translationProgress.innerText = "Tradução: 100%";
        downloadContainer.style.display = "block";

        document.getElementById("downloadButton").onclick = () => {
            const link = document.createElement("a");
            link.href = translatedFile;
            link.download = "arquivo_traduzido.pdf";
            link.click();
        };
    } else {
        alert("Erro ao processar a tradução.");
    }
});
                
