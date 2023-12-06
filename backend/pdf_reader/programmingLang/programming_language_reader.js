const fs = require('fs');

function readAllLanguage() {
    const filePath = 'allProgrammingLanguages.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Split the content into an array based on line breaks
    const languagesArray = fileContent.split('\n').map(line => line.trim());
    const lowercaseLanguageArray = languagesArray.map(token => token.toLowerCase());
    return lowercaseLanguageArray;
}


async function findAllLanguage(tokens) {
    let allProgrammingLanguages = await readAllLanguage(); 
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
    return [...new Set(allLanguages)];
}

module.exports= {
    findAllLanguage
}


