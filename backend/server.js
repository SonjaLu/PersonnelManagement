const express = require('express');
const app = express();
const router = express.Router();
const port = 3001; // Port 3000 ist oft für Frontend reserviert

app.get('/', (req, res) => {
  res.send('Hallo Welt von meinem Express-Server!');
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
