const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 1337;

const AUTH_TOKEN = process.env.TOKEN;

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/api/search', async (req, res) => {
  const imageData = req.body.image;

  // fs.writeFileSync(`./images/${Date.now()}.png`, new Buffer(imageData, "base64"));

  const response = await fetch('https://vision.googleapis.com/v1/images:annotate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TOKEN}`,
    },
    body: JSON.stringify({
      "requests": [
        {
          "image": {
            "content": imageData
          },
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();

  return res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})