const express = require('express');
const beneficiaryRoute = express.Router();

beneficiaryRoute.get('/', (req, res) => {
  res.send('Hello from beneficiary');
});

module.exports = beneficiaryRoute;  // MUST export the router!