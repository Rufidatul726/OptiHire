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


function readAllCompanyName() {
    const filePath = 'allCompanies.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split the content into an array based on line breaks
    const companyNameArray = fileContent.split('\n').map(line => line.toLowerCase().trim());

    // Create a 2D array by splitting each line into words
    const twoDArray = companyNameArray.map(line => line.split(' ').map(word => word.trim()));

    // Remove the last element from each array in the 2D array
    const modifiedTwoDArray = twoDArray.map(arr => arr.slice(0, -1));

    return modifiedTwoDArray;
}

function readAllCompanysRating() {
    const filePath = 'allCompanies.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const lines = fileContent.split('\n').filter(line => line.trim() !== '');
    const resultArray = lines.map(line => {
        // Extract the last number and remove it from the line
        const match = line.match(/(\d+(\.\d+)?)\s*$/);
        const lastNumber = match ? parseFloat(match[1]) : null;
        const textWithoutLastNumber = match ? line.replace(match[0], '').trim() : line.trim();
        return [textWithoutLastNumber, lastNumber];
    });
    return resultArray;
}

function findAllCompanys(tokens, allCompaniesName) {
    const allCompanies = [];

    let tokenStart = 0, tokenEnd = tokens.length;
    let start = 0, end = allCompaniesName.length;
    while (tokenStart < tokenEnd) {
        start = 0;
        while (start < end) {
            if (tokens[tokenStart] == allCompaniesName[start][0]) {
                let flag = true, l = allCompaniesName[start].length;
                for (let i = 0; i < l; i++) {
                    if (allCompaniesName[start][i] != tokens[tokenStart]) {
                        flag = false;
                        break;
                    }
                    else {
                        tokenStart++;
                    }
                }
                if (flag) {
                    allCompanies.push(allCompaniesName[start].join(' '));
                    break;
                }
                tokenStart--;
            }
            start++;
        }
        tokenStart++
    }
    // let temp = [...new Set(allCompanies)].map(subArray => subArray.join(' ')); 
    console.log(allCompanies)
    // return [...new Set(allLanguages)];
}

async function abc() {
    const pdfPath = 'Profile_38.pdf';
    const fileBuffer = await fs.readFileSync(pdfPath);
    let filteredTokens = await getTokens(fileBuffer);
    // console.log(filteredTokens)
    filteredTokens.forEach(token => {
        console.log(token)
    });
    let allCompanies = readAllCompanyName();
    allCompanies.forEach(companyName => {
        console.log(companyName)
    });
    let allCompaniesRating = readAllCompanysRating();
    findAllCompanys(filteredTokens, allCompanies)
}
abc()
