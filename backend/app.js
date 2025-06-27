const express = require('express');
const app = express();

app.use(express.json());

const loginRoute = require('./routes/login');
const beneficiaryRoute = require('./routes/beneficiary');
const volunteerRoute = require('./routes/volunteer');

app.use('/login', loginRoute);
app.use('/beneficiary', beneficiaryRoute);
app.use('/volunteer', volunteerRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
