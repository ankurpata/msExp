import express from 'express';
import path from 'path';
import React from 'react';
const app = express();
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import configureStore from './ms/src/store/configureStore';
const store = configureStore();

console.log(path.join(__dirname, '/ms/build/static/'));

app.use('/favicon23.png', express.static(path.join(__dirname, '/ms/build/favicon23.png'), {maxAge: 3600000}));
app.use('/static/media', express.static(path.join(__dirname, '/ms/build/static/media/'), {maxAge: 3600000}));
app.use('/static/css', express.static(path.join(__dirname, '/ms/build/static/css'), {maxAge: 3600000}));
app.use('/static/js', express.static(path.join(__dirname, '/ms/build/static/js/'), {maxAge: 3600000}));
app.use('/static/images', express.static(path.join(__dirname, '/ms/build/static/images/'), {maxAge: 3600000}));

 
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var msApis = require('./routes/msApis.js');
var scrapperApis = require('./routes/scrapperApis.js');

 
app.use('/api/', msApis);
app.use('/scrape/', scrapperApis);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/ms/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

var renderFullPage = (html, preloadedState) => {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}
