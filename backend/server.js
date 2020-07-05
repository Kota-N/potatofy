require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

app.use(cors());
app.use(express.json());

const imageController = require('./controllers/imageController');
const userController = require('./controllers/userController');

app.get('/', (req, res) => {
  res.send('success');
});

app.post('/image', imageController.handleDetection);

app.put('/entries', imageController.handleEntries(knex));

app.post('/register', userController.handleRegister(knex, bcrypt));

app.post('/login', userController.handleLogin(knex, bcrypt));

app.listen(process.env.PORT || 5000);
