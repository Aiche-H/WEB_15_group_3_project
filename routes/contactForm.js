const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/api/contacts', async (req, res) => {
  try {
    const { syy, firstname, email, planet, message } = req.body;
    const contact = new Contact({ syy, firstname, email, planet, message });
    const saved = await contact.save();
    console.log('Tiedot vastaanotettu ja tallennettu tietokantaan:', contact); 

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tietokantavirhe: ' + err.message });
  }
});

router.get('/api/contacts', async (req, res) => {
  try {
    const list = await Contact.find().sort({ timestamp: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Tietokantavirhe: ' + err.message });
  }
});

module.exports = router;