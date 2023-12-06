const fs = require('fs');
const programming_language_reader = require("./programming_language_reader.js")

async function getAllRequiredTypeLanguage(requiredType) {
    const jsonData = JSON.parse(fs.readFileSync('groupOfLanguage.json', 'utf-8'));
    const languages = jsonData[requiredType];
    return languages;
}

async function getExprienceEvaluationValue(tokens, requiredLanguages, requiredType) {
    const allLanguages = await programming_language_reader.findAllLanguage(tokens);
    // console.log(allLanguages)
    const totalRequiredLanguages = requiredLanguages.length;
    let matchedLanguages = 0;
    requiredLanguages.forEach(element => {
        if (allLanguages.includes(element)) matchedLanguages++;
    });

    if (matchedLanguages == totalRequiredLanguages) return 5;
    else {
        languages = getAllRequiredTypeLanguage(requiredType);
    }
}







const pdf = require('pdf-parse');
const natural = require('natural');

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
    console.log(await getExprienceEvaluationValue(filteredTokens, ['C#, net, angular'], 'Backend Development'))
    // getAllRequiredTypeLanguage('Backend Development')
}
abc()