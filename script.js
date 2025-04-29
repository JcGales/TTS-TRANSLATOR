const textInput = document.getElementById("text");
const inputLanguage = document.getElementById("inputLanguage");
const outputLanguage = document.getElementById("outputLanguage");
const translateSpeakButton = document.getElementById("translateSpeak");
const translatedTextDiv = document.getElementById("translatedText");

async function translateText(text, fromLang, toLang) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.responseData.translatedText;
}


translateSpeakButton.addEventListener("click", async () => {
    const text = textInput.value.trim();
    if (!text) return alert("⚠️ Please enter some text!");

    const fromLang = inputLanguage.value;
    const toLang = outputLanguage.value;
    translatedTextDiv.innerHTML = "Translating... ⏳";

    try {
        const translatedText = await translateText(text, fromLang, toLang);
        translatedTextDiv.innerHTML = translatedText;
        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = toLang;
        speechSynthesis.speak(utterance);
    } catch (error) {
        translatedTextDiv.innerHTML = "❌ Translation failed.";
        console.error(error);
    }
});