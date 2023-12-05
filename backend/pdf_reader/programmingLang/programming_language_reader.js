const fs = require('fs');
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


function readAllLanguage() {
    const filePath = 'allProgrammingLanguages.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Split the content into an array based on line breaks
    const languagesArray = fileContent.split('\n').map(line => line.trim());
    const lowercaseLanguageArray = languagesArray.map(token => token.toLowerCase());
    return lowercaseLanguageArray;
}


function findAllLanguage(tokens, allProgrammingLanguages) {
    const allLanguages = [];

    let tokenStart = 0, tokenEnd = tokens.length;
    let start = 0, end = allProgrammingLanguages.length
    while (tokenStart < tokenEnd) {
        start = 0;
        while (start < end) {
            if (tokens[tokenStart] == allProgrammingLanguages[start]) {
                allLanguages.push(allProgrammingLanguages[start]);
                break;
            }
            start++;
        }
        tokenStart++
    }
    console.log(allLanguages)
}



async function abc() {
    const pdfPath = 'Profile_38.pdf';
    const fileBuffer = await fs.readFileSync(pdfPath);
    let filteredTokens = await getTokens(fileBuffer);
    let allProgrammingLanguages = await readAllLanguage(); 
    findAllLanguage(filteredTokens, allProgrammingLanguages)
}
abc()


