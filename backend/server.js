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

    const buffer = req.file.buffer;
    const tokens = await getTokens(buffer);
    // console.log(tokens);
    let expEva = await getExprienceEvalutionValue(tokens);
    console.log("expEva", expEva);
    
    // getInformationFromPDF(buffer);
    // const data = await pdf(buffer);

    // const text = data.text;

    // // Tokenization
    // const tokenizer = new natural.WordTokenizer();
    // const tokens = tokenizer.tokenize(text);

    // // Stopword Removal (using natural library's built-in stopwords)
    // const stopwords = natural.stopwords;
    // const filteredTokens = tokens.filter(token => !stopwords.includes(token.toLowerCase()));

    // // Stemming
    // const porterStemmer = natural.PorterStemmer;
    // const stemmedTokens = filteredTokens.map(token => porterStemmer.stem(token));

    // // Text Normalization
    // const normalizedTokens = stemmedTokens.map(token => token.toLowerCase());

    // // console.log(normalizedTokens);
    // res.json({ text: text, tokens: normalizedTokens });
    const randomRating = Math.floor(Math.random() * 100) + 1;
    res.json({ rating: randomRating});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/api/form', (req, res) => {
  // console.log(req.body);
  const fields= req.body.fields;
  const languages= req.body.selectedLanguages;
  const candidateNo= req.body.maxCandidates;
  console.log(fields[0], languages, candidateNo);
  res.json({ message: 'Data received!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});