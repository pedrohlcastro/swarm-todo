const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer({ secure: false });
const compress = require('compression');

const PORT = process.env.PORT || 8000;
const backend = 'http://backend:8000';

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
app.use(express.static(path.join(__dirname, './client/')));


//body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// restream parsed body before proxying
apiProxy.on('proxyReq', (proxyReq, req, res, options) => {
  if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
  }
});

app.all("/api/*", (req, res) =>  {
  console.log('API disparada');
  apiProxy.web(req, res, {target: backend});
});


// Call Angular
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`localhost:${PORT}`);
});

module.exports = app;