const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const compress = require('compression');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(compress());

app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(cors());

// helmet config
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/client/')));

// Call Angular
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`localhost:${PORT}`);
});

module.exports = app;