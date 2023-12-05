const fs = require('fs');
const pdf = require('pdf-parse');
const natural = require('natural');
let filteredTokens;

// Replace 'path-to-your-pdf-file.pdf' with the actual path to your PDF file
const pdfPath = 'Profile_38.pdf';
const dataBuffer = fs.readFileSync(pdfPath);
pdf(dataBuffer).then(data => {
    // Extracted text content from the PDF
    const textContent = data.text;

    // Do something with the text content
    // Tokenization
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(textContent);

    // Stopword Removal (using natural library's built-in stopwords)
    const stopwords = natural.stopwords;
    // filteredTokens = tokens.filter(token => !stopwords.includes(token.toLowerCase()));
    filteredTokens = tokens

    //   let i = filteredTokens.length;
    //   for(let j=0;j<i;j++) console.log((filteredTokens[j]))

    console.log(tokens);
}).catch(error => {
    console.error('Error reading PDF:', error);
});



function readAllLanguage(tokes) {
    const filePath = 'allProgrammingLanguages.txt';
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const allLanguages = [];

    // Split the content into an array based on line breaks
    const linesArray = fileContent.split('\n').map(line => line.trim());
    const languages = linesArray.map(line => line.split(' ').map(word => word.trim()));

    // Print the resulting array
    // console.log(languages);


    let tokenStart = 0, tokenEnd = tokes.length;
    let start = 0, end = languages.length
    while (tokenStart < tokenEnd) {
        start = 0;
        while (start < end) {
            if (tokes[tokenStart] == languages[start][0]) {
                let temp = languages[start].length, i=0;
                let temp2 = true; 
                while (i<temp) {
                    if(tokes[tokenStart] != languages[start][i]) {
                        temp2 = false;
                        break;
                    }
                    i++;
                    tokenStart++;
                }
                tokenStart--;
                // if temp2 == true then the language is in the
                if(temp2){
                    allLanguages.push(languages[start])
                }

            }
            start++;
        }
    }


}

// readAllLanguage(filteredTokens)



