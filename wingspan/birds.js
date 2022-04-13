const db = require('./db.json');
const lunr = require('lunr');
const express = require('express');
const router = express.Router();

/**
 * Wingspan Bird Card
 * @typedef {object} Bird
 * @property {string} id - The unique id of the bird card
 * @property {string} name - The name of the bird card
 * @property {string} expansion - The expansion this card is from
 * @property {string} color - The color of the bird card
 * @property {string} points - The number of points this card is worth
 * @property {string} url - The url to this card
 */
const birds = db.birds;

const idx = lunr(function() {
  this.ref('id');
  this.field('name');
  birds.forEach(row => this.add(row), this);
});

/**
 * GET /wingspan/v1/birds
 * @tags Wingspan
 * @summary A list of all Wingspan Bird Cards
 * @param {string} search.query - Optional param to filer results searching cards by name
 * @return {array<Bird>} 200 - success response - application/json
 */
router.get('/', (req, res) => {
  if (req.query.search) {
    let ids = idx.search(req.query.search).map(result => result.ref);
    res.send(birds.filter(bird => ids.indexOf(bird.id) !== -1));
    return;
  }
  res.send(birds);
});

/**
 * GET /wingspan/v1/birds/{id}
 * @tags Wingspan
 * @summary Wingspan Bird Cards by id
 * @param {string} id.path.required - The unique id of the bird card
 * @return {Bird} 200 - success response - application/json
 * @return 404 - not found - text/plain
 */
router.get('/:id', (req, res) => {
  let results = birds.filter(bird => bird.id == req.params.id);
  if (results.length > 0) {
    return res.send(results[0]);
  }
  return res.sendStatus(404);
});

module.exports = router;
