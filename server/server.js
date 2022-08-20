import express from 'express'
import fs from 'fs'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

import { ServerStyleSheet } from 'styled-components';

const PORT = 3000

const app = express();
app.use('^/$', (req, resp, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (error, data) => {
        if (error){
            console.log(error.toString());
            return resp.status(500).send("Something went wrong");
        }
        const sheet = new ServerStyleSheet();
        let applicationContent = ReactDOMServer.renderToString(sheet.collectStyles(<App />));
        const styles = sheet.getStyleTags();
        let respData = data.replace('<div id="root"></div>', `<div id="root">${applicationContent}</div>`);
        respData = respData.replace('<style></style>', styles);
        return resp.send(respData);
    });
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.listen(PORT ,() => {
    console.log(`Application is running on port ${PORT}`);
});