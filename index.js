const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 1995;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'));
app.listen(port, function () {
  console.log(`ครัวคุณย่า API listen on port ${port}`);
})
