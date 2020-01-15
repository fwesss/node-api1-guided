const express = require('express');
const users = require('./data/db');

const server = express();

server.listen(4000, () => {
  console.log('=== server listening on port 4000 ===');
});

server.use(express.json());

server.get('/', (_req, res) => {
  res.send('hello world...');
});

// server.get('/hubs', (req, res) => {
//   hubs
//     .find()
//     .then((hubs) => {
//       res.status(200).json(hubs);
//     })
//     .catch((err) => {
//       res.status(500).json({ sucess: false, err });
//     });
// });

// server.post('/hubs', (req, res) => {
//   const hubInfo = req.body;

//   hubs
//     .add(hubInfo)
//     .then((hub) => {
//       res.status(201).json({ success: true, hub });
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, err });
//     });
// });

// server.delete('/hubs/:id', (req, res) => {
//   const { id } = req.params;

//   hubs
//     .remove(id)
//     .then((deletedHub) => {
//       if (deletedHub) {
//         res.status(204).end();
//       } else {
//         res.status(404).json({ message: 'id not found' });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, err });
//     });
// });

// server.put('/hubs/:id', (req, res) => {
//   const { id } = req.params;
//   const hubInfo = req.body;

//   hubs
//     .update(id, hubInfo)
//     .then((hub) => {
//       if (hub) {
//         res.status(200).json({ success: true, hub });
//       } else {
//         res.status(404).json({ success: false, message: 'id not found' });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, err });
//     });
// });

// server.get('/hubs/:id', (req, res) => {
//   hubs
//     .findById(req.params.id)
//     .then((hub) => {
//       if (hub) {
//         res.status(200).json({ success: true, hub });
//       } else {
//         res.status(404).json({ success: false, message: 'id not found' });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, err });
//     });
// });

// Users
server.post('/users', (req, res) => {
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      success: false,
      errorMessage: 'Please provide name and bio for the user.',
    });
  } else {
    users
      .insert(userInfo)
      .then((user) => {
        res.status(201).json({ success: true, user });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          errorMessage:
            'There was an error while saving the user to the database',
          error,
        });
      });
  }
});

server.get('/users', (_req, res) => {
  users
    .find()
    .then((users) => {
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
