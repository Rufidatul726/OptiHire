const fs = require('fs');
const allPositionNames = require('./allPositionNames.js')


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
    const linesInLowerCase = lines.map(line => line.toLowerCase().trim());
    const resultArray = linesInLowerCase.map(line => {
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
                    allCompanies.push([tokenStart, allCompaniesName[start].join(' ')]);
                    break;
                }
                tokenStart--;
            }
            start++;
        }
        tokenStart++
    }
    return allCompanies;
}

function getAllPositionInCompanys(tokens, companyNames) {
    const allPositions = allPositionNames.readAllPositionName();
    const companyWithPosition = [];

    for (let i = 0, l = companyNames.length; i < l; i++) {
        let temp;
        if (i != l - 1) {
            temp = allPositionNames.findPositionInACompanys(tokens, companyNames[i][0], companyNames[i + 1][0], allPositions);
        }
        else {
            temp = allPositionNames.findPositionInACompanys(tokens, companyNames[i][0], tokens.length, allPositions);
        }
        companyWithPosition.push([companyNames[i][1], temp]);
    }
    return companyWithPosition;
}


async function getExprienceEvalutionValue(tokens) {
    const allCompaniesRating = await readAllCompanysRating();
    const positionGroups = await allPositionNames.createPositionsGroups();

    let allCompanies = readAllCompanyName();
    const companyNames = await findAllCompanys(tokens, allCompanies);
    const companyWithPosition = await getAllPositionInCompanys(tokens, companyNames);
    // console.log(companyWithPosition)
    // console.log(allCompaniesRating)

    let allEvalutionValue = [];
    for (let i = 0, l = companyWithPosition.length; i < l; i++) {
        let companiesRating = 0;
        for (let ii = 0, ll = allCompaniesRating.length; ii < ll; ii++) {
            if (allCompaniesRating[ii][0] == companyWithPosition[i][0]) {
                companiesRating = allCompaniesRating[ii][1];
                break;
            }
        }

        if (companyWithPosition[i][1].length > 0) {
            for (let a = 0, b = companyWithPosition[i][1].length; a < b; a++) {
                for (let ii = 0, ll = positionGroups.length; ii < ll; ii++) {
                    if (positionGroups[ii].includes(companyWithPosition[i][1][a])) {
                        allEvalutionValue.push(companiesRating * (ii + 3))        // Evalution Value
                        break;
                    }
                }
            }
        }
        else {
            allEvalutionValue.push(companiesRating * (1 + 3))
        }
    }
    // console.log(allEvalutionValue)
    // Sort the array in descending order
    const sortedEvalutionValue = allEvalutionValue.sort((a, b) => b - a);

    // Take the first three elements
    const topThreeValues = sortedEvalutionValue.slice(0, 3);
    let average = topThreeValues.reduce((sum, value) => sum + value, 0) / topThreeValues.length;

    if(average > 20) average = 5;
    else average = average*5/20;


    if(topThreeValues.length > 2) return average;
    else return average-1;
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
    const pdfPath = 'Profile_28.pdf';
    const fileBuffer = await fs.readFileSync(pdfPath);
    let filteredTokens = await getTokens(fileBuffer);
    let expEva = await getExprienceEvalutionValue(filteredTokens);
    console.log(expEva)
}

abc()

module.exports = {
    getExprienceEvalutionValue
}
