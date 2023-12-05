const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const natural = require('natural');
const cors = require('cors');
const { getInformationFromPDF } = require('./pdf_reader');
const app = express();
const port = 9000;
// const url = "mongodb+srv://classproject:classproject@optihire.hew1xqe.mongodb.net/?retryWrites=true&w=majority";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    // if (!req.file) {
    //   return res.status(400).send('No file uploaded.');
    // }

    // const buffer = req.file.buffer;
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
  console.log(req.body);
  res.json({ message: 'Data received!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});