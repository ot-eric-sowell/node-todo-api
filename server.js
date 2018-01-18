const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

const app = express();

// Of CORS we need this.
// Haha...ha.......ha
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

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

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}.`);
});
