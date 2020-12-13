const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = 3000;
const dotEnv = require('dotenv');

dotEnv.config();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/user', (req, res) => {
  res.json({
    message: process.env.JWT_SECRET,
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'Chris',
  };

  jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
    res.json({
      token,
    });
  });
});

app.listen(PORT, () => console.log(`Listening ${PORT} PORT!`));
