const express = require('express');
const { pool } = require('../database/index.js');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool().query(`SELECT * FROM review WHERE destination = ${req.params.id}`);
    res.status(200).send(rows);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    req.body.created_at = new Date().toString();
    req.body.helpfulVotes = 0;
    req.body.profilePic = 'https://source.unsplash.com/480x360/?avatar';

    const newReview = Object.values(req.body);
    const query = 'INSERT INTO review (userName, profilePic, created_at, userHomeLocation, images, starRating, reviewTitle, reviewBody, dateOfExperience, helpfulVotes, destination, language, travelerType) VALUES($1, $13, $11, $4, $9, $5, $2, $3, $7, $12, $8, $10, $6)';
    const data = await pool().query(query, newReview);
    res.status(201).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const query = `UPDATE review SET helpfulVotes = helpfulVotes + 1 WHERE userName = '${req.body.userName}' AND destination = ${req.params.id}`;
    const data = await pool().query(query);
    res.status(201).send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
