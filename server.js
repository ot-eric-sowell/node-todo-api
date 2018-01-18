// This is how you bring in node library dependencies that you have installed with npm
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const items = [];

app.get('/', (req, res) => {
  res.send({
    greeting: 'Hi, you have reached the API.',
    endpoints: [
      { url: '/items', method: 'GET', description: 'Get all the items.' },
      { url: '/item', method: 'POST', description: 'Add an item.' },
      { url: '/delete/:id', method: 'DELETE', description: 'Delete an item.' }
    ]
  })
});

app.get('/items', (req, res) => {
  res.send(items)
});

// Defines the POST where we insert the data.
app.post('/item', (req, res) => {
  console.log('request body', req.body);

  items.push({
    id: uuid(),
    text: req.body.text
  });

  res.sendStatus(204);
});


app.delete('/item/:id', (req, res) => {

  const item = items.find((x) => x.id === req.params.id);
  console.log('item', item);
  if (item === undefined) {
    res.sendStatus(404);
  }
  else {
    const index = items.indexOf(item);
    items.splice(index, 1);
    res.sendStatus(204);
  }

});

// This actually starts the node app listening on the port specified in the .env file
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});
