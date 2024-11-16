const axios = require("axios");

async function translateText(engine, language, text) {
    if (engine === "gpt") {
        // Tradução com GPT
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: `Traduza para ${language}: ${text}`,
            max_tokens: 2048,
        }, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        });
        return response.data.choices[0].text.trim();
    } else if (engine === "gemini") {
        // Tradução com Gemini (exemplo)
        const response = await axios.post("https://gemini.api/translate", {
            text,
            targetLanguage: language,
        }, {
            headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` },
        });
        return response.data.translation || "Erro ao traduzir com Gemini.";
    } else {
        throw new Error("Mecanismo de tradução inválido.");
    }
}

module.exports = { translateText };
