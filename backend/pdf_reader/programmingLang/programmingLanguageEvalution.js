const fs = require('fs');
const path = require('path');

const programming_language_reader = require("./programming_language_reader.js")

async function getAllRequiredTypeLanguage(requiredType) {
    const filePath = path.join(__dirname, 'groupOfLanguage.json'); 
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const languages = jsonData[requiredType];
    return languages;
}

async function getLanguageEvaluationValue(tokens, requiredLanguages, requiredType) {
    const allLanguages = await programming_language_reader.findAllLanguage(tokens);
    // console.log(requiredLanguages)
    requiredLanguages = requiredLanguages.map(element => element.toLowerCase());

    const totalRequiredLanguages = requiredLanguages.length;
    let matchedLanguages = 0;
    requiredLanguages.forEach(element => {
        if (allLanguages.includes(element)) matchedLanguages++;
    });

    if (matchedLanguages == totalRequiredLanguages) return 5;
    else {
        let languages = await getAllRequiredTypeLanguage(requiredType);
        languages = languages.map(element => element.toLowerCase());
        let x = 0;
        allLanguages.forEach(element => {
            if (languages.includes(element)) x++;
        });

        let temp = (matchedLanguages/totalRequiredLanguages + 0.4*x/languages.length)*5
        if(temp>5) return 5;
        else return temp;
    }
}



module.exports = {
    getLanguageEvaluationValue
}



// const pdf = require('pdf-parse');
// const natural = require('natural');

// async function getTokens(fileBuffer) {
//     try {
//         const data = await pdf(fileBuffer);
//         let textContent = data.text;
//         textContent = textContent.replace(/-/g, '');
//         textContent = textContent.replace(/\./g, '');
//         const stopwords = natural.stopwords;

//         const customTokenizer = /\b[A-Za-z]\+ |\b[A-Za-z]\+\+|\b[A-Za-z]#|\b\w+\b/g;
//         let tokens = textContent.match(customTokenizer);
//         const filteredTokens = tokens.filter(token => !stopwords.includes(token.toLowerCase()));
//         const lowercaseTokens = filteredTokens.map(token => token.toLowerCase());
//         return lowercaseTokens;
//     }
//     catch (error) {
//         console.error('Error reading PDF:', error);
//     }
// }

// async function abc() {
//     const pdfPath = 'Profile_38.pdf';
//     const fileBuffer = await fs.readFileSync(pdfPath);
//     let filteredTokens = await getTokens(fileBuffer);
//     console.log(await getLanguageEvaluationValue(filteredTokens, ['C++', 'C'], 'Full Stack Development'))
// }
// abc()