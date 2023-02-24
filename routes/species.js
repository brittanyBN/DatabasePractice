const express = require('express');
const SpeciesService = require("../services/SpeciesService");
const router = express.Router();
const db = require("../models");
const speciesService = new SpeciesService(db);

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get('/', async function (req, res, next) {
    const species = await speciesService.get();
    res.render('species', { title: 'Species', species: species, user: req.user });
})

router.post('/add', jsonParser, async function(req, res, next) {
    let species = req.body.name;
    await speciesService.create(species);
    res.end()
});

router.delete('/', jsonParser, async function(req, res, next) {
    let Id = req.body.id;
    await speciesService.deleteSpecies(Id);
    res.end()
});
module.exports = router;