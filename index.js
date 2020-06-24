const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 1337;

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/api/search', (req, res) => {
  const imageData = req.body.image;

  fs.writeFileSync(`./images/${Date.now()}.png`, new Buffer(imageData, "base64"));

  return res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})