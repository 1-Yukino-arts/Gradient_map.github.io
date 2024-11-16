const express = require("express");
const multer = require("multer");
const { translatePDF } = require("./utils/translate");

require("dotenv").config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("../"));

app.post("/api/translate", upload.single("file"), async (req, res) => {
    const { engine, language } = req.body;
    const filePath = req.file.path;

    try {
        const translatedFile = await translatePDF(filePath, engine, language);
        res.json({ translatedFile });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao traduzir o arquivo.");
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
