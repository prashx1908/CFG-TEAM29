const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

const validateBeneficiary = (data) => {
  const nameRegex = /^(?=.*[A-Z])(?=.*[a-z])[a-zA-Z\s]{1,20}$/;
  const emailRegex = /^[a-zA-Z0-9.]{1,12}@gmail\.com$/;

  if (!data.name || !nameRegex.test(data.name)) {
    return 'must be between 1-20 characters, contain at least one uppercase and one lowercase letter, and allow one space if needed';
  }
  if (!data.email || !emailRegex.test(data.email)) {
    return 'must be between 1-20 characters and end with @gmail.com';
  }
  if (!data.address || typeof data.address !== 'string' || data.address.trim().length === 0) {
    return 'must be a non-empty string';
  }
  return null;
};

router.post('/add', (req, res) => {
  const beneficiary = req.body;
  
  const validationError = validateBeneficiary(beneficiary);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  let db = { beneficiaries: [] };
  if (fs.existsSync(dbPath)) {
    try {
      const fileContent = fs.readFileSync(dbPath, 'utf8');
      if (fileContent) {
        db = JSON.parse(fileContent);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read or parse database file' });
    }
  }

  const newBeneficiary = {
    id: db.beneficiaries.length ? db.beneficiaries[db.beneficiaries.length - 1].id + 1 : 1,
    ...beneficiary
  };

  db.beneficiaries.push(newBeneficiary);
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to write to database file' });
  }

  res.status(201).json({
    message: 'Beneficiary added successfully',
    beneficiary: newBeneficiary
  });
});


router.put('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedBeneficiary = req.body;

  const validationError = validateBeneficiary(updatedBeneficiary);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  let db = { beneficiaries: [] };
  if (fs.existsSync(dbPath)) {
    try {
      const fileContent = fs.readFileSync(dbPath, 'utf8');
      if (fileContent) {
        db = JSON.parse(fileContent);
      }
    } catch (error) {
      return res.status(500).json({ error: 'Failed to read or parse database file' });
    }
  }

  const index = db.beneficiaries.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Beneficiary not found' });
  }

  db.beneficiaries[index] = { id, ...updatedBeneficiary };
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (error) {
    return res.status(500).json({ error: 'Failed to write to database file' });
  }

  res.json({
    message: 'Beneficiary updated successfully',
    beneficiary: db.beneficiaries[index]
  });
});

module.exports = router;
