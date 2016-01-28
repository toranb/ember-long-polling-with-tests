var tickets = require('../../vendor/fixtures/tickets.js');

module.exports = function(app) {
  var express = require('express');
  var ticketsRouter = express.Router();

  ticketsRouter.get('/', function(req, res) {
    res.send(tickets.list());
  });

  ticketsRouter.put('/:id', function(req, res) {
    res.send({
      'tickets': {
        id: req.params.id
      }
    });
  });

  app.use('/api/tickets', ticketsRouter);
};
