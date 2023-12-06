const programming_language_reader = require("./programming_language_reader.js")

function getExprienceEvaluationValue(tokens, requiredLanguages, requiredType){
    const allLanguages = programming_language_reader.findAllLanguage(tokens);
    console.log(allLanguages)
}







const pdf = require('pdf-parse');
const natural = require('natural');
const fs = require('fs');

async function getTokens(fileBuffer) {
    try {
        const data = await pdf(fileBuffer);
        let textContent = data.text;
        textContent = textContent.replace(/-/g, '');
        textContent = textContent.replace(/\./g, '');
        const stopwords = natural.stopwords;

        const customTokenizer = /\b[A-Za-z]\+ |\b[A-Za-z]\+\+|\b[A-Za-z]#|\b\w+\b/g;
        let tokens = textContent.match(customTokenizer);
        const filteredTokens = tokens.filter(token => !stopwords.includes(token.toLowerCase()));
        const lowercaseTokens = filteredTokens.map(token => token.toLowerCase());
        return lowercaseTokens;
    }
    catch (error) {
        console.error('Error reading PDF:', error);
    }
}

async function abc() {
    const pdfPath = 'Profile_38.pdf';
    const fileBuffer = await fs.readFileSync(pdfPath);
    let filteredTokens = await getTokens(fileBuffer);
    // console.log(filteredTokens)
    // let allLanguages = await findAllLanguage(filteredTokens);
    // console.log(allLanguages)
    console.log(getExprienceEvaluationValue(filteredTokens))
}
abc()