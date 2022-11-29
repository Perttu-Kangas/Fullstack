const express = require('express');
const cors = require('cors');

const indexRouter = require('./controllers/index');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', indexRouter);

app.listen('3001', () => { })