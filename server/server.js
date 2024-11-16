const express = require("express");
const multer = require("multer");
const { extractText } = require("./utils/ocr");
const { translateText } = require("./utils/translate");
require("dotenv").config();

const app = express();
const upload = multer();

app.post("/api/translate", upload.single("file"), async (req, res) => {
    try {
        const { buffer } = req.file;
        const { engine, language } = req.body;

        // Extração de texto (OCR)
        const extractedText = await extractText(buffer);

        // Tradução
        const translation = await translateText(engine, language, extractedText);
        res.json({ translation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no servidor." });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
