const Clarifai = require('clarifai');
const cApp = new Clarifai.App({
  apiKey: process.env.API_KEY,
});

exports.handleDetection = (req, res) => {
  cApp.models
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.image)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to work with API'));
};

exports.handleEntries = knex => (req, res) => {
  const { id } = req.body;

  knex('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Unable to get entries'));
};
