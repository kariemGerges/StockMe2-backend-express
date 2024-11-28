var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>StockMe2</title>
      </head>
      <body>
        <h1>StockMe2</h1>
        <p>StockMe2 index router</p>
        <br>
      </body>
    </html>
    `
  );
});

module.exports = router;
