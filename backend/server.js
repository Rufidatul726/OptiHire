const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const pdf = require('pdf-parse');
const natural = require('natural');
const cors = require('cors');
const app = express();
const port = 9000;
const userRoutes= require("./user/userRoutes");
const url= "mongodb://127.0.0.1:27017/optiHire";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  app.listen(port, function check(err) {
    if (err)
      console.log("error");
    else
      console.log("Server connected");
  });
})
.catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});
app.use(express.json());
app.use(cors());

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const buffer = req.file.buffer;
    const data = await pdf(buffer);

    const text = data.text;

    // Tokenization
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text);

    // Stopword Removal (using natural library's built-in stopwords)
    const stopwords = natural.stopwords;
    const filteredTokens = tokens.filter(token => !stopwords.includes(token.toLowerCase()));

    // Stemming
    const porterStemmer = natural.PorterStemmer;
    const stemmedTokens = filteredTokens.map(token => porterStemmer.stem(token));

    // Text Normalization
    const normalizedTokens = stemmedTokens.map(token => token.toLowerCase());

    console.log(normalizedTokens);
    res.json({ text: text, tokens: normalizedTokens });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(userRoutes);