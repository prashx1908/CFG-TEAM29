const express = require('express');
const fs = require('fs');
const path = require('path');

const volunteerRoute = express.Router();
const dataFilePath = path.resolve('data/db.json');

volunteerRoute.post('/', (req, res) => {
  const newVolunteer = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
    if (err) return res.status(500).json({ message: 'Failed to read data file' });

    let data = { volunteers: [] };
    try {
      data = JSON.parse(fileData || '{"volunteers": []}');
    } catch (parseErr) {
      return res.status(500).json({ message: 'Invalid JSON format in db.json' });
    }

    data.volunteers.push(newVolunteer);

    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) return res.status(500).json({ message: 'Failed to save data' });

      res.status(201).json({
        message: 'Volunteer added successfully',
        volunteer: newVolunteer
      });
    });
  });
});


module.exports = volunteerRoute;
