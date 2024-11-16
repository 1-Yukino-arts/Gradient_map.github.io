document.getElementById("uploadForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = document.getElementById("fileInput").files[0];
    const engine = document.getElementById("engineSelect").value;
    const language = document.getElementById("languageSelect").value;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("engine", engine);
    formData.append("language", language);

    const response = await fetch("/api/translate", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();
    document.getElementById("output").innerText = result.translation || "Erro na tradução.";
});
