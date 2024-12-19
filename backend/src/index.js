const express = require('express');
const cors = require('cors');
const { connectDB } = require('./mongo/connection');
const app = express();
const routers = require('./routers/index');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/', routers);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
