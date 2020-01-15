import express from 'express';
import { find, add, remove, update, findById } from './data/hubs-model';

const server = express();

server.listen(4000, () => {
  console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

server.get('/', (request, response) => {
  response.send('hello world...');
});

server.get('/hubs', (req, res) => {
  find()
    .then((hubs) => {
      res.status(200).json(hubs);
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, err });
    });
});

server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  add(hubInfo)
    .then((hub) => {
      res.status(201).json({ success: true, hub });
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.delete('/hubs/:id', (req, res) => {
  const { id } = req.params;
  console.log('yeah');

  remove(id)
    .then((deletedHub) => {
      if (deletedHub) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'id not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const hubInfo = req.body;

  update(id, hubInfo)
    .then((hub) => {
      if (hub) {
        res.status(200).json({ success: true, hub });
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

server.get('/hubs/:id', (req, res) => {
  findById(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json({ success: true, hub });
      } else {
        res.status(404).json({ success: false, message: 'id not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, err });
    });
});

// Users
server.get('/users', (req, res) => {
  find()
    .then((hubs) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        errorMessage: 'The users information could not be retrieved.',
        err,
      });
    });
});
