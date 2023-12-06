const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const natural = require('natural');
const cors = require('cors');
const { getInformationFromPDF } = require('./pdf_reader');
const { constants } = require('crypto');
const app = express();
const port = 9000;
// const url = "mongodb+srv://classproject:classproject@optihire.hew1xqe.mongodb.net/?retryWrites=true&w=majority";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getExprienceEvalutionValue } = require('./pdf_reader/exprience/exprienceEvalution');
const { getLanguageEvaluationValue } = require('./pdf_reader/programmingLang/programmingLanguageEvalution.js');

app.use(express.json());
app.use(cors());

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

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const fields = req.body.fields;
    const languages = req.body.selectedLanguages.split(',');
    const candidateNo = req.body.maxCandidates;
    console.log(languages);

    const buffer = req.file.buffer;
    const tokens = await getTokens(buffer);

    let expEva = await getExprienceEvalutionValue(tokens);
    let languagesEva = await getLanguageEvaluationValue(tokens, languages, fields)
    
    
    // console.log("expEva", expEva);
    // console.log("lanEva", languagesEva);
    const  rating =  (expEva*0.6 + languagesEva*0.4)*2;
    res.json({ rating:  rating});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});