require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/stockNews', function(req, res, next) {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>StockMe2</title>
            </head>
            <body>
                <h1>StockMe2</h1>
                <p>Stock News Router</p>
            <br>
            <p>This router to get stock related recent news</p>
            </body>
        </html>
        `);
});

module.exports = router;