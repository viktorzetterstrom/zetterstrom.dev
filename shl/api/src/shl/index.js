const Client = require('./client');
const Connection = require('./connection');

module.exports = {
  generateClient: (id, secret) => new Client(new Connection(id, secret)),
};
