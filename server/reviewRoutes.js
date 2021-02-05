const express = require('express');
const {
  findAll, create, incHelpfulCounter,
} = require('../database/index.js');

const router = express.Router();

router.get('/:id', (req, res) => {
  findAll(req.params.id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// router.get('/dest/:location', (req, res) => {
//   console.log('location');
//   findByDestination(req.params.location, (err, data) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(data);
//     }
//   });
// });

router.post('/', (req, res) => {
  req.body.created_at = new Date().toString();
  req.body.helpfulVotes = 0;
  const newReview = Object.values(req.body);
  create(newReview, (err, data) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.put('/:id', (req, res) => {
  incHelpfulCounter(req.params.id, req.body.userName, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
