const Tesseract = require("tesseract.js");

async function extractText(buffer) {
    const { data } = await Tesseract.recognize(buffer, "eng");
    return data.text.trim();
}

module.exports = { extractText };
