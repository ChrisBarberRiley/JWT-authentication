const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = 3000;
const dotEnv = require('dotenv');

dotEnv.config();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/user', verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Created a user',
        authData,
      });
    }
  });
});

app.post('/login', (req, res) => {
  const user = {
    id: 1,
    name: 'Chris',
  };

  jwt.sign(
    { user },
    process.env.JWT_SECRET,
    { expiresIn: '30s' },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
});

// verify token
function verifyToken(req, res, next) {
  // Get bearer
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(PORT, () => console.log(`Listening ${PORT} PORT!`));
