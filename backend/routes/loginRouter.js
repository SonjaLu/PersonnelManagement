const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Antwort vom Beispiel-Router.');
});

module.exports = router;
