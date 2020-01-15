const express = require('express');

const db = require('./data/hubs-model');

const server = express();

server.use(express.json);

server.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

server.get('/', (req, res) => {
  res.send('hello world!');
});

server.get('/now', (req, res) => {
  res.send(Date());
});

server.get('/hubs', (req, res) => {
  db.find()
    .then((hubs) => {
      res.status(200).json(hubs);
    })
    .catch((error) => {
      res.status(500).json({ success: false, error });
    });
});

server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  db.add(hubInfo)
    .then((hub) => {
      res.status(201).json({ success: true, hub });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error });
    });
});

server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, error });
    });
});

server.put('hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then((updated) => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch((error) => {
      res.status(500).json({ success: false, error });
    });
});
