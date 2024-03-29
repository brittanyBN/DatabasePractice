const express = require('express');
const TemperamentService = require("../services/TemperamentService");
const router = express.Router();
const db = require("../models");
const temperamentService = new TemperamentService(db);
const isAdmin = require('../middleware/authMiddlewares');

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get('/', async function (req, res, next) {
    const temperament = await temperamentService.get();
    res.render("temperament", {user: req.user, temperament: temperament})
})

router.post('/add', isAdmin, jsonParser, async function (req,res,next) {
    let temp = req.body.name;
    await temperamentService.create(temp);
        res.end();
});

router.patch('/update', isAdmin, async function (req,res,next) {
    let temp = req.body.id;
    let newName = req.body.name;
    await temperamentService.updateTemperament(temp, newName).then(() => {
        console.log("Temperament updated");
        res.send("Temperament updated")
    })
        .catch((response) => {
            alert(response.statusText);
            res.send("Update failed");
        });
    res.end()
})

router.delete('/', isAdmin, jsonParser, async function(req, res, next) {
    let Id = req.body.id;
    await temperamentService.deleteTemperament(Id);
    res.end()
});

module.exports = router;