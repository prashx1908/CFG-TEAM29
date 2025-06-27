const express = require('express');
const loginRoute = express.Router();

loginRoute.get('/', (req, res) => res.send('Hello from login'));

module.exports = loginRoute;