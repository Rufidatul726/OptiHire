const fs = require('fs');
const path = require('path');
const positionsFileName = 'allPositionName2.txt';


function createPositionsGroups() {
    const filePath = path.join(__dirname, positionsFileName); // Use path.join to construct the file path
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split the content into an array based on line breaks
    const inputArray = fileContent.split('\n')
        .map(line => line.toLowerCase().trim())
        .filter(line => line != '');


    const resultArray = [];
    let currentGroup = [];

    for (const line of inputArray) {
        if (line.startsWith('#') && line.endsWith('#')) {
            // Start a new group
            if (currentGroup.length > 0) {
                resultArray.push(currentGroup);
                currentGroup = [];
            }
        } else {
            // Add line to the current group
            currentGroup.push(line);
        }
    }

    // Add the last group if not empty
    if (currentGroup.length > 0) {
        resultArray.push(currentGroup);
    }

    return resultArray;
}


function readAllPositionName() {
    const filePath = path.join(__dirname, positionsFileName); // Use path.join to construct the file path
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split the content into an array based on line breaks
    const temp = fileContent.split('\n')
        .map(line => line.toLowerCase().trim())
        .filter(line => line != '');

    const allPositions = temp.filter(token => !token.startsWith('#') && !token.endsWith('#'))
        .map(line => line.split(' ').map(word => word.trim()));

    return allPositions;
}

function findPositionInACompanys(tokens, tokenStart, tokenEnd, allPositionNames) {
    const allPositions = [];

    let start = 0, end = allPositionNames.length;
    while (tokenStart < tokenEnd) {
        start = 0;
        while (start < end) {
            if (tokens[tokenStart] == allPositionNames[start][0]) {
                let flag = true, l = allPositionNames[start].length;
                for (let i = 0; i < l; i++) {
                    if (allPositionNames[start][i] != tokens[tokenStart]) {
                        flag = false;
                        break;
                    }
                    else {
                        tokenStart++;
                    }
                }
                if (flag) {
                    allPositions.push(allPositionNames[start].join(' '));
                }
                tokenStart--;
            }
            start++;
        }
        tokenStart++
    }
    return allPositions;
}

module.exports = {
    readAllPositionName, findPositionInACompanys, createPositionsGroups
}
